import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 500000; // 500,000 Toman

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.finalPrice * item.quantity,
    0
  );

  const rawTotalBeforeDiscounts = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const productSavings = rawTotalBeforeDiscounts - subtotal;
  const couponSaving = appliedDiscount ? Math.round(subtotal * (appliedDiscount / 100)) : 0;
  const finalSubtotal = subtotal - couponSaving;

  const isFreeShipping = finalSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - finalSubtotal);
  const progressPercent = Math.min(100, (finalSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const shippingFee = isFreeShipping ? 0 : 39000;
  const finalPayable = finalSubtotal + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'LDORA' || code === 'PMLM' || code === 'LDORABEAUTY' || code === 'BEAUTY') {
      setAppliedDiscount(15);
    } else {
      setCouponError('کد تخفیف وارد شده معتبر نیست. کد تست: LDORA');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8F9FA]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D81B60] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  سبد خرید شما
                </h3>
                <span className="text-xs text-slate-500">
                  {toPersianDigits(items.reduce((acc, i) => acc + i.quantity, 0))} قلم کالا
                </span>
              </div>
            </div>

            <button
              id="close-cart-drawer"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-4 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-b border-pink-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Truck className="w-4 h-4 text-[#D81B60]" />
                {isFreeShipping ? (
                  <span className="text-emerald-700">تبریک! سفارش شما شامل ارسال رایگان شد</span>
                ) : (
                  <span>
                    تنها <strong className="text-[#D81B60]">{formatPrice(remainingForFreeShipping)} تومان</strong> دیگر تا ارسال رایگان
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold text-[#D81B60]">
                {toPersianDigits(Math.round(progressPercent))}٪
              </span>
            </div>
            <div className="w-full bg-pink-200/60 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShipping ? 'bg-emerald-500' : 'bg-[#D81B60]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Content / Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {orderSuccess ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  سفارش شما با موفقیت ثبت شد!
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  کد پیگیری سفارش شما: <strong className="text-slate-800">LDB-{toPersianDigits(984712)}</strong>
                  <br />
                  پیامک تایید ارسال به همراه جزئیات سفارش PMLM برای شما ارسال شد.
                </p>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#D81B60] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  ادامه خرید در لدورا بیوتی
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-pink-50 text-pink-300 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">
                  سبد خرید شما خالی است!
                </h4>
                <p className="text-xs text-slate-400 mb-6">
                  می‌توانید با مراجعه به دسته‌بندی‌ها محصولات مورد علاقه خود را انتخاب کنید.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#D81B60] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  مشاهده محصولات فروشگاه
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  id={`cart-item-${product.id}`}
                  className="p-3 bg-white rounded-2xl border border-slate-100 flex gap-3 shadow-sm hover:border-pink-100 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100"
                    onError={(e) => handleImageError(e, product.category, product.title)}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[11px] font-semibold text-slate-400">
                          {product.subBrandFa || product.brandFa}
                        </span>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                          title="حذف از سبد"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">
                        {product.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Modifier */}
                      <div className="flex items-center bg-[#F8F9FA] border border-slate-200 rounded-xl p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-[#D81B60] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 min-w-5 text-center">
                          {toPersianDigits(quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        <div className="text-xs font-black text-slate-900">
                          {formatPrice(product.finalPrice * quantity)} تومان
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Computation */}
          {items.length > 0 && !orderSuccess && (
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 shadow-lg space-y-4">
              {/* Coupon code input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <Tag className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="کد تخفیف (مثلا: LDORA)"
                    className="w-full py-2 pr-9 pl-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#D81B60] text-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  ثبت کد
                </button>
              </form>

              {appliedDiscount && (
                <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                  <span>کد تخفیف ۱۵٪ اعمال گردید</span>
                  <span className="font-bold">-{formatPrice(couponSaving)} تومان</span>
                </div>
              )}

              {couponError && (
                <div className="text-xs text-rose-500">
                  {couponError}
                </div>
              )}

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                <div className="flex items-center justify-between">
                  <span>مجموع خرید:</span>
                  <span>{formatPrice(rawTotalBeforeDiscounts)} تومان</span>
                </div>

                {productSavings > 0 && (
                  <div className="flex items-center justify-between text-rose-600">
                    <span>سود شما از تخفیف‌ها:</span>
                    <span>-{formatPrice(productSavings)} تومان</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>هزینه ارسال:</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-emerald-600 font-bold">رایگان</span>
                    ) : (
                      `${formatPrice(shippingFee)} تومان`
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>مبلغ نهایی قابل پرداخت:</span>
                  <span className="text-base text-[#D81B60]">
                    {formatPrice(finalPayable)} تومان
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                id="cart-checkout-button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 bg-[#D81B60] hover:bg-[#C2185B] text-white text-sm font-bold rounded-2xl shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-75"
              >
                {isCheckingOut ? (
                  <span>در حال اتصال به درگاه پرداخت...</span>
                ) : (
                  <>
                    <span>تکمیل خرید و پرداخت</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
