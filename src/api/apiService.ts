/**
 * Base API Service for Storage API
 * Handles authentication, token refresh, and dynamic routing
 */

export const BASE_URL = 'https://domain.com';

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
  id?: string;
  new_id?: string;
}

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Main fetch wrapper with credentials and error handling
   */
  public async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    // Set default credentials for cookies
    const fetchOptions: RequestInit = {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      let response = await fetch(fullUrl, fetchOptions);

      // Handle Token Expired (401)
      if (response.status === 401) {
        const body = await response.clone().json().catch(() => null);

        if (body?.message === 'Token expired') {
          console.warn('Token expired, attempting refresh...');
          const refreshed = await this.refreshSession();

          if (refreshed) {
            // Replay original request
            return this.request<T>(url, options);
          } else {
            // Refresh failed, trigger logout/redirect
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            throw new Error('Session expired');
          }
        }
      }

      const data = await response.json();

      // Handle business logic errors
      if (data.status === false && data.message === 'Unauthorized') {
         window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }

      return data as T;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  private async refreshSession(): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/api/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Auth Methods
  public async getGuestSession(): Promise<ApiResponse<{ id: string }>> {
    return this.request('/api/guest', { method: 'GET' });
  }

  public async login(credentials: any): Promise<ApiResponse<{ id: string }>> {
    return this.request('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  public async logout(): Promise<ApiResponse<any>> {
    return this.request('/api/logout', { method: 'POST' });
  }

  // Record CRUD
  public async getRecord(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v2/record/${id}`);
  }
}

export const api = ApiService.getInstance();
