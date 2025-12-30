/**
 * ProductCard Component
 * Displays product information with image, price, and actions
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductCardProps extends Partial<Product> {
  badge?: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  discountPrice,
  image,
  badge,
  rating,
  reviews,
  stock,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const inStock = (stock ?? 1) > 0;
  const discount = discountPrice && price ? Math.round(((discountPrice - price) / discountPrice) * 100) : 0;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[var(--primary-blue)] transform hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/products/${id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {badge && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-[var(--secondary-orange)] text-white text-xs font-semibold rounded-full shadow-md">
            {badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 z-10 px-3 py-1 bg-[var(--error)] text-white text-xs font-semibold rounded-full shadow-md">
            -{discount}%
          </span>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-4xl">📦</span>
          </div>
        ) : (
          <Image
            src={image || '/placeholder-product.jpg'}
            alt={name || 'Product'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[var(--primary-blue)] transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            {reviews !== undefined && (
              <span className="text-xs text-gray-500">({reviews})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-[var(--primary-blue)]">
            ${price?.toFixed(2) || '0.00'}
          </span>
          {discountPrice && discountPrice > (price || 0) && (
            <span className="text-sm text-gray-500 line-through">
              ${discountPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="flex-1 btn btn-primary py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inStock}
          >
            Add to Cart
          </button>
          <button
            className="btn border-2 border-gray-300 text-gray-700 hover:border-[var(--error)] hover:text-[var(--error)] py-2 px-4 text-sm"
            aria-label="Add to wishlist"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
