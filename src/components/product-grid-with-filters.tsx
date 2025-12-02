/**
 * ProductGridWithFilters Component
 *
 * A complete, reusable product catalog component that combines:
 * - Category filtering
 * - Sorting options
 * - Responsive grid layout
 * - Empty state handling
 *
 * This component encapsulates the full product browsing experience
 * and can be easily integrated into any page.
 */

import React, { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductFilter } from '@/components/product-filter'
import { SortDropdown, type SortOption } from '@/components/sort-dropdown'
import { filterByCategories, getCategories, countProductsByCategory } from '@/utils/product-filter'
import { sortProducts } from '@/utils/product-sorter'
import type { Product } from '@/types/product'

export interface ProductGridWithFiltersProps {
  /**
   * Array of products to display and filter
   */
  products: Product[]

  /**
   * Optional callback when a product is clicked
   */
  onProductClick?: (product: Product) => void

  /**
   * Optional title for the grid section
   */
  title?: string

  /**
   * Optional subtitle/description
   */
  subtitle?: string

  /**
   * Initial sort option (defaults to 'name-asc')
   */
  initialSort?: SortOption

  /**
   * Optional CSS class for the container
   */
  containerClassName?: string
}

/**
 * ProductGridWithFilters component
 *
 * Provides a complete, production-ready product catalog with filtering and sorting
 */
export function ProductGridWithFilters({
  products,
  onProductClick,
  title = 'Results',
  subtitle,
  initialSort = 'name-asc',
  containerClassName,
}: ProductGridWithFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>(initialSort)

  // Get available categories
  const availableCategories = useMemo(() => {
    return getCategories(products)
  }, [products])

  // Count products per category
  const productsByCategory = useMemo(() => {
    return countProductsByCategory(products)
  }, [products])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterByCategories(products, selectedCategories)
    return sortProducts(filtered, sortOption)
  }, [products, selectedCategories, sortOption])

  const handleCategoryChange = (category: string, isSelected: boolean) => {
    setSelectedCategories((prev) => {
      if (isSelected) {
        return [...prev, category].sort()
      } else {
        return prev.filter((c) => c !== category)
      }
    })
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className={`grid gap-8 lg:grid-cols-4 ${containerClassName || ''}`}>
      {/* Sidebar with Filter */}
      <aside className="lg:sticky lg:top-6 lg:h-fit">
        <ProductFilter
          categories={availableCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          productsByCategory={productsByCategory}
        />
      </aside>

      {/* Products Section */}
      <section className="lg:col-span-3">
        {/* Header with Results Count and Sort */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredAndSortedProducts.length} of {products.length} products
                </p>
                {selectedCategories.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                    {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} filtered
                  </span>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            {filteredAndSortedProducts.length > 0 && (
              <SortDropdown value={sortOption} onChange={setSortOption} />
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              {selectedCategories.length > 0
                ? 'No products found in the selected categories'
                : 'No products available'}
            </p>
            {selectedCategories.length > 0 && (
              <button
                onClick={handleClearFilters}
                className="mt-4 inline-block text-sm font-medium text-[#003d82] hover:text-[#002a5c] dark:hover:text-[#004fa6] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Optional Subtitle/Description */}
        {subtitle && filteredAndSortedProducts.length > 0 && (
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </section>
    </div>
  )
}
