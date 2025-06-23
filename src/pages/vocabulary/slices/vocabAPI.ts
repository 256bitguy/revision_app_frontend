import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';

export const fetchVocabularyByTopic = createAsyncThunk(
  'vocabulary/fetchByTopic',
  async (topicId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/vocabulary/${topicId}`);
      return res.data.vocabulary;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch vocabulary');
    }
  }
);

export const addVocabulary = createAsyncThunk(
  'vocabulary/add',
  async (vocabData: {
    word: string;
    topicId: string;
    explanation: string;
    synonyms: string[];
    antonyms: string[];
    fillingBlanks: { question: string; word: string }[];
  }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/vocabulary/publish', vocabData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add vocabulary');
    }
  }
);
