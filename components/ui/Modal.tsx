import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

import { RadioGroup } from "@headlessui/react";

const colors = [
  {
    name: "Blue",
    bgColor: "bg-blue-200",
    selectedColor: "ring-blue-300",
  },
  {
    name: "Emerald",
    bgColor: "bg-emerald-200",
    selectedColor: "ring-emerald-300",
  },
  { name: "Amber", bgColor: "bg-amber-100", selectedColor: "ring-amber-200" },
  { name: "Red", bgColor: "bg-red-200", selectedColor: "ring-red-300" },
  {
    name: "Violet",
    bgColor: "bg-violet-300",
    selectedColor: "ring-violet-400",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const team = [
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Whitney Francis",
    email: "whitney.francis@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leonard Krasner",
    email: "leonard.krasner@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    email: "floy.dmiles@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function Modal() {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(!open);
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("false");

  const { data, error } = useSWR("/api/users/admins", fetcher);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const color = selectedColor.bgColor;
      const body = { name, description, privacy, color };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      await mutate(`/api/projects/feed`);
      setName("");
      setDescription("");
      setPrivacy("");
      setSelectedColor(colors[0]);

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="w-full h-screen grid place-items-center">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="text-gray-400 opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={3}
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );

  return (
    <div>
      <div onClick={openModal} className="flex">
        <button
          type="button"
          className="mx-4 rounded border border-transparent bg-[#625DF5] hover:bg-[#342DF2] transition-colors duration-250 text-white  py-2 px-4 text-sm font-medium shadow-sm"
        >
          Create a project
        </button>
      </div>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="mx-auto max-w-3xl transform rounded-lg bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <form
                className="flex h-full flex-col bg-white rounded-lg"
                onSubmit={submitData}
              >
                <div className="flex-1">
                  {/* Header */}
                  <div className="bg-gray-50 px-4 py-6 sm:px-6 rounded-lg">
                    <div className="flex items-start justify-between space-x-3">
                      <div className="space-y-1">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          New project{" "}
                        </Dialog.Title>
                        <p className="text-sm text-gray-500">
                          Get started by filling in the information below to
                          create your new project.
                        </p>
                      </div>
                      <div className="flex h-7 items-center">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <XIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Divider container */}
                  <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                    {/* Project name */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="project-name"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Project name{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          autoFocus
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          name="project-name"
                          id="project-name"
                          placeholder="Project name"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
                        />
                      </div>
                    </div>
                    {/* Project Color */}
                    <div>
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <RadioGroup.Label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                          Choose a label color
                        </RadioGroup.Label>
                        <div className="mt-4 flex items-center space-x-3">
                          {colors.map((color) => (
                            <RadioGroup.Option
                              key={color.name}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  color.selectedColor,
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                )
                              }
                            >
                              <RadioGroup.Label as="p" className="sr-only">
                                {color.name}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.bgColor,
                                  "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Project description */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="project-description"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Description{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          id="project-description"
                          name="project-description"
                          placeholder="Project description"
                          rows={3}
                          className="block w-full rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Team members */}
                    {privacy === "false" && (
                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            Team Members
                          </h3>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="flex space-x-2">
                            {data.map((person) => (
                              <a
                                key={person.id}
                                className="flex-shrink-0 rounded-full hover:opacity-75 cursor-pointer"
                              >
                                <Image
                                  className="inline-block rounded-full object-cover"
                                  height={32}
                                  width={32}
                                  src={person.image}
                                  alt={person.name}
                                />
                              </a>
                            ))}

                            <button
                              type="button"
                              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">Add team member</span>
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Privacy */}
                    <fieldset>
                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <legend className="text-sm font-medium text-gray-900">
                            Privacy
                          </legend>
                        </div>
                        <div className="space-y-5 sm:col-span-2">
                          <div className="space-y-5 sm:mt-0">
                            <div className="relative flex items-start">
                              <div className="absolute flex h-5 items-center">
                                <input
                                  id="public-access"
                                  name="privacy"
                                  onChange={(e) => setPrivacy(e.target.value)}
                                  value="false"
                                  aria-describedby="public-access-description"
                                  type="radio"
                                  className="h-4 w-4 border-gray-200 text-gray-700 text-indigo-600 focus:ring-indigo-500"
                                  defaultChecked
                                />
                              </div>
                              <div className="pl-7 text-sm">
                                <label
                                  htmlFor="public-access"
                                  className="font-medium text-gray-900"
                                >
                                  {" "}
                                  Public access{" "}
                                </label>
                                <p
                                  id="public-access-description"
                                  className="text-gray-500"
                                >
                                  Everyone with the link will see this project
                                </p>
                              </div>
                            </div>
                            <div className="relative flex items-start">
                              <div className="absolute flex h-5 items-center">
                                <input
                                  id="restricted-access"
                                  name="privacy"
                                  onChange={(e) => setPrivacy(e.target.value)}
                                  value="true"
                                  aria-describedby="restricted-access-description"
                                  type="radio"
                                  className="h-4 w-4 border-gray-200 text-gray-700 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="pl-7 text-sm">
                                <label
                                  htmlFor="restricted-access"
                                  className="font-medium text-gray-900"
                                >
                                  {" "}
                                  Private to Project Members{" "}
                                </label>
                                <p
                                  id="restricted-access-description"
                                  className="text-gray-500"
                                >
                                  Only members of this project would be able to
                                  access
                                </p>
                              </div>
                            </div>
                          </div>
                          <hr className="border-gray-200" />
                          <div className="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                            <div className="flex-1">
                              <a
                                href="#"
                                className="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                              >
                                <LinkIcon
                                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                  aria-hidden="true"
                                />
                                <span> Copy link </span>
                              </a>
                            </div>
                            <div>
                              <a
                                href="#"
                                className="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900"
                              >
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span> Learn more about sharing </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
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
                      disabled={!description || !name}
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
