import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/adminuser.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const adminUserRoute = Router();

adminUserRoute.route("/register").post(registerUser);
adminUserRoute.route("/login").post(loginUser);

// secure routes
adminUserRoute.route("/logout").post(verifyJWT, logoutUser);

export default adminUserRoute;
