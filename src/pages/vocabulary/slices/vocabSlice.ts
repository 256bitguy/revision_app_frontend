import { createSlice } from '@reduxjs/toolkit';
import { fetchVocabularyByTopic, addVocabulary } from './vocabAPI';

interface FillingBlank {
  question: string;
  word: string;
}

interface VocabularyEntry {
  _id: string;
  word: string;
  topicId: string;
  explanation: string;
  synonyms: string[];
  antonyms: string[];
  fillingBlanks: FillingBlank[];
}

interface VocabularyState {
  vocabulary: VocabularyEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: VocabularyState = {
  vocabulary: [],
  loading: false,
  error: null,
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    clearVocabulary: (state) => {
      state.vocabulary = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch vocabulary
      .addCase(fetchVocabularyByTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVocabularyByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.vocabulary = action.payload;
      })
      .addCase(fetchVocabularyByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // add vocabulary
      .addCase(addVocabulary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVocabulary.fulfilled, (state, action) => {
        state.loading = false;
        state.vocabulary.push(action.payload);
      })
      .addCase(addVocabulary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearVocabulary } = vocabularySlice.actions;
export default vocabularySlice.reducer;
