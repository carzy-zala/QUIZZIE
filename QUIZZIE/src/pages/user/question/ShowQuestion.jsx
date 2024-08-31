import React, { useEffect, useState } from "react";
import { OptionCard, Input, Button } from "../../../components";
import "./ShowQuestion.css";
import "./ShowQuestionMobile.css";
import "./ShowQuestionLaptop.css";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiRoutes } from "../../../services/apiRoutes";
import { axiosPost } from "../../../services/axios.config";
import { useNavigate } from "react-router-dom";
import SuccessPage from "../SuccessPage/SuccessPage";

function ShowQuestion({
  currentQuestionNo,
  totalQuestions,
  quizId,
  title,
  questionId,
  question,
  setCurrentQuestionNo,
  quizType,
  timer = "off",
  options = [],
}) {
  const navigate = useNavigate();

  //#region for counter work

  const [countdown, setCountdown] = useState();

  const countDown = (timer) => {
    var timeleft = 0;
    executeNext(timer);

    var downloadTimer = setInterval(function () {
      if (timeleft === timer) {
        setCountdown(0);
        clearInterval(downloadTimer);
      }
      setCountdown(timer - timeleft);
      timeleft++;
    }, 1000);
  };

  const executeNext = (time) => {
    const execute = async () => {
      if (quizType === "qa") {
        await updateRightWrong(false);
      }

      if (totalQuestions !== currentQuestionNo + 1) {
        setCurrentQuestionNo(currentQuestionNo + 1);
        reset();
      }

      if (totalQuestions === currentQuestionNo + 1) {
        navigate(`/user/success/${totalQuestions}/${quizType}`);
      }
    };

    setTimeout(() => {
      execute();
    }, time * 1000);
  };

  useEffect(() => {
    if (timer !== "off") {
      const sec = parseInt(timer);
      countDown(sec);
    }
  }, [currentQuestionNo]);

  //#endregion

  // #region for questoin submission

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      isCorrect: "",
    },
  });

  const handleQuestionSubmit = async (data) => {
    const index = parseInt(data["isCorrect"]);

    if (quizType === "qa") {
      if (index + 1) {
        const isCorrect = options[index].isCorrect;
        await updateRightWrong(isCorrect);
      } else {
        await updateRightWrong(false);
      }
    } else {
      await updatePollAnalytics(index);
    }

    if (totalQuestions !== currentQuestionNo + 1) {
      reset();
      setCurrentQuestionNo(currentQuestionNo + 1);
    }

    if (totalQuestions === currentQuestionNo + 1) {
      navigate(`/user/success/${totalQuestions}/${quizType}`);
    }
  };

  // #endregion

  //#region update anlytics

  const updateQaAnalytics = async () => {
    const updateAnalyticsURL = `${import.meta.env.VITE_HOST_API_KEY}${
      apiRoutes.UPDATE_ANALYTIC
    }`;

    const response = await (async () =>
      await axiosPost(updateAnalyticsURL, {
        quizType,
        questionId,
      }).then((response) => response))();
  };

  const updatePollAnalytics = async (option) => {
    const updateAnalyticsURL = `${import.meta.env.VITE_HOST_API_KEY}${
      apiRoutes.UPDATE_ANALYTIC
    }`;

    const response = await (async () =>
      await axiosPost(updateAnalyticsURL, {
        quizType,
        questionId,
        option,
      }).then((response) => response))();
  };

  const updateRightWrong = async (isCorrect) => {
    const updateRightWrong = `${import.meta.env.VITE_HOST_API_KEY}${
      apiRoutes.UPDATE_RIGHT_WRONG
    }`;

    const response = await (async () =>
      await axiosPost(updateRightWrong, {
        quizType,
        questionId,
        isCorrect,
      }))();
  };

  //#endregion

  useEffect(() => {
    if (quizType === "qa") updateQaAnalytics();
    reset();
  }, [currentQuestionNo]);

  return (
    <div className="user-question-card">
      <div className="user-question-detail">
        <div className="user-question-number">
          {`0${currentQuestionNo + 1} / 0${totalQuestions}`}
        </div>

        {timer !== "off" && (
          <div style={{ textAlign: "right" }}>
            <span className="digit"> 0 </span>
            <span className="digit"> 0 </span>
            <span className="digit"> : </span>
            <span className="digit">
              {countdown ? parseInt(countdown / 10) : 0}
            </span>
            <span style={{ paddingRight: "3rem" }} className="digit">
              {countdown ? countdown % 10 : 0}{" "}
            </span>
            <span className="digit">s</span>
          </div>
        )}
      </div>

      <div className="user-question-text">{question}</div>

      <div>
        <form
          style={{ height: "100%" }}
          onSubmit={handleSubmit(handleQuestionSubmit)}
        >
          <div className="option-form">
            {options.length > 0 && (
              <div className="options-div">
                {options.length > 0 &&
                  options.map((option, index) => {
                    return (
                      <div className="option-card" key={index}>
                        <Input
                          type="radio"
                          value={index}
                          className="option-radio-btn"
                          {...register("isCorrect")}
                        />

                        <OptionCard
                          text={option.text}
                          imgUrl={option.imageUrl}
                          optionDivClass={` ${
                            (option.imageUrl &&
                              (option.text
                                ? "option-div option-div-grid "
                                : option.imageUrl && "option-div")) ||
                            "option-text-div"
                          }`}
                          textClass={`${
                            (option.text &&
                              option.imageUrl &&
                              "option-text-img") ||
                            "option-text"
                          }`}
                          imgClass="option-img"
                          imgDivClass={
                            (option.text && "option-img-div") ||
                            "option-only-img-div"
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            )}

            <div className="option-btn-div">
              <Button
                type="submit"
                className="option-next-btn"
                children={
                  currentQuestionNo === totalQuestions - 1 ? "Submit" : "Next"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowQuestion;
