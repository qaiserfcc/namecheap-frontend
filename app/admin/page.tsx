import { RequireAdmin } from '@/components/auth/RequireAdmin'

export default function AdminPage() {
  return (
    <RequireAdmin>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
          <p className="text-gray-600 mb-4">Manage your product catalog</p>
          <button className="text-primary-600 hover:text-primary-700">
            Manage Products →
          </button>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
          <p className="text-gray-600 mb-4">View and manage customer orders</p>
          <button className="text-primary-600 hover:text-primary-700">
            Manage Orders →
          </button>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-600 mb-4">Manage customer accounts</p>
          <button className="text-primary-600 hover:text-primary-700">
            Manage Users →
          </button>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Discount Codes</h2>
          <p className="text-gray-600 mb-4">Create and manage discount codes</p>
          <button className="text-primary-600 hover:text-primary-700">
            Manage Discounts →
          </button>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
          <p className="text-gray-600 mb-4">View sales and performance metrics</p>
          <button className="text-primary-600 hover:text-primary-700">
            View Analytics →
          </button>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-600 mb-4">Configure store settings</p>
          <button className="text-primary-600 hover:text-primary-700">
            Manage Settings →
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Admin Panel Integration</h3>
        <p className="text-sm text-gray-700">
          The admin panel will be fully functional once connected to the backend API.
          All admin operations will communicate with the backend Admin service.
        </p>
      </div>
      </div>
    </RequireAdmin>
  )
}
