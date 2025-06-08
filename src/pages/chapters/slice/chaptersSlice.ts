import { createSlice } from '@reduxjs/toolkit';
import { fetchChaptersBySubjectId, addChapter } from './chapterAPI';

interface Chapter {
  _id: string;
  name: string;
  ranking: number;
  subjectId: string;
  createdAt:string
}

interface ChapterState {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
}

const initialState: ChapterState = {
  chapters: [],
  loading: false,
  error: null,
};

const chapterSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    clearChapters: (state) => {
      state.chapters = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Chapters
    builder
      .addCase(fetchChaptersBySubjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersBySubjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchChaptersBySubjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Chapter
    builder
      .addCase(addChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters.push(action.payload);
      })
      .addCase(addChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearChapters } = chapterSlice.actions;
export default chapterSlice.reducer;
