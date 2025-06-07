import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
interface SubjectInput {
  name: string;
  rank: number;
  author: string;
}

 
export const fetchSubjectsByUser = createAsyncThunk(
  'subjects/author',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/subjects/author/${userId}`);
      return response.data; // array of subjects
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch subjects');
    }
  }
);

 
export const addSubject = createAsyncThunk(
  'subjects/publish',
  async (subjectData: SubjectInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/subjects/publish', subjectData);
      return response.data; // newly added subject
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add subject');
    }
  }
);
