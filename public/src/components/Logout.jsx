import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/logout.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="logutcontainer">
      <div
        className="button -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-6 text-gray-900 h-auto"
        onClick={handleClick}
      >
        LOGOUT
      </div>
    </div>
  );
}
