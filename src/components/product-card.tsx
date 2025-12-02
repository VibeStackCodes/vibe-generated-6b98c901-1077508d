/**
 * ProductCard Component
 *
 * Displays a product card with image, name, price, and rating.
 * Uses brand colors (#003d82 primary, #ff6b35 accent) and responsive design.
 */

import React from 'react'
import type { ProductCardProps } from '@/types/product'

/**
 * Star rating component
 */
function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="relative">
            <span className="text-gray-300">★</span>
            {index < fullStars && (
              <span className="absolute left-0 top-0 text-[#003d82]">★</span>
            )}
            {hasHalfStar && index === fullStars && (
              <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-[#003d82]">★</span>
            )}
          </span>
        ))}
      </div>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
          ({reviewCount})
        </span>
      )}
    </div>
  )
}

/**
 * ProductCard component
 *
 * Props:
 * - product: Product object containing id, name, price, image, rating, etc.
 * - onClick: Optional callback when card is clicked
 * - className: Optional additional CSS classes
 */
export function ProductCard({
  product,
  onClick,
  className = '',
}: ProductCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(product)
    }
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <article
      onClick={handleClick}
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 inline-block rounded-md bg-[#ff6b35] px-2 py-1 text-xs font-semibold text-white">
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10 inline-block rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discountPercentage}%
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.alt || product.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-[#003d82] dark:text-gray-100">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="py-1">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-[#003d82]">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through dark:text-gray-400">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button (Optional - can be used when onClick is provided) */}
        {onClick && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
            className="mt-auto w-full rounded-md bg-[#003d82] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#002a5c] active:bg-[#001f42] dark:hover:bg-[#004fa6]"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  )
}
