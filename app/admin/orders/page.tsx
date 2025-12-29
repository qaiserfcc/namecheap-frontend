'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminService } from '@/services/admin.service'
import type { Order } from '@/types/admin'

export default function OrdersAdminPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    let role = ''
    try {
      role = JSON.parse(localStorage.getItem('user') || 'null')?.role || ''
    } catch {}
    
    if (!token || role !== 'admin') {
      router.push('/auth/login')
      return
    }

    loadOrders()
  }, [router, statusFilter])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await adminService.getOrders(statusFilter ? { status: statusFilter } : {})
      setOrders(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus)
      loadOrders()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">Order Management</h1>
          <p className="text-lg text-ink-600">Track and manage customer orders</p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 ring-1 ring-slate-100 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto" />
            <p className="text-ink-600">Loading orders...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-r from-primary-50 via-white to-mint-50 p-12 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-lg font-semibold text-ink-700 mb-2">No orders found.</p>
          <p className="text-ink-600">Orders will appear here once customers make purchases.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-ink-900">Order #{order.id}</h3>
                  <p className="text-sm text-ink-600">
                    {order.user_email || order.user_name || `User #${order.user_id}`} • 
                    {new Date(order.created_at).toLocaleDateString('en-PK', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-ink-600">Total Amount</p>
                    <p className="text-2xl font-bold text-ink-900">Rs. {order.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div>
                  <p className="mb-1 text-xs text-ink-600">Order Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                      order.status === 'delivered' ? 'bg-mint-100 text-mint-700' :
                      order.status === 'processing' ? 'bg-primary-100 text-primary-700' :
                      order.status === 'shipped' ? 'bg-sky-100 text-sky-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-xs text-ink-600">Payment Status</p>
                  <span className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    order.payment_status === 'completed' ? 'bg-mint-100 text-mint-700' :
                    order.payment_status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-ink-700">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-ink-900">{item.product_name}</p>
                          <p className="text-xs text-ink-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-ink-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
