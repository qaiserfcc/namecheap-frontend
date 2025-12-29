# System Patterns - Frontend

## Architectural Patterns

### 1. Service Layer Pattern
**Purpose**: Centralize API communication logic
**Location**: `/services/*.service.ts`
**Example**: 
```typescript
// services/auth.service.ts
export const authService = {
  login: async (credentials) => { /* ... */ },
  register: async (userData) => { /* ... */ }
}
```
**Used in**: All API integrations (auth, cart, order, payment, product)

### 2. API Client Singleton
**Purpose**: Single point of configuration for HTTP requests
**Location**: `/lib/api-client.ts`
**Pattern**: Centralized HTTP client with auth header injection
**Benefits**: Consistent error handling, authentication, base URL

### 3. Type-First Development
**Purpose**: Ensure type safety across the application
**Location**: `/types/*.ts`
**Pattern**: Define types before implementing features
**Examples**:
- `types/auth.ts`: User, LoginCredentials, RegisterData
- `types/product.ts`: Product, ProductFilter
- `types/cart.ts`: CartItem, Cart

## Design Patterns

### 4. Component Composition
**Purpose**: Build complex UIs from simple, reusable components
**Location**: `/components/ui/*`
**Pattern**: Small, focused components that compose together
**Example**: Button component with variants

### 5. Server/Client Component Separation
**Purpose**: Optimize performance with React Server Components
**Pattern**:
- Server Components (default): Data fetching, static content
- Client Components (`'use client'`): Interactivity, browser APIs
**Consideration**: Minimize client-side JavaScript

## Coding Conventions

### File Naming
- **Pages**: `page.tsx` (Next.js convention)
- **Components**: PascalCase (`Header.tsx`, `Button.tsx`)
- **Services**: camelCase with `.service.ts` suffix
- **Types**: camelCase with `.ts` suffix

### Directory Structure
```
app/              # Route definitions
├── [route]/
│   └── page.tsx
components/       # Reusable components
├── layout/       # Layout components
└── ui/           # UI primitives
services/         # API services
types/            # TypeScript definitions
lib/              # Utilities
public/           # Static assets
```

### Import Organization
1. React/Next.js imports
2. Third-party libraries
3. Internal services/types
4. Components
5. Relative imports

### TypeScript Guidelines
- Use interfaces for object shapes
- Use type for unions/intersections
- Enable strict mode
- Avoid `any` type
- Use explicit return types for functions

### Component Patterns
- Functional components only
- Hooks for state management
- Props destructuring
- TypeScript for prop types
- Server components by default, client when needed

### API Integration
- All API calls through service layer
- Error handling in services
- Loading states in components
- Type-safe responses
