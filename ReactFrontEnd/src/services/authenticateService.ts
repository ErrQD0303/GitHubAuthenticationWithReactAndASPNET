import axios from "axios";
import cookieStorageService from "./cookieStorageService";

class AuthenticateService {
  async login(): Promise<object> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_LOGIN_URL}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return { type: "success", message: response.data };
    } catch (error) {
      return { type: "error", message: (error as Error).message };
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_LOGOUT_URL}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      console.log("Unable to logout");
    }
  }

  async getAccessToken(): Promise<string | null> {
    const cookieAccessToken = cookieStorageService.getCookie("accessToken");
    if (cookieAccessToken) {
      return cookieAccessToken;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${
          import.meta.env.VITE_ACCESS_TOKEN_URL
        }`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch {
      console.log("Unable to get access token");
      return null;
    }
  }
}

export default new AuthenticateService();
