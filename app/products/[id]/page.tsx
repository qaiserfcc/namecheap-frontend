'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { productService } from '@/services/product.service'
import { wishlistService } from '@/services/wishlist.service'
import { Product } from '@/types/product'
import { useAuth } from '@/components/auth/AuthProvider'
import { useToast } from '@/components/ui/Toast'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { show } = useToast()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inWishlist, setInWishlist] = useState(false)
  const [savingToWishlist, setSavingToWishlist] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      if (!params.id) return
      try {
        setLoading(true)
        const response = await productService.getProductById(params.id as string)
        setProduct(response.data)
      } catch (err: any) {
        setError(err.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [params.id])

  useEffect(() => {
    const checkWishlist = async () => {
      if (!isAuthenticated || !product) return
      try {
        const res = await wishlistService.getWishlist()
        const isInList = res.data.items.some(i => i.productId === product.id)
        setInWishlist(isInList)
      } catch (e) {
        // ignore wishlist check failures
      }
    }
    checkWishlist()
  }, [isAuthenticated, product])

  const saveToWishlist = async () => {
    if (!product) return
    try {
      if (!isAuthenticated) {
        router.push(`/auth/login?redirect=${encodeURIComponent(`/products/${product.id}`)}`)
        return
      }
      setSavingToWishlist(true)
      await wishlistService.addItem(product.id)
      setInWishlist(true)
      show('Added to wishlist', { variant: 'success' })
      setSavingToWishlist(false)
    } catch (err) {
      setSavingToWishlist(false)
      show('Unable to save item', { variant: 'error' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading product...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">
            {error || 'Product not found'}
          </div>
          <button
            onClick={() => router.push('/products')}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-primary-600 hover:text-primary-700 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          {inWishlist && (
            <span className="absolute top-4 right-4 z-10 text-sm px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 font-medium">
              ♥ Saved
            </span>
          )}
          <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((_, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded"></div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          {product.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                {product.category}
              </span>
            </div>
          )}

          <div className="text-3xl font-bold text-primary-600 mb-6">
            ${product.price}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {product.sku && (
            <div className="mb-6 text-sm text-gray-600">
              SKU: {product.sku}
            </div>
          )}

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">Availability</div>
            {product.stock > 0 ? (
              <div className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </div>
            ) : (
              <div className="text-red-600 font-medium">Out of Stock</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium transition-colors"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={() => !inWishlist && saveToWishlist()}
              disabled={inWishlist || savingToWishlist}
              className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                inWishlist
                  ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'border-slate-300 text-ink-700 hover:bg-slate-100'
              }`}
            >
              {inWishlist ? '♥ Saved' : savingToWishlist ? 'Saving...' : '♡ Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
