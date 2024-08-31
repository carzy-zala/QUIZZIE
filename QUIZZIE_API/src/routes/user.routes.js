import { Router } from "express";
import {
  getScore,
  deleteGuestUser,
  updateAnalytic,
  getQuiz,
  intializeGuestUser,
  editCorrectOrWrong,
} from "../controllers/tempuser.controller.js";
import { verifyGuestJWT } from "../middlewares/guest.middleware.js";

const userRouter = Router();

userRouter.route("/intializeguest/:quizId").get(intializeGuestUser);
userRouter.route("/:quizId/:title").get(getQuiz);
userRouter.route("/getScore").get(verifyGuestJWT, getScore);
userRouter.route("/deleteguestuser").get(verifyGuestJWT, deleteGuestUser);
userRouter.route("/updateanalytic").post(verifyGuestJWT, updateAnalytic);
userRouter.route("/updaterightwrong").post(verifyGuestJWT, editCorrectOrWrong);

export default userRouter;
