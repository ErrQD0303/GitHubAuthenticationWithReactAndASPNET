import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <div>My Github Repository App</div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
