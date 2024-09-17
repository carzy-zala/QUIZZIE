import React, { useState } from "react";
import { Input, Button, Logo } from "../../../components";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { axiosPost } from "../../../services/axios.config";
import { apiRoutes } from "../../../services/apiRoutes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signup } from "../../../featured/admin/adminSlice";
import { Navigate, useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const signupError = (errors) => {
    for (let error in errors) {
      setFocus(error, false);
      setValue(error, "");
      toast.error(errors[error].message);
    }
  };

  const signupUser = async (data) => {
    if (!isLoading) {
      setIsLoading(true);
      const { fullName, email, password } = data;

      const responseData = await axiosPost(apiRoutes.REGISTER_USER, {
        fullName,
        email,
        password,
      });

      if (responseData.success) {
        dispatch(signup({ email }));
        toast.success(responseData.message);
        reset();
        navigator("/login");
      } else {
        toast.error(responseData.message);
      }

      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(signupUser, signupError)} noValidate>
      <div className="signup-main-div">
        <label className="signup-label" htmlFor="fullName">
          Name
        </label>
        <Input
          id="fullName"
          type="text"
          className={`signup-input ${errors.fullName && `signup-input-error`}`}
          {...register("fullName", {
            required: "Name can't be empty",
            minLength: 3,
            pattern: /^[a-zA-Z\s'-]+$/,
          })}
          placeholder={errors.fullName && errors.fullName.message}
        />
        <label className="signup-label" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          className={`signup-input ${errors.email && `signup-input-error`}`}
          {...register("email", {
            required: "Email can't be empty",
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
          placeholder={errors.email && errors.email.message}
        />

        <label className="signup-label" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          className={`signup-input ${errors.password && `signup-input-error`}`}
          {...register("password", {
            required: "Password can't be empty",
            validate: (value) => {
              const hasUpperCase = /[A-Z]/.test(value);
              const hasLowerCase = /[a-z]/.test(value);
              const hasNumber = /\d/.test(value);
              const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
              const minLength = value.length >= 8;

              if (!minLength) {
                return "Password must be at least 8 characters long";
              } else if (!hasUpperCase) {
                return "Password must contain at least one uppercase letter";
              } else if (!hasLowerCase) {
                return "Password must contain at least one lowercase letter";
              } else if (!hasNumber) {
                return "Password must contain at least one number";
              } else if (!hasSpecialChar) {
                return "Password must contain at least one special character";
              }

              return true; // Valid password
            },
          })}
          placeholder={errors.password && errors.password.message}
        />

        <label className="signup-label" htmlFor="cfpass">
          Confirm Password
        </label>
        <Input
          id="cfpass"
          // type="password"
          className={`signup-input ${errors.cfpass && `signup-input-error`}`}
          {...register("cfpass", {
            required: "Password doesn't match",
            validate: (value) =>
              value === watch("password") || "Password doesn't match ",
          })}
          placeholder={errors.cfpass && errors.cfpass.message}
        />

        <Button
          disable={true}
          type="submit"
          className="signup-btn"
          children={isLoading ? <div class="loader"></div> : "Sign-Up"}
        />
      </div>
    </form>
  );
}

export default SignUp;
