/**
 * Mock API Implementation for development
 * Simulates the Storage API behavior described in api.md
 */

import { ApiResponse } from './apiService';

const MOCK_DELAY = 500;
const SESSION_KEY = 'mock_auth_session';

export const mockApi = {
  async getGuestSession(): Promise<ApiResponse<{ id: string }>> {
    await this.delay();
    const guestId = Math.random().toString(16).slice(2, 18);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: guestId, type: 'guest' }));
    return { status: true, id: guestId };
  },

  async login(username: string, password?: string): Promise<ApiResponse<{ id: string }>> {
    await this.delay();

    // Admin account specifically requested by user
    if (username === 'admin' && password === '123') {
      const userId = 'admin_001';
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id: userId, type: 'user', username: 'Administrator' }));
      return { status: true, id: userId };
    }

    // Error simulation
    if (username === 'error') {
      return { status: false, message: 'Invalid credentials' };
    }

    // Default behavior for other accounts (for flexibility)
    const userId = 'user_' + Math.random().toString(16).slice(2, 10);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: userId, type: 'user', username }));
    return { status: true, id: userId };
  },

  async logout(): Promise<ApiResponse<any>> {
    await this.delay();
    localStorage.removeItem(SESSION_KEY);
    return { status: true, message: 'logged out' };
  },

  async getCurrentSession() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  async getRecords(parentId: string): Promise<ApiResponse<any[]>> {
    await this.delay();
    // Simulate some mock records
    return {
      status: true,
      data: [
        { id: 'node_1', name: 'Documents', type: 'folder', permission: 'RWEDO' },
        { id: 'node_2', name: 'Projects', type: 'folder', permission: 'RWE' },
        { id: 'node_3', name: 'Shared_Report.pdf', type: 'file', permission: 'R' },
      ]
    };
  },

  private delay() {
    return new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  }
};
