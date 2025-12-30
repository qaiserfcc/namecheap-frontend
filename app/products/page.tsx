'use client'

import { useState, useEffect } from 'react'
import { productService } from '@/services/product.service'
import { Product } from '@/types/product'
import { wishlistService } from '@/services/wishlist.service'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { useToast } from '@/components/ui/Toast'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | number | null>(null)
  const [wishlistIds, setWishlistIds] = useState<Set<string | number>>(new Set())
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { show } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    const loadWishlist = async () => {
      if (!isAuthenticated) return
      try {
        const res = await wishlistService.getWishlist()
        const ids = new Set<string | number>(res.data.items.map(i => i.productId))
        setWishlistIds(ids)
      } catch (e) {
        // ignore wishlist load failures on listing
      }
    }
    loadWishlist()
  }, [isAuthenticated])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const products = await productService.getProducts()
      setProducts(products)
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const saveToWishlist = async (productId: string | number) => {
    try {
      if (!isAuthenticated) {
        router.push(`/auth/login?redirect=${encodeURIComponent('/products')}`)
        return
      }
      setSavingId(productId)
      await wishlistService.addItem(productId)
      setWishlistIds((prev) => new Set(prev).add(productId))
      show('Added to wishlist', { variant: 'success' })
      setSavingId(null)
    } catch (err) {
      setSavingId(null)
      show('Unable to save item', { variant: 'error' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center text-gray-600 mt-12">
          <p className="text-xl mb-4">No products available</p>
          <p className="text-sm">Products will appear here once the backend is connected</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const inWishlist = wishlistIds.has(product.id)
            return (
            <div
              key={product.id}
              className="relative border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              {inWishlist && (
                <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">Saved</span>
              )}
              <div className="aspect-square bg-gray-200 rounded-md mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                <div className="flex items-center gap-2">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      !inWishlist && saveToWishlist(product.id)
                    }}
                    disabled={inWishlist || savingId === product.id}
                    className={`px-3 py-2 rounded border text-ink-700 ${
                      inWishlist
                        ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {inWishlist ? 'Saved' : savingId === product.id ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  )
}
