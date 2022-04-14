/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import SearchModal from "../search/SearchModal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  ChatAlt2Icon,
  UsersIcon,
  LightningBoltIcon,
  XIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Overview", url: "/", icon: "🏠", current: true },
  {
    name: "Creator Discovery",
    url: "/creators",
    icon: "👥",
    current: false,
  },
  { name: "Projects", url: "/projects", icon: "📦", current: false },
  { name: "Calendar", url: "/calendar", icon: "🚀", current: false },
];

const actions = [
  { name: "Activity", url: "/activity", icon: ChatAlt2Icon, current: false },
  {
    name: "Messages",
    url: "/messages",
    icon: LightningBoltIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full">
        <body className="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-12 w-12 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          Tom Cook
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        {session && (
          <div className="hidden md:flex md:w-[248px] md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-layout-200 bg-layout-100">
              <Dropdown />
              <div className="pb-3">
                <nav className="flex-1">
                  {actions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.url}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <div
                        className={
                          router.pathname == item.url
                            ? "mx-[8px] mb-[2px] px-[8px] rounded-[5px] h-[30px] bg-[#F0F0F2] hover:text-[#222224] text-[#222224] group flex items-center text-[14px] font-normal rounded cursor-pointer"
                            : "mx-[8px] mb-[2px] px-[8px] rounded-[5px] h-[30px] hover:bg-[#F0F0F2] hover:text-[#222224] text-[#222224] group flex items-center text-[14px] font-normal rounded cursor-pointer"
                        }
                      >
                        <div className="w-[30px] flex items-center justify-center">
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-[#646466] text-sm items-center flex w-[20px] h-[20px]"
                                : "text-[#646466] group-hover:text-[#646466] text-sm items-center flex w-[20px] h-[20px]",
                              "flex-shrink-0 h-6 w-6 text-sm items-center flex w-[20px] h-[20px] text-[#646466]"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-[11px]">{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="border-t pt-4">
                <p className="h-[30px] px-[16px] text-[13px] leading-[14px] font-medium text-[#646466]">
                  Navigation
                </p>
              </div>
              <div className="flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.url}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <div
                        className={
                          router.pathname == item.url
                            ? "bg-[#F0F0F2] hover:text-[#404040] text-[#404040] group flex items-center px-[8px] h-[45px] text-[14px] font-semibold rounded cursor-pointer"
                            : "hover:bg-[#F0F0F2] hover:text-[#404040] text-[#404040] group flex items-center px-[8px] h-[45px] text-[14px] font-semibold rounded cursor-pointer"
                        }
                      >
                        <div
                          className={classNames(
                            item.current
                              ? "text-gray-500 text-sm items-center flex bg-white h-[30px] w-[30px] rounded-[5px] justify-center"
                              : "text-gray-400 group-hover:text-gray-500 text-sm items-center flex bg-] h-[30px] w-[30px] rounded-[5px] justify-center",
                            "mr-3 flex-shrink-0 h-6 w-6 text-sm items-center flex bg-[#F1F0F2] h-[30px] w-[30px] rounded-[5px] justify-center"
                          )}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </div>
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="pt-4">
                <p className="h-[30px] px-[16px] text-[13px] leading-[14px] font-medium text-[#646466]">
                  My Team
                </p>
                <div className="py-1 group flex items-center px-2 text-sm font-medium rounded-md w-full">
                  <div className="w-full hover:bg-[#F0F0F2] hover:text-[#404040] text-[#404040] group flex items-center px-[8px] h-[30px] text-[14px] font-medium rounded cursor-pointer">
                    <div
                      className="mr-3 flex-shrink-0 h-6 w-6 text-sm items-center flex bg-[#455A63] rounded-full justify-center text-white"
                      aria-hidden="true"
                    >
                      {session.user.name.charAt(0)}
                    </div>
                    {session.user.name}
                  </div>
                </div>
                <div className="py-1 group flex items-center px-2 text-sm font-medium rounded-md w-full">
                  <div className="w-full hover:bg-[#F0F0F2] hover:text-[#7B42FF] text-[#7438FF] group flex items-center px-[8px] h-[30px] text-sm font-medium rounded cursor-pointer">
                    <div
                      className="mr-3 flex-shrink-0 h-6 w-6 text-sm items-center flex bg-[#E0D4FC] rounded-full justify-center text-[#7B42FF]"
                      aria-hidden="true"
                    >
                      +
                    </div>
                    Invite your team
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {session && (
          <div className="md:pl-[248px] flex flex-col flex-1">
            <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <SearchModal navigation={navigation} />
            <main>{props.children}</main>
          </div>
        )}
        {!session && !loading && <main>{props.children}</main>}
      </div>
    </>
  );
}