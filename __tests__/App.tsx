import { render, screen } from "@testing-library/react"
import Home from "../pages"

it("should render", () => {
  render(<Home />)
  expect(screen.getByText(/hello/i)).toBeInTheDocument()
})
