import { createBrowserRouter } from "react-router-dom";
import Authlayout from "../layout/auth/Authlayout";
import SignUp from "../pages/auth/SignUp/SignUp";
import Login from "../pages/auth/Login/Login";
import Adminlayout from "../layout/admin/Adminlayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AuthGuard from "../guard/AuthGuard";
import QuizTableView from "../featured/quiz/TableView/QuizTableView";
import QuizAnalyticLayout from "../layout/admin/Analytics/QuizAnalyticLayout";
import QuestionWiseAnalysis from "../pages/admin/Analytics/QuestionWiseAnalysis";
import SuccessPage from "../pages/user/SuccessPage/SuccessPage";
import ShowQuiz from "../pages/user/quiz/ShowQuiz";
import QuizLayout from "../layout/user/QuizLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authlayout />,
    children: [
      {
        path: "",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: (
          <AuthGuard>
            <QuizAnalyticLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: "",
            element: <QuizTableView />,
          },
          {
            path: "quizanalytics/:quizId",
            element: <QuestionWiseAnalysis />,
          },
        ],
      },
    ],
  },

  {
    path: "/user",
    element: <QuizLayout />,
    children: [
      {
        path: "quiz/:quizId/:title",
        element: <ShowQuiz />,
      },
      {
        path: "success/:totalQuestions/:quizType",
        element: <SuccessPage />,
      },
    ],
  },
]);