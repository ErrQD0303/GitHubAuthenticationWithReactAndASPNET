import authenticateService from "./services/authenticateService";

const loader = async () => {
  const accessToken = await authenticateService.getAccessToken();
  console.log(accessToken);
  return {
    accessToken,
  };
};

export default loader;
