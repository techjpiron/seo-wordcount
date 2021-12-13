import { render, screen, waitFor } from "test-utils"
import userEvent from "@testing-library/user-event"
import Home from "../../pages"

it("should show a add button", () => {
  render(<Home />)

  expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument()
})

it("should add a new word counter when the add button is clicked", async () => {
  render(<Home />)

  const addButtonEl = screen.getByRole("button", { name: /add/i })
  userEvent.click(addButtonEl)

  await waitFor(() => {
    expect(screen.queryAllByLabelText(/to count/i).length).toEqual(2)
  })
})
