import { apiClient } from '@/lib/api-client';
import { User, LoginCredentials, RegisterData } from '@/types/auth';

/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls to the backend Auth service
 */

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post<{ user: User; token: string }>('/api/auth/login', credentials);
    
    // Store token in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  /**
   * Register new user
   */
  async register(data: RegisterData) {
    const response = await apiClient.post<{ user: User; token: string }>('/api/auth/register', data);
    
    // Store token in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  /**
   * Logout user
   */
  async logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return apiClient.post('/api/auth/logout');
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    return apiClient.get<User>('/api/auth/me');
  },

  /**
   * Refresh token
   */
  async refreshToken() {
    return apiClient.post<{ token: string }>('/api/auth/refresh');
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string) {
    return apiClient.post('/api/auth/forgot-password', { email });
  },

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    return apiClient.post('/api/auth/reset-password', { token, newPassword });
  },
};
