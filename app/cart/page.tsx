'use client'

import { useState, useEffect } from 'react'
import { cartService } from '@/services/cart.service'
import { Cart } from '@/types/cart'

export default function CartPage() {
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

  const handleRemoveItem = async (itemId: string) => {
    try {
      await cartService.removeFromCart(itemId)
      loadCart()
    } catch (err: any) {
      alert('Failed to remove item')
    }
  }

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      
      {!cart || cart.items.length === 0 ? (
        <div className="text-center text-gray-600 mt-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <p className="text-sm">Cart items will appear here once the backend is connected</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 mb-4 flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="border rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cart.subtotal}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${cart.discount}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${cart.total}</span>
              </div>
            </div>
            <button className="w-full bg-primary-600 text-white py-3 rounded hover:bg-primary-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
