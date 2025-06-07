import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
// Get all chapters by subjectId
export const fetchChaptersBySubjectId = createAsyncThunk(
  'chapters/fetchBySubject',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chapters?subjectId=${subjectId}`);
      return response.data; // should be an array of chapters
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch chapters');
    }
  }
);

// Add a new chapter
export const addChapter = createAsyncThunk(
  'chapters/addChapter',
  async (
    {
      subjectId,
      name,
      ranking,
    }: { subjectId: string; name: string; ranking: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/chapters`, {
        subjectId,
        name,
        ranking,
      });
      return response.data; // the newly created chapter
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add chapter');
    }
  }
);
