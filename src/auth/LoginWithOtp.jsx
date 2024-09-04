
import React, { useState, useEffect , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
 import logo  from "../assets/logo/logo.png"
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateForward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDoctor } from "../context/DoctorContext";


const LoginWithOtp = () => {
  const { doctor, setDoctor } = useDoctor();
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent
  const [time, setTime] = useState(10); // State to track the remaining time
  const [timerActive, setTimerActive] = useState(false); // State to track if the timer is active
  const [phone_number, setNumber] = useState(""); // State to track phone number
  const [generated_otp, setOtp] = useState(""); // State to track OTP
  const navigate = useNavigate();

  // Function to handle phone number change
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  // Function to handle OTP change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Function to handle form submission for sending OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/api/otp/sendOtp`, { phone_number });
      if (res.status === 200) {
        setOtpSent(true);
        setTimerActive(true); // Start the timer
        toast.success("OTP sent successfully!");
      }
      
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
      if(error.response){

        toast.error(error.response.data.error.message);
      }
    }
  };

  // Function to handle OTP verification
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/api/otp/verifyOtp`, { generated_otp,phone_number });
      if (res.status === 200 && res.data  ) {

      
        if(res.data.flag ===2  && res.data.success === true) { 
          // console.log(res.data);
          setOtpSent(false);
          setTime(30); // Reset the timer
          setTimerActive(false); // Stop the timer
          toast.success("OTP verified successfully! Please Complete your Profile");
          navigate(`/completeprofile/${btoa(phone_number)}`);
        }
        else if(res.data.flag === 1  && res.data.success === true) { 
          toast.success(res.data.msg);
          // setUser(res.data.user);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("userId", res.data.user.user_id);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setTimeout(() => {
            navigate(`/vitals/${btoa(res.data.user.user_id)}`);
          }, 1500);
        }
      }

      // navigate(`/completeprofile/${btoa(phone_number)}`);
    } catch (error) {
      console.log(error);
      toast.error( error.response.data.message);
    }
  };

  // Function to handle resend OTP

  const resendOTP = async () => {
    if (!timerActive) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/api/otp/sendOtp`, { phone_number });
        if (res.status === 200) {
          setOtpSent(true);
          setTimerActive(true);
          setTime(60);
          toast.success("OTP resent successfully!");
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          setTimerActive(false);
        }
      }, 1000);

      return () => {
        clearInterval(interval); // Cleanup function to clear the interval
      };
    }
  }, [timerActive, time]); // Run effect when timerActive or time changes

  return (
    <>
      <div className="container">
        <div className="login-container align-content-center">
          <div className="row login-box shadow-sm">
            <div className="col-md-6 align-content-center login-col-1 text-center">
              <img src={logo} className="img-fluid logo-img" alt="web logo" />
            </div>
            <div className="col-md-6 p-4 bg-body-tertiary">
              <p className="text-center fs-5 fw-medium">
                {otpSent ? "Sign in to your Account" : "Login to your Account"}
              </p>
              {otpSent ? (
                // Render OTP fill form if OTP is sent
                <form className="pt-3" onSubmit={handleOTPVerification}>
                  <label className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    required
                    name="otp"
                    value={generated_otp}
                    onChange={handleOtpChange}
                    placeholder="Enter OTP"
                    className="form-control"
                  />
                  <div className="mt-3 pb-2 d-flex justify-content-between">
                    <p
                      className="text-main-color"
                      onClick={resendOTP}
                      disabled={timerActive}
                    >
                      Resend OTP <FontAwesomeIcon icon={faArrowRotateForward} />
                    </p>
                    <p>{time}</p>
                  </div>
                  <div className="pt-3">
                    <button type="submit" className="btn w-100" id="background">
                      Verify OTP
                    </button>
                  </div>
                </form>
              ) : (
                // Render phone number input form if OTP is not sent
                <form className="pt-3" onSubmit={handleSubmit}>
                  <div className="d-flex">
                  <p className="m-0 px-2 d-flex align-items-center border1  "> +91</p>
                  <input
                    type="tel"
                    name="number"
                    value={phone_number}
                    required
                    onChange={handleNumberChange}
                    placeholder="Phone Number"
                    className="border2 px-4 py-2 w-100"
                  />
                  </div>
                  <div className="pt-3">
                    <button type="submit" className="btn w-100  " id="background">
                      Sign In
                    </button>
                  </div>
                </form>
              )}
              <div className="pt-3">
                <p className="text-center"> ______________ or ______________ </p>
              </div>
              <div className="pt-3">
                <Link to="/login/password" className="secondary-btn py-2 text-decoration-none text-white">
                    <button className="btn w-100 py-1 " id="background" type="button">

                    Sign in with Password
                    </button>
                
                </Link>
              </div>
              <div className="pt-3">
                <p className="text-center pt-3">
                  Don't have an account?
                  <Link to="/" className="text-main-color">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default LoginWithOtp;
