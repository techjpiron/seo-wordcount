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

  it("should have a keyboard short cut to add a new counter", async () => {
    render(<Home />)

    const wordCounterEl = screen.getByLabelText(/to count/i)
    userEvent.type(wordCounterEl, "{ctrl}j")

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/to count/i).length).toEqual(2)
    })
  })

  it("should have a keyboard short cut to add a new counter with current content", async () => {
    render(<Home />)

    const wordCounterEl = screen.getByLabelText(/to count/i)
    userEvent.type(wordCounterEl, "Hello from test{ctrl}J")

    await waitFor(() => {
      expect(screen.queryAllByLabelText(/to count/i).length).toEqual(2)
    })

    await waitFor(() => {
      expect(document.activeElement).toHaveValue("Hello from test")
    })
  })
})

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
