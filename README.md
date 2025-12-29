# Namecheap E-commerce Frontend

A modern, microservices-ready e-commerce frontend built with Next.js, React, and TypeScript. This frontend application is designed to integrate with a separate backend repository containing microservices for authentication, products, cart, orders, payments, discounts, admin, and notifications.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, React 18, and TypeScript
- **Tailwind CSS**: Beautiful, responsive UI with Tailwind CSS
- **Microservices Integration**: Pre-configured service layer for backend integration
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Pages Included**:
  - Home/Landing page
  - Product catalog
  - Shopping cart
  - Order management
  - Authentication (Login/Register)
  - Admin dashboard

## 📁 Project Structure

```
namecheap-frontend/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin dashboard
│   ├── auth/                # Authentication pages
│   ├── cart/                # Shopping cart
│   ├── orders/              # Order history
│   ├── products/            # Product catalog
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable React components
├── lib/                     # Utility libraries
│   └── api-client.ts        # API client configuration
├── services/                # Backend service integrations
│   ├── auth.service.ts      # Authentication service
│   ├── cart.service.ts      # Cart service
│   ├── order.service.ts     # Order service
│   ├── payment.service.ts   # Payment service
│   └── product.service.ts   # Product service
├── types/                   # TypeScript type definitions
│   ├── auth.ts
│   ├── cart.ts
│   ├── order.ts
│   ├── payment.ts
│   └── product.ts
└── public/                  # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/qaiserfcc/namecheap-frontend.git
cd namecheap-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint:

```bash
npm run lint
```

## 🔌 Backend Integration

This frontend is designed to work with a microservices backend. The backend services should provide the following API endpoints:

### Authentication Service (`/api/auth`)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Product Service (`/api/products`)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get categories
- `GET /api/products/search` - Search products

### Cart Service (`/api/cart`)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart
- `POST /api/cart/discount` - Apply discount code
- `DELETE /api/cart/discount` - Remove discount

### Order Service (`/api/orders`)
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `POST /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/:id/tracking` - Get order tracking

### Payment Service (`/api/payments`)
- `GET /api/payments/methods` - Get payment methods
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/methods` - Add payment method
- `DELETE /api/payments/methods/:id` - Remove payment method

## 🎨 Customization

### Styling

The project uses Tailwind CSS. You can customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize primary colors
      },
    },
  },
}
```

### API Client

The API client is configured in `lib/api-client.ts`. It automatically:
- Handles authentication tokens
- Includes proper headers
- Manages errors
- Provides typed responses

### Adding New Services

To add a new service:

1. Create a type definition in `types/`
2. Create a service file in `services/`
3. Import and use in your components

Example:

```typescript
// types/notification.ts
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

// services/notification.service.ts
import { apiClient } from '@/lib/api-client';
import { Notification } from '@/types/notification';

export const notificationService = {
  async getNotifications() {
    return apiClient.get<Notification[]>('/api/notifications');
  },
};
```

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |

## 📦 Dependencies

### Production
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM

### Development
- `typescript` - TypeScript support
- `tailwindcss` - Utility-first CSS framework
- `eslint` - Code linting
- `autoprefixer` - CSS vendor prefixing
- `postcss` - CSS processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the Namecheap e-commerce platform.

## 🔗 Related Repositories

- Backend Repository: Will be linked when available

## 📞 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
