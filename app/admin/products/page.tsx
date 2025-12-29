'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { adminService } from '@/services/admin.service'
import type { Product } from '@/types/admin'

export default function ProductsAdminPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

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

    loadProducts()
  }, [router, searchTerm, categoryFilter])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await adminService.getProducts({ search: searchTerm, category: categoryFilter })
      setProducts(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      await adminService.toggleProductStatus(id)
      loadProducts()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update product')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await adminService.deleteProduct(id)
      loadProducts()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete product')
    }
  }

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">Product Management</h1>
          <p className="text-lg text-ink-600">Manage your product catalog with variants</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/products/bulk-upload"
            className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 ring-1 ring-primary-200 transition hover:bg-primary-50 hover:-translate-y-0.5"
          >
            📁 Bulk Upload
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 ring-1 ring-slate-100 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 ring-1 ring-slate-100 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto" />
            <p className="text-ink-600">Loading products...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-r from-primary-50 via-white to-mint-50 p-12 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-lg font-semibold text-ink-700 mb-2">No products found.</p>
          <p className="text-ink-600 mb-4">Start by adding your first product.</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
          >
            + Add Product
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 text-sm font-semibold text-ink-600 border-b border-slate-100">
              <div className="col-span-4">Product</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price (PKR)</div>
              <div className="col-span-1">Stock</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y divide-slate-100">
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-slate-50 transition">
                  <div className="col-span-4 flex items-start gap-3">
                    <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary-50 to-sky-50 ring-1 ring-slate-200" />
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="font-semibold text-ink-900 truncate">{product.name}</h3>
                      <p className="text-xs text-ink-600 line-clamp-2">{product.description}</p>
                      {product.variants && product.variants.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
                          {product.variants.length} variants
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-ink-900">{product.category}</p>
                      <p className="text-xs text-ink-600">{product.sub_category}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <p className="text-sm font-bold text-ink-900">Rs. {product.price.toLocaleString()}</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      product.stock_quantity > 10 ? 'bg-mint-100 text-mint-700' :
                      product.stock_quantity > 0 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock_quantity}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <button
                      onClick={() => handleToggleStatus(product.id)}
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold transition ${
                        product.is_active
                          ? 'bg-mint-100 text-mint-700 hover:bg-mint-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700 transition hover:bg-primary-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
