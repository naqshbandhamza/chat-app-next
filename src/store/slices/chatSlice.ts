// store/slices/chatSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '@/types/chatTypes';
import { Message } from '@/types/chatTypes';

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
    updateChats(state, action: PayloadAction<Message>) {
      const newMessage = action.payload;

      // Find the index of the chat this message belongs to
      const chatIndex = state.chats.findIndex(chat => chat.chat_id === newMessage.chat);
      console.log(chatIndex)

      if (chatIndex !== -1) {
        // Update latest_message
        state.chats[chatIndex].latest_message = newMessage;

        // Move chat to the top of the list
        const updatedChat = state.chats.splice(chatIndex, 1)[0];
        state.chats.unshift(updatedChat);
      } else {
        console.warn('Chat not found for message:', newMessage.chat);
      }
    },
    appendChat(state, action: PayloadAction<Chat>) {
      const newChat = action.payload;
      state.chats = [...state.chats,newChat]
    },
  },
});

export const { setChats, setLoading, setError, clearChats, updateChats,appendChat } = chatSlice.actions;
export default chatSlice.reducer;
