import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

export type Field = {
  id: string
  value: string
}
type FieldStore = {
  fields: Field[]
  focus: Field["id"]
}

const createEmptyField = (): Field => ({
  id: nanoid(),
  value: "",
})
const initialId = nanoid()
const initialState: FieldStore = {
  fields: [{ id: initialId, value: "" }],
  focus: initialId,
}

export const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<Field>) => {
        state.fields.push(action.payload)
        state.focus = action.payload.id
      },
      prepare: (field: Partial<Field>) => ({
        payload: {
          ...createEmptyField(),
          ...field,
        },
      }),
    },
    reset: () => {
      return initialState
    },
    updateFocus: (state, action: PayloadAction<{ id: Field["id"] }>) => {
      state.focus = action.payload.id
    },
  },
})

export const { add, updateFocus, reset } = fieldSlice.actions

export default fieldSlice.reducer
