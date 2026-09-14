import React, { useState } from 'react';
import { X, Heart, Star, Check, ShieldCheck, Truck, RotateCcw, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isInWishlist,
  onToggleWishlist,
  cartQuantity,
  onAddToCart,
  onUpdateCartQuantity,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const currentImg = selectedImage || product.image;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        id="quick-view-modal-content"
        className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-5 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="close-quick-view-modal"
          onClick={onClose}
          className="sticky top-0 float-left w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors z-30 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start clear-both">
          {/* Gallery / Image (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F9FA] border border-slate-100">
              <img
                src={currentImg}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, product.category, product.title)}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  currentImg === product.image ? 'border-[#D81B60] ring-2 ring-pink-500/20' : 'border-slate-200 opacity-70'
                }`}
              >
                <img
                  src={product.image}
                  alt="تصویر اصلی"
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, product.category, product.title)}
                />
              </button>
              {product.secondaryImage && (
                <button
                  onClick={() => setSelectedImage(product.secondaryImage)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImg === product.secondaryImage ? 'border-[#D81B60] ring-2 ring-pink-500/20' : 'border-slate-200 opacity-70'
                  }`}
                >
                  <img
                    src={product.secondaryImage}
                    alt="تصویر دوم"
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, product.category, product.title)}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Details (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Brand & Auth */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#D81B60] bg-pink-50 px-2.5 py-0.5 rounded-md">
                    {product.subBrandFa || product.brandFa}
                  </span>
                  {product.englishTitle && (
                    <span className="text-[11px] text-slate-400 font-sans">
                      {product.englishTitle}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    isInWishlist ? 'text-[#D81B60] bg-pink-50' : 'text-slate-400 hover:text-[#D81B60] hover:bg-slate-50'
                  }`}
                  title="علاقه‌مندی"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-2">
                {product.title}
              </h3>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-800">{toPersianDigits(product.rating)}</span>
                </div>
                <span>•</span>
                <span>{toPersianDigits(product.reviewCount)} نظر خریداران</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  ضمانت ۱۰۰٪ اصالت PMLM
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Skin Type & Volume Tags */}
              <div className="space-y-2 mb-5">
                {product.skinType && product.skinType.length > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">سازگار با پوست:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.skinType.map((st, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.volume && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">حجم / وزن:</span>
                    <span className="text-slate-700 font-bold">{product.volume}</span>
                    {product.origin && (
                      <>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-400 font-medium">کشور مبدا:</span>
                        <span className="text-slate-700 font-semibold">{product.origin}</span>
                      </>
                    )}
                  </div>
                )}

                {/* Ingredients Pills */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs text-slate-400 font-medium block mb-1.5">ترکیبات شاخص:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.ingredients.map((ing, i) => (
                        <span key={i} className="px-2.5 py-1 bg-pink-50/70 border border-pink-100 text-[#D81B60] text-[11px] font-semibold rounded-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#D81B60]" />
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between gap-4">
                {/* Price Display */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">
                      {formatPrice(product.finalPrice)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">تومان</span>
                  </div>
                </div>

                {/* Add or Adjust Quantity */}
                {cartQuantity === 0 ? (
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-6 py-2.5 bg-[#D81B60] hover:bg-[#C2185B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-pink-600/25 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد خرید</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-pink-50 border border-[#D81B60] rounded-xl p-1">
                      <button
                        onClick={() => onUpdateCartQuantity(product.id, cartQuantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#D81B60] hover:bg-pink-100 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-sm font-bold text-[#D81B60]">
                        {toPersianDigits(cartQuantity)}
                      </span>
                      <button
                        onClick={() => onUpdateCartQuantity(product.id, cartQuantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#D81B60] hover:bg-pink-100 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold">در سبد خرید شما</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
