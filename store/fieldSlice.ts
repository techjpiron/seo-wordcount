import {
  createSlice,
  nanoid,
  PayloadAction,
  createEntityAdapter,
  EntityState,
  createSelector,
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
    reset: () => {
      return createInitialStore()
    },
    updateFocus: (state, action: PayloadAction<{ id: Field["id"] }>) => {
      state.focus = action.payload.id
    },
  },
})

export const { add, updateFocus, reset } = fieldSlice.actions

const { selectAll } = fieldAdapter.getSelectors((state: RootState) => state)
const order = (state: RootState) => state.order
export const selectAllFields = createSelector(
  [selectAll, order],
  (fields, order) =>
    fields.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
)

export default fieldSlice.reducer
