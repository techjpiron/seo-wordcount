import { FC, useState } from "react"

const Wordcounter: FC = () => {
  const [value, setValue] = useState("")
  return (
    <>
      <input
        type="text"
        aria-label="Text you want to count the caracters within"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <p>{value.length}</p>
    </>
  )
}

export default Wordcounter
