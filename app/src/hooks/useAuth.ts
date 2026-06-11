import { api } from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'free' | 'pro' | 'premium';
}

interface AuthResponse {
    token: string;
    user: User;
}

export function useAuth() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // Check if user is already logged in (on mount)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                logout();
            }
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError('');

        try {
            const response: AuthResponse = await api.login({ email, password });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);

            navigate('/dashboard');
            return response;
        } catch (err: any) {
            const message = err.message || 'Login failed. Please check your credentials.';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError('');

        try {
            const response: AuthResponse = await api.register({ name, email, password });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);

            navigate('/dashboard');
            return response;
        } catch (err: any) {
            const message = err.message || 'Registration failed. Please try again.';
            setError(message);
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }, [navigate]);

    const updateProfile = useCallback(async (data: Partial<User>) => {
        setIsLoading(true);
        try {
            const response = await api.updateProfile(data);
            const updatedUser = { ...user, ...response.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return response;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
    };
}