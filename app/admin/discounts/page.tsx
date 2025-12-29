'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminService } from '@/services/admin.service'
import type { Discount } from '@/types/admin'

export default function DiscountsAdminPage() {
  const router = useRouter()
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '',
    min_order_amount: '',
    max_discount_amount: '',
    usage_limit: '',
    valid_from: '',
    valid_until: '',
  })

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

    loadDiscounts()
  }, [router])

  const loadDiscounts = async () => {
    try {
      setLoading(true)
      const data = await adminService.getDiscounts()
      setDiscounts(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load discounts')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: '',
      min_order_amount: '',
      max_discount_amount: '',
      usage_limit: '',
      valid_from: '',
      valid_until: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        code: formData.code,
        description: formData.description,
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        min_order_amount: parseFloat(formData.min_order_amount) || 0,
        max_discount_amount: formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : undefined,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : undefined,
        valid_from: formData.valid_from,
        valid_until: formData.valid_until,
        is_active: true,
      }

      if (editingId) {
        await adminService.updateDiscount(editingId, data)
      } else {
        await adminService.createDiscount(data)
      }

      resetForm()
      loadDiscounts()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save discount')
    }
  }

  const handleEdit = (discount: Discount) => {
    setFormData({
      code: discount.code,
      description: discount.description,
      discount_type: discount.discount_type,
      discount_value: discount.discount_value.toString(),
      min_order_amount: discount.min_order_amount.toString(),
      max_discount_amount: discount.max_discount_amount?.toString() || '',
      usage_limit: discount.usage_limit?.toString() || '',
      valid_from: discount.valid_from.split('T')[0],
      valid_until: discount.valid_until.split('T')[0],
    })
    setEditingId(discount.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this discount code?')) return

    try {
      await adminService.deleteDiscount(id)
      loadDiscounts()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete discount')
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await adminService.toggleDiscountStatus(id)
      loadDiscounts()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to toggle discount')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">Discount Codes</h1>
          <p className="text-lg text-ink-600">Manage promotional discount codes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {showForm ? 'Cancel' : '+ Add Discount'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-ink-900">
            {editingId ? 'Edit Discount' : 'Create New Discount'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="WELCOME10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Description *</label>
              <input
                type="text"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Welcome discount"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Type *</label>
              <select
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount (PKR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">
                {formData.discount_type === 'percentage' ? 'Percentage (%)' : 'Amount (PKR)'} *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder={formData.discount_type === 'percentage' ? '10' : '500'}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Min Order Amount (PKR)</label>
              <input
                type="number"
                step="0.01"
                value={formData.min_order_amount}
                onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Max Discount (PKR)</label>
              <input
                type="number"
                step="0.01"
                value={formData.max_discount_amount}
                onChange={(e) => setFormData({ ...formData, max_discount_amount: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Usage Limit</label>
              <input
                type="number"
                value={formData.usage_limit}
                onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Valid From *</label>
              <input
                type="date"
                required
                value={formData.valid_from}
                onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-2">Valid Until *</label>
              <input
                type="date"
                required
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
            >
              {editingId ? 'Update' : 'Create'} Discount
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Discounts List */}
      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto" />
            <p className="text-ink-600">Loading discounts...</p>
          </div>
        </div>
      ) : discounts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-r from-primary-50 via-white to-mint-50 p-12 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-lg font-semibold text-ink-700 mb-2">No discount codes yet.</p>
          <p className="text-ink-600">Create your first promotional code.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {discounts.map((discount) => (
            <div key={discount.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-ink-900">{discount.code}</h3>
                  <p className="text-sm text-ink-600">{discount.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(discount.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    discount.is_active ? 'bg-mint-100 text-mint-700' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {discount.is_active ? 'Active' : 'Inactive'}
                </button>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary-50 p-3">
                  <p className="text-xs text-ink-600">Discount</p>
                  <p className="text-lg font-bold text-primary-700">
                    {discount.discount_type === 'percentage'
                      ? `${discount.discount_value}%`
                      : `Rs. ${discount.discount_value.toLocaleString()}`}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-ink-600">Usage</p>
                  <p className="text-lg font-bold text-ink-900">
                    {discount.used_count}/{discount.usage_limit || '∞'}
                  </p>
                </div>
              </div>

              <div className="mb-4 space-y-1 text-xs text-ink-600">
                <p>Min Order: Rs. {discount.min_order_amount.toLocaleString()}</p>
                {discount.max_discount_amount && (
                  <p>Max Discount: Rs. {discount.max_discount_amount.toLocaleString()}</p>
                )}
                <p>Valid: {new Date(discount.valid_from).toLocaleDateString()} - {new Date(discount.valid_until).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(discount)}
                  className="flex-1 rounded-lg bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700 transition hover:bg-primary-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(discount.id)}
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
