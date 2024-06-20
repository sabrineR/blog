export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
export const isAdmin = () => {
  return localStorage.getItem("isAdmin") !== null;
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem("userId");
};
export const getPhotoFromLocalStorage = () => {
  return localStorage.getItem("imagePath");
};

export const logout = () => {
  localStorage.removeItem("token"); // Supprimer le token de localStorage
  localStorage.removeItem("userId");
  localStorage.removeItem("imagePath");
  localStorage.removeItem("isAdmin");
  window.location.href = "/";
};
