import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

export type Field = {
  id: string
  value: string
}
type FieldStore = {
  fields: Field[]
  focus: Field["id"]
}

const initialId = nanoid()
const initialState: FieldStore = {
  fields: [{ id: initialId, value: "" }],
  focus: initialId,
}

export const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ value?: Field["value"] }>) => {
      const newFieldId = nanoid()
      state.fields.push({ id: newFieldId, value: action.payload.value ?? "" })
      state.focus = newFieldId
    },
    updateFocus: (state, action: PayloadAction<{ id: Field["id"] }>) => {
      state.focus = action.payload.id
    },
  },
})

export const { add, updateFocus } = fieldSlice.actions

export default fieldSlice.reducer
