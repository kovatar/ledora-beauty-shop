import React, { useState, useMemo, useEffect } from 'react';
import { ActiveFilters, CartItem, Product, UserProfile } from './types';
import { PRODUCTS_DATA } from './data/mockData';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MegaNavigation } from './components/MegaNavigation';
import { TrustBadges } from './components/TrustBadges';
import { HeroBanners } from './components/HeroBanners';
import { StoryCategories } from './components/StoryCategories';
import { BestSellersSection } from './components/BestSellersSection';
import { ProductCatalog } from './components/ProductCatalog';
import { BrandShowcase } from './components/BrandShowcase';
import { BeautyRoutineBanner } from './components/BeautyRoutineBanner';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistModal } from './components/WishlistModal';
import { AuthModal } from './components/AuthModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileNavDrawer } from './components/MobileNavDrawer';
import { Footer } from './components/Footer';

export default function App() {
  // Products Dataset
  const [products] = useState<Product[]>(PRODUCTS_DATA);

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ldora_cart') || localStorage.getItem('khanoumi_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Start with a default popular sample item for immediate delight
    return [
      { product: PRODUCTS_DATA[0], quantity: 1 },
    ];
  });

  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ldora_wishlist') || localStorage.getItem('khanoumi_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [PRODUCTS_DATA[1].id, PRODUCTS_DATA[3].id];
  });

  // Filters State
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    category: 'all',
    brand: '',
    subBrand: '',
    skinType: '',
    onlyInStock: false,
    onlyDiscounted: false,
    sortBy: 'recommended',
  });

  // Modal / Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState('home');

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    name: 'سارا رادمنش',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    isLoggedIn: false,
    walletBalance: 150000,
    clubPoints: 420,
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ldora_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ldora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      // ignore
    }
  }, [wishlist]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer to confirm addition
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Auth Handlers
  const handleLogin = (name: string, phone: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      phone,
      isLoggedIn: true,
    }));
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  // Filter Updates
  const handleUpdateFilters = (updates: Partial<ActiveFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    // scroll to catalog if category clicked
    if (updates.category !== undefined) {
      const el = document.getElementById('curated-product-catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      brand: '',
      subBrand: '',
      skinType: '',
      onlyInStock: false,
      onlyDiscounted: false,
      sortBy: 'recommended',
    });
  };

  const handleSelectBestSellers = () => {
    const el = document.getElementById('best-sellers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleUpdateFilters({ sortBy: 'bestselling' });
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search Query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.trim().toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchEng = p.englishTitle?.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q) || p.brandFa.includes(q);
          const matchSubBrand = p.subBrandFa?.includes(q) || p.subBrand?.toLowerCase().includes(q);
          const matchCategory = p.categoryFa.includes(q);
          const matchIng = p.ingredients?.some((ing) => ing.toLowerCase().includes(q));
          if (!matchTitle && !matchEng && !matchBrand && !matchSubBrand && !matchCategory && !matchIng) {
            return false;
          }
        }

        // PMLM Sub-Brand Filter
        if (filters.subBrand && p.subBrand !== filters.subBrand) {
          return false;
        }

        // Category Filter
        if (filters.category !== 'all' && p.category !== filters.category) {
          return false;
        }

        // Brand Filter
        if (filters.brand) {
          if (
            p.brand.toLowerCase() !== filters.brand.toLowerCase() &&
            p.brandFa !== filters.brand
          ) {
            return false;
          }
        }

        // Skin Type Filter
        if (filters.skinType && filters.skinType !== 'همه') {
          if (!p.skinType?.includes(filters.skinType)) {
            return false;
          }
        }

        // In-stock Filter
        if (filters.onlyInStock && p.stock <= 0) {
          return false;
        }

        // Discounted Filter
        if (filters.onlyDiscounted && p.discountPercent <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'cheapest':
            return a.finalPrice - b.finalPrice;
          case 'priciest':
            return b.finalPrice - a.finalPrice;
          case 'bestselling':
            return b.reviewCount - a.reviewCount;
          case 'discounted':
            return b.discountPercent - a.discountPercent;
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          case 'recommended':
          default:
            return (b.rating || 0) - (a.rating || 0);
        }
      });
  }, [products, filters]);

  // Derived Stats
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.finalPrice * item.quantity,
      0
    );
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cartItems) {
      map[item.product.id] = item.quantity;
    }
    return map;
  }, [cartItems]);

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [products, wishlist]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col selection:bg-[#FCE4EC] selection:text-[#D81B60]">
      {/* Top Announcement Strip */}
      <AnnouncementBar />

      {/* Primary Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => handleUpdateFilters({ searchQuery: query })}
        cartCount={totalCartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Sticky Mega Navigation */}
      <MegaNavigation
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleUpdateFilters({ category: cat })}
        onSelectBestSellers={handleSelectBestSellers}
      />

      {/* Main Content Area with Bottom Padding for Mobile Nav Bar */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Trust Badges */}
        <TrustBadges />

        {/* Hero Promotional Grid & Sliders */}
        <HeroBanners
          onSelectCategory={(cat) => handleUpdateFilters({ category: cat })}
          onSelectBestSellers={handleSelectBestSellers}
        />

        {/* Story / Circle Category Avatars */}
        <StoryCategories
          activeCategory={filters.category}
          onSelectCategory={(cat) => handleUpdateFilters({ category: cat })}
        />

        {/* Top Sellers Section ("پرفروش ترین ها") */}
        <BestSellersSection
          products={products}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          cartItems={cartQuantityMap}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onQuickView={(p) => setQuickViewProduct(p)}
          onViewAllBestSellers={() => {
            handleUpdateFilters({ sortBy: 'bestselling', category: 'all' });
            const el = document.getElementById('product-catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Skincare Routine Guidance Banner */}
        <BeautyRoutineBanner
          onSelectRoutine={(routineType) =>
            handleUpdateFilters({ skinType: routineType, category: 'skincare' })
          }
        />

        {/* Curated Product Catalog with Live Filters & Sorting */}
        <ProductCatalog
          products={filteredProducts}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          cartItems={cartQuantityMap}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onQuickView={(p) => setQuickViewProduct(p)}
          filters={filters}
          onUpdateFilters={handleUpdateFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Top Brands Showcase */}
        <BrandShowcase
          selectedBrand={filters.brand}
          onSelectBrand={(brandName) => handleUpdateFilters({ brand: brandName })}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeMobileTab}
        onSelectTab={setActiveMobileTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSelectBestSellers={handleSelectBestSellers}
        onSelectCategory={(cat) => handleUpdateFilters({ category: cat })}
        onOpenCategories={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={filters.category}
        activeSubBrand={filters.subBrand || ''}
        onSelectCategory={(cat) => handleUpdateFilters({ category: cat })}
        onSelectSubBrand={(sub) => handleUpdateFilters({ subBrand: sub })}
        onSelectBestSellers={handleSelectBestSellers}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={user.isLoggedIn}
        userName={user.name}
        wishlistCount={wishlist.length}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        isInWishlist={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        cartQuantity={quickViewProduct ? cartQuantityMap[quickViewProduct.id] || 0 : 0}
        onAddToCart={handleAddToCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Auth / Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}
