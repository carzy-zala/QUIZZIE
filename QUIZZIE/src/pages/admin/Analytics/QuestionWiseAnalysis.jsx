import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuizAnalysis } from "../../../featured/anlytics/analyticSlice";
import convertDate from "../../../utils/covertDate";
import { Card } from "../../../components";
import "./QuestionWiseAnalysis.css";

function QuestionWiseAnalysis() {
  const { quizId } = useParams();

  const analytics = useSelector((store) => store.analytics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizAnalysis(quizId));
  }, [quizId]);

  

  return (
    <div className="quiz-analytics-main-div">
      <div className="quiz-analytic-header">
        <div className="quiz-analytic-quiz-title">
          {analytics.title} Quiz Analysis
        </div>
        <div className="quiz-analytic-quiz-details-div">
          <div className="quiz-analytic-quiz-detail">
            Created On : {convertDate(analytics.createdAt)}
          </div>
          <div className="quiz-analytic-quiz-detail">
            Impressions : {analytics.impression}
          </div>
        </div>
      </div>

      <div className="quiz-analytic-questions">
        {analytics.questionWiseAnalytics.map((question, index) => (
          <div key={index} className="quiz-analytic-question-main">
            <div  className="quiz-analytic-question-main-div">
              <div className="quiz-analytic-question-text">
                Q.{index + 1} {question.questionText}
              </div>
              {analytics.quizType === "qa" && (
                <div className="quiz-analytic-question-detail-card-grid">
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.attempt}
                    leftTextClassName="quiz-analytic-question-detail-number span-number"
                    bottomText="People attempted the question"
                    bottomTextClassName="quiz-analytic-question-detail-text"
                  />
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.correctAns}
                    leftTextClassName="quiz-analytic-question-detail-number span-number"
                    bottomText="People answered correctly"
                    bottomTextClassName="quiz-analytic-question-detail-text"
                  />
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.wrongAns}
                    leftTextClassName="quiz-analytic-question-detail-number span-number"
                    bottomText="People answered incorrectly "
                    bottomTextClassName="quiz-analytic-question-detail-text"
                  />
                </div>
              )}
              
              {analytics.quizType === "poll" && (
                <div className="quiz-analytic-question-detail-card-grid-poll">
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.optionA}
                    leftTextClassName="quiz-analytic-question-detail-number horizontal-right"
                    rightText="Option 1"
                    rightTextClassName="quiz-analytic-question-detail-text vertical-center"
                    firstRowGrid="span-row"
                  />
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.optionB}
                    leftTextClassName="quiz-analytic-question-detail-number horizontal-right"
                    rightText="Option 2"
                    rightTextClassName="quiz-analytic-question-detail-text vertical-center"
                    firstRowGrid="span-row"
                  />
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.optionC}
                    leftTextClassName="quiz-analytic-question-detail-number horizontal-right"
                    rightText="Option 3"
                    rightTextClassName="quiz-analytic-question-detail-text vertical-center"
                    firstRowGrid="span-row"
                  />
                  <Card
                    parentClassName="quiz-analytic-question-detail-card"
                    leftText={question.optionD}
                    leftTextClassName="quiz-analytic-question-detail-number horizontal-right"
                    rightText="Option 4"
                    rightTextClassName="quiz-analytic-question-detail-text vertical-center"
                    firstRowGrid="span-row"
                  />
                </div>
              )}
            </div>
            {analytics.questionWiseAnalytics.length - 1 !== index && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionWiseAnalysis;
