import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { add } from "../store/fieldSlice"
import Wordcounter from "./Wordcounter"

const App: FC = () => {
  const dispatch = useAppDispatch()
  const fields = useAppSelector((state) => state.fields)
  const focus = useAppSelector((state) => state.focus)
  return (
    <main className="min-h-screen p-16 bg-blue-500">
      <div className="bg-white p-8 rounded grid grid-cols-6 gap-4">
        <nav className="col-span-6">
          <button onClick={() => dispatch(add({}))}>Add</button>
        </nav>
        {fields.map((field) => (
          <Wordcounter
            key={field.id}
            id={field.id}
            hasFocus={focus === field.id}
          />
        ))}
      </div>
    </main>
  )
}

export default App
