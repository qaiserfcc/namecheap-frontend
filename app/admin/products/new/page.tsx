'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminService } from '@/services/admin.service'
import type { ProductVariant } from '@/types/admin'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    let role = ''
    try {
      role = JSON.parse(localStorage.getItem('user') || 'null')?.role || ''
    } catch {}

    if (!token || role !== 'admin') {
      router.push('/auth/login')
    }
  }, [router])
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sub_category: '',
    stock_quantity: '',
    image_url: '',
  })

  const [variants, setVariants] = useState<Partial<ProductVariant>[]>([])
  const [showVariants, setShowVariants] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const product = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        is_active: true,
      }

      const created = await adminService.createProduct(product)

      // Create variants if any
      if (showVariants && variants.length > 0) {
        for (const variant of variants) {
          if (variant.name && variant.sku) {
            await adminService.createVariant(created.id, variant as ProductVariant)
          }
        }
      }

      alert('Product created successfully!')
      router.push('/admin/products')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const addVariant = () => {
    setVariants([...variants, { name: '', sku: '', price: 0, stock_quantity: 0, attributes: {} }])
  }

  const updateVariant = (index: number, field: string, value: any) => {
    const updated = [...variants]
    updated[index] = { ...updated[index], [field]: value }
    setVariants(updated)
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">Add New Product</h1>
        <p className="text-lg text-ink-600">Create a new product in your catalog</p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-ink-900">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="e.g., Natural Honey"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Product description..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">Category *</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="e.g., Health & Wellness"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">Sub Category</label>
                <input
                  type="text"
                  value={formData.sub_category}
                  onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="e.g., Natural Products"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">Price (PKR) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="2999.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">Product Variants</h2>
            <button
              type="button"
              onClick={() => setShowVariants(!showVariants)}
              className="text-sm font-semibold text-primary-700 hover:underline"
            >
              {showVariants ? 'Hide' : 'Add Variants'}
            </button>
          </div>

          {showVariants && (
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink-700">Variant {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Variant name (e.g., 500g)"
                      value={variant.name || ''}
                      onChange={(e) => updateVariant(index, 'name', e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="SKU"
                      value={variant.sku || ''}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price (PKR)"
                      value={variant.price || ''}
                      onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={variant.stock_quantity || ''}
                      onChange={(e) => updateVariant(index, 'stock_quantity', parseInt(e.target.value) || 0)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-ink-700 transition hover:border-primary-300 hover:bg-primary-50"
              >
                + Add Variant
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
