import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { deleteUnverifiedRoute,forgotpassword } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const im = require("../assets/im.jpg");

export default function Resetpassword (){
    const navigate = useNavigate();
    const toastOptions = {
      position: "bottom-right",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
        const email = event.target.elements.email.value;
        const { data } = await axios.post(forgotpassword, {
          email
        });
  
        if (data.status === false) {
          toast.error(data.msg,toastOptions);
        }
        if (data.status === true){
          toast.success("Reset Password Mail sent successfully",toastOptions);
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
                    Forgot Password
                  </h2>
                  <p className="text-lg py-1 text-gray-500">Welcome to LNM-Q</p>
                  <form
                    className="space-y-5 mt-5"
                    action=""
                    onSubmit={(event) => handleSubmit(event)}
                  >
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Email"
                      name="email"
                    />
                    <button
                      className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                      type="submit"
                    >
                      Get Link
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
