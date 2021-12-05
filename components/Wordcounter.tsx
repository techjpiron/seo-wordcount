import { FC, useEffect, useState, useRef } from "react"
import { useAppDispatch } from "../store"
import { Field, updateFocus } from "../store/fieldSlice"

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
      />
      <p className="col-span-1 text-xl font-bold">{value.length}</p>
    </>
  )
}

export default Wordcounter
