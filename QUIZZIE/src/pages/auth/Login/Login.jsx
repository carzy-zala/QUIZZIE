import React, { useEffect, useState } from "react";
import "./Login.css";
import { Input, Button } from "../../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../featured/admin/adminSlice";
import { axiosPost } from "../../../services/axios.config";
import { apiRoutes } from "../../../services/apiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import setToken from "../../../utils/setToken";
import axios from "axios";

function Login() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const admin = useSelector((store) => store.admin);
  const getIntialValue = () => ({
    email: `${admin.email || ""}`,
    passsword: "",
  });

  const { register, handleSubmit } = useForm({
    defaultValues: getIntialValue(),
  });

  const handleLogin = async (data) => {
    if (!isLoading) {
      setIsLoading(true);

      const { email, password } = data;

      if (
        !email ||
        !password ||
        email.trim() === "" ||
        password.trim() === ""
      ) {
        toast.error("Email or password can't be empty ! ");
      } else {
        const responseData = await axiosPost(apiRoutes.LOGIN_USER, {
          email,
          password,
        });

        if (responseData.success) {
          dispatch(login());
          await setToken(
            responseData.data.accessToken,
            responseData.data.refreshToken
          );
          sessionStorage.setItem("accessToken", responseData.data.accessToken);
          toast.success(responseData.message);
          navigator("/admin/dashboard");
        } else {
          toast.error(responseData.message);
        }
      }

      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="login-main-div">
        <label className="login-label" htmlFor="email">
          Email
        </label>
        <Input id="email" className="login-input" {...register("email")} />

        <label className="login-label" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          className="login-input"
          {...register("password")}
        />
        <Button
          type="submit"
          children={isLoading ? <div className="loader"></div> : "Log In"}
          className="login-btn"
        />
      </div>
    </form>
  );
}

export default Login;
