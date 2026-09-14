import React, { useState } from 'react';
import { TrendingUp, Sparkles, ChevronDown, Award, BookOpen, Layers } from 'lucide-react';

interface MegaNavigationProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectBestSellers: () => void;
}

const MENU_ITEMS = [
  {
    id: 'skincare',
    title: 'مراقبت از پوست',
    subcategories: [
      { name: 'کرم لیفتینگ و جوانسازی ماساژوردار', count: 'لاین لدورا کِر' },
      { name: 'کرم آبرسان قوی صورت و گردن', count: 'فاقد چربی' },
      { name: 'سرم ضد چروک و پرکننده خطوط', count: 'لاین پریستیو' },
      { name: 'ژل شستشوی صورت براش‌دار', count: 'پاکسازی عمیق' },
      { name: 'تونر پاک‌کننده و کنترل چربی', count: 'تنظیم pH پوست' },
      { name: 'سرم دور چشم خاویار و کلاژن', count: 'ضد پف و تیرگی' },
    ],
    featuredBanner: {
      title: 'پکیج لیفتینگ و کلاژن‌سازی لدورا',
      desc: 'حاوی جلبک دریایی و سرم غنی پریستیو با مواد اولیه سوئیس',
      tag: 'تخصصی و پرفروش',
    },
  },
  {
    id: 'haircare',
    title: 'مراقبت از مو',
    subcategories: [
      { name: 'ماسک پروتئینه کراتینه الیکس', count: 'احیای ساقه مو' },
      { name: 'شامپو ضد ریزش و تقویتی گیاهی', count: 'عصاره گزنه و مریم گلی' },
      { name: 'سرم براق‌کننده و ضد وز مو', count: 'حاوی آرگان خالص' },
      { name: 'اسپری دو فاز محافظ حرارت', count: 'فاقد سولفات' },
    ],
    featuredBanner: {
      title: 'لاین احیا و پروتئین‌تراپی الیکس',
      desc: 'ترمیم قطعی موهای رنگ‌شده، دکلره و آسیب‌دیده با حرارت',
      tag: 'ارسال اکسپرس',
    },
  },
  {
    id: 'makeup',
    title: 'محصولات آرایشی',
    subcategories: [
      { name: 'کرم پودر مات و ماندگار با SPF25', count: 'کاور مخملی' },
      { name: 'پنکیک ضدآب و ابریشمی لدورا بیوتی', count: 'مات‌کننده' },
      { name: 'رژ لب بدون سرب و نیمه‌مات لدورا', count: '۱۲ رنگ جذاب' },
      { name: 'ریمل حجم‌دهنده و ضدحساسیت', count: 'موم زنبور عسل' },
    ],
    featuredBanner: {
      title: 'میکاپ ماندگار لدورا بیوتی',
      desc: 'رنگدانه‌های فرانسوی فاقد سرب و چربی با ماندگاری ۱۶ ساعته',
      tag: 'ضمانت اصالت',
    },
  },
  {
    id: 'fragrance',
    title: 'عطر و ادکلن',
    subcategories: [
      { name: 'ادوپرفیوم زنانه گرند لدورا بیوتی', count: 'رایحه گرم و شیرین' },
      { name: 'ادوپرفیوم مردانه لرد لدورا', count: 'رایحه تلخ و خنک' },
      { name: 'بادی اسپلش‌های گیاهی لدورا هربال', count: 'ضد تعریق و خوشبوکننده' },
    ],
    featuredBanner: {
      title: 'کلکسیون ادوپرفیوم‌های لدورا',
      desc: 'تولید شده با اسانس‌های طبیعی شهر گراس فرانسه با ماندگاری ۲۴ ساعته',
      tag: 'ماندگاری بالا',
    },
  },
  {
    id: 'health-body',
    title: 'بهداشت و سلامت بدن',
    subcategories: [
      { name: 'صابون گیاهی کاج و مریم گلی لدورا هربal', count: 'آنتی آکنه' },
      { name: 'اسکراب شنی عصاره قهوه صورت و بدن', count: 'ضد سلولیت' },
      { name: 'قطره خوراکی سیلیس و زینک الن بیوتی', count: 'مکمل کلاژن‌ساز' },
      { name: 'کرم ضد ترک پا و نرم‌کننده لدورا', count: 'روغن درخت چای' },
    ],
    featuredBanner: {
      title: 'سلامتی از درون با الن بیوتی',
      desc: 'محلول خوراکی قطره سیلیس الن بیوتی جهت تقویت ریشه مو و پوست',
      tag: 'دانش‌بنیان',
    },
  },
];

export const MegaNavigation: React.FC<MegaNavigationProps> = ({
  activeCategory,
  onSelectCategory,
  onSelectBestSellers,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const activeMenuItem = MENU_ITEMS.find((item) => item.id === hoveredMenu);

  return (
    <nav
      id="mega-navigation-bar"
      className="bg-white border-b border-slate-100 hidden md:block relative z-30"
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-2">
            {/* All Products Tab */}
            <button
              id="nav-tab-all"
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-3 text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 ${
                activeCategory === 'all'
                  ? 'border-[#D81B60] text-[#D81B60]'
                  : 'border-transparent text-slate-700 hover:text-[#D81B60]'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>همه دسته‌بندی‌ها</span>
            </button>

            {/* Category tabs */}
            {MENU_ITEMS.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredMenu(item.id)}
                >
                  <button
                    id={`nav-tab-${item.id}`}
                    onClick={() => onSelectCategory(item.id)}
                    className={`px-3 py-3 text-xs lg:text-sm font-medium transition-colors flex items-center gap-1 border-b-2 ${
                      isActive
                        ? 'border-[#D81B60] text-[#D81B60] font-bold'
                        : 'border-transparent text-slate-700 hover:text-[#D81B60]'
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                </div>
              );
            })}

            {/* Best Sellers Button / پرفروش ترین ها */}
            <button
              id="nav-tab-best-sellers"
              onClick={onSelectBestSellers}
              className="mr-2 px-3.5 py-1.5 bg-gradient-to-r from-[#BE123C] to-[#D81B60] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow-pink-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <TrendingUp className="w-4 h-4 text-white" />
              <span>پرفروش ترین ها</span>
              <span className="bg-white/20 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                محبوب‌ها
              </span>
            </button>
          </div>

          {/* Secondary Quick Links */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <button
              onClick={() => {
                const el = document.getElementById('brands-showcase-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1 hover:text-[#D81B60] transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>برندهای معتبر</span>
            </button>
            <span className="text-slate-200">|</span>
            <button
              onClick={() => {
                const el = document.getElementById('expert-routine-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1 hover:text-[#D81B60] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-pink-500" />
              <span>راهنمای روتین پوست</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {hoveredMenu && activeMenuItem && (
        <div
          id="mega-menu-content-dropdown"
          className="absolute top-full right-0 left-0 bg-white border-b border-slate-200 shadow-xl py-6 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Subcategories list */}
              <div className="col-span-8">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D81B60]" />
                    <span>محبوب‌ترین زیردسته‌های {activeMenuItem.title}</span>
                  </h4>
                  <button
                    onClick={() => {
                      onSelectCategory(activeMenuItem.id);
                      setHoveredMenu(null);
                    }}
                    className="text-xs text-[#D81B60] font-semibold hover:underline"
                  >
                    مشاهده کل محصولات این دسته ←
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {activeMenuItem.subcategories.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectCategory(activeMenuItem.id);
                        setHoveredMenu(null);
                      }}
                      className="text-right p-2.5 rounded-xl hover:bg-pink-50/70 group transition-all"
                    >
                      <div className="text-xs font-semibold text-slate-700 group-hover:text-[#D81B60] transition-colors">
                        {sub.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {sub.count}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Banner in Mega Menu */}
              <div className="col-span-4 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-5 rounded-2xl border border-pink-100/60">
                <span className="inline-block px-2.5 py-1 bg-[#D81B60] text-white text-[11px] font-bold rounded-full mb-2">
                  {activeMenuItem.featuredBanner?.tag || 'پیشنهاد اختصاصی خانومی'}
                </span>
                <h5 className="text-sm font-bold text-slate-800 mb-1">
                  {activeMenuItem.featuredBanner?.title || 'بهترین فرمولاسیون پوستی'}
                </h5>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {activeMenuItem.featuredBanner?.desc || 'تایید شده توسط متخصصین درماتولوژی برای شادابی پوست'}
                </p>
                <button
                  onClick={() => {
                    onSelectCategory(activeMenuItem.id);
                    setHoveredMenu(null);
                  }}
                  className="w-full py-2 bg-white text-[#D81B60] text-xs font-bold rounded-xl border border-pink-200 hover:bg-[#D81B60] hover:text-white transition-colors text-center"
                >
                  مشاهده محصولات تخصصی
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
