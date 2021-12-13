import {
  FC,
  useEffect,
  useRef,
  KeyboardEventHandler,
  ChangeEventHandler,
} from "react"
import { motion } from "framer-motion"
import { useAppDispatch } from "../store"
import { add, Field, updateFocus, update, reset } from "../store/fieldSlice"
import handleShortcut from "../utils/handleShortcut"

const Wordcounter: FC<{ field: Field; hasFocus: boolean }> = ({
  field: { id, value },
  hasFocus,
}) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (hasFocus) {
      ref.current?.focus()
    }
  })

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    dispatch(update({ id, changes: { value: event.target.value } }))

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    handleShortcut(event, event.key === "j" && event.ctrlKey, () =>
      dispatch(add({}))
    )
    handleShortcut(event, event.key === "J" && event.ctrlKey, () =>
      dispatch(add({ value }))
    )
    handleShortcut(event, event.key === "k" && event.ctrlKey, () =>
      dispatch(update({ id, changes: { value: "" } }))
    )
    handleShortcut(event, event.key === "K" && event.ctrlKey, () =>
      dispatch(reset())
    )
  }
  const length = value.length

  return (
    <motion.div
      className="grid grid-cols-6 gap-4 items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <textarea
        className="col-span-5 px-4 py-2 rounded border-2 border-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Text you want to count the caracters within"
        value={value}
        onChange={onChange}
        ref={ref}
        onFocus={() => dispatch(updateFocus({ id }))}
        onKeyDown={onKeyDown}
      />
      <p className="col-span-1 text-gray-700 text-xl font-bold">{length}</p>
    </motion.div>
  )
}

export default Wordcounter
