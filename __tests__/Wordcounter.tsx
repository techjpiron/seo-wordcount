import { render, screen } from "test-utils"
import userEvent from "@testing-library/user-event"
import Wordcounter from "../components/Wordcounter"

it("should have a input field", () => {
  render(<Wordcounter id="d" hasFocus={false} />)

  expect(screen.getByLabelText(/to count/i)).toBeInTheDocument()
})

it("should have a word count", () => {
  render(<Wordcounter id="d" hasFocus={true} />)

  const inputEl = screen.getByLabelText(/to count/i)
  userEvent.type(inputEl, "123456789")

  expect(screen.getByText("9")).toBeVisible()
})
