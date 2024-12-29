import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LogOut() {
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(["access_token"]);
  useEffect(() => {
    removeCookie("access_token");
  }, [removeCookie]);

  React.useEffect(() => {
    navigate("/");
  });

  return <div>LogOut</div>;
}

export default LogOut;
