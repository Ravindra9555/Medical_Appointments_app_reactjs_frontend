import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo/logo.png";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDoctor } from "../context/DoctorContext";

const LoginWithPassword = () => {
  const baseurl = process.env.REACT_APP_BASEURL;
  const { doctor, setDoctor } = useDoctor();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseurl}/api/v1/auth/authDoctor`, data);
      if (res.status === 200) {
        console.log(res.data.userDetails);
        setDoctor(res.data.userDetails);
        toast.success(res.data.message);
        localStorage.setItem("access_token", res.data.userDetails.token);

        setTimeout(() => {
          navigate(`/dashboard`);
        }, 1500);
      } else {
        toast.error("Error while fetching data: " + res.status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Password tolggle code
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("password");
  const eyeTogle = () => {
    setShowPassword(!showPassword);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="container">
      <div className="login-container align-content-center">
        <div className="row login-box shadow-sm">
          <div className="col-md-6 align-content-center login-col-1 text-center">
            <img src={logo} className="img-fluid logo-img" alt=" web logo" />
          </div>
          <div className="col-md-6 p-4 bg-body-tertiary">
            <p className="text-center fs-4 fw-medium ">Login to your Account</p>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
              {/* Ensure handleSubmit is attached to onSubmit */}
              <div>
                <label htmlFor="" className="form-label">
                  Mobile No 
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobilenumber"
                  {...register("mobilenumber", {
                    required: "Phone is required",
                    // pattern: {
                    //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    //   message: "Invalid email address",
                    // },
                  })}
                />
                {errors.user_email && (
                  <small className="text-danger">
                    {errors.mobilenumber.message}
                  </small>
                )}
              </div>
              <div className="pt-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <div className="text-end eyebutton ">
                  {showPassword ? (
                    <FontAwesomeIcon onClick={eyeTogle} icon={faEye} />
                  ) : (
                    <FontAwesomeIcon onClick={eyeTogle} icon={faEyeSlash} />
                  )}
                </div>
                <input
                  type={type}
                  className="form-control"
                  name="password"
                  {...register("password", {
                    required: " Pasword is required ",
                    // pattern: {
                    //   value:
                    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    //   message:
                    //     "Minimum eight characters, at least one letter, one number and one special character",
                    // },
                  })}
                />

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div className="pt-3">
                <button
                  type="submit"
                  className="btn btn-outline-dark w-100  text-center" id="background"
                >
                  Sign In
                </button>
              </div>
            </form>
            {loading && (
              <div className="d-flex justify-content-center pt-2">
                <div class="spinner-border text-primary " role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-center">
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
    </div>
  );
};

export default LoginWithPassword;
