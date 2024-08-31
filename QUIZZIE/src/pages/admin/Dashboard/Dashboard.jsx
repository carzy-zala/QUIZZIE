import React, { useEffect } from "react";
import { Card } from "../../../components";
import "./Dashboard.css";
import QuizGridView from "../../../featured/quiz/GridView/QuizGridView";
import { useDispatch, useSelector } from "react-redux";
import { fetchquizs } from "../../../featured/quiz/quizSlice";

function Dashboard() {
  const allQuiz = useSelector((store) => store.quizs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchquizs());
  }, []);

  return (
    <section className="dashboard">
      <section className="dashboard-main">
        <section>
          <div className="dashboard-head-cards">
            <Card
              leftText={allQuiz.quizs.length}
              rightText="Quiz"
              bottomText="Created"
              parentClassName="dashboard-head-card-div"
              firstRowGrid="dashboard-head-first-row"
              leftTextClassName="dashboard-head-left-text quiz-card-color"
              rightTextClassName="dashboard-head-right-text quiz-card-color"
              bottomTextClassName="dashboard-head-bottom-text quiz-card-color"
              parentDivSet={false}
            />

            <Card
              leftText={allQuiz.totalQuestions}
              rightText="Questions"
              bottomText="Created"
              parentClassName="dashboard-head-card-div"
              firstRowGrid="dashboard-head-first-row"
              leftTextClassName="dashboard-head-left-text question-card"
              rightTextClassName="dashboard-head-right-text question-card"
              bottomTextClassName="dashboard-head-bottom-text question-card"
              parentDivSet={false}
            />
            <Card
              leftText={` ${
                allQuiz.totalImpression >= 1000
                  ? `${(allQuiz.totalImpression / 1000).toFixed(2)} K`
                  : allQuiz.totalImpression
              }`}
              rightText="Total"
              bottomText="Impressions"
              parentClassName="dashboard-head-card-div"
              firstRowGrid="dashboard-head-first-row"
              leftTextClassName="dashboard-head-left-text impression-card"
              rightTextClassName="dashboard-head-right-text impression-card"
              bottomTextClassName="dashboard-head-bottom-text impression-card"
              parentDivSet={false}
            />
          </div>
        </section>

        {allQuiz.quizs.length ? (
          <section>
            <div className="dashboard-trendy-quizs">
              <div>
                <h1 className="dashboard-lower-heading">Trending Quizs</h1>
              </div>
              <QuizGridView />
            </div>
          </section>
        ) : null}
      </section>
    </section>
  );
}

export default Dashboard;
