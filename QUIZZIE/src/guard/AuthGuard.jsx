import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initialised } from "../featured/admin/adminSlice";

function AuthGuard({ children }) {
  const admin = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("Please login first !!");

      navigate("/login");
    }
  }, []);

  return <>{children}</>;
}

export default AuthGuard;
