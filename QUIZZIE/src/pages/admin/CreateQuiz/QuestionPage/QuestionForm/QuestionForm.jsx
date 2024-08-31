import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../../../../../components";
import "./QuestionForm.css";
import { useState } from "react";
import Question from "../Question/Question";

const QuestionForm = ({ register, control, cancelHandle, watch }) => {
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  const [questionIndex, setQuestionIndex] = useState(0);

  const handleAddQuestion = () => {
    append({
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
      correctAns,
    });

    setQuestionIndex((questionIndex) => questionIndex + 1);
  };

  return (
    <div>
      <div className="create-quiz-card">
        <div className="create-quiz-form">
          <div className="create-quiz-header">
            <div className="create-quiz-number-div">
              <div className="create-quiz-number-grid">
                {fields.map((question, index) => (
                  <div
                    key={`question.${index}`}
                    className={`create-quiz-number-digit-div ${
                      questionIndex === index &&
                      "create-quiz-number-digit-div-selected"
                    }`}
                  >
                    <Button
                      className="create-quiz-number-digit-btn"
                      onClick={() => setQuestionIndex(index)}
                      children={index + 1}
                    />

                    {index !== 0 && (
                      <Button
                        className="create-quiz-delete-btn"
                        onClick={() => {
                          remove(index);
                          if (questionIndex === index) {
                            setQuestionIndex(index - 1);
                          }
                        }}
                        children={<img src="/images/deleteCross.png" />}
                      />
                    )}
                  </div>
                ))}
              </div>

              {fields.length !== 5 && (
                <div className="create-quiz-add-btn-div">
                  <Button
                    className="create-quiz-add-btn"
                    onClick={handleAddQuestion}
                    children={<img src="/images/plus.png" />}
                  />
                </div>
              )}
            </div>

            <div className="create-quiz-number-warn">Max 5 questions</div>
          </div>

          <div className="create-quiz-dynamic-form">
            <Question
              register={register}
              control={control}
              questionIndex={questionIndex}
              cancelHandle={cancelHandle}
              watch={watch}
            />
          </div>

          <div className="create-quiz-btns">
            <Button
              children="Cancel"
              className="create-quiz-cancel-btn"
              onClick={() => cancelHandle(false)}
            />
            <Button
              type="submit"
              children="Create Quiz"
              className="create-quiz-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
