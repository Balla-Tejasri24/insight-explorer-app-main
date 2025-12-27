/**
 * API Configuration for Data Exploration
 * 
 * This file contains the configuration for connecting to the backend API.
 * 
 * CONFIGURATION INSTRUCTIONS:
 * ---------------------------
 * 
 * 1. BASE_URL: The base URL of your API server
 *    - Default: "https://Testserver:5001"
 *    - Change this to your actual API server URL in production
 * 
 * 2. ENDPOINTS: Define your API endpoints here
 *    - query: The endpoint for submitting data exploration queries
 * 
 * 3. TIMEOUT: Request timeout in milliseconds
 *    - Default: 30000 (30 seconds)
 * 
 * 4. HEADERS: Default headers sent with every request
 *    - Add authentication headers here if required
 * 
 * USAGE:
 * ------
 * import { API_CONFIG } from '@/config/api';
 * 
 * fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.query}`, {
 *   method: 'POST',
 *   headers: API_CONFIG.HEADERS,
 *   body: JSON.stringify({ query: "your query" })
 * });
 * 
 * ENVIRONMENT SETUP:
 * ------------------
 * For production, consider using environment variables:
 * - Replace BASE_URL with import.meta.env.VITE_API_BASE_URL
 * - Add VITE_API_BASE_URL to your environment configuration
 */

export const API_CONFIG = {
  /**
   * Base URL of the API server
   * Change this to match your backend server address
   */
  BASE_URL: "https://Testserver:5001",

  /**
   * API Endpoints
   * Add new endpoints as needed
   */
  ENDPOINTS: {
    /** Endpoint for submitting data exploration queries */
    query: "/api/query",
  },

  /**
   * Request timeout in milliseconds
   */
  TIMEOUT: 30000,

  /**
   * Default headers for API requests
   * Add authentication tokens or other headers here
   */
  HEADERS: {
    "Content-Type": "application/json",
    // Add authorization header if needed:
    // "Authorization": "Bearer YOUR_TOKEN_HERE",
  },
} as const;

/**
 * Helper function to make API requests with proper error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - please try again");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
