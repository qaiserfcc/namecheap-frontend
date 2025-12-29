'use client'

import { useEffect, useState } from 'react'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { wishlistService } from '@/services/wishlist.service'
import { Wishlist } from '@/types/wishlist'

function WishlistContent() {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWishlist = async () => {
    try {
      setLoading(true)
      const response = await wishlistService.getWishlist()
      setWishlist(response.data)
    } catch (err: any) {
      setError(err.message || 'Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWishlist()
  }, [])

  const handleRemove = async (itemId: string | number) => {
    try {
      await wishlistService.removeItem(itemId)
      loadWishlist()
    } catch (err) {
      alert('Unable to remove item')
    }
  }

  const handleClear = async () => {
    try {
      await wishlistService.clearWishlist()
      loadWishlist()
    } catch (err) {
      alert('Unable to clear wishlist')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-ink-700">Loading wishlist...</div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">{error}</div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">Wishlist</h1>
          <p className="text-ink-600">Saved products for later.</p>
        </div>
        {wishlist && wishlist.items.length > 0 && (
          <button onClick={handleClear} className="text-sm text-red-600 hover:text-red-800">
            Clear wishlist
          </button>
        )}
      </div>

      {!wishlist || wishlist.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white/80 p-12 text-center shadow-sm">
          <p className="text-lg text-ink-600">No saved items yet.</p>
          <p className="text-sm text-ink-500">Browse products and add them to keep track.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {wishlist.items.map((item) => (
            <div key={item.id} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-primary-50 to-sky-50 ring-1 ring-slate-200" />
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold text-ink-900">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-ink-600 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-sm font-medium text-ink-800">${item.price}</p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WishlistPage() {
  return (
    <RequireAuth>
      <WishlistContent />
    </RequireAuth>
  )
}