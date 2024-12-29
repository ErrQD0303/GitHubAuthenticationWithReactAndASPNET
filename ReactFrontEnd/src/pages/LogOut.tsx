import React from "react";
import { useNavigate } from "react-router-dom";
import authenticateService from "../services/authenticateService";
import { useCookies } from "react-cookie";

function LogOut() {
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(["accessToken"]);
  removeCookie("accessToken");

  React.useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <div>LogOut</div>;
}

export default LogOut;
