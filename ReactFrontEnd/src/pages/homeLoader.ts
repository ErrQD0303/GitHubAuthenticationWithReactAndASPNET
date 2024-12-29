import { LoaderFunctionArgs } from "react-router-dom";
import authenticateService from "../services/authenticateService";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isFromLogout = url.searchParams.get("from") === "logout";
  console.log(url);
  const accessToken = isFromLogout
    ? null
    : await authenticateService.getAccessToken();
  console.log("accessToken", accessToken);
  return {
    accessToken,
  };
};

export default loader;
