import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';
import { HERO_SLIDES, PROMO_TILES } from '../data/mockData';
import { handleImageError } from '../utils/imageFallback';

interface HeroBannersProps {
  onSelectCategory: (cat: string) => void;
  onSelectBestSellers: () => void;
}

export const HeroBanners: React.FC<HeroBannersProps> = ({
  onSelectCategory,
  onSelectBestSellers,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero-promotional-grid" className="py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Main Promotional Slider (8 Cols on LG) */}
          <div
            className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-sm bg-slate-900 min-h-[260px] sm:min-h-[380px] flex items-center group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 filter brightness-75 contrast-105"
                onError={(e) => handleImageError(e, slide.categoryTarget, slide.title)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 p-5 sm:p-10 max-w-xl text-white">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3 border border-white/20 text-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{slide.tag}</span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 leading-tight tracking-tight drop-shadow-sm">
                {slide.title}
              </h2>

              <p className="text-xs sm:text-base text-slate-200 mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                {slide.subtitle}
              </p>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  id="hero-cta-button"
                  onClick={() => onSelectCategory(slide.categoryTarget)}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-pink-600/30 flex items-center gap-1.5 sm:gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={onSelectBestSellers}
                  className="px-3 py-2 sm:px-5 sm:py-3 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-semibold rounded-2xl border border-white/20 transition-all flex items-center gap-1 sm:gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  <span>پرفروش‌ترین‌ها</span>
                </button>
              </div>
            </div>

            {/* Slider Navigation Arrows (RTL aware: Right is Previous, Left is Next) */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              aria-label="اسلاید قبلی"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              aria-label="اسلاید بعدی"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/30 hover:bg-white/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-[#D81B60]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Adjacent Dual Promo Tiles (4 Cols on LG) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {PROMO_TILES.map((tile) => (
              <div
                key={tile.id}
                onClick={() => onSelectCategory(tile.category)}
                className="relative rounded-3xl overflow-hidden shadow-sm h-[175px] sm:h-[185px] cursor-pointer group border border-slate-100"
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  onError={(e) => handleImageError(e, tile.category, tile.title)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full mb-2">
                      {tile.badge}
                    </span>
                    <h3 className="text-base font-bold drop-shadow-sm">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      {tile.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-pink-300 font-semibold group-hover:text-white transition-colors">
                    <span>مشاهده و خرید آنلاین</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
