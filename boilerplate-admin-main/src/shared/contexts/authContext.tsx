
import { useNavigate } from 'react-router-dom';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ROUTES } from '@/shared/utils/routes';
import { loginURL } from '@/shared/services/reqUrl.service';
import { httpServices } from '@/shared/services/http.service';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
    updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string): Promise<any> => {
        /* await httpServices.postData(loginURL, { email, password }).then(({ status, data }) => {
            if (status === 200) return data;
        });
        return false; */

        if (email === 'admin@example.com' && password === 'password') {
            const loginDetails = { 
                id: '1', 
                name: 'Admin User', 
                email: 'admin@example.com',
                role: 'Administrator'
            }
            setUser(loginDetails);
            return { token: 'abcd', loginDetails }
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        navigate(ROUTES.login);
        localStorage.clear();
    };

    const updateProfile = (userData: Partial<User>) => {
        if (user) setUser({ ...user, ...userData });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};
