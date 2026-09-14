import React from 'react';
import { Home, Grid, TrendingUp, ShoppingBag, User } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onSelectBestSellers: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenCategories?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenAuth,
  onSelectBestSellers,
  onSelectCategory,
  onOpenCategories,
}) => {
  return (
    <nav
      id="mobile-persistent-bottom-nav"
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 md:hidden z-40 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            onSelectTab('home');
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center py-1 px-3 transition-colors ${
            activeTab === 'home' ? 'text-[#D81B60] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">خانه</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            onSelectTab('categories');
            if (onOpenCategories) {
              onOpenCategories();
            } else {
              const el = document.getElementById('story-circle-categories');
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`flex flex-col items-center py-1 px-3 transition-colors ${
            activeTab === 'categories' ? 'text-[#D81B60] font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">دسته‌بندی</span>
        </button>

        {/* Best Sellers Highlight */}
        <button
          onClick={() => {
            onSelectBestSellers();
            onSelectTab('bestsellers');
          }}
          className="flex flex-col items-center py-1 px-2 text-[#D81B60] transition-colors relative"
        >
          <div className="w-9 h-9 -mt-4 rounded-full bg-gradient-to-tr from-[#D81B60] to-[#BE123C] text-white flex items-center justify-center shadow-md shadow-pink-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-[#D81B60]">پرفروش‌ها</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center py-1 px-2 text-slate-500 hover:text-slate-900 relative transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-[#D81B60] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {toPersianDigits(cartCount)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">سبد خرید</span>
        </button>

        {/* Profile */}
        <button
          onClick={onOpenAuth}
          className="flex flex-col items-center py-1 px-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">پروفایل</span>
        </button>
      </div>
    </nav>
  );
};
