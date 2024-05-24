import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("verificationEmail") === null) {
      navigate("/login");
    }
  }, []);

  const handleVerify = async () => {
    try {
      const email = localStorage.getItem("verificationEmail");
      const { data } = await axios.post(verifyOtp, { email, otp });
      console.log("aagya1");
      console.log(data.status);
      if (data.status === true) {
        toast.success("OTP Verified Successfully", toastOptions);
        localStorage.clear();
        localStorage.setItem("USER", JSON.stringify(data.user));
        setTimeout(() => {
          navigate("/posts");
        }, 2000);
      }
    } catch (error) {
      toast.error(error, toastOptions);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1596468138838-0f34c2d0773b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>Enter OTP to verify your Email.</CardDescription>
            </CardHeader>
            <CardContent>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="mt-2">
                Note : If Not Verified , User registration will be deleted
              </p>
            </CardContent>
            <CardFooter>
              <button
                className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                onClick={handleVerify}
              >
                Verify
                {/* {console.log(otp)} */}
              </button>
            </CardFooter>
          </Card>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Verify;
