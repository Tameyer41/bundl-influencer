import { useState, Fragment, useEffect, useRef } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { format, formatDuration, differenceInMinutes } from "date-fns";
import { ChevronRightIcon, LocationMarkerIcon } from "@heroicons/react/outline";

export default function CalendarPopover(props) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <Popover className="group absolute inset-1 rounded-lg">
      <Popover.Button
        ref={setReferenceElement}
        className="leading-5 bg-blue-50 p-2 hover:bg-blue-100 rounded-lg flex flex-col overflow-y-auto no-scrollbar text-xs h-full w-full focus:ring-0 focus:ring-none focus:outline-none focus:outline-0"
      >
        <p className="order-1 font-semibold text-blue-700  text-left">
          {props.meeting.name}
        </p>
        <p className="text-blue-500 group-hover:text-blue-700  text-left">
          <time dateTime={`${new Date(props.meeting.startTime)}`}>
            {format(new Date(props.meeting.startTime), "p")}
          </time>
        </p>
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="w-[325px] z-40"
      >
        <div className="px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:max-w-3xl sm:w-full sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-100">
          <div>
            <div className="absolute top-0 left-0 z-10 h-20 w-full bg-gradient-to-b from-blue-100"></div>
            <div className="mt-3 sm:mt-5">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                {props.meeting.name}
              </h3>
              <div className="mt-2 flex items-center space-x-1">
                <p className="text-sm text-gray-500">
                  {format(new Date(props.meeting.startTime), "h:mm a")}
                </p>
                <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">
                  {format(new Date(props.meeting.endTime), "h:mm a")}
                </p>
                <p className="text-sm text-gray-500">
                  {" "}
                  (
                  {differenceInMinutes(
                    new Date(props.meeting.endTime),
                    new Date(props.meeting.startTime)
                  ) > 59
                    ? formatDuration(
                        {
                          hours:
                            differenceInMinutes(
                              new Date(props.meeting.endTime),
                              new Date(props.meeting.startTime)
                            ) / 60,
                        },
                        { format: ["hours"] }
                      )
                    : formatDuration(
                        {
                          minutes: differenceInMinutes(
                            new Date(props.meeting.endTime),
                            new Date(props.meeting.startTime)
                          ),
                        },
                        { format: ["minutes"] }
                      )}
                  )
                </p>
              </div>
              {props.meeting.location && (
                <div className="flex items-center space-x-1 mt-2">
                  <LocationMarkerIcon className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {" "}
                    {props.meeting.location}{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 sm:mt-6 flex items-end">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Edit event
            </button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
