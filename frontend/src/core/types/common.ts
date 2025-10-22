/**
 * @type ApiResponse
 * @summary Standard API response structure
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * @type ApiError
 * @summary Standard API error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}
