import axios from "axios";

class AuthenticateService {
  async login(): Promise<object> {
    try {
      console.log(import.meta.env.VITE_LOGIN_URL);
      const response = await axios.get(import.meta.env.VITE_LOGIN_URL ?? "", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { type: "success", message: response.data };
    } catch (error) {
      return { type: "error", message: (error as Error).message };
    }
  }
}

export default new AuthenticateService();
