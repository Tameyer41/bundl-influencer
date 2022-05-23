import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import useSWR, { mutate } from "swr";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvitationModal() {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(!open);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { email };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/invitations/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setEmail("");

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={openModal} className="flex">
        <div className="w-full text-[#7E623A] group flex items-center px-[8px] h-[30px] text-sm font-medium rounded cursor-pointer">
          <div
            className="mr-3 flex-shrink-0 h-6 w-6 text-sm items-center flex bg-[#EED5B0] text-[#7E623A] rounded-full justify-center"
            aria-hidden="true"
          >
            +
          </div>
          Invite your team
        </div>
      </div>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="mx-auto max-w-xl transform rounded-xl bg-white p-1 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <form
                className="flex h-full flex-col bg-white"
                onSubmit={submitData}
              >
                <div className="flex-1">
                  {/* Header */}
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                      <div className="space-y-1">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Invite a teammate{" "}
                        </Dialog.Title>
                      </div>
                      <div className="flex h-7 items-center">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Divider container */}
                  <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                    {/* User Email */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="user-email"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          User's email{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          autoFocus
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          name="user-email"
                          id="user-email"
                          placeholder="example@gmail.com"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!email}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
