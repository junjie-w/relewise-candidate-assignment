export const USER_ID_KEY = 'userId';

export const getUserId = (): string => {
  const existingUserId = localStorage.getItem(USER_ID_KEY);
  
  if (existingUserId) {
    return existingUserId;
  }
  
  const newUserId = crypto.randomUUID();
  localStorage.setItem(USER_ID_KEY, newUserId);
  
  return newUserId;
};
