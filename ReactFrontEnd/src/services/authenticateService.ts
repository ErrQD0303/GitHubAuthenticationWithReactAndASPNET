import axios from "axios";

class AuthenticateService {
  async login(): Promise<object> {
    try {
      const response = await axios.get(
        "https://localhost:8002/api/github/login",
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
}

export default new AuthenticateService();
