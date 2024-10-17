import { createSlice } from "@reduxjs/toolkit";
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
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.userEnum = action.payload.role;
            })
            .addCase(userRegister.fulfilled, () => {
                return console.log("Registro realizado con éxito.");

            })
            .addCase(userSessionPersistence.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.name = action.payload.name;
                state.userEnum = action.payload.role;
                state.token = action.payload.token;
            })
    }
})

export const { login, register } = userSlice.actions
export default userSlice.reducer