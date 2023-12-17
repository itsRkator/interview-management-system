// auth.ts
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const tokenData = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = tokenData.exp * 1000;
  const currentTime = Date.now();
  return currentTime < expirationTime;
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const login = (token: string): void => {
  localStorage.setItem("token", token);
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
