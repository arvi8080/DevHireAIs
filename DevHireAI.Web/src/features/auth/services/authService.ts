import { apiRequest } from '../../../api/client';
import { API_BASE_URL } from '../../../api/endpoints';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

export const authService = {
    login(data: LoginRequest): Promise<AuthResponse> {
        return apiRequest<AuthResponse>(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    register(data: RegisterRequest): Promise<{ message: string }> {
        return apiRequest<{ message: string }>(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};
