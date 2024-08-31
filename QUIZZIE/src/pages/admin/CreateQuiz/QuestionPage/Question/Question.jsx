import "./Question.css";
import { Input } from "../../../../../components";
import Options from "./Options/Options";

const Question = ({
  register,
  questionIndex,
  control,
  watch,
}) => {
 


  return (
    <div className="create-quiz-question-card">
      <div>
        <Input
          key={`questions.${questionIndex}`}
          placeholder={
            watch("quizType") === "qa" ? "Q & A Question" : "Poll Question"
          }
          className="question-text-input"
          {...register(`questions.${questionIndex}.questionText`, {
            require: "Please enter a question !",
          })}
        />
      </div>

      <div key={`questions.${questionIndex}`} className="option-type-grid">
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
          />
          <label className="option-type-text" htmlFor="textImage">
            Text & Image URL
          </label>
        </div>
      </div>

      <div className="options-and-timer-grid">
        <Options 
         control = {control}
         register={register}
         watch={watch}
         questionIndex={questionIndex}
        
        />

        <div className="timer-grid">
          <div className="timer-text">
            <label>Timer</label>
          </div>

          <div className="timer-time-grid-div">
            <div className="timer-time-radio-btn-div">
              <Input
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

export default Question;
