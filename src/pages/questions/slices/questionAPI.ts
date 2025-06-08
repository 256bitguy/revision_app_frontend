import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
interface QuestionInput {
  ranking: number;
  topicId: string;
  statements: { order: string; statement: string }[];
  options: { order: string; statement: string }[];
  question: string;
  correctOption: number;
  answer: string;
  type: 'single' | 'multiple' | 'assertion-reason' | 'statement-based';
}

// Fetch questions by topic ID
export const fetchQuestionsByTopic = createAsyncThunk(
  'questions/fetchByTopic',
  async (topicId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/questions/${topicId}`);
      console.log(response,"sdklfkaslf;kskdlj")
      return response.data; // Array of questions
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch questions');
    }
  }
);

// Add a new question
export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async (questionData: QuestionInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/questions/publish`, questionData);
      return response.data; // Newly added question
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add question');
    }
  }
);
