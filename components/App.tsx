import { FC } from "react"
import Wordcounter from "./Wordcounter"

const App: FC = () => {
  return (
    <main className="min-h-screen p-16 bg-blue-500">
      <div className="bg-white p-8 rounded grid grid-cols-6 gap-4">
        <Wordcounter />
      </div>
    </main>
  )
}

export default App
