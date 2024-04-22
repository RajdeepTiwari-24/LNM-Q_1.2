import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute, deleteUnverifiedRoute } from "../utils/APIRoutes";

const im = require("../assets/im.jpg");

export default function Register() {
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

  const handleValidation = (event) => {
    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      alert("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 5) {
      alert("Password should be equal or greater than 5 characters.");
      return false;
    } else if (email === "") {
      alert("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation(event)) {
      const username = event.target.elements.username.value;
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const confirmPassword = event.target.elements.confirmPassword.value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("verificationEmail", email);
        navigate("/verify");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1596468138838-0f34c2d0773b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-fixed">
        <div className=" max-w-md mx-auto bg-[#F8E7D5] rounded-xl shadow-xl border border-gray-300 overflow-hidden md:max-w-2xl">
          <div className="md:grid md:grid-cols-2">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full "
                src={im}
                alt="Basketball Illusion"
              />
            </div>
            <div className="p-8">
              <div className="p-8">
                <h2 className="font-dongpora text-6xl text-[#F1853B]">
                  Sign Up
                </h2>
                <p className="text-lg py-1 text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Username"
                    name="username"
                    min="3"
                  />
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Email"
                    name="email"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                    name="password"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                  <button
                    className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-2">
                  Existing user ?{" "}
                  <span className="text-[#1E75D5] cursor-pointer">
                    <Link to="/login">Login.</Link>
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
