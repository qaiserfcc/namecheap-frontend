'use client'

import { useEffect, useMemo, useState } from 'react'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { cartService } from '@/services/cart.service'
import { Cart } from '@/types/cart'

function CartContent() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      setCart(response.data)
    } catch (err: any) {
      setError(err.message || 'Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async (itemId: string | number) => {
    try {
      await cartService.removeFromCart(itemId)
      loadCart()
    } catch (err: any) {
      alert('Failed to remove item')
    }
  }

  const totals = useMemo(() => {
    if (!cart) return { subtotal: 0, total: 0 }
    const subtotal = cart.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    return { subtotal, total: subtotal }
  }, [cart])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading cart...</div>
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
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 md:px-6 md:py-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold leading-tight text-ink-900 md:text-5xl">Shopping Cart</h1>
        <p className="text-lg text-ink-600">Review and manage your items before checkout.</p>
      </div>
      
      {!cart || cart.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-r from-mint-50 via-white to-sky-50 p-12 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-xl font-semibold text-ink-700 mb-2">Your cart is empty</p>
          <p className="text-ink-600">Add products to see them here.</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary-50 to-mint-50 ring-1 ring-slate-200" />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-ink-900">{item.name}</h3>
                  <p className="text-sm text-ink-600">Qty: {item.quantity}</p>
                  <p className="text-lg font-medium text-primary-700">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-mint-50 via-white to-sky-50 p-6 shadow-sm ring-1 ring-slate-100 h-fit">
            <h2 className="mb-6 text-2xl font-bold text-ink-900">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-ink-700">
                <span>Subtotal</span>
                <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-lg text-ink-900">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary-200/60 transition hover:shadow-lg hover:-translate-y-0.5">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CartPage() {
  return (
    <RequireAuth>
      <CartContent />
    </RequireAuth>
  )
}
