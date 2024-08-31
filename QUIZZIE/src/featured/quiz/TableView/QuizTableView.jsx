import { useDispatch, useSelector } from "react-redux";
import { fetchquizs } from "../quizSlice";
import { useEffect, useState } from "react";
import convertDate from "../../../utils/covertDate";
import "./QuizTableView.css";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteQuiz } from "../quizSlice";
import { toast } from "react-toastify";
import { Button } from "../../../components";
import { axiosDelete } from "../../../services/axios.config";
import { apiRoutes } from "../../../services/apiRoutes";
import EditQuiz from "../../../pages/admin/EditQuiz/EditQuiz";

const QuizTableView = () => {
  const navigator = useNavigate();
  const allQuiz = useSelector((state) => state.quizs);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState({
    quizType: "",
    isClicked: false,
    quizId: "",
  });

  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [deleteQuizData, setDeleteQuizData] = useState({
    quizId: "",
    quizType: "",
  });

  useEffect(() => {
    dispatch(fetchquizs());
  }, [isDeleteClick]);

  //#region delete handle

  const handleDeletePopUp = (quizId, quizType) => {
    setDeleteQuizData({ quizId, quizType });
    setIsDeleteClick(true);
  };

  const handleDelete = async () => {
    setIsDeleteClick(false);

    const deleteURL = `${
      import.meta.env.VITE_HOST_API_KEY
    }${apiRoutes.DELETE_QUIZ.replace(":quizId", deleteQuizData.quizId).replace(
      ":quizType",
      deleteQuizData.quizType
    )}`;

    const response = await axiosDelete(deleteURL);

    if (response.success) {
      dispatch(deleteQuiz({ deleteQuizId: deleteQuizData.id }));
      toast.success(response.message);
      setDeleteQuizData({ quizId: "", quizType: "" });
      dispatch(fetchquizs());
    } else {
      toast.error("Something went wrong ! Please try again !");
    }
  };

  const handleDelteCancel = () => {
    setIsDeleteClick(false);
  };

  //#endregion

  // #region share handle
  const handleShare = (title, id) => {
    const quizURL = `${window.location.origin}/user/quiz/${id}/${title.replace(
      " ",
      "-"
    )}`;
    window.navigator.clipboard.writeText(quizURL);
    toast.success("Link copied to Clipboard");
  };

  //#endregion

  //#region edit handle
  const handleEdit = (quizId, quizType) => {

    setIsEdit({
      isClicked: true,
      quizId,
      quizType,
    });
  };
  //#endregion

  return (
    <div>
      {allQuiz.quizs.length ? (
        <div>
          {allQuiz.loading && (
            <div className="quiz-analysis-heading"> Loading ....</div>
          )}
          {allQuiz.error && <div>Errro :{allQuiz.error}</div>}
          <h1 className="quiz-analysis-heading">Quiz Analysis</h1>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {allQuiz.quizs.map((quiz, index) => {
                return (
                  <tr
                    key={quiz._id}
                    className={index % 2 && `quiz-table-blue-row`}
                  >
                    <td>{index + 1}</td>
                    <td>{quiz.title}</td>
                    <td>{convertDate(quiz.createdAt)}</td>
                    <td>{quiz.impression}</td>
                    <td>
                      <Button
                        onClick={() => {
                          const quizId = quiz._id;
                          const quizType = quiz.quizType;
                          return handleEdit(quizId, quizType);
                        }}
                      >
                        <img src="/images/edit.png" />
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          const quizId = quiz._id;
                          const quizType = quiz.quizType;
                          return handleDeletePopUp(quizId, quizType);
                        }}
                      >
                        <img src="/images/delete.png" />
                      </Button>
                    </td>
                    <td>
                      <Button
                        name={quiz.title}
                        id={quiz._id}
                        onClick={() => {
                          const quizTitle = quiz.title;
                          const quizId = quiz._id;
                          return handleShare(quizTitle, quizId);
                        }}
                      >
                        <img src="/images/share.png" />
                      </Button>
                    </td>
                    <td>
                      <NavLink
                        style={{ color: "#000" }}
                        to={`quizanalytics/${quiz._id}`}
                      >
                        Question Wise Anlysis
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="quiz-analysis-heading">
          Oops !! <br /> No quiz created yet.
          <br /> Create quiz now
        </div>
      )}
      {isDeleteClick && (
        <div className="pop-up-div">
          <div className="delete-pop-up">
            <div className="delete-pop-up-text">
              Are you confirm you <br />
              want to delete ?
            </div>
            <div className="delete-pop-up-btns">
              <div>
                <Button
                  children="Confirm Delete"
                  className="delete-pop-up-btn delete-pop-up-red-btn"
                  onClick={handleDelete}
                />
              </div>
              <div>
                <Button
                  children="Cancel"
                  className="delete-pop-up-btns delete-pop-up-white-btn"
                  onClick={handleDelteCancel}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isEdit.isClicked && (
        <div className="pop-up-div">
          <EditQuiz
            quizType={isEdit.quizType}
            quizId={isEdit.quizId}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
    </div>
  );
};

export default QuizTableView;
