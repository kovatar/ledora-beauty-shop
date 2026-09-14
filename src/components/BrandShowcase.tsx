import React from 'react';
import { Award, ChevronLeft } from 'lucide-react';
import { BRANDS_DATA } from '../data/mockData';
import { handleImageError } from '../utils/imageFallback';

interface BrandShowcaseProps {
  selectedBrand: string;
  onSelectBrand: (brandName: string) => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <section id="brands-showcase-section" className="py-6 sm:py-8 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900">
                محبوب‌ترین برندهای آرایشی و بهداشتی
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تضمین مستقیم اصالت کالا و تاریخ انقضای معتبر
              </p>
            </div>
          </div>
          {selectedBrand && (
            <button
              onClick={() => onSelectBrand('')}
              className="text-xs text-[#D81B60] font-semibold hover:underline"
            >
              نمایش همه برندها
            </button>
          )}
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {BRANDS_DATA.map((brand) => {
            const isSelected = selectedBrand.toLowerCase() === brand.name.toLowerCase();
            return (
              <div
                key={brand.id}
                id={`brand-badge-${brand.id}`}
                onClick={() => onSelectBrand(isSelected ? '' : brand.name)}
                className={`p-4 rounded-2xl border text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group ${
                  isSelected
                    ? 'border-[#D81B60] bg-pink-50/60 shadow-md ring-2 ring-pink-500/20'
                    : 'border-slate-100 bg-[#F9FAFB] hover:border-pink-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden mb-2.5 p-1 bg-white border border-slate-100 group-hover:scale-105 transition-transform">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => handleImageError(e, 'skincare', brand.nameFa)}
                  />
                </div>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#D81B60] transition-colors">
                  {brand.nameFa}
                </h4>
                <span className="text-[11px] text-slate-400 font-sans tracking-wide">
                  {brand.name}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {brand.tagline}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
