import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/slices/userSlice'
import lobbyReducer from '@/store/slices/lobbySlice'
import pageReducer from '@/store/slices/pageSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    lobby: lobbyReducer,
    page: pageReducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']