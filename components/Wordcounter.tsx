import { FC, useState } from "react"

const Wordcounter: FC = () => {
  const [value, setValue] = useState("")
  return (
    <>
      <input
        className="col-span-5 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        aria-label="Text you want to count the caracters within"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <p className="col-span-1 text-xl font-bold">{value.length}</p>
    </>
  )
}

export default Wordcounter
