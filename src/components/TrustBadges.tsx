import React from 'react';
import { ShieldCheck, Truck, Sparkles, RotateCcw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section id="trust-value-badges" className="bg-white border-b border-slate-100 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Badge 1 */}
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F9FAFB] hover:bg-pink-50/40 border border-slate-100/80 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                ضمانت ۱۰۰٪ اصالت کالا
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                تضمین مستقیم اصالت فیزیکی PMLM
              </p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F9FAFB] hover:bg-pink-50/40 border border-slate-100/80 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-[#D81B60] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                ارسال اکسپرس و بسته‌بندی ایمن
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ارسال سریع و مطمئن به سراسر ایران
              </p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F9FAFB] hover:bg-pink-50/40 border border-slate-100/80 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                مشاوره رایگان پوست و مو با کارشناسان
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                راهنمایی تخصصی روتین لدورا و الیکس
              </p>
            </div>
          </div>

          {/* Badge 4 */}
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F9FAFB] hover:bg-pink-50/40 border border-slate-100/80 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                ۷ روز ضمانت بازگشت و پشتیبانی پیوسته
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                پشتیبانی ۲۴ ساعته و پیگیری سفارشات
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
