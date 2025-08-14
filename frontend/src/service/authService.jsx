const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';
class AuthService {
    // signup
    async signup(userData) {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                return { success: true, user: data.data.user };
            } else {
                return { success: false, message: data.message, errors: data.errors };
            }
        } catch (error) {
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Login
    async login(email, password) {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                return { success: true, user: data.data.user };
            } else {
                return { success: false, message: data.message, errors: data.errors };
            }
        } catch (error) {
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Logout
    async logout() {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    // Get current user
    getCurrentUser() {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            return null;
        }
    }

    // Get token
    getToken() {
        return localStorage.getItem('token');
    }

    // Check if user is logged in
    isAuthenticated() {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    }

    // Make authenticated requests
    async makeAuthenticatedRequest(url, options = {}) {
        const token = this.getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            credentials: 'include',
        };

        const res = await fetch(url, config);

        if (res.status === 401) {
            // Token expired or invalid
            this.logout();
            window.location.href = '/login';
            return null;
        }

        return res;
    }
}

export default new AuthService();