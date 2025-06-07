import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestionsByTopic, addQuestion } from './questionAPI';

interface Question {
  _id: string;
  topicId: string;
  ranking: number;
  question: string;
  statements: { order: string; statement: string }[];
  options: { order: string; statement: string }[];
  correctOption: number[];
  answer: string;
  type: string;
}

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearQuestions: (state) => {
      state.questions = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch questions
      .addCase(fetchQuestionsByTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // add question
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.push(action.payload);
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQuestions } = questionSlice.actions;
export default questionSlice.reducer;
