import React from 'react';
import { CATEGORIES_DATA } from '../data/mockData';
import { handleImageError } from '../utils/imageFallback';

interface StoryCategoriesProps {
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export const StoryCategories: React.FC<StoryCategoriesProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section id="story-circle-categories" className="py-2 sm:py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D81B60]" />
            <span>دسته‌بندی‌های برگزیده بیوتی</span>
          </h3>
          <span className="text-xs text-slate-400">
            برای فیلتر سریع لمس کنید
          </span>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                id={`story-category-${cat.id}`}
                onClick={() => onSelectCategory(cat.slug)}
                className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none transition-transform hover:-translate-y-1"
              >
                {/* Story Avatar Circle */}
                <div
                  className={`relative p-[3px] rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#D81B60] via-rose-500 to-pink-400 scale-105 shadow-md shadow-pink-500/25'
                      : 'bg-gradient-to-tr from-slate-200 via-pink-100 to-slate-200 group-hover:from-[#D81B60] group-hover:to-pink-400'
                  }`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-0.5 border border-white">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => handleImageError(e, cat.slug, cat.title)}
                    />
                  </div>

                  {cat.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#D81B60] text-white text-[9px] font-black rounded-full border border-white shadow-sm">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <span
                  className={`text-xs sm:text-[13px] font-semibold tracking-tight transition-colors whitespace-nowrap ${
                    isSelected ? 'text-[#D81B60] font-bold' : 'text-slate-700 group-hover:text-[#D81B60]'
                  }`}
                >
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
