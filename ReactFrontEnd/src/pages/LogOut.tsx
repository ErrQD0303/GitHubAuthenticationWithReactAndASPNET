import React from "react";
import { useNavigate } from "react-router-dom";
import authenticateService from "../services/authenticateService";

function LogOut() {
  const navigate = useNavigate();

  React.useEffect(() => {
    authenticateService.logout();
  }, []);

  React.useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <div>LogOut</div>;
}

export default LogOut;
