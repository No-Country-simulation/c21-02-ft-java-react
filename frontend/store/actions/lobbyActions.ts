import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/utils";

const baseLobbyURL = process.env.NEXT_PUBLIC_LOBBIES_BASE ?
    process.env.NEXT_PUBLIC_LOBBIES_BASE : ""

const getEventsURL = process.env.NEXT_PUBLIC_GET_EVENTS ?
    process.env.NEXT_PUBLIC_GET_EVENTS : ""

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
    async ({ roomName, bet, maxUsers, privateRoom, ownerBet, eventId, token }: { roomName: string, bet: "100" | "500" | "1000" | "2000" | "5000" | "10000", maxUsers: number, privateRoom: boolean, ownerBet: string, eventId: string, token: string }) => {
        try {
            const data = await fetchData<any>(baseLobbyURL + '?eventId=' + eventId,
                "An error has occurred while trying to create the lobby.",
                "POST",
                { roomName, bet: Number(bet), maxUsers, privateRoom, ownerBet },
                token)

            return console.log(data);
        } catch (error) {
            console.error(error);
            throw error
        }
    }
);

export const getEvents = createAsyncThunk(
    'events/get',
    async (token: string) => {
        try {
            const data = await fetchData<any>(getEventsURL,
                "An error has occurred while trying to retrieve the events.",
                "GET", null, token)

            return {
                events: data
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
);