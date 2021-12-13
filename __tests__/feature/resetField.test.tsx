import { render, screen, waitFor } from "test-utils"
import userEvent from "@testing-library/user-event"
import Home from "../../pages"

describe("reset", () => {
  it("should have a reset button", () => {
    render(<Home />)

    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument()
  })

  it("should remove all word counters when the reset button is clicked", async () => {
    render(<Home />)

    // create three additionnal word counters
    const addButtonEl = screen.getByRole("button", { name: /add/i })
    userEvent.click(addButtonEl)
    userEvent.click(addButtonEl)
    userEvent.click(addButtonEl)

    // reset
    const resetButtonEl = screen.getByRole("button", { name: /reset/i })
    userEvent.click(resetButtonEl)

    // expect to see only one word counter
    await waitFor(() => {
      expect(screen.queryAllByLabelText(/to count/i).length).toEqual(1)
    })
  })

  it("should remove all word counters when the reset keyboard shortcut is pressed", async () => {
    render(<Home />)

    // create three additionnal word counters
    const addButtonEl = screen.getByRole("button", { name: /add/i })
    userEvent.click(addButtonEl)
    userEvent.click(addButtonEl)
    userEvent.click(addButtonEl)

    // reset
    const currentWordCountEl = document.activeElement
    if (!currentWordCountEl) {
      throw "cannot find the current input"
    }
    userEvent.type(currentWordCountEl, "{ctrl}K")

    // expect to see only one word counter
    await waitFor(() => {
      expect(screen.queryAllByLabelText(/to count/i).length).toEqual(1)
    })
  })

  it("should reset the current word counter when the reset keyboard shortcut is pressed", async () => {
    render(<Home />)

    const currentWordCountEl = document.activeElement
    if (!currentWordCountEl) {
      throw "cannot find the current input"
    }
    userEvent.type(currentWordCountEl, "Hello world{ctrl}k")

    // expect to see only one word counter
    await waitFor(() => {
      expect(currentWordCountEl).toHaveValue("")
    })
  })
})
