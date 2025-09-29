const BASE_URL = 'http://localhost:3000';

export async function loginApi(credentials) {
  try {
    const resp = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data?.message || 'Le serveur ne répond pas');
    }

    if (data.code !== '200') {
      throw new Error(data.message);
    }

    localStorage.setItem('token', data.data);
    return data;
  } catch (err) {
    localStorage.removeItem('token');
    throw err;
  }
}

export async function registerApi(payload) {
  try {
    const resp = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data?.message || 'Le serveur ne répond pas');
    }

    if (data.code !== '200') {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    localStorage.removeItem('token');
    throw err;
  }
}

