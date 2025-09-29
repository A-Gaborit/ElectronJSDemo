import { reactive, toRefs } from 'vue'
import API_URL from './api';

const state = reactive({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token')
})

export const useAuthStore = () => {
  const setToken = (token) => {
    state.token = token
    state.isAuthenticated = !!token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  const logout = () => {
    setToken(null)
  }

  return {
    ...toRefs(state),
    setToken,
    logout
  }
}

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data?.message || 'Une erreur est survenue');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  if (data.code !== '200') {
    throw new Error(data.message);
  }
  
  return data;
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(response);

    localStorage.setItem('token', data.data);
    useAuthStore().setToken(data.data);
    return data;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
}

export const register = async (payload) => {
  try {
    const resp = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await handleResponse(resp);

    return data;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
}

