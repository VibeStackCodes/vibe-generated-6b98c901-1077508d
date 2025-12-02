/**
 * SortDropdown Component
 *
 * Provides a dropdown selector for sorting products by various criteria:
 * - Price (low to high, high to low)
 * - Name (A-Z, Z-A)
 * - Popularity (by rating, by review count)
 */

import React from 'react'

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'

export interface SortDropdownProps {
  /**
   * Currently selected sort option
   */
  value: SortOption
  /**
   * Callback when sort option changes
   */
  onChange: (sortOption: SortOption) => void
}

/**
 * Sort option display labels
 */
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Popularity (Highest Rated)' },
  { value: 'reviews', label: 'Popularity (Most Reviews)' },
]

/**
 * SortDropdown component
 *
 * Props:
 * - value: Current sort option
 * - onChange: Callback when selection changes
 */
export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:border-[#003d82] focus:outline-none focus:ring-2 focus:ring-[#003d82] focus:ring-offset-0 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
