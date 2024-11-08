import { createSlice } from "@reduxjs/toolkit";
import { createLobby, getEvents, getLobbies, getLobbyById } from "@/store/actions/lobbyActions";

const lobbySlice = createSlice({
    name: "lobby",
    initialState: {
        lobbies: [
            {
                id: 0,
                roomName: "",
                enable: false,
                result: "",
                bet: 0,
                maxUsers: 0,
                roomOwner: {
                    id: 0,
                    name: "",
                    balance: 5000.0,
                    profileImage: "",
                    email: "",
                    userEnum: "",
                    enabled: true,
                    authorities: [
                        {
                            authority: ""
                        }
                    ],
                    username: "",
                    accountNonExpired: true,
                    accountNonLocked: true,
                    credentialsNonExpired: true
                },
                usersInRoom: [],
                privateRoom: false,
                betDescription: "",
                expirationDate: "",
                creationDate: "",
                bets: [],
                sportEvent: {
                    id: 0,
                    eventName: "",
                    description: "",
                    eventDate: "",
                    team1: "",
                    team2: "",
                    result: ""
                },

            }
        ],
        lobby: {
            id: 0,
            roomName: null,
            enable: null,
            result: null,
            bet: 0,
            maxUsers: null,
            roomOwner: {
                id: null,
                name: null,
                balance: null,
                profileImage: null,
                email: null,
                userEnum: null,
                enabled: null,
                authorities: [
                    {
                        authority: null
                    }
                ],
                username: null,
                accountNonExpired: null,
                accountNonLocked: null,
                credentialsNonExpired: null
            },
            usersInRoom: [
                {
                    id: null,
                    name: null,
                    balance: null,
                    profileImage: "",
                    email: null,
                    userEnum: null,
                    enabled: null,
                    betTeam: null,
                    authorities: [
                        {
                            authority: null
                        }
                    ],
                    username: null,
                    accountNonExpired: null,
                    accountNonLocked: null,
                    credentialsNonExpired: null
                }
            ],
            privateRoom: null,
            betDescription: null,
            expirationDate: null,
            creationDate: null,
            bets: [],
            sportEvent: {
                id: null,
                eventName: null,
                description: null,
                eventDate: null,
                team1: null,
                team2: null,
                result: null
            },

        },
        events: [
            {
                id: 0,
                eventName: "",
                description: "",
                eventDate: "",
                team1: "",
                team2: "",
                result: ""
            }
        ],
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createLobby.fulfilled, (state, action) => {

            })
            .addCase(getLobbies.fulfilled, (state, action) => {
                state.lobbies = action.payload.lobbies
                state.loading = false
            })
            .addCase(getLobbies.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getLobbyById.fulfilled, (state, action) => {
                state.lobby = action.payload.data
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.events = action.payload.events
                state.loading = false
            })
            .addCase(getEvents.pending, (state, action) => {
                state.loading = true
            })
    }
})

export default lobbySlice.reducer