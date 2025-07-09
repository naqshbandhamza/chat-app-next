// store/slices/selectedTabSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedChatState {
    id: string | null;
}

const initialState: SelectedChatState = {
    id: null,
};

export const selectedChatSlice = createSlice({
    name: 'selectedChat',
    initialState,
    reducers: {
        setChatId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        resetChatId: (state) => {
            state.id = null;
        },
    },
});

export const { setChatId, resetChatId } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;
