import authenticateService from "./services/authenticateService";

const loader = async () => {
  return {
    accessToken: authenticateService.getAccessToken(),
  };
};

export default loader;
