import Article from '../models/article';
import API_URL from './api';

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data?.message || 'Une erreur est survenue');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

export const getArticles = async () => {
  try {
    const response = await fetch(`${API_URL}/articles`);
    const { data } = await handleResponse(response);
    return data.map(item => new Article(item));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const getArticle = async (id) => {
    try {
      const response = await fetch(`${API_URL}/articles/${id}`);
      const { data } = await handleResponse(response);
      return new Article(data);
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      throw error;
    }
  };

export const saveArticle = async (data) => {
  try {
    const response = await fetch(`${API_URL}/articles/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const { data: savedData } = await handleResponse(response);
    return new Article(savedData);
  } catch (error) {
    console.error('Error saving article:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
    const { data: updatedData } = await handleResponse(response);
    return new Article(updatedData);
  } catch (error) {
    console.error(`Error updating article ${id}:`, error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
    try {
      const response = await fetch(`${API_URL}/articles/${id}`, {
        method: 'DELETE',
      });
      await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting article ${id}:`, error);
      throw error;
    }
  };