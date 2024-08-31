import { Quiz } from "../models/quiz/quiz.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Question } from "../models/quiz/question.model.js";
import { QaAnalytic } from "../models/analytics/qaanalytics.model.js";
import { PollAnalytic } from "../models/analytics/pollanalytics.model.js";

//#region createQuiz

const createQuiz = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const { title, quizType, questions } = req.body.data;

  if (!title || !quizType) {
    throw new ApiError(400, "Title and quiz type are required.");
  }

  const existingQuiz = await Quiz.findOne({ title, createdBy });

  if (existingQuiz) {
    throw new ApiError(
      401,
      "ERROR :: You can't have the quiz of same name. Please choose different name !!"
    );
  }

  if (questions.length <= 0) {
    throw new ApiError(
      401,
      "ERROR :: You have to add at least one question in quiz"
    );
  }

  await Quiz.create({
    title,
    createdBy,
    quizType: quizType,
    noOfQuestions: questions.length,
  });

  const quizCreatedId = await Quiz.findOne({ title, createdBy }).select("_id");
  const quizId = quizCreatedId._id;

  for (let question of questions) {
    const { questionText, timer, optionType, options } = question;

    if (
      !questionText.trim() === "" ||
      timer.trim() === "" ||
      optionType.trim() === "" ||
      options.length < 2
    ) {
      throw new ApiError(
        401,
        "ERROR :: Please make sure question must have questionText , timer of question,option type and two options at least"
      );
    }

    const questionCreated = await Question.create({
      questionText,
      timer,
      optionType: optionType,
      options,
      quizId,
    });

    if (quizType === "poll") {
      await PollAnalytic.create({ questionId: questionCreated._id });
    } else {
      await QaAnalytic.create({ questionId: questionCreated._id });
    }
  }

  const quizURL = `${quizId}/${title}`;

  res
    .status(201)
    .json(new ApiResponse(201, { quizURL }, "Quiz created succesfully"));
});

//#endregion

//#region deleteQuiz

const deleteQuiz = asyncHandler(async (req, res) => {
  const { quizId, quizType } = req.params;

  const questions = await Question.find({ quizId }).select("_id");

  if (quizType === "qa") {
    for (let questionId of questions) {
      await QaAnalytic.findOneAndDelete({ questionId });
    }
  } else {
    for (let questionId of questions) {
      await PollAnalytic.findOneAndDelete({ questionId });
    }
  }

  await Question.deleteMany({ quizId });

  await Quiz.findOneAndDelete({ _id: quizId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Quiz deleted succesfully"));
});

//#endregion

//#region getAllQuiz

const getAllQuiz = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;

  const quizs = await Quiz.find({ createdBy });

  return res
    .status(200)
    .json(new ApiResponse(200, { quizs }, "All your quizs !"));
});

//#endregion

//#region quiz question wise analysis
const getQuizQuestionWiseAnalytics = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findById({ _id: quizId }).select(
    "-noOfQuestions -createdBy"
  );

  if (!quiz.quizType) {
    throw new ApiError(401, "ERROR :: Invalid request no such quiz exist");
  }

  const questions = await Question.find({ quizId });

  if (questions.length === 0) {
    throw new ApiError(401, "ERROR :: There is no questions in quiz");
  }

  let quizQuestionWiseAnalysis;

  if (quiz.quizType === "poll") {
    quizQuestionWiseAnalysis = await Promise.all(
      questions.map((question) =>
        (async () => await PollAnalytic.findOne({ questionId: question._id }))()
      )
    );
  } else {
    quizQuestionWiseAnalysis = await Promise.all(
      questions.map((question) =>
        (async () => await QaAnalytic.findOne({ questionId: question._id }))()
      )
    );
  }

  if (quizQuestionWiseAnalysis.length === 0) {
    throw new ApiError(501, "ERROR :: Server error ! Please try again ... !");
  }

  // atteching title of each question

  quizQuestionWiseAnalysis =
    quiz.quizType === "qa"
      ? quizQuestionWiseAnalysis.map((questionAnlytics, index) => {
          const { attempt, correctAns, questionId, wrongAns } =
            questionAnlytics;
          const newQuestionAnalytice = {
            attempt,
            correctAns,
            wrongAns,
            questionId,
            questionText: questions[index].questionText,
          };

          return newQuestionAnalytice;
        })
      : quizQuestionWiseAnalysis.map((questionAnlytics, index) => {
          const { optionA, optionB, optionC, optionD, questionId } =
            questionAnlytics;
          const newQuestionAnalytice = {
            optionA,
            optionB,
            optionC,
            optionD,
            questionId,
            questionText: questions[index].questionText,
          };

          return newQuestionAnalytice;
        });

  res.status(200).json(
    new ApiResponse(
      201,
      {
        title: quiz.title,
        createdAt: quiz.createdAt,
        impression: quiz.impression,
        quizType: quiz.quizType,
        questionWiseAnalytics: quizQuestionWiseAnalysis,
      },
      "Succesfully fetch question wise analysis of quiz"
    )
  );
});

//#endregion

//#region quiz name validate

const validateQuizName = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;
  const { title } = req.params;

  const quizExist = await Quiz.findOne({ title, createdBy });

  if (quizExist) {
    throw new ApiError(401, "ERROR :: Same name quiz already exist");
  }

  res.status(200).json(new ApiResponse(200, {}, "Add question to the quiz !"));
});

//#endregion

//#region edit quiz

const editQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { questions } = req.body;

  for (let question of questions) {
    try {
      const { _id, questionText, timer, optionType, options } = question;

      if (
        !questionText.trim() === "" ||
        timer.trim() === "" ||
        optionType.trim() === "" ||
        options.length < 2
      ) {
        throw new ApiError(
          401,
          "ERROR :: Please make sure question must have questionText , timer of question,option type and two options at least"
        );
      }

      const result = await Question.updateOne(
        { _id },
        {
          $set: {
            questionText: questionText,
            options: options,
            timer: timer,
          },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw new ApiError(
        501,
        "ERROR :: Internal error while updating questions",
        error
      );
    }
  }

  res.status(201).json(new ApiResponse(201, {}, "Quiz updated succesfully"));
});

//#endregion

//#region get all question

const getAllQuizQuestion = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  // finding all question

  const questions = await Question.find({ quizId });

  if (!questions) {
    throw new ApiError(401, "Something went wrong while fetching question.");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, { questions }, "Your questions fatched succesfully")
    );
});

//#endregion

export {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getQuizQuestionWiseAnalytics,
  validateQuizName,
  editQuiz,
  getAllQuizQuestion,
};
