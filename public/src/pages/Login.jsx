import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { loginRoute, deleteUnverifiedRoute } from "../utils/APIRoutes";
const im = require("../assets/video.gif");

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const deleteUnverified = async () => {
      try {
        localStorage.removeItem('verificationEmail');
        const { data } = await axios.post(deleteUnverifiedRoute);
        if (data.status === false) {
          alert(data.msg);
        }
      } catch (error) {
        console.error('Error deleting unverified email:', error);
      }
    };
    deleteUnverified(); 
  }, []); 

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/posts");
    }
  }, []);

  const validateForm = (event) => {
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    if (email === "") {
      alert("Email and Password is required.");
      return false;
    } else if (password === "") {
      alert("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(event)) {
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("USER", JSON.stringify(data.user));

        navigate("/posts");
      }
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1596468138838-0f34c2d0773b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
        <div className="z-1 max-w-md mx-auto bg-[#F8E7D5] rounded-xl shadow-xl border border-gray-300 overflow-hidden md:max-w-2xl">
          <div className="md:grid md:grid-cols-2">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full "
                src={im}
                alt="Student Illusion"
              />
            </div>
            <div className="p-8">
              <div className="p-8">
                <h2 className="font-dongpora text-6xl text-[#F1853B]">
                  Sign in
                </h2>
                <p className="text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Email"
                    name="email"
                    min="3"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                    type="submit"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-2">
                  New Here?{" "}
                  <span className="text-[#1E75D5] cursor-pointer">
                    <Link to="/register">Create Account.</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
