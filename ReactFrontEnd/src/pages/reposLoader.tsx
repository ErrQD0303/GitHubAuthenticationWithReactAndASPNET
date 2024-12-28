import githubRepositoryService from "../services/githubRepositoryService";
import { IRepos } from "../types/repos";

const reposLoader = async () => {
  const reposData = (await githubRepositoryService.getAll()) as {
    type: string;
    message: string;
    repos?: IRepos;
  };
  return {
    repos: reposData.repos,
  };
};

export default reposLoader;
