import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../../services/apiRoutes";
import { axiosGet } from "../../services/axios.config";

export const fetchquizs = createAsyncThunk("quiz/fetchquizs", () => {
  return axiosGet(
    `${import.meta.env.VITE_HOST_API_KEY}${apiRoutes.GET_ALL_QUIZS}`
  ).then((response) => response.data.quizs);
});

const initialState = {
  loading: false,
  quizs: [],
  totalQuestions: 0,
  totalImpression: 0,
  trendyQuiz: [],
  error: "",
};

const quizReducer = createSlice({
  name: "allQuiz",
  initialState,

  reducers: {
    deleteQuiz: (state, action) => {
      state.quizs = state.quizs.filter(
        (quiz) => quiz._id !== action.payload.deleteQuizId
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchquizs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchquizs.fulfilled, (state, actions) => {
      state.loading = false;
      state.quizs = actions.payload;
      state.totalQuestions = state.quizs.reduce(
        (total, quiz) => total + quiz.noOfQuestions,
        0
      );
      state.totalImpression = state.quizs.reduce(
        (total, quiz) => total + quiz.impression,
        0
      );
      state.trendyQuiz = state.quizs
        .filter((quiz) => quiz.impression > 10)
        .sort((a, b) => b.impression - a.impression);
      state.error = "";
    });
    builder.addCase(fetchquizs.rejected, (state, actions) => {
      state.loading = false;
      state.quizs = [];
      state.error = "Please try again later !";
    });
  },
});

export const { deleteQuiz } = quizReducer.actions;

export default quizReducer.reducer;
