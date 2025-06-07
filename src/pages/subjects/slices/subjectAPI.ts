import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosInstance';
 
interface SubjectInput {
  name: string;
  ranking: number;
  userId: string;
}

// Fetch all subjects for a user
export const fetchSubjectsByUser = createAsyncThunk(
  'subjects/fetchByUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/subjects?userId=${userId}`);
      return response.data; // array of subjects
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch subjects');
    }
  }
);

// Add a new subject
export const addSubject = createAsyncThunk(
  'subjects/addSubject',
  async (subjectData: SubjectInput, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/subjects', subjectData);
      return response.data; // newly added subject
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add subject');
    }
  }
);
