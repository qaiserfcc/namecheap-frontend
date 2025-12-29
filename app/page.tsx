import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Namecheap E-commerce Platform
        </h1>
        
        <p className="text-center mb-8 text-lg">
          Modern microservices-based e-commerce platform with React & TypeScript
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <Link 
            href="/products" 
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Products →</h2>
            <p>Browse our product catalog</p>
          </Link>

          <Link 
            href="/cart" 
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Cart →</h2>
            <p>View your shopping cart</p>
          </Link>

          <Link 
            href="/orders" 
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Orders →</h2>
            <p>Check your order history</p>
          </Link>

          <Link 
            href="/auth/login" 
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Login →</h2>
            <p>Access your account</p>
          </Link>

          <Link 
            href="/admin" 
            className="p-6 border border-gray-300 rounded-lg hover:border-primary-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Admin →</h2>
            <p>Manage your store</p>
          </Link>

          <div className="p-6 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-sm">
              <li>Product Management</li>
              <li>Shopping Cart</li>
              <li>Order Processing</li>
              <li>Payment Integration</li>
              <li>Admin Dashboard</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Backend Integration</h3>
          <p className="mb-2">
            This frontend is designed to work with a separate backend repository.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure the API endpoint in <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code>
          </p>
        </div>
      </div>
    </main>
  )
}
