'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { adminService } from '@/services/admin.service'
import type { AdminStats } from '@/types/admin'

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

    loadDashboard()
  }, [router])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const data = await adminService.getDashboardStats()
      setStats(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto" />
          <p className="text-ink-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  const quickLinks = [
    { title: 'Products', href: '/admin/products', icon: '📦', color: 'from-primary-500 to-sky-500', desc: 'Manage catalog' },
    { title: 'Orders', href: '/admin/orders', icon: '🛍️', color: 'from-apricot-500 to-amber-400', desc: 'Track sales' },
    { title: 'Users', href: '/admin/users', icon: '👥', color: 'from-mint-500 to-emerald-400', desc: 'User accounts' },
    { title: 'Discounts', href: '/admin/discounts', icon: '🎟️', color: 'from-purple-500 to-pink-400', desc: 'Promo codes' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">Admin Dashboard</h1>
        <p className="text-lg text-ink-600">Manage your e-commerce platform</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-sky-500/5 opacity-0 transition group-hover:opacity-100" />
          <div className="relative space-y-2">
            <p className="text-sm font-semibold text-ink-600">Total Revenue</p>
            <p className="text-3xl font-bold text-ink-900">Rs. {stats?.totalRevenue?.toLocaleString() || 0}</p>
            <p className="text-xs text-ink-500">All time</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-apricot-500/5 to-amber-400/5 opacity-0 transition group-hover:opacity-100" />
          <div className="relative space-y-2">
            <p className="text-sm font-semibold text-ink-600">Total Orders</p>
            <p className="text-3xl font-bold text-ink-900">{stats?.totalOrders?.toLocaleString() || 0}</p>
            <p className="text-xs text-ink-500">Completed & pending</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-mint-500/5 to-emerald-400/5 opacity-0 transition group-hover:opacity-100" />
          <div className="relative space-y-2">
            <p className="text-sm font-semibold text-ink-600">Products</p>
            <p className="text-3xl font-bold text-ink-900">{stats?.totalProducts?.toLocaleString() || 0}</p>
            <p className="text-xs text-ink-500">In catalog</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-400/5 opacity-0 transition group-hover:opacity-100" />
          <div className="relative space-y-2">
            <p className="text-sm font-semibold text-ink-600">Users</p>
            <p className="text-3xl font-bold text-ink-900">{stats?.totalUsers?.toLocaleString() || 0}</p>
            <p className="text-xs text-ink-500">Registered accounts</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-5 transition group-hover:opacity-15`} />
            <div className="relative space-y-2">
              <div className="text-3xl">{link.icon}</div>
              <h3 className="text-lg font-semibold text-ink-900">{link.title}</h3>
              <p className="text-sm text-ink-600">{link.desc}</p>
              <span className="inline-flex items-center text-xs font-semibold text-primary-700 group-hover:underline">
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-primary-700 hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-ink-900">Order #{order.id}</p>
                  <p className="text-xs text-ink-600">{order.user_email || `User #${order.user_id}`}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-bold text-ink-900">Rs. {order.total_amount.toLocaleString()}</p>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    order.status === 'delivered' ? 'bg-mint-100 text-mint-700' :
                    order.status === 'processing' ? 'bg-primary-100 text-primary-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Products */}
      {stats?.topProducts && stats.topProducts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Top Products</h2>
            <Link href="/admin/products" className="text-sm font-semibold text-primary-700 hover:underline">
              Manage →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.topProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary-50 to-sky-50 ring-1 ring-slate-200" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="truncate text-sm font-semibold text-ink-900">{product.name}</h3>
                    <p className="text-xs text-ink-600">{product.category}</p>
                    <p className="text-sm font-bold text-primary-600">Rs. {product.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
