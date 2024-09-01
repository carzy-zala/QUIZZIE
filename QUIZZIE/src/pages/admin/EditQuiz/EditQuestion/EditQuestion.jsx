import { useFieldArray, useForm } from "react-hook-form";
import "./EditQuestion.css";
import { Button, Input } from "../../../../components";
import { useEffect } from "react";

const EditQuestion = ({
  register,
  questionIndex,
  questionsFeild,
  control,
  quizType,
  watch,
}) => {
  const { fields: optionsField } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const options = watch(`questions.${questionIndex}.options`);
  
  

  return (
    <div className="create-quiz-question-card">
      <div>
        <Input
          key={`${questionsFeild}.${questionIndex}`}
          placeholder={quizType === "qa" ? "Q & A Question" : "Poll Question"}
          className="question-text-input"
          {...register(`questions.${questionIndex}.questionText`, {
            require: "Please enter a question !",
          })}
          defaultValue={watch(`questions.${questionIndex}.questionText`)}
        />
      </div>

      <div
        key={`${questionsFeild}.${questionIndex}`}
        className="option-type-grid"
      >
        <div>
          <label className="option-type-text">Option Type</label>
        </div>
        <div className="option-type-radio-btn-text-div">
          <Input
            type="radio"
            id="text"
            value="text"
            className="option-type-radio-btn"
            {...register(`questions.${questionIndex}.optionType`, {
              require: "Please select option type !",
            })}
            disabled={true}
          />
          <label className="option-type-text" htmlFor="text">
            Text
          </label>
        </div>

        <div className="option-type-radio-btn-text-div">
          <Input
            type="radio"
            id="image"
            value="image"
            className="option-type-radio-btn"
            {...register(`questions.${questionIndex}.optionType`, {
              require: "Please select option type !",
            })}
            disabled={true}
          />
          <label className="option-type-text" htmlFor="image">
            Image URL
          </label>
        </div>

        <div className="option-type-radio-btn-text-div">
          <Input
            type="radio"
            id="textImage"
            value="textImage"
            className="option-type-radio-btn"
            {...register(`questions.${questionIndex}.optionType`, {
              require: "Please select option type !",
            })}
            disabled={true}
          />
          <label className="option-type-text" htmlFor="textImage">
            Text & Image URL
          </label>
        </div>
      </div>

      <div className="options-and-timer-grid">
        <div className="options-grid">
          {options.map((_, index) => {
            return (
              <div
                key={`questions${questionIndex}.options${index}`}
                className="option-grid"
              >
                {quizType === "qa" && (
                  <div className="option-radio-btn-outer-circle">
                    <div
                      className={
                        watch(
                          `questions.${questionIndex}.options.${index}.isCorrect`
                        ) === true
                          ? "option-radio-btn-inner-circle"
                          : ""
                      }
                    >
                      <Input
                        type="radio"
                        value={`${index}`}
                        className="option-radio-btn"
                        disabled={true}
                      />
                    </div>
                  </div>
                )}

                <div className="input-grid">
                  {(watch(`questions.${questionIndex}.optionType`) ===
                    "textImage" ||
                    watch(`questions.${questionIndex}.optionType`) ===
                      "text") && (
                    <Input
                      className={`option-input ${
                        watch(`questions.${questionIndex}.optionType`) ===
                          "textImage" && "option-first-input-short"
                      } ${
                        watch(
                          `questions.${questionIndex}.options.${index}.isCorrect`
                        ) === true && "option-correct"
                      }`}
                      placeholder="Text"
                      {...register(
                        `${`questions.${questionIndex}.options.${index}.text`}`,
                        {
                          required: "Question text can't be empty",
                        }
                      )}
                      defaultValue={watch(
                        `questions.${questionIndex}.options.${index}.text`
                      )}
                    />
                  )}

                  {(watch(`questions.${questionIndex}.optionType`) ===
                    "textImage" ||
                    watch(`questions.${questionIndex}.optionType`) ===
                      "image") && (
                    <Input
                      className={`option-input ${
                        watch(
                          `questions.${questionIndex}.options.${index}.isCorrect`
                        ) === true && "option-correct"
                      }`}
                      placeholder="Image URL"
                      {...register(
                        `${`questions.${questionIndex}.options.${index}.imageUrl`}`,
                        {
                          required: "Question text can't be empty",
                        }
                      )}
                      defaultValue={watch(
                        `questions.${questionIndex}.options.${index}.imageUrl`
                      )}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="timer-grid">
          <div className="timer-text">
            <label>Timer</label>
          </div>

          <div className="timer-time-grid-div">
            <div className="timer-time-radio-btn-div">
              <Input
                key={`${questionsFeild}.${questionIndex}`}
                type="radio"
                value="off"
                id="off"
                className="timer-time-radio-btn"
                {...register(`questions.${questionIndex}.timer`)}
              />
              <label>OFF</label>
            </div>

            <div className="timer-time-radio-btn-div">
              <Input
                type="radio"
                id="5"
                value="5"
                className="timer-time-radio-btn"
                {...register(`questions.${questionIndex}.timer`)}
              />
              <label>5 sec</label>
            </div>

            <div className="timer-time-radio-btn-div">
              <Input
                type="radio"
                id="10"
                value="10"
                className="timer-time-radio-btn"
                {...register(`questions.${questionIndex}.timer`)}
              />
              <label>10 sec</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
