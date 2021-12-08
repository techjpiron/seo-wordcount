import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import fieldSlice from "./fieldSlice"
import modalSlice from "./modalSlice"

export const configureAppStore = () =>
  configureStore({
    reducer: {
      fields: fieldSlice,
      modal: modalSlice,
    },
  })

const store = configureAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
