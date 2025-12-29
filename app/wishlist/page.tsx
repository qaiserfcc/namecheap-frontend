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
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-16">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold leading-tight text-ink-900 md:text-5xl">Wishlist</h1>
          <p className="text-lg text-ink-600">Saved products for later.</p>
        </div>
        {wishlist && wishlist.items.length > 0 && (
          <button onClick={handleClear} className="inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100 hover:-translate-y-0.5">
            Clear wishlist
          </button>
        )}
      </div>

      {!wishlist || wishlist.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-r from-primary-50 via-white to-mint-50 p-12 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-lg font-semibold text-ink-700 mb-2">No saved items yet.</p>
          <p className="text-ink-600">Browse products and add them to keep track.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-apricot-400/5 to-primary-400/5 opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex flex-col gap-3">
                <div className="h-40 w-full rounded-xl bg-gradient-to-br from-primary-50 to-sky-50 ring-1 ring-slate-200" />
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-ink-900">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-ink-600 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-lg font-bold text-primary-600">${item.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  Remove
                </button>
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