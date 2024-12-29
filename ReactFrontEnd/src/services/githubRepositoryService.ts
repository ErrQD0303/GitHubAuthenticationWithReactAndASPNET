import axios from "axios";
import cookieStorageService from "./cookieStorageService";

class GitHubRepositoryService {
  repositoryUrl = import.meta.env.VITE_REPOSITORY_URL ?? "";

  getAll = async (): Promise<object> => {
    try {
      const response = await axios.get(this.repositoryUrl, {
        headers: {
          Authorization: `Bearer ${cookieStorageService.getCookie(
            "access_token"
          )}`,
          Accept: "application/vnd.github.v3+json, application/json",
        },
      });
      return {
        type: "success",
        message: "Get Repository Success",
        repos: response.data,
      };
    } catch (error) {
      return { type: "error", message: (error as Error).message };
    }
  };
}

export default new GitHubRepositoryService();
