export const UserRole = {
    Candidate: 0,
    Recruiter: 1,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    role: string;
}
