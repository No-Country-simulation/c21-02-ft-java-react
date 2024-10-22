import { createSlice } from "@reduxjs/toolkit";
import { createLobby } from "../actions/lobbyActions";

const lobbySlice = createSlice({
    name: "user",
    initialState: {
        id: 0,
        name: "",
        email: "",
        image: "",
        balance: 0,
        userEnum: "",
        token: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createLobby.fulfilled, (state, action) => {

            })
    }
})

export default lobbySlice.reducer