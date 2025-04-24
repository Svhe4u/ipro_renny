// These are conceptual examples.  Adapt to your actual API endpoints.
const API_BASE_URL = '/api'; // Or your backend URL

const api = {
  // Authentication
  login: async (credentials: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },
  register: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  // User
  getUser: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return await response.json();
  },
  updateUser: async (userId: string, data: any) => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`,{
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
  },

  // CVs
  getUserCvs: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/cvs?userId=${userId}`);
    return await response.json();
  },
  getCvById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/cvs/${id}`);
    return await response.json();
  },
  createCv: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/cvs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  updateCv: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/cvs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  deleteCv: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/cvs/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  // Templates
  getTemplates: async () => {
    const response = await fetch(`${API_BASE_URL}/templates`);
    return await response.json();
  },

  // Admin
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`);
    return await response.json();
  },
  getAdmins: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/admins`);
    return await response.json();
  },
    deleteUser: async(id: string) => {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    },
    updateUserByAdmin: async (id: string, data: any) => {
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`,{
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return await response.json();
    },
};

export default api;