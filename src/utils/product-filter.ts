/**
 * Product filtering utility functions
 *
 * Provides functions to filter products by various criteria:
 * - Categories (single or multiple)
 * - Price range
 * - Rating
 * - Search term
 */

import type { Product } from '@/types/product'

/**
 * Filter criteria for advanced product filtering
 */
export interface FilterCriteria {
  /**
   * Selected categories to filter by
   */
  categories?: string[]

  /**
   * Price range filter
   */
  priceRange?: {
    min: number
    max: number
  }

  /**
   * Minimum rating threshold
   */
  minRating?: number

  /**
   * Search term to filter by product name
   */
  searchTerm?: string
}

/**
 * Filters an array of products based on the specified criteria
 *
 * @param products - Array of products to filter
 * @param criteria - Filter criteria to apply
 * @returns A new filtered array of products
 */
export function filterProducts(products: Product[], criteria: FilterCriteria): Product[] {
  return products.filter((product) => {
    // Filter by categories
    if (criteria.categories && criteria.categories.length > 0) {
      if (!criteria.categories.includes(product.category)) {
        return false
      }
    }

    // Filter by price range
    if (criteria.priceRange) {
      const { min, max } = criteria.priceRange
      if (product.price < min || product.price > max) {
        return false
      }
    }

    // Filter by minimum rating
    if (criteria.minRating !== undefined) {
      if (product.rating < criteria.minRating) {
        return false
      }
    }

    // Filter by search term
    if (criteria.searchTerm && criteria.searchTerm.trim().length > 0) {
      const searchLower = criteria.searchTerm.toLowerCase()
      const nameMatches = product.name.toLowerCase().includes(searchLower)
      if (!nameMatches) {
        return false
      }
    }

    return true
  })
}

/**
 * Gets all unique categories from a products array
 *
 * @param products - Array of products
 * @returns Array of unique categories sorted alphabetically
 */
export function getCategories(products: Product[]): string[] {
  const categories = Array.from(new Set(products.map((p) => p.category)))
  return categories.sort()
}

/**
 * Counts products per category
 *
 * @param products - Array of products
 * @returns Object mapping category names to product counts
 */
export function countProductsByCategory(products: Product[]): Record<string, number> {
  const counts: Record<string, number> = {}

  products.forEach((product) => {
    if (!counts[product.category]) {
      counts[product.category] = 0
    }
    counts[product.category]++
  })

  return counts
}

/**
 * Gets the price range of all products
 *
 * @param products - Array of products
 * @returns Object with min and max prices
 */
export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = products.map((p) => p.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

/**
 * Combines category filtering with other criteria
 *
 * @param products - Array of products
 * @param selectedCategories - Array of selected category names
 * @param additionalCriteria - Additional filter criteria
 * @returns Filtered array of products
 */
export function filterByCategories(
  products: Product[],
  selectedCategories: string[],
  additionalCriteria?: Omit<FilterCriteria, 'categories'>
): Product[] {
  return filterProducts(products, {
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    ...additionalCriteria,
  })
}
