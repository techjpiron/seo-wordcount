import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { add, reset, selectAllFields } from "../store/fieldSlice"
import Wordcounter from "./Wordcounter"
import Button from "./Button"
import HelpModal from "./HelpModal"
import { toggle } from "../store/modalSlice"

const App: FC = () => {
  const dispatch = useAppDispatch()

  const fields = useAppSelector(selectAllFields)
  const focus = useAppSelector((state) => state.fields.focus)

  return (
    <>
      <HelpModal />
      <main className="min-h-screen p-16 flex justify-center bg-gradient-to-br from-sky-400 to-blue-600">
        <div className="w-3/4 lg:w-1/2">
          <nav className="flex justify-between">
            <h1 className="text-white text-2xl font-extrabold">Word Counter</h1>
            <div className="flex space-x-4">
              <Button onClick={() => dispatch(add({}))}>Add</Button>
              <Button onClick={() => dispatch(reset())} type="reset">
                Reset
              </Button>
              <Button onClick={() => dispatch(toggle())}>Help</Button>
            </div>
          </nav>
          <div className="mt-8 p-8 bg-white rounded-xl grid grid-cols-6 gap-4 items-center">
            {fields.map((field) => (
              <Wordcounter
                key={field.id}
                field={field}
                hasFocus={focus === field.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
