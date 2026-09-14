import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, ArrowLeft, User, Sparkles, LogOut, Gift, CreditCard } from 'lucide-react';
import { UserProfile } from '../types';
import { toPersianDigits, formatPrice } from '../utils/formatters';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogin: (name: string, phone: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
}) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('شماره موبایل وارد شده صحیح نمی‌باشد (مثلا: ۰۹۱۲۳۴۵۶۷۸۹)');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setError('کد تایید ۴ رقمی ارسال شده را وارد نمایید');
      return;
    }
    setError('');
    onLogin('سارا رادمنش', phone);
    setStep('phone');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        id="auth-modal-dialog"
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {user.isLoggedIn ? (
          /* Logged-In User Profile Panel */
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#C2185B] text-white flex items-center justify-center text-xl font-black shadow-md shadow-pink-500/20">
                {user.name.slice(0, 1)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {user.name}
                </h3>
                <span className="text-xs text-slate-400 font-sans">
                  {toPersianDigits(user.phone)}
                </span>
              </div>
            </div>

            {/* Club Points & Wallet */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100 text-right">
                <div className="flex items-center gap-1 text-[#D81B60] text-xs font-semibold mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span>کیف پول</span>
                </div>
                <div className="text-sm font-black text-slate-800">
                  {formatPrice(user.walletBalance)} تومان
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-right">
                <div className="flex items-center gap-1 text-amber-700 text-xs font-semibold mb-1">
                  <Gift className="w-4 h-4" />
                  <span>امتیاز باشگاه</span>
                </div>
                <div className="text-sm font-black text-slate-800">
                  {toPersianDigits(user.clubPoints)} امتیاز
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                <span>سفارش‌های در حال پردازش:</span>
                <span className="font-bold text-slate-800">۱ سفارش</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                <span>آدرس تحویل منتخب:</span>
                <span className="font-semibold text-slate-800">تهران، سعادت‌آباد، پلاک ۱۲</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج از حساب کاربری</span>
            </button>
          </div>
        ) : step === 'phone' ? (
          /* Phone Input Form */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D81B60] flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                ورود یا ثبت‌نام در لدورا بیوتی
              </h3>
              <p className="text-xs text-slate-500">
                شماره موبایل خود را جهت دریافت کد تایید وارد نمایید
              </p>
            </div>

            <form onSubmit={handleSendPhone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-right">
                  شماره موبایل
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  className="w-full py-2.5 px-3 text-center text-sm font-sans tracking-widest bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#D81B60] focus:bg-white text-slate-800"
                />
              </div>

              {error && (
                <div className="text-xs text-rose-600 text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-pink-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>دریافت کد تایید پیامکی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 leading-relaxed">
              ورود شما به معنای پذیرش <a href="#" className="text-[#D81B60] underline">قوانین و حریم خصوصی</a> لدورا بیوتی است.
            </div>
          </div>
        ) : (
          /* OTP Code Step */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                کد تایید را وارد کنید
              </h3>
              <p className="text-xs text-slate-500">
                کد پیامک‌شده به شماره <strong dir="ltr">{toPersianDigits(phone)}</strong> را وارد نمایید:
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="۱۲۳۴"
                  dir="ltr"
                  autoFocus
                  className="w-full py-3 px-4 text-center text-xl font-bold tracking-[0.5em] bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#D81B60] focus:bg-white text-slate-900"
                />
              </div>

              {error && (
                <div className="text-xs text-rose-600 text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all"
              >
                تایید و ورود به حساب
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold text-center"
              >
                تغییر شماره موبایل
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
