import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
interface TopicInput {
  name: string;
  ranking: number;
  chapterId: string;
}

// Get topics by chapterId
export const fetchTopicsByChapter = createAsyncThunk(
  'topics/fetchByChapter',
  async (chapterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/topics?chapterId=${chapterId}`);
      return response.data; // array of topics
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch topics');
    }
  }
);

// Add topic
export const addTopic = createAsyncThunk(
  'topics/addTopic',
  async (topicData: TopicInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/topics`, topicData);
      return response.data; // newly added topic
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add topic');
    }
  }
);
