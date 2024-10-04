export const getCurrentUserId = (): number | null => {
    const userId = localStorage.getItem('currentUserId');
    return userId ? parseInt(userId, 10) : null;
  };
  
  export const setCurrentUserId = (userId: number): void => {
    localStorage.setItem('currentUserId', userId.toString());
  };