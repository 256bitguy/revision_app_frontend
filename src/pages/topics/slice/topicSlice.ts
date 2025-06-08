import { createSlice } from '@reduxjs/toolkit';
import { fetchTopicsByChapter, addTopic } from './topicAPI';

interface Topic {
  _id: string;
  name: string;
  ranking: number;
  chapterId: string;
  createdAt:string
}

interface TopicState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

const initialState: TopicState = {
  topics: [],
  loading: false,
  error: null,
};

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    clearTopics: (state) => {
      state.topics = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTopicsByChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopicsByChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(action.payload);
      })
      .addCase(addTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTopics } = topicSlice.actions;
export default topicSlice.reducer;
