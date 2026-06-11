const API_BASE_URL = '/api';

async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || `Error: ${response.status}`);
    }

    return data;
}

// ⭐ THIS IS THE KEY - Export the api object
export const api = {
    // Auth
    login: (data: { email: string; password: string }) =>
        apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

    register: (data: { name: string; email: string; password: string }) =>
        apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

    me: () => apiFetch('/auth/me'),

    updateProfile: (data: any) =>
        apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

    // Books
    getBooks: () => apiFetch('/books'),
    getBook: (id: string) => apiFetch(`/books/${id}`),
    // getQuotesByBook: (bookId: string) => apiFetch(`/books/${bookId}/quotes`),
    getQuotesByBook: (bookId: string) => apiFetch(`/books/${bookId}/quotes`),
    createBook: (data: any) =>
        apiFetch('/books', { method: 'POST', body: JSON.stringify(data) }),
    updateBook: (id: string, data: any) =>
        apiFetch(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBook: (id: string) =>
        apiFetch(`/books/${id}`, { method: 'DELETE' }),

    // Quotes
    getQuotes: () => apiFetch('/quotes'),
    getQuote: (id: string) => apiFetch(`/quotes/${id}`),
    createQuote: (data: any) =>
        apiFetch('/quotes', { method: 'POST', body: JSON.stringify(data) }),
    updateQuote: (id: string, data: any) =>
        apiFetch(`/quotes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteQuote: (id: string) =>
        apiFetch(`/quotes/${id}`, { method: 'DELETE' }),
    favoriteQuote: (id: string) =>
        apiFetch(`/quotes/${id}/favorite`, { method: 'PATCH' }),
    getFavorites: () => apiFetch('/quotes/favorites'),

    // Tags
    getTags: () => apiFetch('/tags'),
    getQuotesByTag: (tag: string) => apiFetch(`/tags/${tag}/quotes`),

    // Reading
    updateProgress: (data: any) =>
        apiFetch('/reading/progress', { method: 'POST', body: JSON.stringify(data) }),
    getDashboard: () => apiFetch('/reading/dashboard'),
    getGoals: () => apiFetch('/reading/goals'),
    createGoal: (data: any) =>
        apiFetch('/reading/goals', { method: 'POST', body: JSON.stringify(data) }),

    // Export (Premium)
    exportPDF: () => apiFetch('/export/pdf'),
    exportTXT: () => apiFetch('/export/txt'),
};

// Also export as default for flexibility
export default api;