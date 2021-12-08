import {
  FC,
  useEffect,
  useRef,
  KeyboardEventHandler,
  ChangeEventHandler,
} from "react"
import { useAppDispatch } from "../store"
import { add, Field, updateFocus, update } from "../store/fieldSlice"
import handleShortcut from "../utils/handleShortcut"

const Wordcounter: FC<{ field: Field; hasFocus: boolean }> = ({
  field: { id, value },
  hasFocus,
}) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasFocus) {
      ref.current?.focus()
    }
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch(update({ id, changes: { value: event.target.value } }))

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    handleShortcut(event, event.key === "j" && event.ctrlKey, () =>
      dispatch(add({}))
    )
    handleShortcut(event, event.key === "J" && event.ctrlKey, () =>
      dispatch(add({ value }))
    )
  }
  const length = value.length

  return (
    <>
      <input
        className="col-span-5 px-4 py-2 rounded border-2 border-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        aria-label="Text you want to count the caracters within"
        value={value}
        onChange={onChange}
        ref={ref}
        onFocus={() => dispatch(updateFocus({ id }))}
        onKeyDown={onKeyDown}
      />
      <p className="col-span-1 text-gray-700 text-xl font-bold">{length}</p>
    </>
  )
}

export default Wordcounter
