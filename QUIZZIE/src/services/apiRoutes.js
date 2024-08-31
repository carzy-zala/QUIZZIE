export const apiRoutes = {
  // auth
  REGISTER_USER: "/user/admin/register",
  LOGIN_USER: "/user/admin/login",
  LOGOUT_USER: "/user/admin/logout",

  // quiz
  CREATE_QUIZ: "/quiz/create",
  DELETE_QUIZ: "/quiz/delete/:quizType/:quizId",
  GET_ALL_QUIZS: "/quiz/getquizs",
  GET_QUIZ_ANALYTIC: "/quiz/quizanalytics/:quizId",
  VALIDATE_QUIZ_NAME: "/quiz/validatename/:title",
  EDIT_QUIZ: "/quiz/editquiz/:quizId",
  GET_QUIZ_QUESTION: "/quiz/getquestions/:quizId",
  


  // guest user
  INITIALIZE_USER: "/user/intializeguest/:quizId",
  GET_QUIZ: "/user/:quizId/:title",
  GET_SCORE: "/user/getScore",
  DELETE_GUEST_USER: "/user/deleteguestuser",
  UPDATE_ANALYTIC: "/user/updateanalytic",
  UPDATE_RIGHT_WRONG:"/user/updaterightwrong"

};
