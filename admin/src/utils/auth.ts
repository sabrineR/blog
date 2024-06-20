export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};
export const isAdmin = () => {
  return localStorage.getItem("isAdmin") !== null;
};
export const logout = () => {
  localStorage.removeItem("token"); // Supprimer le token de localStorage
  window.location.href = "/";
};
