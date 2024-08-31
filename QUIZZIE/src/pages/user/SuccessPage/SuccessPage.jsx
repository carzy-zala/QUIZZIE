import React, { useEffect, useState } from "react";
import "./SuccessPage.css";
import { useParams } from "react-router-dom";
import { axiosGet } from "../../../services/axios.config";
import { apiRoutes } from "../../../services/apiRoutes";
import setUserToken from "../../../utils/setGuestUserToken";

function SuccessPage() {
  const { totalQuestions, quizType } = useParams();
  const [score, setScore] = useState(sessionStorage.getItem("score"));

  const getScore = async () => {
    const getScoreURL = `${import.meta.env.VITE_HOST_API_KEY}${
      apiRoutes.GET_SCORE
    }`;

    const liveScore = await (async () =>
      await axiosGet(getScoreURL).then((response) => response.data))();

    if (liveScore) {
      setScore(liveScore.score.score);
      sessionStorage.setItem("score", liveScore.score.score);
      await deleteThisUser();
    }
  };

  const deleteThisUser = async () => {
    const deleteUser = `${import.meta.env.VITE_HOST_API_KEY}${
      apiRoutes.DELETE_GUEST_USER
    }`;

    const response = await (async () =>
      await axiosGet(deleteUser).then((response) => response.message))();

    setUserToken();
  };

  useEffect(() => {
    if (quizType === "qa" && !sessionStorage.getItem("score")) {
      sessionStorage.setItem("score", 0);
      getScore();
    }
  }, []);

  return quizType !== "poll" ? (
    <div className="qa-success-card">
      <p className="qa-success-text">Congrats Quiz is completed</p>
      <div className="trophy-img">
        <img src="/images/success.png" />
      </div>
      <p style={{ alignSelf: "start" }} className="qa-success-text">
        Your Score is
        <span className="score">{` 0${
          score ? score : 0
        }/0${totalQuestions}`}</span>
      </p>
    </div>
  ) : (
    <div className="poll-success-card">
      <p className="poll-success-text">
        Thank you <br />
        for participating in the Poll
      </p>
    </div>
  );

  // </div>
}

export default SuccessPage;
