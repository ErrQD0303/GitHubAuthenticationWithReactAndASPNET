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

  async getAccessToken(): Promise<string | null> {
    try {
      const response = await axios.get(
        import.meta.env.VITE_ACCESS_TOKEN_URL ?? "",
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
