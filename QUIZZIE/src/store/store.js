import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../featured/admin/adminSlice";
import quizsReducer from "../featured/quiz/quizSlice";
import analyticReducer from "../featured/anlytics/analyticSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    quizs: quizsReducer,
    analytics: analyticReducer,
  },
});

export default store;
