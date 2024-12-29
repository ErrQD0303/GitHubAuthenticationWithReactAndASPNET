import { Outlet, useLoaderData } from "react-router-dom";
import { IAppLoader } from "../types/app";

function AppLayout() {
  const appLoader = useLoaderData() as IAppLoader;

  return (
    <div>
      <div>My Github Repository App</div>
      <Outlet context={{ appLoader }} />
    </div>
  );
}

export default AppLayout;
