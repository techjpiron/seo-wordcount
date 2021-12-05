import { FC, ReactElement } from "react"
import { Provider } from "react-redux"
import { createAppStore } from "../store"
import { render as rtlRender, RenderOptions } from "@testing-library/react"

type WithStore = {
  store?: ReturnType<typeof createAppStore>
}
type RenderOptionsWithStore = Omit<RenderOptions, "wrapper"> & WithStore

const render = (ui: ReactElement, renderOptions?: RenderOptionsWithStore) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <Provider store={renderOptions?.store ?? createAppStore()}>
        {children}
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from "@testing-library/react"
export { render }
