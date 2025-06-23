import { createSlice } from "@reduxjs/toolkit";
import { fetchNotesByTopic, addNote, getNoteById } from "./noteApi";
export interface Point {
  label: string;
  explanation: string;
  example?: string;
}

export interface Subheading {
  title: string;
  points: Point[];
  example?: string;
  linkingNote?: string;
  personalQuery?: string;
  queryExplanation?: string;
}

export interface Note {
  _id: string;
  topicId: string;
  heading: string;
  subheadings: Subheading[];
}

interface NoteState {
  notes: any[];
  currentNote: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  currentNote: null,
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearNotes: (state) => {
      state.notes = [];
      state.currentNote = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all notes for a topic
      .addCase(fetchNotesByTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotesByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotesByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add note
      .addCase(addNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get note by ID
      .addCase(getNoteById.pending, (state) => {
        state.loading = true;
        state.currentNote = null;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearNotes } = noteSlice.actions;
export default noteSlice.reducer;
