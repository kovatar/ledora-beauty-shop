import React from 'react';
import { Sparkles, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { ActiveFilters, Product } from '../types';
import { ProductCard } from './ProductCard';
import { toPersianDigits } from '../utils/formatters';

interface ProductCatalogProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  cartItems: Record<string, number>;
  onAddToCart: (product: Product) => void;
  onUpdateCartQuantity: (id: string, qty: number) => void;
  onQuickView: (product: Product) => void;
  filters: ActiveFilters;
  onUpdateFilters: (updates: Partial<ActiveFilters>) => void;
  onResetFilters: () => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'همه دسته‌ها' },
  { id: 'skincare', label: 'مراقبت پوست' },
  { id: 'haircare', label: 'مراقبت از مو' },
  { id: 'makeup', label: 'محصولات آرایشی' },
  { id: 'fragrance', label: 'عطر و ادکلن' },
  { id: 'health-body', label: 'بهداشت و سلامت' },
];

const SUB_BRAND_TABS = [
  { id: '', label: 'همه خانواده‌های PMLM' },
  { id: 'ldora-care', label: 'لدورا کِر (L\'DORA Care)' },
  { id: 'ldora-herbal', label: 'لدورا هربال (L\'DORA Herbal)' },
  { id: 'ldora-beauty', label: 'لدورا بیوتی (L\'DORA Beauty)' },
  { id: 'pristive', label: 'پریستیو (Pristive)' },
  { id: 'ellix', label: 'الیکس (Ellix)' },
  { id: 'elen-beauty', label: 'الن بیوتی (Elen Beauty)' },
];

const CURATION_TABS = [
  { id: 'recommended', label: 'پیشنهاد تخصصی لدورا' },
  { id: 'bestselling', label: 'پرفروش‌ترین‌ها' },
  { id: 'newest', label: 'جدیدترین‌ها' },
  { id: 'cheapest', label: 'ارزان‌ترین' },
  { id: 'priciest', label: 'گران‌ترین' },
];

const SKIN_TYPES = ['همه', 'چرب و مستعد آکنه', 'خشک و حساس', 'انواع پوست', 'مختلط و نرمال'];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onQuickView,
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  return (
    <section id="curated-product-catalog" className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D81B60]" />
              <span>کاتالوگ جامع محصولات لدورا و پریستیو</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              محصولات ۱۰۰٪ اورجینال مستقیم از شبکه توزیع رسمی PMLM با تاریخ تولید روز
            </p>
          </div>

          {/* Product Count Indicator */}
          <div className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 self-start md:self-auto shadow-sm">
            <span>نمایش {toPersianDigits(products.length)} کالا</span>
          </div>
        </div>

        {/* Filter & Sort Controls Container */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm mb-6 space-y-4">
          {/* Sub-Brand Pill Strip (PMLM Family) */}
          <div className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-700">خانواده برند PMLM:</span>
              <span className="text-[11px] text-[#D81B60]">فیلتر بر اساس لاین تخصصی</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {SUB_BRAND_TABS.map((sub) => {
                const isActive = (filters.subBrand || '') === sub.id;
                return (
                  <button
                    key={sub.id}
                    id={`filter-subbrand-${sub.id || 'all'}`}
                    onClick={() => onUpdateFilters({ subBrand: sub.id })}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-sm'
                        : 'bg-slate-50 hover:bg-pink-50 hover:text-[#D81B60] text-slate-700 border-slate-200/80'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top Row: Category Pills & Sort Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORY_TABS.map((tab) => {
                const isActive = filters.category === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`filter-category-${tab.id}`}
                    onClick={() => onUpdateFilters({ category: tab.id })}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sort Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs text-slate-400 font-medium shrink-0 ml-1">
                مرتب‌سازی:
              </span>
              {CURATION_TABS.map((tab) => {
                const isSelected = filters.sortBy === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`sort-tab-${tab.id}`}
                    onClick={() => onUpdateFilters({ sortBy: tab.id as any })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'text-[#D81B60] bg-pink-50 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Micro Filters (Skin Type, Stock Only, Discount Only, Reset) */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium">نوع پوست:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {SKIN_TYPES.map((type) => {
                  const isSelected = (filters.skinType === '' && type === 'همه') || filters.skinType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => onUpdateFilters({ skinType: type === 'همه' ? '' : type })}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Only in-stock switch */}
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={filters.onlyInStock}
                  onChange={(e) => onUpdateFilters({ onlyInStock: e.target.checked })}
                  className="rounded text-[#D81B60] focus:ring-[#D81B60] w-3.5 h-3.5"
                />
                <span>فقط کالاهای موجود</span>
              </label>

              {/* Reset filter button */}
              {(filters.category !== 'all' || filters.subBrand !== '' || filters.skinType !== '' || filters.onlyInStock || filters.searchQuery !== '') && (
                <button
                  onClick={onResetFilters}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors mr-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>حذف فیلترها</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {products.map((product) => (
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
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-pink-50 text-[#D81B60] flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-2">
              محصولی با این فیلترها پیدا نشد!
            </h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              لطفاً عنوان جستجو را تغییر دهید یا فیلترهای نوع پوست و دسته‌بندی را بازنشانی فرمایید.
            </p>
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 bg-[#D81B60] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#C2185B] transition-colors"
            >
              پاک کردن همه فیلترها
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
