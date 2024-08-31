import React from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";

function Delete() {
  const { quizId } = useParams();
  console.log("auizId",quizId);
  

  return (
    <div>
      
    </div>
  );
}

export default Delete;
