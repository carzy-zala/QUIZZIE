import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet } from "../../services/axios.config";
import { apiRoutes } from "../../services/apiRoutes";

const initialState = {
  isFetching: false,
  title: "",
  createdAt: "",
  impression: "",
  quizType: "",
  questionWiseAnalytics: [],
  error: [],
};

export const fetchQuizAnalysis = createAsyncThunk(
  "analytic/fetchQuizAnalysis",
  (quizId) => {
    return axiosGet(
      `${
        import.meta.env.VITE_HOST_API_KEY
      }${apiRoutes.GET_QUIZ_ANALYTIC.replace(":quizId", quizId)}`
    ).then((response) => response.data);
  }
);
const analyticReducer = createSlice({
  name: "analytics",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(fetchQuizAnalysis.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchQuizAnalysis.fulfilled, (state, actions) => {
        (state.isFetching = false),
          (state.title = actions.payload.title),
          (state.impression = actions.payload.impression),
          (state.createdAt = actions.payload.createdAt),
          (state.quizType = actions.payload.quizType),
          (state.questionWiseAnalytics = actions.payload.questionWiseAnalytics);
      })
      .addCase(fetchQuizAnalysis.rejected, (state) => {
        isFetching = false;
        state.error = actions.payload.error;
      });
  },
});

export default analyticReducer.reducer;
