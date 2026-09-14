import React, { useState } from 'react';
import { Heart, Eye, Plus, Minus, Star, Check, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  cartQuantity,
  onAddToCart,
  onUpdateCartQuantity,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badges & Wishlist Action */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm">
              <TrendingUp className="w-3 h-3 text-yellow-100" />
              <span>پرفروش</span>
            </span>
          )}
        </div>

        {/* Floating Heart Wishlist Action */}
        <button
          id={`wishlist-button-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isInWishlist
              ? 'bg-rose-50 text-[#D81B60] shadow-sm'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-[#D81B60] shadow-sm'
          }`}
          title={isInWishlist ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Image Container with Secondary Image Reveal & Quick View overlay */}
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[#F8F9FA] cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => handleImageError(e, product.category, product.title)}
        />

        {/* Quick View Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute inset-x-3 bottom-3 py-2 bg-white/90 hover:bg-white backdrop-blur-sm text-slate-800 text-xs font-bold rounded-xl shadow-md transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 hover:text-[#D81B60]"
        >
          <Eye className="w-3.5 h-3.5 text-[#D81B60]" />
          <span>مشاهده سریع مشخصات</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Authentic Badge */}
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold text-slate-600 hover:text-slate-800 transition-colors">
              {product.subBrandFa || product.brandFa}
            </span>
            {product.guaranteedAuthentic && (
              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
                <Check className="w-2.5 h-2.5 text-emerald-600" />
                <span>اصل PMLM</span>
              </span>
            )}
          </div>

          {/* Persian Product Title */}
          <h4
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug line-clamp-2 hover:text-[#D81B60] transition-colors cursor-pointer mb-2 min-h-[2.5rem]"
            title={product.title}
          >
            {product.title}
          </h4>

          {/* Star Rating Score & Reviews */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-700">{toPersianDigits(product.rating)}</span>
            </div>
            <span className="text-[11px] text-slate-400">
              ({toPersianDigits(product.reviewCount)} نظر)
            </span>
          </div>

          {/* Low Stock Indicator if <= 5 */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-[11px] text-rose-600 font-medium mb-1">
                <span>تنها {toPersianDigits(product.stock)} عدد در انبار باقیست</span>
              </div>
              <div className="w-full bg-rose-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#E11D48] h-full rounded-full transition-all"
                  style={{ width: `${(product.stock / 6) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Price and Cart Action Footer */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-end justify-between gap-2 mb-3">
            {/* Price Block */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-base font-black text-slate-900">
                  {formatPrice(product.finalPrice)}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  تومان
                </span>
              </div>
            </div>

            {/* Quick Add or Quantity Controller */}
            {cartQuantity === 0 ? (
              <button
                id={`add-to-cart-${product.id}`}
                onClick={() => onAddToCart(product)}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-pink-50 hover:bg-[#D81B60] text-[#D81B60] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-pink-200/80 active:scale-95 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">افزودن</span>
              </button>
            ) : (
              <div className="flex items-center bg-pink-50 border border-[#D81B60] rounded-xl p-0.5">
                <button
                  id={`increment-cart-${product.id}`}
                  onClick={() => onUpdateCartQuantity(product.id, cartQuantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#D81B60] hover:bg-pink-100 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-bold text-[#D81B60] min-w-5 text-center">
                  {toPersianDigits(cartQuantity)}
                </span>
                <button
                  id={`decrement-cart-${product.id}`}
                  onClick={() => onUpdateCartQuantity(product.id, cartQuantity - 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#D81B60] hover:bg-pink-100 rounded-lg transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
