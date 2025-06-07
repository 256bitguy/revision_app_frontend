import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
interface TopicInput {
  name: string;
  ranking: number;
  chapter: string;
}

// Get topics by chapterId
export const fetchTopicsByChapter = createAsyncThunk(
  'topics/fetchByChapter',
  async (chapterId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/topics/${chapterId}`);
      return response.data.allTopics; // array of topics
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch topics');
    }
  }
);

// Add topic
export const addTopic = createAsyncThunk(
  'topics/publish',
  async (topicData: TopicInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/topics/publish`, topicData);
      return response.data;  
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add topic');
    }
  }
);
