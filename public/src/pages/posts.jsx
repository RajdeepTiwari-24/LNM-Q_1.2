import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { useNavigate, Link } from "react-router-dom";



export default function Posts() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
        navigate("/login");
    }
  }, []);

  

  return (
    <>
      <div className="FormContainer">
        <Post/>
      </div>
    </>
  );
}
