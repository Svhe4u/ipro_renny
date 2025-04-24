export const getLoggedInUser = () => {
    const userString = localStorage.getItem('user');
    try {
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem('user'); // Clear potentially invalid data
      return null;
    }
  };
  
  export const isAdmin = () => {
    const user = getLoggedInUser();
    return user?.role === 'admin';
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  };
  
  export const removeUser = () => {
      localStorage.removeItem('user');
  }