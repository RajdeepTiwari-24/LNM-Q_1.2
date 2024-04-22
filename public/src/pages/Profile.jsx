import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import User from "../components/User";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setuserId] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
      return;
    }
    if (location.state) {
      setuserId(location.state.userId);
    }
  }, []);

  return userId ? <User userId={userId} /> : null;
}