import authenticateService from "./services/authenticateService";

const loader = async () => {
  const accessToken = await authenticateService.getAccessToken();
  return {
    accessToken,
  };
};

export default loader;
