import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        id="wishlist-modal-dialog"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#D81B60] flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                لیست علاقه‌مندی‌های من
              </h3>
              <span className="text-xs text-slate-400">
                {toPersianDigits(wishlistProducts.length)} محصول برگزیده
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-300 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                لیست علاقه‌مندی‌های شما خالی است!
              </h4>
              <p className="text-xs text-slate-400">
                با زدن روی آیکون قلب روی هر کالا، می‌توانید آن را به این لیست اضافه کنید.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 hover:bg-pink-50/30 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                  onError={(e) => handleImageError(e, product.category, product.title)}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    {product.subBrandFa || product.brandFa}
                  </span>
                  <h5 className="text-xs font-bold text-slate-800 truncate">
                    {product.title}
                  </h5>
                  <div className="text-xs font-black text-[#D81B60] mt-1">
                    {formatPrice(product.finalPrice)} تومان
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2 bg-[#D81B60] text-white rounded-xl text-xs font-bold hover:bg-[#C2185B] transition-colors shadow-sm"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 bg-white text-slate-400 hover:text-rose-500 rounded-xl border border-slate-200 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
