// src/hooks/useReading.ts
import { api } from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

export interface ReadingProgress {
    bookId: string;
    currentPage: number;
    totalPages: number;
    percentage: number;
    lastReadAt: string;
}

export interface ReadingGoal {
    id: string;
    type: 'daily' | 'weekly' | 'monthly';
    target: number;
    current: number;
    deadline: string;
}

export interface ReadingStreak {
    current: number;
    longest: number;
    lastReadDate: string;
}

export function useReading() {
    const [dashboard, setDashboard] = useState<any>(null);
    const [goals, setGoals] = useState<ReadingGoal[]>([]);
    const [streak, setStreak] = useState<ReadingStreak | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // Fetch dashboard data
    const fetchDashboard = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.getDashboard();   // Make sure this matches your api.ts

            // Handle both possible response shapes (with/without .success or .data)
            const data = response.success ? response : response.data || response;

            setDashboard(data);
            setStreak(data.streak || { current: 0, longest: 0 });

            return data;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || 'Failed to load dashboard';
            setError(errorMsg);
            console.error('Dashboard fetch error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Update reading progress
    const updateProgress = useCallback(async (bookId: string, currentPage: number) => {
        setIsLoading(true);
        try {
            const data = await api.updateProgress({ bookId, currentPage });
            await fetchDashboard(); // Refresh dashboard
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [fetchDashboard]);

    // Fetch goals
    const fetchGoals = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.getGoals();
            setGoals(data.goals || data);   // adjust based on your actual API response
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Create goal
    const createGoal = useCallback(async (goalData: Omit<ReadingGoal, 'id' | 'current'>) => {
        setIsLoading(true);
        try {
            const newGoal = await api.createGoal(goalData);
            setGoals(prev => [...prev, newGoal]);
            return newGoal;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Auto-fetch on mount
    useEffect(() => {
        fetchDashboard();
        fetchGoals();
    }, [fetchDashboard, fetchGoals]);

    return {
        dashboard,
        goals,
        streak,
        isLoading,
        error,
        fetchDashboard,
        updateProgress,
        fetchGoals,
        createGoal,
    };
}