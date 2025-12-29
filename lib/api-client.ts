/**
 * API Client Configuration
 * 
 * This module provides a configured API client for communicating with the backend services.
 * The backend API URL should be set via the NEXT_PUBLIC_API_URL environment variable.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export type ApiResponseType = 'json' | 'blob';

export type ApiRequestOptions = RequestInit & {
  responseType?: ApiResponseType;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {};

    // Merge existing headers
    if (options.headers) {
      Object.entries(options.headers as Record<string, string>).forEach(([key, value]) => {
        headers[key] = value;
      });
    }

    const isFormDataBody =
      typeof FormData !== 'undefined' && options.body instanceof FormData;

    // Default to JSON content type unless caller overrides or sending FormData
    if (!headers['Content-Type'] && !isFormDataBody) {
      headers['Content-Type'] = 'application/json';
    }

    // Add authentication token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'An error occurred',
          statusCode: response.status,
        }));

        // Auto-logout on 401 and redirect to login
        if (response.status === 401 && typeof window !== 'undefined') {
          try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          } catch {}
          const current = window.location.pathname + window.location.search;
          const redirect = encodeURIComponent(current);
          window.location.assign(`/auth/login?redirect=${redirect}`);
        }

        throw errorData;
      }

      const responseType = options.responseType || 'json';
      const data =
        responseType === 'blob'
          ? await response.blob()
          : await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    const body =
      data === undefined
        ? undefined
        : typeof FormData !== 'undefined' && data instanceof FormData
          ? data
          : JSON.stringify(data);
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body,
    });
  }

  async put<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    const body =
      data === undefined
        ? undefined
        : typeof FormData !== 'undefined' && data instanceof FormData
          ? data
          : JSON.stringify(data);
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body,
    });
  }

  async patch<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    const body =
      data === undefined
        ? undefined
        : typeof FormData !== 'undefined' && data instanceof FormData
          ? data
          : JSON.stringify(data);
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body,
    });
  }

  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
