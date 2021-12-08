import { createSlice } from "@reduxjs/toolkit"

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    toggle: (state) => !state,
    open: () => true,
    close: () => false,
  },
})

export const { toggle, open, close } = modalSlice.actions

export default modalSlice.reducer
