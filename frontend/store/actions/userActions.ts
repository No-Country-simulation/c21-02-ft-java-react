import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/utils";

import { setLoading } from "@/store/slices/pageSlice";

import { UserLoginResponse, UserSessionPersistenceResponse } from "@/types/user";

const loginURL = process.env.NEXT_PUBLIC_USER_LOGIN ?
    process.env.NEXT_PUBLIC_USER_LOGIN : ""
const registerURL = process.env.NEXT_PUBLIC_USER_ENDPOINT ?
    process.env.NEXT_PUBLIC_USER_ENDPOINT : ""
const getInfoWithTokenURL = process.env.NEXT_PUBLIC_USER_GET_INFO_WITH_TOKEN ?
    process.env.NEXT_PUBLIC_USER_GET_INFO_WITH_TOKEN : ""

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(false));
        try {
            const data = await fetchData<UserLoginResponse>(loginURL,
                "An error has occurred when trying to log in.",
                "POST",
                { email, password })
            localStorage.setItem("token", data.jwt)
            return {
                name: data.name,
                email: data.email,
                id: data.id,
                image: data.profileImage,
                balance: data.balance,
                token: data.jwt,
                role: data.role
            }
        } catch (error) {
            console.error(error);
            throw error
        } finally {
            thunkAPI.dispatch(setLoading(true));
        }
    }
);

export const userRegister = createAsyncThunk(
    'user/register',
    async ({
        name,
        email,
        password,
        balance,
        userEnum }:
        {
            name: string,
            email: string,
            password: string,
            balance: number,
            userEnum: "USER" | "ADMIN" | "INVITED"
        }, thunkAPI) => {
        console.log({
            name,
            email,
            password,
            balance,
            userEnum
        });
        thunkAPI.dispatch(setLoading(true));
        try {
            const data = await fetchData<void>(registerURL,
                "An error has occurred when trying to sign up.",
                "POST",
                {
                    name,
                    email,
                    password,
                    balance,
                    userEnum
                })
            return console.log(data);
        } catch (error) {
            console.error(error); // Esto se pasará como payload a rejected
            throw error
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

export const userSessionPersistence = createAsyncThunk(
    'user/sessionPersistence',
    async (token: string, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const data = await fetchData<UserSessionPersistenceResponse>(getInfoWithTokenURL,
                "An error has occurred when trying to fetch the information.",
                "GET",
                null, token)

            return {
                id: data.id,
                email: data.email,
                name: data.name,
                image: data.profileImage,
                balance: data.balance,
                role: data.role,
                token: token
            }
        } catch (error) {
            console.error(error);
            throw error
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
);