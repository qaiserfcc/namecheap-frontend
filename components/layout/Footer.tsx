export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Namecheap Store</h3>
            <p className="text-sm text-gray-600">
              Modern e-commerce platform with microservices architecture
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="text-gray-600 hover:text-primary-600">Products</a></li>
              <li><a href="/cart" className="text-gray-600 hover:text-primary-600">Cart</a></li>
              <li><a href="/orders" className="text-gray-600 hover:text-primary-600">Orders</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/auth/login" className="text-gray-600 hover:text-primary-600">Login</a></li>
              <li><a href="/auth/register" className="text-gray-600 hover:text-primary-600">Register</a></li>
              <li><a href="/orders" className="text-gray-600 hover:text-primary-600">My Orders</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Namecheap E-commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
