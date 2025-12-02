/**
 * ProductFilter Component
 *
 * Displays filter controls for product categories
 * Supports single and multiple category selection with visual feedback
 */

import React from 'react'

export interface ProductFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string, isSelected: boolean) => void
}

/**
 * ProductFilter component
 *
 * Props:
 * - categories: Array of available category names
 * - selectedCategories: Array of currently selected categories
 * - onCategoryChange: Callback when a category is selected/deselected
 */
export function ProductFilter({
  categories,
  selectedCategories,
  onCategoryChange,
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

  return (
    <aside className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Categories
        </h2>
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
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category)
          return (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleCategoryToggle(category)}
                className="h-4 w-4 rounded border-gray-300 text-[#003d82] focus:ring-2 focus:ring-[#003d82] focus:ring-offset-0 dark:border-gray-600 dark:bg-gray-700"
                aria-label={`Filter by ${category}`}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          )
        })}
      </div>

      {/* Filter Info */}
      {selectedCategories.length > 0 && (
        <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Showing {selectedCategories.length} selected categor{selectedCategories.length === 1 ? 'y' : 'ies'}
          </p>
        </div>
      )}
    </aside>
  )
}
