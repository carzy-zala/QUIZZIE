import React, { useEffect, useState } from "react";
import "./EditQuiz.css";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Input } from "../../../components";
import EditQuestion from "./EditQuestion/EditQuestion";
import { apiRoutes } from "../../../services/apiRoutes";
import { axiosGet, axiosPatch } from "../../../services/axios.config";
import { toast } from "react-toastify";

function EditQuiz({ setIsEdit, quizId, quizType }) {
  const { register, control, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      questions: [],
    },
  });

  const { fields: questionsFeild } = useFieldArray({
    control,
    name: "questions",
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleQuizQuestion = async () => {
    const getQuestionsURL = `${
      import.meta.env.VITE_HOST_API_KEY
    }${apiRoutes.GET_QUIZ_QUESTION.replace(":quizId", quizId)}`;

    const response = await (async () =>
      await axiosGet(getQuestionsURL, { quizId }).then(
        (response) => response
      ))();

    if (response.success) {
      const responseData = response.data;
      reset({ questions: responseData.questions });
    } else {
      toast.error(response.message);
    }
  };

  const handleUpdateQuestion = async (data) => {
    const { questions } = data;

    const updateURL = `${
      import.meta.env.VITE_HOST_API_KEY
    }${apiRoutes.EDIT_QUIZ.replace(":quizId", quizId)}`;

    const response = await (async () =>
      await axiosPatch(updateURL, { questions }))();

    if (response.success) {
      toast.success(response.message);
      setIsEdit(false);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    (async () => await handleQuizQuestion())();
  }, []);

  return (
     <div className="edit-main-div" style={{ backgroundColor: "#fff" }}>
      {!!questionsFeild.length && <div className="edit-form-div-grid">
        <div className="edit-form-header-grid">
          <div className={"edit-form-question-number-grid"}>
            {questionsFeild.map((_, index) => {
              return (
                <div key={index}>
                  <Button
                    className={`edit-question-number-btn  ${
                      currentQuestion === index &&
                      "edit-question-number-btn-selected"
                    } `}
                    onClick={() => handleChangeQuestion(index)}
                    children={index + 1}
                  />
                </div>
              );
            })}
          </div>

          <div className="create-quiz-number-warn">Max 5 questions</div>
        </div>

        <form onSubmit={handleSubmit(handleUpdateQuestion)}>
          <div className="edit-quiz-form-grid">
            <div>
              {
                <EditQuestion
                  register={register}
                  control={control}
                  watch={watch}
                  questionIndex={currentQuestion}
                  questionsFeild={questionsFeild}
                  quizType={quizType}
                />
              }
            </div>
            <div className="edit-btns-grid">
              <div>
                <Button
                  className="edit-quiz-cancel-btn"
                  children="Cancel"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                />
              </div>
              <div>
                <Button
                  type="sumit"
                  className="edit-quiz-btn"
                  children="Save"
                />
              </div>
            </div>
          </div>
        </form>
      </div>}
    </div>
  );
}

export default EditQuiz;
