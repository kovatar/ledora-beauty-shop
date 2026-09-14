import React from 'react';
import { Phone, Mail, MapPin, Sparkles, ShieldCheck, Heart, ArrowUp, Instagram, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-primary-footer" className="bg-[#111827] text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back to top row */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D81B60] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">لدورا بیوتی</span>
                <span className="text-xs text-pink-300 font-sans tracking-wider border border-pink-400/40 px-2 py-0.5 rounded-md">L'DORA</span>
              </div>
              <span className="text-xs text-rose-300 block mt-0.5">فروشگاه تخصصی محصولات آرایشی، مراقبتی و بهداشتی لدورا و پریستیو | شبکه رسمی PMLM</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <span>برگشت به بالا</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Links & Info Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-10 border-b border-slate-800 text-xs">
          {/* Col 1: Customer Contact */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white mb-4">
              تماس با پشتیبانی و مشاوره لدورا بیوتی
            </h4>
            <p className="text-slate-400 leading-relaxed">
              هفت روز هفته، پاسخگوی سوالات تخصصی انتخاب روتین پوست و مو، استعلام هولوگرام اصالت کالا و پیگیری سفارش‌های شما عزیزان هستیم.
            </p>
            <div className="flex items-center gap-2 text-slate-200">
              <Phone className="w-4 h-4 text-[#D81B60]" />
              <span>شماره تماس و مشاوره: <strong className="text-white">۰۲۱-۸۸۹۹۲۰۰۰</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Mail className="w-4 h-4 text-[#D81B60]" />
              <span>ایمیل ارتباطی: info@ldorabeauty.ir</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <MapPin className="w-4 h-4 text-[#D81B60]" />
              <span>دفتر مرکزی: تهران، خیابان بهشتی، خیابان سرافراز، ساختمان مرکزی PMLM</span>
            </div>
          </div>

          {/* Col 2: Shopping Guide */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">راهنمای محصولات لدورا</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#" className="hover:text-rose-400 transition-colors">استعلام هولوگرام اصالت فیزیکی</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">کاتالوگ لاین درمانی پریستیو</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">نحوه مصرف کرم لیفتینگ لدورا</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">ضمانت بازگشت ۷ روزه کالا</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">پرسش‌های متداول مشتریان</a></li>
            </ul>
          </div>

          {/* Col 3: Services & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">خدمات و قوانین رسمی</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#" className="hover:text-rose-400 transition-colors">ضمانت ۱۰۰٪ اصالت PMLM</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">قوانین و مقررات خرید</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">حریم خصوصی خریداران</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">راهنمای پکیج‌های روتین پوستی</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">شرایط مشاوره رایگان آنلاین</a></li>
            </ul>
          </div>

          {/* Col 4: Trust Certificates (Enamad, Samandehi) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">مجوزها و تایید اصالت</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-7 h-7 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-bold">اینماد الکترونیک</span>
                <span className="text-[9px] text-slate-500">وزارت صمت</span>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-7 h-7 text-rose-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-bold">هولوگرام PMLM</span>
                <span className="text-[9px] text-slate-500">تضمین اصالت</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-400 text-center bg-white/5 p-2 rounded-xl">
              تضمین اصالت فیزیکی کلیه محصولات لدورا، پریستیو و الیکس
            </div>
          </div>
        </div>

        {/* Copyright & Signoff */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-3">
          <p>
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به لدورا بیوتی و شبکه توزیع رسمی PMLM می‌باشد.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>طراحی شده با</span>
            <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-current" />
            <span>برای زیبایی و اعتماد شما در لدورا بیوتی</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
