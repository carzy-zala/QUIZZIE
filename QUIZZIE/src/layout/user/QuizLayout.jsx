import React from "react";
import "./QuizLayout.css";
import { Container } from "../../components";
import { Outlet } from "react-router-dom";
import setUserToken from "../../utils/setGuestUserToken";

function QuizLayout() {
  //#region  setting up default header
  (async () => {
    await setUserToken(localStorage.getItem("tempAccessToken"));
  })();

  //#endregion

  return (
    <Container className="user-question-div">
      <Outlet />
    </Container>
  );
}

export default QuizLayout;
