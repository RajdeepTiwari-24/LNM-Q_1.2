import {React,useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  //const [message, setMessage] = useState('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("verificationEmail")===null) {
      navigate("/login");
    }
  }, []);

  const handleVerify = async () => {
    try {
      const email=localStorage.getItem("verificationEmail");
      const {data} = await axios.post(verifyOtp, { email, otp });
      //setMessage(data.msg);
      console.log("aagya1");
      console.log(data.status);
      if(data.status===true){
        toast.success("OTP Verified Successfully",toastOptions);
        localStorage.clear();
        localStorage.setItem("USER", JSON.stringify(data.user));
        setTimeout(() => {
          navigate("/posts");
      }, 5000);
      }
    } catch (error) {
      toast.error(error,toastOptions);
      //setMessage("OTP Not Matched");
    }
  };

  return (
    <>
    <div>
      <h1>Email Verification</h1>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
      <p>Note : If Not Verified , User registration will be deleted</p>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Verify;
