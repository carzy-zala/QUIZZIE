import React from "react";
import QuizTableView from "../../../featured/quiz/TableView/QuizTableView";
import { Container } from "../../../components";
import { Outlet } from "react-router-dom";
import "./QuizAnalyticLayout.css";

function QuizAnalyticLayout() {
  return (
    <Container className="quiz-analytics-main">
      <Container className="quiz-analytics-layout">
        <Outlet />
      </Container>
    </Container>
  );
}

export default QuizAnalyticLayout;
