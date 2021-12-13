import { render, screen, waitFor } from "test-utils"
import Home from "../../pages"

it("should render", () => {
  render(<Home />)

  expect(screen.getByLabelText(/to count/i)).toBeInTheDocument()
})

it("should initialy show one word counter", () => {
  render(<Home />)

  expect(screen.queryAllByLabelText(/to count/i).length).toEqual(1)
})
