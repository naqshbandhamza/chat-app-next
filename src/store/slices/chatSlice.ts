// store/slices/chatSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '@/types/chatTypes';

interface ChatState {
  chats: Chat[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearChats(state) {
      state.chats = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setChats, setLoading, setError, clearChats } = chatSlice.actions;
export default chatSlice.reducer;
