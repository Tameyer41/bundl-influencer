import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import useSWR, { mutate } from "swr";
import {
  DotsVerticalIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function AddToProjectModal(user: any) {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const { data, error } = useSWR("/api/projects/feed", fetcher);
  const [selected, setSelected] = useState(data ? data[0] : "");
  if (error) return <div>Failed to load</div>;
  if (!data) return <p> Test </p>;

  function openModal() {
    setOpen(!open);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { selected, user };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/${selected.id}/add-users`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setSelected("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={openModal} className="flex">
        <div className="group-hover:flex hidden -my-2 p-2 rounded-md border border-gray-200 bg-white items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                          Add to project
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
                          htmlFor="project-name"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Project
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="mt-1 relative">
                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                  <span className="w-full inline-flex truncate">
                                    <span className="truncate">
                                      {selected.name}
                                    </span>
                                    <span className="ml-2 truncate text-gray-500">
                                      {selected.username}
                                    </span>
                                  </span>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {data.map((project) => (
                                      <Listbox.Option
                                        key={project.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-900",
                                            "cursor-default select-none relative py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={project}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <div className="flex">
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "truncate"
                                                )}
                                              >
                                                {project.name}
                                              </span>
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-indigo-200"
                                                    : "text-gray-500",
                                                  "ml-2 truncate"
                                                )}
                                              >
                                                {project.users.length}{" "}
                                                {project.users.length > 1
                                                  ? "users"
                                                  : "user"}{" "}
                                                in project
                                              </span>
                                            </div>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
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
