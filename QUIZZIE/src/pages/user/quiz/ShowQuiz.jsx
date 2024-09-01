import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../../../services/axios.config";
import ShowQuestion from "../question/ShowQuestion";
import { apiRoutes } from "../../../services/apiRoutes";
import setUserToken from "../../../utils/setGuestUserToken";

function ShowQuiz() {
  const { quizId, title } = useParams();

  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [quiz, setQuiz] = useState(null);

  const fetchAttendingQuiz = async () => {
    const quizURL = `${
      import.meta.env.VITE_HOST_API_KEY
    }${apiRoutes.GET_QUIZ.replace(":quizId", quizId)
      .replace(":title", title)
      .replace("-", " ")}`;

    const response = await (async () =>
      await axiosGet(quizURL, { quizId, title }).then(
        (response) => response
      ))();

    if (response.success) {
      setQuiz(response.data);
    }
  };

  const intializeGuestUser = async () => {
    const intializeURL = `${
      import.meta.env.VITE_HOST_API_KEY
    }${apiRoutes.INITIALIZE_USER.replace(":quizId", quizId)}`;

    const response = await (async () =>
      await axiosGet(intializeURL, { quizId }).then(
        (response) => response.data
      ))();

    await (async () => await setUserToken(response.tempAccessToken))();
  };

  useEffect(() => {
    if (!localStorage.getItem("tempAccessToken")) {
      intializeGuestUser();
    }

    fetchAttendingQuiz();
  }, []);

  return (
    <Fragment>
      {!!quiz && (
        <ShowQuestion
          currentQuestionNo={currentQuestionNo}
          totalQuestions={quiz.noOfQuestions}
          quizId={quizId}
          title={quiz.title}
          questionId={quiz.questions[currentQuestionNo]._id}
          question={quiz.questions[currentQuestionNo].questionText}
          timer={quiz.questions[currentQuestionNo].timer}
          options={quiz.questions[currentQuestionNo].options}
          setCurrentQuestionNo={setCurrentQuestionNo}
          quizType={quiz.quizType}
        />
      )}
    </Fragment>
  );
}

export default ShowQuiz;
