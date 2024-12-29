import { LoaderFunctionArgs } from "react-router-dom";
import cookieStorageService from "./services/cookieStorageService";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const accessToken = url.href.includes("logout")
    ? null
    : cookieStorageService.getCookie("access_token");
  console.log("accessToken", accessToken);
  return {
    accessToken,
  };
};

export default loader;
