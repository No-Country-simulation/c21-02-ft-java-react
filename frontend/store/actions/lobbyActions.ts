import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/utils";

const createLobbyURL = process.env.NEXT_PUBLIC_CREATE_LOBBY ? process.env.NEXT_PUBLIC_CREATE_LOBBY : ""

export const createLobby = createAsyncThunk(
    'user/login',
    async () => {
        try {
            const data = await fetchData<any>(createLobbyURL,
                "An error has occurred when trying to log in.",
                "POST")
            localStorage.setItem("token", data.jwt)
            return {
                name: data.name,
                email: data.email,
                id: data.id,
                image: data.profileImage,
                token: data.jwt,
                role: data.role
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
);