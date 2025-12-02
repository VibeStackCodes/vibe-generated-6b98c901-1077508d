/**
 * Products Demo Page
 *
 * Showcases the ProductCard component with category filtering and product sorting
 */

import React, { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductFilter } from '@/components/product-filter'
import { SortDropdown, type SortOption } from '@/components/sort-dropdown'
import { sortProducts } from '@/utils/product-sorter'
import { filterByCategories, getCategories, countProductsByCategory } from '@/utils/product-filter'
import type { Product } from '@/types/product'

/**
 * Sample product data for demonstration with categories
 */
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    alt: 'Premium Wireless Headphones',
    rating: 4.5,
    reviewCount: 324,
    badge: 'Best Seller',
    category: 'Audio',
  },
  {
    id: '2',
    name: 'Professional Camera Lens',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1606986628253-05620e9b0a80?w=400&h=400&fit=crop',
    alt: 'Professional Camera Lens',
    rating: 4.8,
    reviewCount: 89,
    category: 'Photography',
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 45.99,
    originalPrice: 65.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    alt: 'Portable Bluetooth Speaker',
    rating: 4.2,
    reviewCount: 567,
    badge: 'New',
    category: 'Audio',
  },
  {
    id: '4',
    name: 'USB-C Fast Charging Cable',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1621416288969-46e93e50f31f?w=400&h=400&fit=crop',
    alt: 'USB-C Fast Charging Cable',
    rating: 4.7,
    reviewCount: 1200,
    category: 'Accessories',
  },
  {
    id: '5',
    name: 'Wireless Mouse & Keyboard Set',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1587829191301-74ba48bbb338?w=400&h=400&fit=crop',
    alt: 'Wireless Mouse & Keyboard Set',
    rating: 4.4,
    reviewCount: 445,
    category: 'Computing',
  },
  {
    id: '6',
    name: '4K USB Webcam',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    alt: '4K USB Webcam',
    rating: 4.6,
    reviewCount: 178,
    badge: 'Premium',
    category: 'Photography',
  },
  {
    id: '7',
    name: 'Mechanical Gaming Keyboard',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1587829191301-74ba48bbb338?w=400&h=400&fit=crop',
    alt: 'Mechanical Gaming Keyboard',
    rating: 4.9,
    reviewCount: 234,
    category: 'Computing',
  },
  {
    id: '8',
    name: 'Premium Microphone Stand',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    alt: 'Premium Microphone Stand',
    rating: 4.3,
    reviewCount: 156,
    category: 'Audio',
  },
]

/**
 * Products Demo Page Component
 */
export function ProductsDemo() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('name-asc')

  // Extract unique categories from products using utility
  const availableCategories = useMemo(() => {
    return getCategories(SAMPLE_PRODUCTS)
  }, [])

  // Calculate product count per category using utility
  const productsByCategory = useMemo(() => {
    return countProductsByCategory(SAMPLE_PRODUCTS)
  }, [])

  // Filter and sort products based on selected categories and sort option
  const filteredAndSortedProducts = useMemo(() => {
    // First, filter by categories using utility function
    const filtered = filterByCategories(SAMPLE_PRODUCTS, selectedCategories)

    // Then, apply sorting
    return sortProducts(filtered, sortOption)
  }, [selectedCategories, sortOption])

  const handleCategoryChange = (category: string, isSelected: boolean) => {
    setSelectedCategories((prev) => {
      if (isSelected) {
        return [...prev, category].sort()
      } else {
        return prev.filter((c) => c !== category)
      }
    })
  }

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product)
    alert(`You clicked on: ${product.name}`)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-[#003d82] to-[#002a5c] px-6 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-white">Product Catalog</h1>
          <p className="mt-2 text-lg text-gray-100">
            Browse our curated selection of premium products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Layout: Sidebar + Grid */}
          <div className="grid gap-8 lg:grid-cols-4">
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
              {/* Results Count and Sort */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Results
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {filteredAndSortedProducts.length} of {SAMPLE_PRODUCTS.length} products
                    </p>
                  </div>

                  {/* Sort Dropdown */}
                  <SortDropdown
                    value={sortOption}
                    onChange={setSortOption}
                  />
                </div>
              </div>

              {/* Product Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={handleProductClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                  <p className="text-gray-600 dark:text-gray-400">
                    No products found in the selected categories
                  </p>
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="mt-4 inline-block text-sm font-medium text-[#003d82] hover:text-[#002a5c] dark:hover:text-[#004fa6]"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Info Section */}
          <div className="mt-16 rounded-lg bg-gray-50 p-8 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Product Filtering & Sorting Features
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              The product catalog system combines responsive category filtering with flexible client-side
              sorting. Both features work together to help users find exactly what they need.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Filtering Section */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Category Filtering</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Multiple category selections</li>
                  <li>Real-time grid updates</li>
                  <li>Clear filters button</li>
                  <li>Sticky sidebar on desktop</li>
                </ul>
              </div>

              {/* Sorting Section */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Product Sorting</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Sort by name (A-Z, Z-A)</li>
                  <li>Sort by price (low to high, high to low)</li>
                  <li>Sort by rating (highest rated)</li>
                  <li>Sort by popularity (most reviews)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">Filter Component</p>
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  &lt;ProductFilter categories={`{categories}`} selectedCategories={`{selected}`}
                  onCategoryChange={`{handleChange}`} /&gt;
                </code>
              </div>
              <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">Sort Component</p>
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  &lt;SortDropdown value={`{sortOption}`} onChange={`{setSortOption}`} /&gt;
                </code>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-950">
              <p className="text-sm text-green-800 dark:text-green-300">
                ✓ Fully typed with TypeScript • ✓ Responsive design • ✓ Dark mode support • ✓ Accessible controls
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
