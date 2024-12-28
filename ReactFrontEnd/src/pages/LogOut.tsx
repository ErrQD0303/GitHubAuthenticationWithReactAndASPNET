import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const [, , removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  removeCookie("access_token");

  React.useEffect(() => {
    navigate("/");
  });
  return <div>LogOut</div>;
}

export default LogOut;
