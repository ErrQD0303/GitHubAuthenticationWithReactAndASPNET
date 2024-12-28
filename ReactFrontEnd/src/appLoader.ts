import cookieStorageService from "./services/cookieStorageService";

const loader = async () => {
  return {
    accessToken: cookieStorageService.getCookie("access_token"),
  };
};

export default loader;
