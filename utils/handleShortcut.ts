import { KeyboardEvent, KeyboardEventHandler } from "react"

const handleShortcut = (
  event: KeyboardEvent<HTMLTextAreaElement>,
  condition: boolean,
  callback: KeyboardEventHandler<HTMLTextAreaElement>
) => {
  if (condition) {
    event.preventDefault()
    event.stopPropagation()
    callback(event)
  }
}
export default handleShortcut
