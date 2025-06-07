import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
// Get all chapters by subjectId
export const fetchChaptersBySubjectId = createAsyncThunk(
  'chapters/fetchBySubject',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chapters/${subjectId}`);
      console.log(response,"gdrvdf");
      return response.data.allChapters; // should be an array of chapters

    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch chapters');
    }
  }
);

// Add a new chapter
export const addChapter = createAsyncThunk(
  'chapters/publish',
  async (
    {
      subject,
      name,
      ranking,
    }: { subject: string; name: string; ranking: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/chapters/publish`, {
        subject,
        name,
        ranking,
      });
      
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add chapter');
    }
  }
);
