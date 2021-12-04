import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Wordcounter from "../components/Wordcounter"

it("should have a input field", () => {
  render(<Wordcounter />)

  expect(screen.getByLabelText(/to count/i)).toBeInTheDocument()
})

it("should have a word count", () => {
  render(<Wordcounter />)

  const inputEl = screen.getByLabelText(/to count/i)
  userEvent.type(inputEl, "123456789")

  expect(screen.getByText("9")).toBeVisible()
})
