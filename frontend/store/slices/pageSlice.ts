import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: "page",
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
})

export const { setLoading } = pageSlice.actions;
export default pageSlice.reducer