import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../../services/axiosInstance';


// Fetch all notes by topicId
export const fetchNotesByTopic = createAsyncThunk(
  "notes/fetchByTopic",
  async (topicId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/notes/topic/${topicId}`);
      return res.data.notes;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch notes");
    }
  }
);

// Add a new note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData: any, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/notes/publish", noteData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add note");
    }
  }
);

// Get a single note by ID
export const getNoteById = createAsyncThunk(
  "notes/getById",
  async (noteId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/notes/${noteId}`);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load note");
    }
  }
);
