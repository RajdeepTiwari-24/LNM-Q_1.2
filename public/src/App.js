import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/posts";
import Postreply from "./pages/postreply";
import Verifyotp from "./pages/verifyOtp"
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<Postreply />} />
        <Route path="/verify" element={< Verifyotp/>} />
        <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
