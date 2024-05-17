import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/posts";
import Postreply from "./pages/postreply";
import Verifyotp from "./pages/verifyOtp"
import Profile from "./pages/Profile";
import Resetpassword from "./pages/resetpassword";
import Newpassword from "./pages/newpassword";

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
        <Route path="/resetpassword" element={<Resetpassword/>}/>
        <Route path="/newpassword" element={<Newpassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
