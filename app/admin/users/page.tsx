'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminService } from '@/services/admin.service'
import type { User } from '@/types/admin'

export default function UsersAdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

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

    loadUsers()
  }, [router, roleFilter])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await adminService.getUsers(roleFilter ? { role: roleFilter } : {})
      setUsers(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: number, newRole: 'customer' | 'admin') => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return

    try {
      await adminService.updateUserRole(userId, newRole)
      loadUsers()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update role')
    }
  }

  const handleToggleStatus = async (userId: number) => {
    try {
      await adminService.toggleUserStatus(userId)
      loadUsers()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-ink-900 md:text-5xl">User Management</h1>
        <p className="text-lg text-ink-600">Manage user accounts and permissions</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 ring-1 ring-slate-100 transition focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">All Roles</option>
          <option value="customer">Customers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto" />
            <p className="text-ink-600">Loading users...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-r from-primary-50 via-white to-mint-50 p-12 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-lg font-semibold text-ink-700 mb-2">No users found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-slate-50 text-sm font-semibold text-ink-600 border-b border-slate-200">
            <div className="col-span-4">User</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y divide-slate-100">
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-slate-50 transition">
                <div className="col-span-4 space-y-1">
                  <h3 className="font-semibold text-ink-900">{user.first_name} {user.last_name}</h3>
                  <p className="text-xs text-ink-600">ID: {user.id}</p>
                  <p className="text-xs text-ink-500">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-ink-700">{user.email}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-ink-700">{user.phone || 'N/A'}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as 'customer' | 'admin')}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-primary-100 text-primary-700'
                    }`}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      user.is_active
                        ? 'bg-mint-100 text-mint-700 hover:bg-mint-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
