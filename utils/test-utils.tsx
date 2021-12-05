import React, { FC, ReactElement } from "react"
import * as RTL from "@testing-library/react"
import { Provider } from "react-redux"
import { configureAppStore } from "../store"

const AllTheProviders: FC = ({ children }) => {
  const store = configureAppStore()
  return <Provider store={store}>{children}</Provider>
}

const render = (
  ui: ReactElement,
  options?: Omit<RTL.RenderOptions, "wrapper">
) => RTL.render(ui, { wrapper: AllTheProviders, ...options })

export { render }
export * from "@testing-library/react"
