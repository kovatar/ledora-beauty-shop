import React from 'react';
import { Truck, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div id="announcement-strip" className="bg-[#1E293B] text-white text-xs py-2 px-4 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5 text-rose-300 font-medium">
            <Truck className="w-3.5 h-3.5 text-rose-400" />
            <span>ارسال سریع به سراسر کشور</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ضمانت ۱۰۰٪ اصالت فیزیکی و کیفیت محصولات لدورا و PMLM</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-300 text-[11px]">
          <div className="hidden lg:flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>مشاوره رایگان پوست و مو</span>
          </div>
          <span className="hidden lg:inline text-slate-600">|</span>
          <div className="flex items-center gap-1 hover:text-white transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
            <span>پشتیبانی: <span className="font-semibold text-white">۰۲۱-۷۹۱۸۲۰۰۰</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
