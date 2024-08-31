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

  useEffect(() => {
    if (previousQuestionIndex.current === questionIndex) {
      fields.forEach((option, index) => {
        if (optionType === "text") {
          update(index, { ...option, imageUrl: "" });
        } else if (optionType === "image") {
          update(index, { ...option, text: "" });
        }
      });
    }

    previousQuestionIndex.current = questionIndex;
  }, [optionType, questionIndex]);

  useEffect(() => {
    console.log(watch(`questions`));
  }, [watch("questions")]);

  return (
    <div className="options-grid">
      {fields.map((option, index) => {
        {console.log(option,fields,index);
        }
        return (
          <div key={option._id} className="option-grid">
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
                onClick={() => remove(questionIndex, index)}
              />
            )}
          </div>
        );
      })}

      {fields.length < 4 && (
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
              console.log(
                questionIndex,
                watch("questions"),
                watch(`questions.${questionIndex}`)
              );

              console.log("form ", watch());

              append({
                text: "",
                imageUrl: "",
                isCorrect: false,
              });

              console.log(
                questionIndex,
                watch("questions"),
                watch(`questions.${questionIndex}`)
              );

              console.log("form ", watch());
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Options;
