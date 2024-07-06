import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, {
    name,
    email,
    password,
  });

  return response.data;
};
export const getUser = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });

  return response.data;
};

export const updateCountdown = async (token, action) => {
  const response = await axios.put(
    `${API_URL}/users/countdown`,
    { action },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
