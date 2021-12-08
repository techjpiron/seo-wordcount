import {
  createSlice,
  nanoid,
  PayloadAction,
  createEntityAdapter,
  EntityState,
  createSelector,
  Update,
} from "@reduxjs/toolkit"
import { RootState } from "."

export type Field = {
  id: string
  value: string
}

const createEmptyField = (): Field => ({
  id: nanoid(),
  value: "",
})

const fieldAdapter = createEntityAdapter<Field>()

const createInitialStore = (): EntityState<Field> & {
  focus: Field["id"]
  order: Field["id"][]
} => {
  const field = createEmptyField()
  return {
    entities: { [field.id]: field },
    ids: [field.id],
    focus: field.id,
    order: [field.id],
  }
}

export const fieldSlice = createSlice({
  name: "fields",
  initialState: createInitialStore(),
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<Field>) => {
        fieldAdapter.addOne(state, action.payload)
        state.focus = action.payload.id
        state.order.push(action.payload.id)
      },
      prepare: (field: Partial<Field>) => ({
        payload: {
          ...createEmptyField(),
          ...field,
        },
      }),
    },
    update: (state, action: PayloadAction<Update<Field>>) => {
      fieldAdapter.updateOne(state, action.payload)
    },
    reset: () => {
      return createInitialStore()
    },
    updateFocus: (state, action: PayloadAction<{ id: Field["id"] }>) => {
      state.focus = action.payload.id
    },
  },
})

export const { add, updateFocus, reset, update } = fieldSlice.actions

const { selectAll, selectById } = fieldAdapter.getSelectors(
  (state: RootState) => state.fields
)

const order = (state: RootState) => state.fields.order
export const selectFieldById = selectById
export const selectAllFields = createSelector(
  [selectAll, order],
  (fields, order) =>
    fields.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
)

export default fieldSlice.reducer
