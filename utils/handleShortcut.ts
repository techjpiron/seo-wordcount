import { KeyboardEvent, KeyboardEventHandler } from "react"

const handleShortcut = (
  event: KeyboardEvent<HTMLInputElement>,
  condition: boolean,
  callback: KeyboardEventHandler<HTMLInputElement>
) => {
  if (condition) {
    event.preventDefault()
    event.stopPropagation()
    callback(event)
  }
}
export default handleShortcut
