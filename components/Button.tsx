import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react"

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => (
  <button
    className="bg-black bg-opacity-0 hover:bg-opacity-[0.05] flex px-3 py-2 text-sm font-medium text-white rounded-md   focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50"
    {...props}
  >
    {children}
  </button>
)

export default Button
