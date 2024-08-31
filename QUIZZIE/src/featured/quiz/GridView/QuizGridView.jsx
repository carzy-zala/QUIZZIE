import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { Card } from "../../../components";
import convertDate from "../../../utils/covertDate";
import "./QuizGridView.css";

function QuizGridView() {
  const allQuiz = useSelector((store) => store.quizs);

  useEffect(() => {}, []);

  return (
    <div className="quiz-grid">
      <div className="quiz-sub-grid">
        {allQuiz.trendyQuiz.map((quiz, index) => {
          return (
            index < 12 && (
              <Card
                key={quiz._id}
                leftText={quiz.title}
                rightText={quiz.impression}
                bottomText={`Created on: ${convertDate(quiz.createdAt)}`}
                parentClassName="quiz-grid-parent-div"
                firstRowGrid="quiz-grid-first-row"
                leftTextClassName="quiz-grid-left-text"
                rightTextClassName="quiz-grid-right-text"
                bottomTextClassName="quiz-grid-bottom-text"
                eyeIcon={<img src="/images/eye.png" alt="icon" />}
                firstRowSet={false}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default QuizGridView;
