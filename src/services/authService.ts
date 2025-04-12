import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const login = async (email: string, password: string) => {
  const res = await axios.get(`${BASE_URL}/users?email=${email}&password=${password}`);
  if (res.data.length) {
    localStorage.setItem('token', 'mock-token');
    return true;
  }
  return false;
};

export const signup = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/users`, { email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
