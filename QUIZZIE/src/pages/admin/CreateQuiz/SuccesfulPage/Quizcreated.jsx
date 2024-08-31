import React, { useRef } from "react";
import { Button, Input } from "../../../../components";
import "./Quizcreated.css";
import { toast, ToastContainer } from "react-toastify";

function Quizcreated({ quizURL, setIsQuizCreated, cancelHandle }) {
  const handleClose = () => {
    cancelHandle(false);
    setIsQuizCreated(false);
  };

  const link = useRef(null);

  const handleShareLink = () => {
    link.current.select();
    window.navigator.clipboard.writeText(link.current.value);
    toast.success("Link copied to Clipboard", {
      containerId: "show-toast",
    });
  };

  return (
    <div className="quiz-created-success-main">
      <div className="quiz-created-success-close-btn-div">
        <Button
          className="quiz-created-success-close-btn"
          children={<img src="/images/cancel.svg" onClick={handleClose} />}
        />
      </div>
      <div className="quiz-created-success-greeting">
        <div className="quiz-created-success-text">
          Congrats your Quiz is <br /> Published!
        </div>
        <div className="quiz-created-success-link-div">
          <Input
            ref={link}
            className="quiz-created-success-link"
            value={`${window.location.origin}/user/quiz/${quizURL}`}
            readOnly
          />
        </div>
        <div className="quiz-created-success-share-btn-div">
          <Button
            children="Share"
            className="quiz-created-success-share-btn"
            onClick={handleShareLink}
          />
        </div>
      </div>

      <ToastContainer containerId="show-toast" autoClose={3000} />
    </div>
  );
}

export default Quizcreated;
