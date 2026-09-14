import React from 'react';
import { 
  X, 
  TrendingUp, 
  Sparkles, 
  ChevronLeft, 
  ShieldCheck, 
  Phone, 
  User, 
  Heart, 
  Layers, 
  Tag, 
  Award,
  HelpCircle
} from 'lucide-react';
import { SUB_BRANDS_DATA, CATEGORIES_DATA } from '../data/mockData';
import { toPersianDigits } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  activeSubBrand: string;
  onSelectCategory: (category: string) => void;
  onSelectSubBrand: (subBrand: string) => void;
  onSelectBestSellers: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  userName: string;
  wishlistCount?: number;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  activeCategory,
  activeSubBrand,
  onSelectCategory,
  onSelectSubBrand,
  onSelectBestSellers,
  onOpenWishlist,
  onOpenAuth,
  isLoggedIn,
  userName,
  wishlistCount = 0,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel (RTL slide-in from right) */}
      <div 
        id="mobile-nav-drawer-content"
        className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D81B60] flex items-center justify-center text-white shadow-sm shadow-pink-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-slate-900">لدورا بیوتی</span>
                <span className="text-[10px] text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded font-bold font-sans">L'DORA</span>
              </div>
              <span className="text-[10px] text-slate-400">توزیع رسمی محصولات PMLM</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* User Profile / Login Card */}
          <div 
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="bg-gradient-to-r from-pink-50/80 to-rose-50/80 rounded-2xl p-3 border border-pink-100 flex items-center justify-between cursor-pointer hover:border-pink-300 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#D81B60] text-white flex items-center justify-center shadow-sm shadow-pink-600/30 group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {isLoggedIn ? userName : 'ورود / ثبت‌نام در لدورا'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isLoggedIn ? 'مشاهده و مدیریت حساب کاربری' : 'پیگیری سفارش و سوابق خرید'}
                </span>
              </div>
            </div>

            <span className="px-3 py-1.5 bg-white text-[#D81B60] border border-pink-200 text-xs font-bold rounded-xl shadow-xs group-hover:bg-[#D81B60] group-hover:text-white transition-all">
              {isLoggedIn ? 'پروفایل' : 'ورود'}
            </span>
          </div>

          {/* Like / Wishlist Card */}
          <div 
            onClick={() => {
              onClose();
              onOpenWishlist();
            }}
            className="bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-rose-300 hover:bg-rose-50/30 flex items-center justify-between cursor-pointer transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#D81B60] border border-rose-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-current text-[#D81B60]' : 'text-slate-500'}`} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">علاقه‌مندی‌ها (لایک‌ها)</span>
                  {wishlistCount > 0 && (
                    <span className="min-w-4 h-4 px-1 bg-[#D81B60] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {toPersianDigits(wishlistCount)}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500">
                  {wishlistCount > 0 ? `${toPersianDigits(wishlistCount)} کالای نشان‌شده` : 'مشاهده لیست محصولات برگزیده'}
                </span>
              </div>
            </div>

            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-[#D81B60] group-hover:-translate-x-0.5 transition-all" />
          </div>

          {/* Best Sellers Banner Button */}
          <button
            onClick={() => {
              onClose();
              onSelectBestSellers();
            }}
            className="w-full bg-gradient-to-r from-[#BE123C] to-[#D81B60] text-white p-3 rounded-2xl flex items-center justify-between shadow-md shadow-pink-500/20 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs font-black block">پرفروش ترین های لدورا</span>
                <span className="text-[10px] text-pink-100">محبوب‌ترین و پرتقاضاترین محصولات</span>
              </div>
            </div>
            <ChevronLeft className="w-4 h-4 text-white/70" />
          </button>

          {/* Sub-Brands Section (PMLM Family) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D81B60]" />
                <span>لاین‌های تخصصی خانواده PMLM</span>
              </h4>
              <span className="text-[10px] text-slate-400">۶ لاین معتبر</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SUB_BRANDS_DATA.filter((b) => b.id !== 'all').map((brand) => {
                const isSelected = activeSubBrand === brand.id;
                return (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onSelectSubBrand(brand.id);
                      onClose();
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-right transition-all border ${
                      isSelected
                        ? 'bg-pink-50 border-[#D81B60] text-[#D81B60] font-bold shadow-2xs'
                        : 'bg-[#F8F9FA] hover:bg-slate-100 border-slate-100 text-slate-700'
                    }`}
                  >
                    <img 
                      src={brand.image} 
                      alt={brand.nameFa} 
                      className="w-7 h-7 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
                      onError={(e) => handleImageError(e, 'skincare', brand.nameFa)}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs truncate block">{brand.nameFa}</span>
                      <span className="text-[9px] text-slate-400 font-sans block truncate">{brand.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#D81B60]" />
              <span>دسته‌بندی‌های اصلی</span>
            </h4>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-pink-50 text-[#D81B60] font-bold'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>همه محصولات</span>
                <ChevronLeft className="w-4 h-4 opacity-50" />
              </button>

              {CATEGORIES_DATA.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                      isActive
                        ? 'bg-pink-50 text-[#D81B60] font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-6 h-6 rounded-md object-cover"
                        onError={(e) => handleImageError(e, cat.id, cat.title)}
                      />
                      <span>{cat.title}</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
            <button
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>علاقه‌مندی‌های من</span>
            </button>

            <button
              onClick={() => {
                onClose();
                const el = document.getElementById('curated-product-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>استعلام اصالت هولوگرام PMLM</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer / Call Support */}
        <div className="p-4 border-t border-slate-100 bg-[#F8F9FA]">
          <a
            href="tel:02188992000"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs"
          >
            <Phone className="w-4 h-4 text-pink-400" />
            <span>مشاوره و پشتیبانی تلفنی: ۰۲۱-۸۸۹۹۲۰۰۰</span>
          </a>
        </div>
      </div>
    </div>
  );
};
