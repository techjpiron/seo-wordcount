import { render, screen } from "test-utils"
import Wordcounter from "../../components/Wordcounter"

it("should have a input field", () => {
  render(<Wordcounter field={{ id: "1", value: "" }} hasFocus={false} />)

  expect(screen.getByLabelText(/to count/i)).toBeInTheDocument()
})

it("should have a word count", () => {
  render(
    <Wordcounter field={{ id: "1", value: "Hello world!" }} hasFocus={true} />
  )

  expect(screen.getByText("12")).toBeInTheDocument()
})
