import {
  FC,
  useEffect,
  useState,
  useRef,
  KeyboardEventHandler,
  KeyboardEvent,
} from "react"
import { useAppDispatch } from "../store"
import { add, Field, updateFocus } from "../store/fieldSlice"

const Wordcounter: FC<{ id: Field["id"]; hasFocus: boolean }> = ({
  id,
  hasFocus,
}) => {
  const [value, setValue] = useState("")

  const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasFocus) {
      ref.current?.focus()
    }
  })

  const handleShortcut = (
    event: KeyboardEvent<HTMLInputElement>,
    condition: boolean,
    callback: KeyboardEventHandler<HTMLInputElement>
  ) => {
    if (condition) {
      event.preventDefault()
      event.stopPropagation()
      callback(event)
    }
  }
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    handleShortcut(event, event.key === "j" && event.ctrlKey, () =>
      dispatch(add({}))
    )
  }

  return (
    <>
      <input
        className="col-span-5 px-4 py-2 rounded border-2 border-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        aria-label="Text you want to count the caracters within"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        ref={ref}
        onFocus={() => dispatch(updateFocus({ id }))}
        onKeyDown={onKeyDown}
      />
      <p className="col-span-1 text-gray-700 text-xl font-bold">
        {value.length}
      </p>
    </>
  )
}

export default Wordcounter
