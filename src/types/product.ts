/**
 * Product-related type definitions
 */

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  alt?: string
  rating: number
  reviewCount?: number
  badge?: string
  category: string
}

export interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
  className?: string
}
