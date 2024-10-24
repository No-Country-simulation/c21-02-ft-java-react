import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/utils";

const baseLobbyURL = process.env.NEXT_PUBLIC_LOBBIES_BASE ?
    process.env.NEXT_PUBLIC_LOBBIES_BASE : ""

export const getLobbies = createAsyncThunk(
    'lobby/get',
    async (token: string) => {
        try {
            const data = await fetchData<any>(baseLobbyURL,
                "An error has occurred while trying to retrieve the lobbies.",
                "GET", null, token)

            return {
                lobbies: data
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
);

export const getLobbyById = createAsyncThunk(
    'lobby/getById',
    async ({ token, id }: { token: string, id: string }) => {
        try {
            const data = await fetchData<any>(baseLobbyURL + '/' + id,
                "An error has occurred while trying to retrieve the lobby.",
                "GET", null, token)
            return {
                data: data
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
);

export const createLobby = createAsyncThunk(
    'lobby/create',
    async () => {
        try {
            const data = await fetchData<any>(baseLobbyURL,
                "An error has occurred while trying to create the lobby.",
                "POST")

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