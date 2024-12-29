import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LogOut() {
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(["access_token"]);
  removeCookie("access_token");

  React.useEffect(() => {
    navigate("/");
  });

  return <div>LogOut</div>;
}

export default LogOut;
