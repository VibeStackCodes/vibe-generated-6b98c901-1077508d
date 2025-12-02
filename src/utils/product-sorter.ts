/**
 * Product sorting utility functions
 *
 * Provides functions to sort products by various criteria:
 * - Name (alphabetical)
 * - Price (low to high, high to low)
 * - Popularity (rating, review count)
 */

import type { Product } from '@/types/product'
import type { SortOption } from '@/components/sort-dropdown'

/**
 * Sorts an array of products based on the specified sort option
 *
 * @param products - Array of products to sort
 * @param sortOption - The sort criteria to apply
 * @returns A new sorted array of products
 */
export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
  // Create a copy to avoid mutating the original array
  const sorted = [...products]

  switch (sortOption) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))

    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)

    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)

    case 'rating':
      // Sort by rating (descending), then by review count as tiebreaker
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating
        }
        return (b.reviewCount || 0) - (a.reviewCount || 0)
      })

    case 'reviews':
      // Sort by review count (descending), then by rating as tiebreaker
      return sorted.sort((a, b) => {
        const aReviews = a.reviewCount || 0
        const bReviews = b.reviewCount || 0
        if (bReviews !== aReviews) {
          return bReviews - aReviews
        }
        return b.rating - a.rating
      })

    default:
      return sorted
  }
}
