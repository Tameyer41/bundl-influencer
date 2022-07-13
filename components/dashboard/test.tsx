<div className="flex h-[93vh] md:h-screen flex-col">
  <header className="relative z-40 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
    <h1 className="text-lg font-semibold text-gray-900">
      {format(monthOfCurrentWeek, "MMM yyyy")}
    </h1>
    <div className="flex items-center">
      <div className="flex items-center rounded-md shadow-sm md:items-stretch">
        <button
          type="button"
          className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
        >
          Today
        </button>
        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />

        <button
          type="button"
          className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden md:ml-4 md:flex md:items-center">
        <div className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <ChevronDownIcon
            className="ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-6 h-6 w-px bg-gray-300" />
        <button
          type="button"
          className="mx-4 rounded border border-transparent bg-[#625DF5] hover:bg-[#342DF2] transition-colors duration-250 text-white  py-2 px-4 text-sm font-medium shadow-sm"
        >
          Add an event
        </button>
      </div>
      <div className="relative ml-6 md:hidden">
        <div className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  </header>
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
                  !isSameMonth(day, monthOfCurrentWeek) && "text-gray-400",
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
                    !isSameMonth(day, monthOfCurrentWeek) && "text-gray-400",
                    "items-center justify-center font-semibold"
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
        </div>
      </div>
    </div>
  </div>
</div>;
