import { render, screen, waitFor } from "test-utils"
import userEvent from "@testing-library/user-event"
import Home from "../../pages"

it("should have a help button", () => {
  render(<Home />)

  expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument()
})

it("should open an help modal when the help button is clicked", async () => {
  render(<Home />)

  const helpButtonEl = screen.getByRole("button", { name: /help/i })
  userEvent.click(helpButtonEl)

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: /help/i })).toBeVisible()
  })
})

it("should close the help modal when the close button is clicked", async () => {
  render(<Home />)

  // open help modal
  const helpButtonEl = screen.getByRole("button", { name: /help/i })
  userEvent.click(helpButtonEl)

  // close help modal²
  const closeButton = await screen.findByRole("button", { name: /close/i })
  userEvent.click(closeButton)

  // assert that help modal has disappeared
  await waitFor(() => {
    expect(
      screen.queryByRole("heading", { name: /help/i })
    ).not.toBeInTheDocument()
  })
})
