import React from 'react';
import { Sparkles, ArrowLeft, Droplets, Sun, CheckCircle2 } from 'lucide-react';

interface BeautyRoutineBannerProps {
  onSelectRoutine: (routineType: string) => void;
}

export const BeautyRoutineBanner: React.FC<BeautyRoutineBannerProps> = ({
  onSelectRoutine,
}) => {
  return (
    <section id="expert-routine-section" className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#880E4F] to-[#D81B60] p-6 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3 border border-white/20 text-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>مشاوره تخصصی روتین لدورا بیوتی</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black mb-3 leading-tight">
              نمی‌دانید چه روتین لدورا یا پریستیو برای پوست شما مناسب است؟
            </h3>

            <p className="text-xs sm:text-sm text-pink-100 mb-6 leading-relaxed">
              شادابی و لیفت پوست با روتین متناسب با پوست شما حاصل می‌شود: پاکسازی عمیق با شوینده‌های گیاهی لدورا، آبرسانی عمقی بدون چربی و تغذیه با سرم‌های ضد چروک پریستیو. روتین هدفمند خود را انتخاب کنید:
            </p>

            {/* Routine Quick Chips */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <button
                onClick={() => onSelectRoutine('چرب و مستعد آکنه')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#D81B60] rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>روتین کنترل چربی و جوش (لدورا هربال)</span>
              </button>

              <button
                onClick={() => onSelectRoutine('انواع پوست')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#D81B60] rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>روتین لیفتینگ و سفتی صورت (لدورا کِر)</span>
              </button>

              <button
                onClick={() => onSelectRoutine('خشک و حساس')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#D81B60] rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>روتین ضد چروک و پرکننده خطوط (پریستیو)</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-rose-200">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تایید شده توسط آزمایشگاه‌های درماتولوژی</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تامین مستقیم از شبکه رسمی PMLM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
