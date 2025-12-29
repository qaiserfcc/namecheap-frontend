'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { adminService } from '@/services/admin.service'

export default function BulkUploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        alert('Please select a valid CSV file')
        return
      }
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first')
      return
    }

    setUploading(true)
    try {
      const uploadResult = await adminService.uploadProductsCSV(file)
      setResult(uploadResult)
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDownloadTemplate = async () => {
    try {
      const blob = await adminService.downloadCSVTemplate()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'products-template.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      alert('Failed to download template')
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">Bulk Upload Products</h1>
        <p className="text-lg text-ink-600">Upload multiple products using CSV file</p>
      </div>

      {/* Instructions */}
      <div className="mb-6 rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 via-white to-sky-50 p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">📋 Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-ink-700">
          <li>Download the CSV template using the button below</li>
          <li>Fill in your product data (name, description, price in PKR, category, stock, etc.)</li>
          <li>For variants, use JSON format in the &quot;variants&quot; column</li>
          <li>Upload the completed CSV file</li>
          <li>Review the results and fix any errors if needed</li>
        </ol>
      </div>

      {/* CSV Format Example */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">CSV Format</h2>
        <div className="overflow-x-auto">
          <pre className="rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
{`name,description,price,category,sub_category,stock_quantity,image_url,variants
"Natural Honey","Pure organic honey",2999.99,"Health & Wellness","Natural Products",100,"https://example.com/honey.jpg",""
"Herbal Tea","Premium herbal blend",1999.99,"Beverages","Tea",150,"https://example.com/tea.jpg","[{\"name\":\"500g\",\"sku\":\"TEA-500\",\"price\":1999.99,\"stock_quantity\":75},{\"name\":\"1kg\",\"sku\":\"TEA-1K\",\"price\":3499.99,\"stock_quantity\":75}]"`}
          </pre>
        </div>
      </div>

      {/* Download Template */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Step 1: Download Template</h2>
        <button
          onClick={handleDownloadTemplate}
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-mint-500 to-emerald-400 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          📥 Download CSV Template
        </button>
      </div>

      {/* Upload Section */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Step 2: Upload CSV File</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900"
            />
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : '📤 Upload & Process'}
            </button>
          </div>
          {file && (
            <div className="rounded-lg bg-primary-50 px-4 py-2 text-sm text-primary-700">
              Selected: <span className="font-semibold">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-ink-900">Upload Results</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-mint-200 bg-mint-50 p-4">
              <span className="text-sm font-semibold text-mint-700">Successfully Created</span>
              <span className="text-2xl font-bold text-mint-700">{result.success}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4">
              <span className="text-sm font-semibold text-red-700">Failed</span>
              <span className="text-2xl font-bold text-red-700">{result.failed}</span>
            </div>
            {result.errors.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-amber-700">Errors:</h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-amber-700">
                  {result.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <Link
              href="/admin/products"
              className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
            >
              View Products
            </Link>
            <button
              onClick={() => setResult(null)}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Upload More
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          href="/admin/products"
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  )
}
