// src/app/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/slices/authSlice";
import subjectReducer from "../pages/subjects/slices/subjectSlice";
import chapterReducer from "../pages/chapters/slice/chaptersSlice";
import topicReducer from "../pages/topics/slice/topicSlice";
import questionReducer from "../pages/questions/slices/questionSlice";
import vocabReducer from "../pages/vocabulary/slices/vocabSlice";

// Configure persist per reducer if needed
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // Replace with actual keys you want to persist
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Other reducers can be added normally or wrapped with persist if needed
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  subjects: subjectReducer,
  chapters: chapterReducer,
  topics: topicReducer,
  questions: questionReducer,
  vocabulary:vocabReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
