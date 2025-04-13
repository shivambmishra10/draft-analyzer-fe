import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

interface LoginResponse {
  token: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await axios.post<LoginResponse>(`${BASE_URL}/login`, { email, password });
    const { token, email: userEmail, name, avatarUrl } = res.data;

    if (token && userEmail) {
      localStorage.setItem("token", token); 
      useAuthStore.getState().login(token, userEmail, name, avatarUrl);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};


export const signup = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, { email, password });
    return res.data;
  } catch (error) {
    console.error('Signup failed:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
