import React from 'react';
import { TrendingUp, Sparkles, Award, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { toPersianDigits } from '../utils/formatters';

interface BestSellersSectionProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  cartItems: Record<string, number>;
  onAddToCart: (product: Product) => void;
  onUpdateCartQuantity: (id: string, qty: number) => void;
  onQuickView: (product: Product) => void;
  onViewAllBestSellers?: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onQuickView,
  onViewAllBestSellers,
}) => {
  // Select top sellers (explicitly flagged or top review count)
  const bestSellerProducts = products
    .filter((p) => p.isBestSeller || p.reviewCount > 150)
    .slice(0, 8);

  return (
    <section id="best-sellers-section" className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Khanoumi-inspired Best Sellers Container */}
        <div className="bg-gradient-to-br from-rose-50/80 via-white to-pink-50/50 rounded-3xl p-4 sm:p-6 lg:p-8 border border-pink-100 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D81B60]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-pink-100/80">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#BE123C] text-white flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    پرفروش ترین ها
                  </h3>
                  <span className="px-2.5 py-0.5 bg-[#D81B60] text-white text-xs font-black rounded-full shadow-2xs">
                    محبوب‌ترین‌های لدورا
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  پرمخاطب‌ترین و پرتقاضاترین محصولات لدورا و پریستیو بر اساس بالاترین امتیاز و رضایت مشتریان
                </p>
              </div>
            </div>

            {/* View All / Category Filter Trigger */}
            {onViewAllBestSellers && (
              <button
                onClick={onViewAllBestSellers}
                className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#D81B60] text-[#D81B60] hover:text-white border border-pink-200 text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-95"
              >
                <span>مشاهده همه پرفروش‌ها ({toPersianDigits(bestSellerProducts.length)})</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Top Seller Products Grid (2 cols mobile, 4 cols desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 relative z-10">
            {bestSellerProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                cartQuantity={cartItems[product.id] || 0}
                onAddToCart={onAddToCart}
                onUpdateCartQuantity={onUpdateCartQuantity}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
