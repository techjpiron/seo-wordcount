import { render, screen, waitFor } from "test-utils"
import userEvent from "@testing-library/user-event"
import Home from "../pages"

describe("basic", () => {
  it("should render", () => {
    render(<Home />)

    expect(screen.getByLabelText(/to count/i)).toBeVisible()
  })

  it("should initialy show one word counter", () => {
    render(<Home />)

    expect(screen.queryAllByLabelText(/to count/i).length).toEqual(1)
  })
})

describe("add", () => {
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

  it("should focus the new word counter", async () => {
    render(<Home />)

    const addButtonEl = screen.getByRole("button", { name: /add/i })
    userEvent.click(addButtonEl)

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/to count/i)[1]).toHaveFocus()
    })
  })
})
