import { Outlet, useLoaderData } from "react-router-dom";
import { IAppLoader } from "../types/app";
import { useCookies } from "react-cookie";

function AppLayout() {
  const appLoader = useLoaderData() as IAppLoader;

  const [, setCookie] = useCookies(["access_token"]);
  if (appLoader.accessToken) {
    console.log("Setting access token" + appLoader.accessToken);
    setCookie("access_token", appLoader.accessToken);
  }

  return (
    <div>
      <div>My Github Repository App</div>
      <Outlet context={{ appLoader }} />
    </div>
  );
}

export default AppLayout;
