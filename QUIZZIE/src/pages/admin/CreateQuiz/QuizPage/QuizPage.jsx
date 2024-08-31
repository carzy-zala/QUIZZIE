import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../../../components";
import "./QuizPage.css";
import QuestionForm from "../QuestionPage/QuestionForm/QuestionForm";
import { toast } from "react-toastify";
import { apiRoutes } from "../../../../services/apiRoutes";
import { axiosGet, axiosPost } from "../../../../services/axios.config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Quizcreated from "../SuccesfulPage/Quizcreated";

const schema = yup.object().shape({
  questions: yup.array().of(
    yup.object().shape({
      questionText: yup.string().required("Question text is required"),
      options: yup.array().of(
        yup.object().shape({
          text: yup.string().when("optionType", (optionType, schema) => {
            if (optionType === "text" || optionType === "textImage") {
              return schema.required("Option text is required");
            }
            return schema;
          }),
          imageUrl: yup.string().when("optionType", (optionType, schema) => {
            if (optionType === "image" || optionType === "textImage") {
              return schema.required("Image URL is required");
            }
            return schema;
          }),
        })
      ),
    })
  ),
});

function QuizPage({ cancelHandle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      quizType: "",
      questions: [
        {
          questionText: "",
          optionType: "text",
          timer: "off",
          options: [
            {
              text: "",
              imageUrl: "",
              isCorrect: false,
            },
            {
              text: "",
              imageUrl: "",
              isCorrect: false,
            },
          ],
          correctAns: "",
        },
        {
          questionText: "",
          optionType: "text",
          timer: "off",
          options: [
            {
              text: "",
              imageUrl: "",
              isCorrect: false,
            },
            {
              text: "",
              imageUrl: "",
              isCorrect: false,
            },
          ],
          correctAns: "",
        },
      ],
    },

    resolver: yupResolver(schema),
  });

  const [quizURL, setQuizURL] = useState();
  const [isContinueClick, setIsContinueClick] = useState(false);
  const [isQuizCardShow, setIsQuizCardShow] = useState(true);
  const [isQuizCreated, setIsQuizCreated] = useState(false);

  //#region for quiz creation

  const handleCreateQuizCancel = () => {
    cancelHandle(false);
  };

  const cleanQAData = (data) => {
    const { questions } = data;
    questions.map((question, index) => {
      const correctAns = parseInt(question.correctOption);
      if (correctAns !== 0 && !correctAns) {
        toast.error(
          "Please make sure correct option is selected in all questions ."
        );
      }

      question.options[correctAns].isCorrect = true;
      return question;
    });

    return {
      ...data,
      questions: data.questions.map(
        ({ correctOption, options, ...question }) => ({
          ...question,
          options: options.map(({ id, ...option }) => option),
        })
      ),
    };
  };

  const cleanPollData = (data) => ({
    ...data,
    questions: data.questions.map((question) => ({
      ...question,
      options: question.options.map(({ id, ...option }) => option),
    })),
  });

  const createQuiz = async (data) => {
    const createQuizURL = `${import.meta.env.VITE_HOST_API_KEY}${
      apiRoutes.CREATE_QUIZ
    }`;

    console.log(data);

    const response = await (async () => axiosPost(createQuizURL, { data }))();

    return response;
  };

  const quizSubmitData = async (data) => {
    const { quizType } = data;

    let actualData;
    if (quizType === "qa") {
      actualData = cleanQAData(data);
    } else {
      actualData = cleanPollData(data);
    }

    const response = await createQuiz(actualData);

    if (response.success) {
      setIsContinueClick(false);
      setIsQuizCreated(true);
      setQuizURL(response.data.quizURL);

      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const quizErrorData = (errors) => {
    toast.error("Please make sure you enter all details of all questions");
  };
  //#endregion

  //#region for handle first pop

  const validateName = async (title) => {
    const validationNameURL = `${
      import.meta.env.VITE_HOST_API_KEY
    }${apiRoutes.VALIDATE_QUIZ_NAME.replace(":title", title)}`;

    const response = await (async () =>
      await axiosGet(validationNameURL, { title }).then(
        (response) => response
      ))();

    return response;
  };

  const validator = async () => {
    const isValid = await validateName(watch("title").trim());

    if (isValid.success) {
      setIsQuizCardShow(false);
      setIsContinueClick(true);
    } else {
      toast.error(isValid.message);
    }
  };

  const handleContinue = () => {
    //#region check name and type is ok or not

    if (watch("title").trim() === "") {
      toast.error("Quiz name can't be empty");
    } else {
      if (watch("quizType") === "") {
        toast.error("Please select quiz type !");
      } else {
        validator();
      }
    }
  };

  //#endregion
  return (
    <div>
      <form onSubmit={handleSubmit(quizSubmitData, quizErrorData)}>
        <div className="quiz-card-div">
          {isQuizCardShow && (
            <div className="quiz-card">
              <div className="quiz-card-grid">
                <div className="quiz-feilds">
                  <Input
                    type="text"
                    className="question-field"
                    {...register("title", {
                      required: "Quiz name can't be empty",
                    })}
                    placeholder="Quiz Name"
                  />
                </div>

                <div className="quiz-feilds-type-options">
                  <label id="quizType">Quiz Type</label>

                  <div className="radio-btn-div">
                    <Input
                      type="radio"
                      id="qa"
                      value="qa"
                      className="radioBtn"
                      {...register("quizType", {
                        required: "Please select quiz type !",
                      })}
                    />
                    <label>Q & A</label>
                  </div>

                  <div className="radio-btn-div">
                    <Input
                      type="radio"
                      id="poll"
                      value="poll"
                      className="radioBtn"
                      {...register("quizType", {
                        required: "Quiz type is required",
                      })}
                    />
                    <label>Poll Type</label>
                  </div>
                </div>

                <div className="quiz-feilds-btns">
                  <Button
                    children="Cancel"
                    className="cancel-btn"
                    onClick={handleCreateQuizCancel}
                  />
                  <Button
                    onClick={handleContinue}
                    children="Continue"
                    className="continue-btn"
                  />
                </div>
              </div>
            </div>
          )}

          {isContinueClick && (
            <QuestionForm
              watch={watch}
              register={register}
              control={control}
              cancelHandle={cancelHandle}
            />
          )}
        </div>
      </form>

      {isQuizCreated && (
        <Quizcreated
          quizURL={quizURL}
          setIsQuizCreated={setIsQuizCreated}
          cancelHandle={cancelHandle}
        />
      )}
    </div>
  );
}

export default QuizPage;
