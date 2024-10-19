import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "../actions/userActions";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        email: "",
        image: "",
        balance: 0,
        userEnum: "",
        token: ""
    },
    reducers: {
        login: (state, action) => {

        },
        register: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                {/* state = {
                    ...state,
                    email: action.payload.email,
                    token: action.payload.jwt,
                    userEnum: action.payload.role
                }*/}
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                return
            })
    }
})

export const { login, register } = userSlice.actions
export default userSlice.reducer