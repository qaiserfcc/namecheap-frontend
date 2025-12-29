# Architecture Documentation

## Overview

This is a frontend-only e-commerce application built with Next.js 14, React 18, and TypeScript. It's designed to integrate with a separate microservices backend repository.

## Technology Stack

### Core
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript 5**: Type-safe JavaScript

### Styling
- **Tailwind CSS 3**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Development
- **ESLint**: Code linting
- **Next.js ESLint config**: Next.js-specific linting rules

## Architecture Layers

### 1. Presentation Layer (Pages)

Located in `app/` directory using Next.js App Router:

```
app/
├── page.tsx              # Home page
├── products/page.tsx     # Product catalog
├── cart/page.tsx         # Shopping cart
├── orders/page.tsx       # Order history
├── auth/
│   ├── login/page.tsx    # Login page
│   └── register/page.tsx # Registration page
└── admin/page.tsx        # Admin dashboard
```

**Responsibilities:**
- Render UI components
- Handle user interactions
- Manage local component state
- Call service layer for data

### 2. Service Layer

Located in `services/` directory:

```
services/
├── auth.service.ts       # Authentication operations
├── cart.service.ts       # Cart operations
├── order.service.ts      # Order operations
├── payment.service.ts    # Payment operations
└── product.service.ts    # Product operations
```

**Responsibilities:**
- Abstract API communication
- Provide clean interface for pages
- Handle request/response transformation
- Manage business logic related to API calls

### 3. API Client Layer

Located in `lib/api-client.ts`:

**Responsibilities:**
- HTTP request/response handling
- Authentication token management
- Error handling
- Request/response typing

### 4. Component Layer

Located in `components/` directory:

```
components/
├── layout/
│   ├── Header.tsx        # Site header
│   └── Footer.tsx        # Site footer
└── ui/
    └── Button.tsx        # Reusable button component
```

**Responsibilities:**
- Reusable UI components
- Layout components
- Presentational logic only

### 5. Type Definitions

Located in `types/` directory:

```
types/
├── auth.ts               # Authentication types
├── cart.ts               # Cart types
├── order.ts              # Order types
├── payment.ts            # Payment types
└── product.ts            # Product types
```

**Responsibilities:**
- Define TypeScript interfaces
- Ensure type safety across the application
- Document data structures

## Data Flow

```
User Interaction
      ↓
   Page Component
      ↓
   Service Layer
      ↓
   API Client
      ↓
Backend Microservices
      ↓
   API Client
      ↓
   Service Layer
      ↓
   Page Component
      ↓
   UI Update
```

## Backend Integration

### API Client Configuration

The API client (`lib/api-client.ts`) handles:

1. **Base URL Configuration**: Set via `NEXT_PUBLIC_API_URL` environment variable
2. **Authentication**: Automatically includes JWT tokens from localStorage
3. **Error Handling**: Consistent error handling across all requests
4. **Type Safety**: All requests and responses are typed

### Expected Backend Endpoints

The frontend expects the following microservices:

#### Authentication Service (`/api/auth`)
```
POST   /api/auth/login           # User login
POST   /api/auth/register        # User registration
POST   /api/auth/logout          # User logout
GET    /api/auth/me              # Get current user
POST   /api/auth/refresh         # Refresh token
POST   /api/auth/forgot-password # Request password reset
POST   /api/auth/reset-password  # Reset password
```

#### Product Service (`/api/products`)
```
GET    /api/products             # List all products
GET    /api/products/:id         # Get product by ID
GET    /api/products/categories  # Get categories
GET    /api/products/search      # Search products
```

#### Cart Service (`/api/cart`)
```
GET    /api/cart                 # Get user's cart
POST   /api/cart/items           # Add item to cart
PUT    /api/cart/items/:id       # Update cart item
DELETE /api/cart/items/:id       # Remove cart item
DELETE /api/cart                 # Clear cart
POST   /api/cart/discount        # Apply discount code
DELETE /api/cart/discount        # Remove discount
```

#### Order Service (`/api/orders`)
```
GET    /api/orders               # List user's orders
GET    /api/orders/:id           # Get order by ID
POST   /api/orders               # Create order
POST   /api/orders/:id/cancel    # Cancel order
GET    /api/orders/:id/tracking  # Get order tracking
```

#### Payment Service (`/api/payments`)
```
GET    /api/payments/methods     # Get payment methods
POST   /api/payments/intent      # Create payment intent
POST   /api/payments/confirm     # Confirm payment
POST   /api/payments/methods     # Add payment method
DELETE /api/payments/methods/:id # Remove payment method
```

## State Management

Currently uses React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects
- Props for passing data between components

**Future considerations:**
- Context API for global state
- React Query for server state management
- Zustand or Redux for complex state

## Styling Strategy

### Tailwind CSS Utility Classes

The project uses Tailwind CSS with a custom theme:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50-900: // Custom primary colors
      },
    },
  },
}
```

### Responsive Design

Mobile-first approach using Tailwind breakpoints:
- Default: Mobile (< 640px)
- `md:`: Tablet (≥ 768px)
- `lg:`: Desktop (≥ 1024px)
- `xl:`: Large Desktop (≥ 1280px)

## Environment Configuration

### Environment Variables

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Security Considerations

1. **Authentication**: JWT tokens stored in localStorage
2. **HTTPS**: Should be used in production
3. **CORS**: Backend should configure CORS appropriately
4. **XSS Protection**: React's built-in XSS protection
5. **Environment Variables**: Sensitive data should not be in `NEXT_PUBLIC_` variables

## Performance Optimization

1. **Static Generation**: Pages are statically generated where possible
2. **Code Splitting**: Next.js automatically code-splits pages
3. **Image Optimization**: Use Next.js Image component for images
4. **Font Optimization**: Uses system fonts to avoid external requests

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Platforms

Compatible with:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

### Environment Setup

Ensure the following environment variable is set:
```
NEXT_PUBLIC_API_URL=<your-backend-api-url>
```

## Future Enhancements

### Planned Features
1. Server-side rendering for product pages (SEO)
2. Real-time notifications (WebSocket integration)
3. Progressive Web App (PWA) support
4. Advanced caching strategies
5. Analytics integration
6. A/B testing framework

### Recommended Libraries
- **React Query**: Server state management
- **Zustand**: Client state management
- **React Hook Form**: Form handling
- **Zod**: Runtime validation
- **Socket.io**: Real-time features

## Troubleshooting

### Common Issues

1. **Build fails with font errors**
   - Ensure Google Fonts is accessible or use system fonts

2. **API requests fail**
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Ensure backend is running
   - Check CORS configuration

3. **TypeScript errors**
   - Run `npm run build` to check for type errors
   - Ensure all types are properly defined

## Contact & Support

For questions or issues:
1. Check the README.md
2. Review CONTRIBUTING.md
3. Open an issue on GitHub
