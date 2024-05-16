import React from 'react'
import {useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {resetpassword} from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const im = require("../assets/im.jpg");

export default function Newpassword(){

  const {id}=useParams();
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = (event) => {
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.",toastOptions);
      return false;
    }else if (password.length < 5) {
      toast.error("Password should be equal or greater than 5 characters.",toastOptions);
      return false;
    } 
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation(event)){
      const password = event.target.elements.password.value;
      const {data} = await axios.post(resetpassword, {
        id,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg,toastOptions);
      }
      if (data.status === true) {
        toast.success(data.msg,toastOptions);
        navigate("/login");
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
                src={'https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt="Basketball Illusion"
              />
            </div>
            <div className="p-8">
              <div className="p-8">
                <h2 className="font-dongpora text-6xl text-[#F1853B]">
                  Reset Password
                </h2>
                <p className="text-lg py-1 text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
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
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}