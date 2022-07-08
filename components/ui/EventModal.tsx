import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import useSWR, { mutate } from "swr";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";

import { RadioGroup } from "@headlessui/react";

const colors = [
  {
    name: "Blue",
    bgColor: "bg-blue-200",
    selectedColor: "ring-blue-300",
  },
  {
    name: "Emerald",
    bgColor: "bg-emerald-100",
    selectedColor: "ring-emerald-200",
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

export default function EventModal() {
  const [query, setQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(!open);
  }

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, startTime, endTime, date, location, note };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/events/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      await mutate(`/api/events`);
      setName("");
      setStartTime("");
      setEndTime("");
      setDate("");
      setLocation("");
      setNote("");
      setSelectedColor(colors[0]);

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  function updateDates(e) {
    setStartTime(e.target.value);
    setDate(e.target.value);
  }

  return (
    <div>
      <div onClick={openModal} className="flex">
        <button
          type="button"
          className="mx-4 flex items-center rounded border border-transparent bg-[#625DF5] hover:bg-[#342DF2] transition-colors duration-250 text-white  py-2 pl-2 pr-4 text-sm font-medium shadow-sm"
        >
          <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
          New
        </button>
      </div>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto p-4 sm:p-6 md:p-20"
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
            <div className="mx-auto max-w-3xl transform rounded-xl bg-white p-1 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
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
                          New Event{" "}
                        </Dialog.Title>
                        <p className="text-sm text-gray-500">
                          Add an event to your calendar by filling out the
                          information below.
                        </p>
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
                    {/* Event name */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="event-name"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Event name{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          autoFocus
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          name="event-name"
                          id="event-name"
                          placeholder="Event name"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
                        />
                      </div>
                    </div>
                    {/* Event Time Picker */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="event-times"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Event Times{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2 flex items-center space-x-2">
                        <input
                          onChange={(e) => updateDates(e)}
                          type="datetime-local"
                          id="event-times"
                          name="event-times"
                          value={startTime}
                          min="2022-05-01T00:00"
                          max="2025-12-31T00:00"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
                        />
                        <input
                          onChange={(e) => setEndTime(e.target.value)}
                          type="datetime-local"
                          id="event-times"
                          name="event-times"
                          value={endTime}
                          min="2022-05-01T00:00"
                          max="2025-12-31T00:00"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
                        />
                      </div>
                    </div>
                    {/* Event Color */}
                    <div>
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <RadioGroup.Label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                          Choose an event color
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
                    {/* Event notes */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="event-notes"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Notes{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <textarea
                          onChange={(e) => setNote(e.target.value)}
                          value={note}
                          id="event-notes"
                          name="event-notes"
                          placeholder="Event notes"
                          rows={3}
                          className="block w-full rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    {/* Event location */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                      <div>
                        <label
                          htmlFor="event-location"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Event location{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          autoFocus
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                          type="text"
                          name="event-location"
                          id="event-location"
                          placeholder="Event location"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex-shrink-0 px-4 py-5 sm:px-6">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="py-2 px-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!note || !name}
                      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-[#625DF5] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#342DF2] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
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
