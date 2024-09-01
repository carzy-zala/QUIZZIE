import React from "react";
import { Button } from "../../../../../../components";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../../../../../../components";

function Options({ control, register, watch, questionIndex }) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const optionType = watch(`questions.${questionIndex}.optionType`);
  const previousQuestionIndex = useRef(questionIndex);
  const options = watch(`questions.${questionIndex}.options`);


  useEffect(() => {
    if (previousQuestionIndex.current === questionIndex) {
      options.forEach((option, index) => {
        if (optionType === "text") {
          update(index, { ...option, imageUrl: "" });
        } else if (optionType === "image") {
          update(index, { ...option, text: "" });
        }
      });
    }

    previousQuestionIndex.current = questionIndex;
  }, [optionType, questionIndex]);


  return (
    <div className="options-grid">
      {options.map((option, index) => {
        return (
          <div
            key={`questions.${questionIndex}.options.${index}`}
            className="option-grid"
          >
            {watch("quizType") === "qa" && (
              <div className="option-radio-btn-outer-circle">
                <div
                  className={
                    watch(`questions.${questionIndex}.correctOption`) ===
                    `${index}`
                      ? "option-radio-btn-inner-circle"
                      : ""
                  }
                >
                  <Input
                    type="radio"
                    value={`${index}`}
                    className="option-radio-btn"
                    {...register(`questions.${questionIndex}.correctOption`, {
                      required: "Please select one correct ans !",
                    })}
                  />
                </div>
              </div>
            )}

            <div className="input-grid">
              {(watch(`questions.${questionIndex}.optionType`) ===
                "textImage" ||
                watch(`questions.${questionIndex}.optionType`) === "text") && (
                <Input
                  key={`questions.${questionIndex}.options.${index}.text`}
                  className={`option-input ${
                    watch(`questions.${questionIndex}.optionType`) ===
                      "textImage" && "option-first-input-short"
                  } ${
                    watch(`questions.${questionIndex}.correctOption`) ===
                      `${index}` && "option-correct"
                  }`}
                  placeholder="Text"
                  {...register(
                    `questions.${questionIndex}.options.${index}.text`,
                    {
                      required: "Question text can't be empty",
                    }
                  )}
                />
              )}

              {(watch(`questions.${questionIndex}.optionType`) ===
                "textImage" ||
                watch(`questions.${questionIndex}.optionType`) === "image") && (
                <Input
                  key={`questions.${questionIndex}.options.${index}.imageUrl`}
                  className={`option-input ${
                    watch(`questions.${questionIndex}.correctOption`) ===
                      `${index}` && "option-correct"
                  }`}
                  placeholder="Image URL"
                  {...register(
                    `questions.${questionIndex}.options.${index}.imageUrl`
                  )}
                />
              )}
            </div>

            {index > 1 && (
              <Button
                className="option-delete-btn"
                children={<img src="/images/delete.png" />}
                onClick={() => remove(index)}
              />
            )}
          </div>
        );
      })}

      {options.length < 4 && (
        <div
          style={{
            paddingLeft: watch("quizType") === "qa" ? "4rem" : "0rem",
          }}
          className="quiz-option-btn-div"
        >
          <Button
            children="Add Option"
            className="quiz-option-btn"
            onClick={() => {
              append(
                {
                  text: "",
                  imageUrl: "",
                  isCorrect: false,
                },
                `questions.${questionIndex}.options`
              );
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Options;
