import { LoaderFunctionArgs } from "react-router-dom";
import authenticateService from "../services/authenticateService";

const loader = async ({ context, params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  console.log(url.href, context, params, request);

  const accessToken = url.href.includes("logout")
    ? null
    : await authenticateService.getAccessToken();
  console.log("accessToken", accessToken);
  return {
    accessToken,
  };
};

export default loader;
