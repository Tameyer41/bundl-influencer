import Card from "components/ui/Card";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { Fragment, useState } from "react";
import { filter } from "lodash";
import Modal from "components/ui/Modal";
import { ChevronDownIcon, CogIcon } from "@heroicons/react/outline";
import Link from "next/link";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CreatorsPage() {
  const { data, error } = useSWR(`/api/users/creators`, fetcher);
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");

  console.log(session);

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

  const filteredUsers =
    query === ""
      ? data
      : data.filter((data) => {
          return data.name
            ? data.name.toLowerCase().includes(query.toLowerCase())
            : null;
        });

  return (
    <main className="lg:max-w-[60rem] lg:mx-auto pt-5 lg:pt-6 pb-16 px-6 relative">
      <div className="mb-6 text-2xl text-[#212121] font-medium ml-12 lg:ml-0">
        Creators
      </div>
      <div className="block max-w-full overflow-auto mb-8">
        <div className="border-b border-gray-200">
          <div className="w-1/4 py-2">
            <Listbox
              value={"No filters"}
              onClick={() => console.log("clicked")}
            >
              {({ open }) => (
                <>
                  <Listbox.Button className="relative w-full bg-[#eff1f4] hover:bg-[#E0E0E0] text-gray-700 hover:text-gray-900 rounded-md pl-2 pr-8 py-1.5 text-left cursor-pointer focus:outline-none focus:ring-0 sm:text-sm">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      <span className="ml-3 block truncate font-medium">
                        Filter Creators
                      </span>
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon
                        className="h-4 w-4 text-gray-400"
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
                    <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-gray-900 bg-[#f5f6f8]"
                              : "text-gray-900",
                            "cursor-pointer select-none relative py-2 pl-3 pr-9 flex items-center"
                          )
                        }
                        value={"test"}
                      >
                        <span className="flex-shrink-0 inline-block h-2 w-2 rounded-full" />
                        <span className="ml-3 block truncate">Color name</span>
                      </Listbox.Option>
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="py-8 sm:py-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {filteredUsers.map(function (d, idx) {
              return <Card user={d} key={d.id} />;
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center absolute top-5 right-0 mt-3 mr-5 h-5">
        <Menu as="div" className="relative">
          <Menu.Button type="button" className="relative">
            <div className="inline-flex h-9 w-9 max-w-full cursor-pointer items-center rounded-full bg-[#0C3D8D] hover:bg-[#3D64A4] transition duration-250 p-0 text-white ease-out hover:scale-110 hover:transform">
              <svg
                width="24"
                height="24"
                fill="none"
                className="mx-auto h-6 w-6 stroke-current"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 5.75v12.5M18.25 12H5.75"
                ></path>
              </svg>
            </div>
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
            <Menu.Items className="absolute right-0 mt-3 w-44 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      Create a campaign
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      Create an event
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </main>
  );
}
CreatorsPage.auth = true;
