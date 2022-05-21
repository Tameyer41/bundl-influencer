import { Fragment, useEffect, useRef } from "react";
import {
  format,
  startOfToday,
  startOfWeek,
  endOfWeek,
  getWeek,
  isToday,
  isSameMonth,
  differenceInMinutes,
  parse,
  add,
  sub,
  isEqual,
  startOfMonth,
  endOfMonth,
  getDay,
  parseISO,
  isSameDay,
} from "date-fns";
import Button from "components/ui/Button";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { eachDayOfInterval } from "date-fns";
import { useState } from "react";

const meetings = [
  {
    id: 1,
    date: "May 25, 2022",
    startTime: "2022-05-25T14:00",
    endTime: "2022-05-25T16:30",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  },
  {
    id: 2,
    date: "May 27, 2022",
    startTime: "2022-05-27T07:00",
    endTime: "2022-05-27T09:30",
    name: "Meeting #2",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  },
  // More meetings...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  let today = startOfToday();
  let [currentView, setCurrentView] = useState("week");
  let [currentWeek, setCurrentWeek] = useState(format(today, "MMM-yyyy-dd"));
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy-dd"));
  let [selectedDay, setSelectedDay] = useState(today);
  let monthOfCurrentWeek = parse(currentWeek, "MMM-yyyy-dd", new Date());
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy-dd", new Date());
  let newDays = eachDayOfInterval({
    start: startOfWeek(monthOfCurrentWeek),
    end: endOfWeek(monthOfCurrentWeek),
  });

  let newMonthDays = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  });

  function nextWeek() {
    let firstDayNextWeek = add(monthOfCurrentWeek, { days: 7 });
    setCurrentWeek(format(firstDayNextWeek, "MMM-yyyy-dd"));
  }
  function previousWeek() {
    let firstDayPreviousWeek = sub(monthOfCurrentWeek, { days: 7 });
    setCurrentWeek(format(firstDayPreviousWeek, "MMM-yyyy-dd"));
  }

  function nextMonth() {
    let firstDayCurrentMonth = new Date(currentMonth);
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy-dd"));
  }
  function previousMonth() {
    let firstDayCurrentMonth = new Date(currentMonth);
    let firstDayLasttMonth = sub(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayLasttMonth, "MMM-yyyy-dd"));
  }

  function changeToWeek() {
    let firstDayCurrentMonth = new Date(currentMonth);
    setCurrentWeek(format(firstDayCurrentMonth, "MMM-yyyy-dd"));
    setCurrentView("week");
  }

  function changeToMonth() {
    let firstDayCurrentWeek = new Date(monthOfCurrentWeek);
    setCurrentMonth(format(firstDayCurrentWeek, "MMM-yyyy-dd"));
    setCurrentView("month");
  }

  function moveToDay() {
    setSelectedDay(today);
    setCurrentWeek(format(today, "MMM-yyyy-dd"));
    setCurrentMonth(format(today, "MMM-yyyy-dd"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startTime), selectedDay)
  );

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  return (
    <div className="flex h-[93vh] md:h-screen flex-col">
      <header className="relative z-40 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 className="text-lg font-semibold text-gray-900">
          {currentView === "week" && format(monthOfCurrentWeek, "MMM yyyy")}
          {currentView === "month" &&
            format(new Date(currentMonth), "MMM yyyy")}
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            {currentView === "week" && (
              <button
                onClick={previousWeek}
                type="button"
                className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {currentView === "month" && (
              <button
                onClick={previousMonth}
                type="button"
                className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            <button
              onClick={moveToDay}
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />

            {currentView === "week" && (
              <button
                onClick={nextWeek}
                type="button"
                className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {currentView === "month" && (
              <button
                onClick={nextMonth}
                type="button"
                className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                onClick={changeToWeek}
                type="button"
                className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                {currentView === "week" && "Week view"}
                {currentView === "month" && "Month view"}
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={changeToWeek}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={changeToMonth}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <Button text="Add event" />
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={moveToDay}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Day view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={changeToWeek}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Week view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={changeToMonth}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                      >
                        Month view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      {currentView === "week" && (
        <div
          ref={container}
          className="flex flex-auto flex-col overflow-auto bg-white"
        >
          <div
            style={{ width: "165%" }}
            className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
          >
            <div
              ref={containerNav}
              className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
            >
              <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
                {newDays.map((day, dayIdx) => (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDay(day)}
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3"
                  >
                    {format(day, "ccccc")}
                    <span
                      className={classNames(
                        isEqual(day, selectedDay) &&
                          "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white",
                        !isSameMonth(day, monthOfCurrentWeek) &&
                          "text-gray-400",
                        "items-center justify-center font-semibold text-gray-900"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                  </button>
                ))}
              </div>

              <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                <div className="col-end-1 w-14" />
                {newDays.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className="flex items-center justify-center py-3"
                  >
                    <span
                      className={classNames(
                        isToday(day) && "flex items-baseline",
                        !isSameMonth(day, today) && "text-gray-400",
                        ""
                      )}
                    >
                      {format(day, "ccc")}
                      <span
                        className={classNames(
                          isToday(day) &&
                            "ml-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white",
                          !isSameMonth(day, monthOfCurrentWeek) &&
                            "text-gray-400",
                          "items-center justify-center font-semibold text-gray-900"
                        )}
                      >
                        {" "}
                        {format(day, "d")}{" "}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal lines */}
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                  style={{
                    gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))",
                  }}
                >
                  <div ref={containerOffset} className="row-end-1 h-7"></div>
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      12AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      1AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      2AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      3AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      4AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      5AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      6AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      7AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      8AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      9AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      10AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      11AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      12PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      1PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      2PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      3PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      4PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      5PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      6PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      7PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      8PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      9PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      10PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      11PM
                    </div>
                  </div>
                  <div />
                </div>

                {/* Vertical lines */}
                <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                  {newDays.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={`col-start-${dayIdx + 1} row-span-full`}
                    />
                  ))}
                  <div className="col-start-8 row-span-full w-8" />
                </div>

                {/* Events mobile */}
                <ol
                  className="sm:hidden col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(288, minmax(0, 1fr)) auto",
                  }}
                >
                  {meetings.map((meeting) => (
                    <li
                      key={meeting.name}
                      className={classNames(
                        getWeek(new Date(meeting.date)) ===
                          getWeek(add(selectedDay, { days: 1 })) &&
                          `relative mt-px flex sm:col-start-${
                            parseInt(format(new Date(meeting.date), "i")) + 1
                          }`,
                        !isEqual(
                          new Date(meeting.date),
                          new Date(selectedDay)
                        ) && `hidden`,
                        "relative mt-px flex"
                      )}
                      style={{
                        gridRow: `${
                          parseInt(format(new Date(meeting.startTime), "H")) *
                            12 +
                          2
                        } / span ${Math.round(
                          differenceInMinutes(
                            new Date(meeting.endTime),
                            new Date(meeting.startTime)
                          ) / 5
                        )}`,
                      }}
                    >
                      <a className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                        <p className="order-1 font-semibold text-blue-700">
                          {meeting.name}
                        </p>
                        <p className="text-blue-500 group-hover:text-blue-700">
                          <time dateTime={`${new Date(meeting.startTime)}`}>
                            {format(new Date(meeting.startTime), "p")}
                          </time>
                        </p>
                      </a>
                    </li>
                  ))}
                  <li
                    className="relative mt-px flex sm:col-start-3"
                    style={{ gridRow: "92 / span 30" }}
                  >
                    <a className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                      <p className="order-1 font-semibold text-pink-700">
                        Flight to Paris
                      </p>
                      <p className="text-pink-500 group-hover:text-pink-700">
                        <time dateTime="2022-01-12T07:30">7:30 AM</time>
                      </p>
                    </a>
                  </li>
                  <li
                    className="relative mt-px hidden sm:col-start-6 sm:flex"
                    style={{ gridRow: "122 / span 24" }}
                  >
                    <a className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200">
                      <p className="order-1 font-semibold text-gray-700">
                        Meeting with design team at Disney
                      </p>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        <time dateTime="2022-01-15T10:00">10:00 AM</time>
                      </p>
                    </a>
                  </li>
                </ol>
                {/* Events sm breakpoints and up */}
                <ol
                  className="hidden col-start-1 col-end-2 row-start-1 sm:grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(288, minmax(0, 1fr)) auto",
                  }}
                >
                  {meetings.map((meeting) => (
                    <li
                      key={meeting.name}
                      className={classNames(
                        getWeek(new Date(meeting.date)) !=
                          getWeek(new Date(currentWeek)) && `hidden`,
                        `relative mt-px flex col-start-${
                          parseInt(format(new Date(meeting.date), "i")) + 1
                        }`
                      )}
                      style={{
                        gridRow: `${
                          parseInt(format(new Date(meeting.startTime), "H")) *
                            12 +
                          2
                        } / span ${Math.round(
                          differenceInMinutes(
                            new Date(meeting.endTime),
                            new Date(meeting.startTime)
                          ) / 5
                        )}`,
                      }}
                    >
                      <a className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100">
                        <p className="order-1 font-semibold text-blue-700">
                          {meeting.name}
                        </p>
                        <p className="text-blue-500 group-hover:text-blue-700">
                          <time dateTime={`${new Date(meeting.startTime)}`}>
                            {format(new Date(meeting.startTime), "p")}
                          </time>
                        </p>
                      </a>
                    </li>
                  ))}
                  <li
                    className="relative mt-px flex sm:col-start-3"
                    style={{ gridRow: "92 / span 30" }}
                  >
                    <a className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                      <p className="order-1 font-semibold text-pink-700">
                        Flight to Paris
                      </p>
                      <p className="text-pink-500 group-hover:text-pink-700">
                        <time dateTime="2022-01-12T07:30">7:30 AM</time>
                      </p>
                    </a>
                  </li>
                  <li
                    className="relative mt-px hidden sm:col-start-6 sm:flex"
                    style={{ gridRow: "122 / span 24" }}
                  >
                    <a className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200">
                      <p className="order-1 font-semibold text-gray-700">
                        Meeting with design team at Disney
                      </p>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        <time dateTime="2022-01-15T10:00">10:00 AM</time>
                      </p>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentView === "month" && (
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-white py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-white py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {newMonthDays.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    isSameMonth(day, today)
                      ? "bg-white"
                      : "bg-gray-50 text-gray-500",
                    "relative py-2 px-3"
                  )}
                >
                  <time
                    dateTime={JSON.stringify(day)}
                    className={
                      isToday(day)
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    }
                  >
                    {format(day, "d")}
                  </time>
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {newMonthDays.map((day, dayIdx) => (
                <button
                  key={day.toString()}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    isSameMonth(day, today) ? "bg-white" : "bg-gray-50",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-indigo-600",
                    !isEqual(day, selectedDay) &&
                      isSameMonth(day, today) &&
                      !isToday(day) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isSameMonth(day, today) &&
                      !isToday(day) &&
                      "text-gray-500",
                    "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                  )}
                >
                  <time
                    dateTime={day.toString()}
                    className={classNames(
                      isEqual(day, selectedDay) &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-indigo-600",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      "ml-auto"
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  {meetings.some((meeting) =>
                    isSameDay(parseISO(meeting.startTime), day)
                  ) && (
                    <div className="w-1 h-1 rounded-full bg-sky-500 mt-1 mx-auto"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          {meetings.length > 0 && (
            <div className="py-10 px-4 sm:px-6 lg:hidden">
              <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <li
                      key={meeting.name}
                      className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <p className="font-semibold text-gray-900">
                          {meeting.name}
                        </p>
                        <time
                          dateTime={meeting.startTime}
                          className="mt-2 flex items-center text-gray-700"
                        >
                          <ClockIcon
                            className="mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {format(new Date(meeting.startTime), "hh:mm a")}
                          {""}-{""}
                          {format(new Date(meeting.endTime), "hh:mm a")}
                        </time>
                      </div>
                      <a
                        href="#"
                        className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                      >
                        Edit<span className="sr-only">, {meeting.name}</span>
                      </a>
                    </li>
                  ))
                ) : (
                  <p> No meetings for today. </p>
                )}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

let colStartClasses = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];
