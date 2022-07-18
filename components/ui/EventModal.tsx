import { forwardRef, Fragment, useState } from "react";
import { Listbox, Dialog, Transition } from "@headlessui/react";
import useSWR, { mutate } from "swr";
import {
  CheckIcon,
  SelectorIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import { CalendarIcon } from "@heroicons/react/outline";

const startTimeValues = [
  { time: " 00:00 am" },
  { time: "00:30 am" },
  { time: "01:00 am" },
  { time: "01:30 am" },
  { time: "02:00 am" },
  { time: "02:30 am" },
  { time: "03:00 am" },
  { time: "03:30 am" },
  { time: "04:00 am" },
  { time: "04:30 am" },
  { time: "05:00 am" },
  { time: "05:30 am" },
  { time: "06:00 am" },
  { time: "06:30 am" },
  { time: "07:00 am" },
  { time: "07:30 am" },
  { time: "08:00 am" },
  { time: "08:30 am" },
  { time: "09:00 am" },
  { time: "09:30 am" },
  { time: "10:00 am" },
  { time: "10:30 am" },
  { time: "11:00 am" },
  { time: "11:30 am" },
  { time: "12:00 pm" },
  { time: "12:30 pm" },
  { time: "01:00 pm" },
  { time: "01:30 pm" },
  { time: "02:00 pm" },
  { time: "02:30 pm" },
  { time: "03:00 pm" },
  { time: "03:30 pm" },
  { time: "04:00 pm" },
  { time: "04:30 pm" },
  { time: "05:00 pm" },
  { time: "05:30 pm" },
  { time: "06:00 pm" },
  { time: "06:30 pm" },
  { time: "07:00 pm" },
  { time: "07:30 pm" },
  { time: "08:00 pm" },
  { time: "08:30 pm" },
  { time: "09:00 pm" },
  { time: "09:30 pm" },
  { time: "10:00 pm" },
  { time: "10:30 pm" },
  { time: "11:00 pm" },
  { time: "11:30 pm" },
];
const endTimeValues = [
  { time: " 00:00 am" },
  { time: "00:30 am" },
  { time: "01:00 am" },
  { time: "01:30 am" },
  { time: "02:00 am" },
  { time: "02:30 am" },
  { time: "03:00 am" },
  { time: "03:30 am" },
  { time: "04:00 am" },
  { time: "04:30 am" },
  { time: "05:00 am" },
  { time: "05:30 am" },
  { time: "06:00 am" },
  { time: "06:30 am" },
  { time: "07:00 am" },
  { time: "07:30 am" },
  { time: "08:00 am" },
  { time: "08:30 am" },
  { time: "09:00 am" },
  { time: "09:30 am" },
  { time: "10:00 am" },
  { time: "10:30 am" },
  { time: "11:00 am" },
  { time: "11:30 am" },
  { time: "12:00 pm" },
  { time: "12:30 pm" },
  { time: "01:00 pm" },
  { time: "01:30 pm" },
  { time: "02:00 pm" },
  { time: "02:30 pm" },
  { time: "03:00 pm" },
  { time: "03:30 pm" },
  { time: "04:00 pm" },
  { time: "04:30 pm" },
  { time: "05:00 pm" },
  { time: "05:30 pm" },
  { time: "06:00 pm" },
  { time: "06:30 pm" },
  { time: "07:00 pm" },
  { time: "07:30 pm" },
  { time: "08:00 pm" },
  { time: "08:30 pm" },
  { time: "09:00 pm" },
  { time: "09:30 pm" },
  { time: "10:00 pm" },
  { time: "10:30 pm" },
  { time: "11:00 pm" },
  { time: "11:30 pm" },
];

const colors = [
  {
    name: "Blue",
    bgColor: "bg-indigo-50",
    selectedColor: "ring-indigo-300",
  },
  {
    name: "Emerald",
    bgColor: "bg-[#EEF8F7]",
    selectedColor: "ring-emerald-100",
  },
  { name: "Amber", bgColor: "bg-amber-100", selectedColor: "ring-amber-200" },
  { name: "Red", bgColor: "bg-pink-50", selectedColor: "ring-pink-300" },
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
  const [selectedStartTime, setSelectedStartTime] = useState(
    startTimeValues[0]
  );
  const [selectedEndTime, setSelectedEndTime] = useState(endTimeValues[0]);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let startTime = parse(selectedStartTime.time, "KK:mm aaa", new Date());
      let endTime = parse(selectedEndTime.time, "KK:mm aaa", new Date());
      if (startTime > endTime) {
        console.log("Cannot end before you start");
        return;
      }
      const body = {
        name,
        startTime,
        endTime,
        date,
        location,
        note,
      };
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
      setSelectedStartTime(startTimeValues[0]);
      setSelectedEndTime(endTimeValues[0]);
      setDate(new Date());
      setLocation("");
      setNote("");
      setSelectedColor(colors[0]);

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div onClick={openModal} className="flex">
        <button
          type="button"
          className="mx-4 flex items-center rounded border border-transparent bg-blue-500 hover:bg-blue-600 transition-colors duration-250 text-white  py-2 pl-2 pr-4 text-sm font-medium shadow-sm"
        >
          <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
          New Event
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
            <div className="mx-auto max-w-2xl transform rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <form className="flex h-full flex-col" onSubmit={submitData}>
                <div className="flex-1 divide-y divide-gray-500 divide-opacity-10">
                  {/* Header */}

                  <div className="relative">
                    <input
                      autoFocus
                      className="h-12 w-full border-0 bg-transparent px-6 text-gray-900 placeholder-gray-500 focus:ring-0 focus:border-red-400 outline-0 sm:text-base"
                      value={name}
                      type="text"
                      name="event-name"
                      id="event-name"
                      placeholder="Event name..."
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Divider container */}
                  <div className="space-y-6 py-6 sm:space-y-0 sm:py-0">
                    {/* Event Time Picker */}
                    <div className="flex items-center w-full px-4 sm:px-6">
                      <span className="inline-block h-6 w-6 overflow-hidden bg-white mr-8">
                        <CalendarIcon className="h-full w-full text-gray-500" />
                      </span>
                      <div className="sm:grid sm:grid-cols-2 items-center py-2 border-b border-gray-200">
                        <div className="relative w-full border-r">
                          <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            selectsStart
                            nextMonthButtonLabel=">"
                            previousMonthButtonLabel="<"
                            popperClassName="react-datepicker-left"
                            customInput={<ButtonInput />}
                            renderCustomHeader={({
                              date,
                              decreaseMonth,
                              increaseMonth,
                              prevMonthButtonDisabled,
                              nextMonthButtonDisabled,
                            }) => (
                              <div className="flex items-center justify-between px-2 py-2">
                                <span className="text-lg text-gray-700">
                                  {format(date, "MMMM yyyy")}
                                </span>

                                <div className="space-x-2">
                                  <button
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                    type="button"
                                    className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                  >
                                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                                  </button>

                                  <button
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                    type="button"
                                    className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                  >
                                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                                  </button>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className="flex items-center w-full space-x-4 px-4 sm:px-6 divide-x ">
                          <Listbox
                            value={selectedStartTime}
                            onChange={setSelectedStartTime}
                          >
                            {({ open }) => (
                              <>
                                <div className="mt-1 relative w-1/2">
                                  <Listbox.Button className="bg-white relative w-full rounded-md pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm cursor-pointer">
                                    <span className="block truncate text-sm font-medium text-gray-700">
                                      {selectedStartTime.time}
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
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm no-scrollbar">
                                      {startTimeValues.map((time) => (
                                        <Listbox.Option
                                          key={time.time}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-[#3483BB]"
                                                : "text-gray-900",
                                              "cursor-pointer select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={time}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {time.time}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-[#3483BB]",
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
                          <Listbox
                            value={selectedEndTime}
                            onChange={setSelectedEndTime}
                          >
                            {({ open }) => (
                              <>
                                <div className="mt-1 relative w-1/2">
                                  <Listbox.Button className="bg-white relative w-full rounded-md pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm cursor-pointer">
                                    <span className="block truncate text-sm font-medium text-gray-700">
                                      {selectedEndTime.time}
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
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm no-scrollbar">
                                      {endTimeValues.map((time) => (
                                        <Listbox.Option
                                          key={time.time}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-[#3483BB]"
                                                : "text-gray-900",
                                              "cursor-pointer select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={time}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {time.time}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-[#3483BB]",
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
                    {/* Event Color */}
                    <div>
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="space-y-1 px-4 sm:grid sm:grid-cols-4 sm:space-y-0 sm:px-6 sm:py-3"
                      >
                        <RadioGroup.Label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                          Choose an event color
                        </RadioGroup.Label>
                        <div className="mt-4 flex items-center space-x-3 col-span-3">
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
                    {/* Event location */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-4 sm:space-y-0 sm:px-6 sm:py-3">
                      <div>
                        <label
                          htmlFor="event-location"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Event location{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          autoFocus
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                          type="text"
                          name="event-location"
                          id="event-location"
                          placeholder="Event location"
                          className="block w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    {/* Event notes */}
                    <div className="space-y-1 px-4 sm:grid sm:grid-cols-4 sm:space-y-0 sm:px-6 sm:py-3">
                      <div>
                        <label
                          htmlFor="event-notes"
                          className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                        >
                          {" "}
                          Notes{" "}
                        </label>
                      </div>
                      <div className="sm:col-span-3">
                        <textarea
                          onChange={(e) => setNote(e.target.value)}
                          value={note}
                          id="event-notes"
                          name="event-notes"
                          placeholder="Event notes"
                          rows={3}
                          className="block w-full rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex-shrink-0 px-4 py-2 sm:px-6">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="mr-4 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-0"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!note || !name}
                      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-[#3483BB] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#342DF2] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

type Props = {
  onClick: () => void;
  value: string;
};
type RefType = number;

const ButtonInput = forwardRef<RefType, Props>(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    type="button"
    className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-offset-0 focus:ring-0"
  >
    {format(new Date(value), "EEEE, dd MMMM yyyy")}
    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </span>
  </button>
));
