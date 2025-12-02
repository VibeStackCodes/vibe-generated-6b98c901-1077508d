/**
 * ProductFilter Component
 *
 * Displays filter controls for product categories with enhanced UX.
 * Supports single and multiple category selection with visual feedback,
 * category counts, and smooth animations.
 */

import React, { useMemo } from 'react'

export interface ProductFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string, isSelected: boolean) => void
  /**
   * Optional: Pass all products to show product count per category
   * This enables showing "(X)" next to each category
   */
  productsByCategory?: Record<string, number>
}

/**
 * ProductFilter component with enhanced UX features
 *
 * Props:
 * - categories: Array of available category names
 * - selectedCategories: Array of currently selected categories
 * - onCategoryChange: Callback when a category is selected/deselected
 * - productsByCategory: Optional map of category -> product count for better UX
 */
export function ProductFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  productsByCategory,
}: ProductFilterProps) {
  const handleCategoryToggle = (category: string) => {
    const isCurrentlySelected = selectedCategories.includes(category)
    onCategoryChange(category, !isCurrentlySelected)
  }

  const handleClearFilters = () => {
    selectedCategories.forEach((category) => {
      onCategoryChange(category, false)
    })
  }

  // Memoize total products count
  const totalProducts = useMemo(() => {
    if (!productsByCategory) return 0
    return Object.values(productsByCategory).reduce((sum, count) => sum + count, 0)
  }, [productsByCategory])

  return (
    <aside className="space-y-4">
      {/* Filter Header with Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Categories
          </h2>
          {selectedCategories.length > 0 && (
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#ff6b35] text-xs font-semibold text-white">
              {selectedCategories.length}
            </span>
          )}
        </div>
        {selectedCategories.length > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-medium text-[#ff6b35] transition-colors hover:text-[#e55a2b] dark:hover:text-[#ff7d4d]"
            aria-label="Clear all category filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-2">
        {categories.length > 0 ? (
          categories.map((category) => {
            const isSelected = selectedCategories.includes(category)
            const productCount = productsByCategory?.[category] || 0

            return (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer rounded-md p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 rounded border-gray-300 text-[#003d82] focus:ring-2 focus:ring-[#003d82] focus:ring-offset-0 dark:border-gray-600 dark:bg-gray-700 transition-all"
                  aria-label={`Filter by ${category}`}
                />
                <div className="flex flex-1 items-center justify-between">
                  <span
                    className={`text-sm transition-all ${
                      isSelected
                        ? 'font-medium text-[#003d82] dark:text-[#4a9eff]'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </span>
                  {productCount > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({productCount})
                    </span>
                  )}
                </div>
              </label>
            )
          })
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No categories available</p>
        )}
      </div>

      {/* Filter Status Info */}
      {selectedCategories.length > 0 && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
          <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
            {selectedCategories.length === 1 ? (
              <>Active filter: <span className="font-semibold">{selectedCategories[0]}</span></>
            ) : (
              <>Active filters: {selectedCategories.join(', ')}</>
            )}
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {selectedCategories.length === 0
            ? 'Select categories to filter products'
            : `Showing ${selectedCategories.length} of ${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}`}
        </p>
      </div>
    </aside>
  )
}
