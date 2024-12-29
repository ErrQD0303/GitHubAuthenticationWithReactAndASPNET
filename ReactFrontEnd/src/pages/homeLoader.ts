import { LoaderFunctionArgs } from "react-router-dom";
import authenticateService from "../services/authenticateService";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isFromLogout = url.searchParams.get("from") === "logout";
  url.searchParams.delete("from");
  const accessToken = isFromLogout
    ? null
    : await authenticateService.getAccessToken();
  return {
    accessToken,
  };
};

export default loader;
