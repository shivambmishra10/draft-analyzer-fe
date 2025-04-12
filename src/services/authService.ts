import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login failed:', error);
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
