import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../service/authService';
const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be with an authprovider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // check if user is logged in on app start
    useEffect(() => {
        const initAuth = () => {
            const currentUser = authService.getCurrentUser();
            const token = authService.getToken();

            if (currentUser && token) {
                setUser(currentUser);
                setIsAuthenticated(true);
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const result = await authService.login(email, password);

            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
                return {
                    success: true,
                    user: result.user
                };
            }
            else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            return { success: false, message: 'login failed' };
        }
    };

    const signup = async (userData) => {
        try {
            const result = await authService.signup(userData);
            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
                return { success: true };
            }
            else {
                return { success: false, message: result.message, errors: result.errors };
            }
        } catch (error) {
            return { success: false, message: 'signup failed' };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };
    const value = {
        user, isAuthenticated, loading, login, signup, logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};