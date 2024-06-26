import { FC, Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { useAppDispatch, useAppSelector } from "../store"
import { close } from "../store/modalSlice"

const HelpModal: FC = () => {
  const open = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const closeButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={closeButtonRef}
        onClose={() => dispatch(close())}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <InformationCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl leading-6 font-medium text-gray-900"
                    >
                      Word Counter - Help
                    </Dialog.Title>
                    <div className="mt-8 text-sm text-gray-500 ">
                      <p>
                        This tool is made to help you to comply with SEO
                        character limit requirements.
                      </p>
                      <h4 className="mt-8 font-bold">
                        Usefull keyboard shortcuts
                      </h4>
                      <div className="mt-2 overflow-hidden rounded-lg">
                        <table className="table-auto min-w-full divide-y divide-gray-300">
                          <tbody className="bg-white divide-y divide-gray-300">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                CTRL+J
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                Add new field
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                CTRL+SHIFT+J
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                Copy current field
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                CTRL+K
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                Reset current field
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                CTRL+SHIFT+K
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                Reset all fields
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => dispatch(close())}
                  ref={closeButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default HelpModal
