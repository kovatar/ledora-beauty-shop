import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Sparkles, X, ChevronDown, Check, Menu } from 'lucide-react';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { UserProfile } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  user: UserProfile;
  onOpenMobileMenu?: () => void;
}

const POPULAR_SEARCHES = [
  'کرم لیفتینگ',
  'صابون کاج و مریم گلی',
  'سرم خاویار',
  'آبرسان لدورا',
  'سرم ضد چروک پریستیو',
  'ماسک مو الیکس',
  'قطره الن بیوتی',
  'کرم پودر مات لدورا',
];

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenAuth,
  user,
  onOpenMobileMenu,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header id="primary-header" className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo & Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenMobileMenu && (
              <button
                id="header-mobile-menu-toggle"
                onClick={onOpenMobileMenu}
                className="p-2 -mr-1 sm:hidden text-slate-700 hover:text-[#D81B60] hover:bg-pink-50 rounded-xl transition-colors active:scale-95"
                title="منوی دسته‌بندی‌ها و برندها"
                aria-label="منوی سایت"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#9C1242] flex items-center justify-center shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-[#D81B60]">
                    لدورا بیوتی
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 font-sans tracking-wider border border-pink-200 bg-pink-50/70 px-1 sm:px-1.5 py-0.5 rounded-md">
                    L'DORA
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide line-clamp-1 max-w-[200px] sm:max-w-none">
                  فروشگاه تخصصی محصولات آرایشی، مراقبتی و بهداشتی لدورا و پریستیو
                </span>
              </div>
            </a>
          </div>

          {/* Centered Global Search with Live Autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-auto hidden sm:block">
            <div className={`relative flex items-center bg-[#F8F9FA] rounded-full border transition-all ${
              isSearchFocused ? 'border-[#D81B60] bg-white ring-2 ring-pink-500/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="pr-4 pl-2 text-slate-400">
                <Search className="w-5 h-5 text-[#D81B60]" />
              </div>
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="جستجو در بین محصولات لدورا، پریستیو، الیکس، الن بیوتی..."
                className="w-full py-2.5 pl-4 pr-1 text-sm bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  id="clear-search-button"
                  onClick={() => onSearchChange('')}
                  className="pl-3 pr-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && (
              <div id="search-autocomplete-dropdown" className="absolute top-full mt-2 inset-x-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-xs font-semibold text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>بیشترین جستجوهای محصولات لدورا و PMLM</span>
                  <span className="text-[11px] text-[#D81B60] font-normal">پیشنهاد تخصصی</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      id={`popular-search-tag-${idx}`}
                      onClick={() => {
                        onSearchChange(item);
                        setIsSearchFocused(false);
                      }}
                      className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-pink-50 hover:text-[#D81B60] text-slate-700 rounded-full border border-slate-100 transition-colors flex items-center gap-1"
                    >
                      <Search className="w-3 h-3 text-slate-400" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
                {searchQuery && (
                  <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span>نتایج برای: «<strong className="text-slate-800">{searchQuery}</strong>»</span>
                    <button
                      onClick={() => setIsSearchFocused(false)}
                      className="text-[#D81B60] hover:underline"
                    >
                      مشاهده همه نتایج کاتالوگ
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Left-Hand Utility Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button (Hidden on mobile, accessible in Mobile Navigation Drawer) */}
            <button
              id="header-wishlist-toggle"
              onClick={onOpenWishlist}
              className="hidden md:flex relative p-2.5 text-slate-700 hover:text-[#D81B60] hover:bg-pink-50/60 rounded-xl transition-colors"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span id="wishlist-count-badge" className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#D81B60] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {toPersianDigits(wishlistCount)}
                </span>
              )}
            </button>

            {/* Profile / Login (Hidden on mobile, accessible in Mobile Navigation Drawer) */}
            <button
              id="header-auth-trigger"
              onClick={onOpenAuth}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#D81B60] hover:bg-pink-50/60 rounded-xl border border-slate-200 transition-colors"
            >
              <User className="w-4 h-4 text-slate-600" />
              {user.isLoggedIn ? (
                <span className="font-semibold text-slate-800">
                  {user.name}
                </span>
              ) : (
                <span>
                  ورود / ثبت‌نام
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 bg-[#D81B60] hover:bg-[#C2185B] text-white rounded-xl shadow-md shadow-pink-600/20 transition-all group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <div className="hidden lg:flex flex-col items-start text-right">
                <span className="text-[10px] text-pink-100 font-medium">سبد خرید</span>
                <span className="text-xs font-bold leading-none">
                  {cartCount > 0 ? `${formatPrice(cartTotal)} تومان` : 'خالی'}
                </span>
              </div>
              <span id="cart-item-count-badge" className="min-w-5 h-5 px-1 bg-white text-[#D81B60] text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {toPersianDigits(cartCount)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 sm:hidden">
          <div className="relative flex items-center bg-[#F8F9FA] rounded-full border border-slate-200 focus-within:border-[#D81B60] focus-within:bg-white">
            <div className="pr-3 pl-2 text-slate-400">
              <Search className="w-4 h-4 text-[#D81B60]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="جستجو در محصولات لدورا، پریستیو، الیکس..."
              className="w-full py-2 pl-3 pr-1 text-xs bg-transparent border-none outline-none text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="pl-3 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
