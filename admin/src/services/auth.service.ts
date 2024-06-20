import axios, { AxiosError } from "axios";
import { loginData } from "../utils/interfaceLogin";

// Définition de l'URL de base de l'API depuis les variables d'environnement
const baseUrl: string = process.env.REACT_APP_API_URL || "";

// Interface pour la réponse de l'API de connexion
interface LoginResponse {
  token: string;
  isAdmin: boolean;
}

// Fonction asynchrone pour gérer l'authentification
export const login = async (data: loginData): Promise<LoginResponse> => {
  try {
    // Requête POST à l'API de connexion
    const response = await axios.post<LoginResponse>(`${baseUrl}/login`, data);

    // Extraction du token et du statut admin depuis la réponse
    const { token, isAdmin } = response.data;

    // Vérification si l'utilisateur est un admin
    if (!isAdmin) {
      throw new Error("Unauthorized");
    }

    // Stockage du token JWT dans localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin.toString());

    // Retourne le token et le statut admin
    return { token, isAdmin };
  } catch (err) {
    // Gestion des erreurs
    if (axios.isAxiosError(err)) {
      // Erreur spécifique à Axios avec réponse du serveur
      const axiosError = err as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || "An unexpected error occurred"
      );
    } else {
      // Erreur générale
      throw new Error("An unexpected error occurred");
    }
  }
};
