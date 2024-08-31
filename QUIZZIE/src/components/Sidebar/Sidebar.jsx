import React, { useEffect, useState } from "react";
import { Button, Logo } from "../index";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import QuizPage from "../../pages/admin/CreateQuiz/QuizPage/QuizPage";
import { useDispatch } from "react-redux";
import { fetchquizs } from "../../featured/quiz/quizSlice";
import LogoutPage from "../../pages/admin/Logout/LogoutPage";

function Sidebar() {
  const [isCreateQuizClick, setIsCreateQuizClick] = useState(false);
  const [isLogoutClick, setIsLogoutClick] = useState(false);

  const dispatch = useDispatch();

  const handleCreateQuiz = () => {
    setIsCreateQuizClick(true);
  };

  useEffect(
    (useEffect) => {
      dispatch(fetchquizs());
    },
    [isCreateQuizClick]
  );

  return (
    <div className="sidebar">
      <div>
        <Logo className="sidebar-logo" />
      </div>
      <div className="sidebar-btns-grid">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `sidebar-btns sidebar-nav-btn ${isActive && "sidebar-btn-clicked"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="analytics"
          className={({ isActive }) =>
            `sidebar-btns sidebar-nav-btn ${isActive && "sidebar-btn-clicked"}`
          }
        >
          Analytics
        </NavLink>
        <Button
          to=""
          className="sidebar-btns sidebar-nav-btn "
          onClick={handleCreateQuiz}
        >
          Create Quiz
        </Button>
      </div>
      <div>
        <hr />
        <Button className="sidebar-btns sidebar-logout-btn" onClick={()=>setIsLogoutClick(true)}>LOGOUT</Button>

        {isCreateQuizClick && <QuizPage cancelHandle={setIsCreateQuizClick} />}
        {isLogoutClick && <LogoutPage cancelHandle={setIsLogoutClick} />}
      </div>
    </div>
  );
}

export default Sidebar;
