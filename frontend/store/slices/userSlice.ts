import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogin, userRegister, userSessionPersistence } from "../actions/userActions";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: 0,
        name: "",
        email: "",
        image: "",
        balance: 0,
        userEnum: "",
        token: "",
        loading: false
    },
    reducers: {
        setNewBalance: (state, action: PayloadAction<number>) => {
            state.balance = state.balance - action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.image = action.payload.image;
                state.balance = action.payload.balance;
                state.userEnum = action.payload.role;
                state.token = action.payload.token;
            })
            .addCase(userRegister.fulfilled, () => {

            })
            .addCase(userSessionPersistence.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.name = action.payload.name;
                state.image = action.payload.image;
                state.userEnum = action.payload.role;
                state.balance = action.payload.balance;
                state.token = action.payload.token;
                state.loading = false
            })
            .addCase(userSessionPersistence.pending, (state, action) => {
                state.loading = true
            })
            .addCase(userSessionPersistence.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export const { setNewBalance } = userSlice.actions
export default userSlice.reducer