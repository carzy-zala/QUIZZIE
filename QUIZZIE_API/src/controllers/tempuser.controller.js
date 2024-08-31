import { asyncHandler } from "../utils/asyncHandler.js";
import { Quiz } from "../models/quiz/quiz.model.js";
import { Question } from "../models/quiz/question.model.js";
import { QaAnalytic } from "../models/analytics/qaanalytics.model.js";
import { PollAnalytic } from "../models/analytics/pollanalytics.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tempuser } from "../models/user/tempUser.model.js";

const generateAccessToken = async (userId, quizType) => {
  try {
    const tempUser = await Tempuser.findById(userId);

    const tempAccessToken = tempUser.generateAccessToken(quizType);

    tempUser.tempAccessToken = tempAccessToken;
    await tempUser.save({ validateBeforeSave: false });

    return tempAccessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "ERROR :: Something went wrong while generating access token !!"
    );
  }
};

//#region get quiz
const getQuiz = asyncHandler(async (req, res) => {
  const { quizId, title } = req.params;

  try {
    const quiz = await Quiz.findById({ _id: quizId });
    if (!quiz) {
      throw new ApiError(401, "ERROR :: Quiz doesn't exist");
    }

    await quiz.updateOne({ impression: quiz.impression + 1 });

    const questionArray = await Question.find({ quizId: quiz._id });

    if (questionArray.length === 0) {
      throw new ApiError(401, "ERROR :: No questions are there in quiz");
    }

    res.status(201).json(
      new ApiResponse(
        201,
        {
          quizType: quiz.quizType,
          noOfQuestions: quiz.noOfQuestions,
          questions: questionArray,
        },
        "Your quiz is ready !!"
      )
    );
  } catch (error) {
    throw new ApiError(401, "ERROR :: Sorry !! Error in fetching quiz !!");
  }
});
//#endregion

//#region initlize user

const intializeGuestUser = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const tempUser = await Tempuser.create({ quizId });
  
  if (!tempUser) {
    throw new ApiError(
      501,
      "ERROR :: Internal error ! Please try again letter"
    );
  }

  const quiz = await Quiz.findById({ _id: quizId });
  if (!quiz) {
    throw new ApiError(401, "ERROR :: Quiz doesn't exist");
  }


  const tempAccessToken = await generateAccessToken(
    tempUser._id,
    quiz.quizType
  );

  res
    .status(201)
    .cookie("tempAccessToken", tempAccessToken)
    .json(
      new ApiResponse(
        201,
        {
          tempAccessToken,
        },
        "Your quiz is ready !!"
      )
    );
});

//#endregion

//#region get score

const getScore = asyncHandler(async (req, res) => {
  const id = req.id;

  const score = await Tempuser.findById({ _id: id }).select("score");

  if (!score) {
    throw new ApiError(401, "ERROR :: Sorry !! Error in fetching score !");
  }

  res
    .status(201)
    .json(new ApiResponse(201, { score }, "Score fetched succesfully !"));
});

//#endregion

//#region deleteuser

const deleteGuestUser = asyncHandler(async (req, res) => {
  const id = req.id;

  await Tempuser.findByIdAndDelete({ _id: id });

  res.status(200).json(new ApiResponse(200, {}, "User cleared succesfully !!"));
});

//#endregion

//#region update analytics

const updateAnalytic = asyncHandler(async (req, res) => {
  const { quizType } = req.body;
  const { questionId } = req.body;

  if (quizType === "qa") {
    let anlyticExist = await QaAnalytic.findOne({ questionId });

    if (!anlyticExist) {
      anlyticExist = await QaAnalytic.create({ questionId });
    }

    await anlyticExist.updateOne({ attempt: anlyticExist.attempt + 1 });
  } else {
    const { option } = req.body;

    let anlyticExist = await PollAnalytic.findOne({ questionId });

    if (!anlyticExist) {
      anlyticExist = await PollAnalytic.create({ questionId });
    }

    switch (option) {
      case 0:
        await anlyticExist.updateOne({
          attempt: anlyticExist.attempt + 1,
          optionA: anlyticExist.optionA + 1,
        });
        break;
      case 1:
        await anlyticExist.updateOne({
          attempt: anlyticExist.attempt + 1,
          optionB: anlyticExist.optionB + 1,
        });
        break;
      case 2:
        await anlyticExist.updateOne({
          attempt: anlyticExist.attempt + 1,
          optionC: anlyticExist.optionC + 1,
        });
        break;
      case 3:
        await anlyticExist.updateOne({
          attempt: anlyticExist.attempt + 1,
          optionD: anlyticExist.optionD + 1,
        });
        break;
      default:
        break;
    }
  }

  res
    .status(201)
    .json(new ApiResponse(200, {}, "Analytics update succesfully"));
});

//#endregion

//#region update wrong/right
const editCorrectOrWrong = asyncHandler(async (req, res) => {
  const id = req.id;
  const { isCorrect, questionId } = req.body;

  const anlyticExist = await QaAnalytic.findOne({ questionId });

  if (!anlyticExist) {
    anlyticExist = await QaAnalytic.create({ questionId });
  }

  if (isCorrect) {
    const tempUser = await Tempuser.updateOne(
      { _id: id },
      { $inc: { score: 1 } }
    );

    await anlyticExist.updateOne({ correctAns: anlyticExist.correctAns + 1 });
  } else {
    await anlyticExist.updateOne({ wrongAns: anlyticExist.wrongAns + 1 });
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Question analytics updated succesfully"));
});

//#endregion

export {
  getQuiz,
  deleteGuestUser,
  updateAnalytic,
  getScore,
  intializeGuestUser,
  editCorrectOrWrong,
};
