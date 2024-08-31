import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createQuiz,
  deleteQuiz,
  editQuiz,
  getAllQuiz,
  getAllQuizQuestion,
  getQuizQuestionWiseAnalytics,
  validateQuizName,
} from "../controllers/quiz.controller.js";

const quizRoute = Router();

// user must be login
quizRoute.use(verifyJWT);

quizRoute.route("/create").post(createQuiz);
quizRoute.route("/delete/:quizType/:quizId").delete(deleteQuiz);

// getting quiz
quizRoute.route("/getquizs").get(getAllQuiz);
quizRoute.route("/quizanalytics/:quizId").get(getQuizQuestionWiseAnalytics);
quizRoute.route("/validatename/:title").get(validateQuizName);

quizRoute.route("/editquiz/:quizId").patch(editQuiz);
quizRoute.route("/getquestions/:quizId").get(getAllQuizQuestion);

export default quizRoute;
