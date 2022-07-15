/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import SearchModal from "../search/SearchModal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import { StandaloneLink } from "components/ui/StandaloneLink";
import Image from "next/image";
import { mutate } from "swr";
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  InboxIcon,
} from "@heroicons/react/outline";

import {
  MenuIcon,
  ChatAlt2Icon,
  LightningBoltIcon,
  XIcon,
} from "@heroicons/react/outline";
import InvitationModal from "components/ui/InvitationModal";

const navigation = [
  { name: "Overview", url: "/", icon: "🏠", apiRoute: "", current: true },
  {
    name: "Campaigns",
    url: "/projects",
    icon: "🚀",
    apiRoute: "/api/projects/feed",
    current: false,
  },
  {
    name: "Influencer Discovery",
    url: "/creators",
    icon: "👥",
    apiRoute: "/api/users/creators",
    current: false,
  },

  {
    name: "Content Calendar",
    url: "/calendar",
    icon: "🗓️",
    apiRoute: "/api/events",
    current: false,
  },
  {
    name: "Products",
    url: "/products",
    icon: "🚛",
    apiRoute: "",
    current: false,
  },
  { name: "Legal", url: "/legal", icon: "🔒", apiRoute: "", current: false },
];

const actions = [
  {
    name: "Activity",
    url: "/activity",
    icon: LightningBoltIcon,
    current: false,
  },
  {
    name: "Messages",
    url: "/messages",
    icon: ChatAlt2Icon,
    current: false,
  },
];

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-[101] md:hidden"
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-zinc-50">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2 standalone:pt-12">
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
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto standalone:pt-12">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <svg
                      className="h-8 w-8"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 595.5 595.3"
                    >
                      <path
                        d="M224.6,12.5H67.3c-30.2,0-54.6,24.5-54.6,54.6v157.3c0,27.2,22.1,49.3,49.3,49.3h212l0,0v-212
	C274,34.6,251.9,12.5,224.6,12.5z"
                      />
                      <path d="M12.7,528.1c0,30.2,24.5,54.6,54.6,54.6h61V467.1H12.7V528.1z" />
                      <path
                        d="M274,321.4H62c-27.2,0-49.3,22.1-49.3,49.3v46.9h165v165h46.9c27.2,0,49.3-22.1,49.3-49.3L274,321.4
	C274,321.4,274,321.4,274,321.4z"
                      />
                      <path
                        d="M527.7,321.4h-212v212c0,27.2,22.1,49.3,49.3,49.3h157.3c30.2,0,54.6-24.5,54.6-54.6V370.7
	C577.1,343.5,555,321.4,527.7,321.4z"
                      />
                      <path
                        d="M522.4,12.5H365.1c-27.2,0-49.3,22.1-49.3,49.3v212h54.1h53.2h75.9h28.7c27.2,0,49.3-22.1,49.3-49.3V67.2
	C577.1,37,552.6,12.5,522.4,12.5z M514.3,185.5c0,14.2-11.5,25.6-25.6,25.6h-14.9h-39.5h-27.7h-28.1V100.9
	c0-14.2,11.5-25.6,25.6-25.6h81.8c15.7,0,28.4,12.7,28.4,28.4V185.5z"
                      />
                    </svg>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.url}>
                        <div
                          onClick={() => setSidebarOpen(false)}
                          className={
                            "/" + router.pathname.split("/")[1] == item.url
                              ? "mx-[8px] mb-[2px] px-2 py-2 bg-gray-200 hover:text-[#3F3F3F] text-[#3F3F3F] group flex items-center text-[14px] font-medium rounded cursor-pointer"
                              : "mx-[8px] mb-[2px] px-2 py-2 hover:bg-gray-200 hover:text-[#3F3F3F] text-[#3F3F3F] group flex items-center text-[14px] font-medium rounded cursor-pointer"
                          }
                        >
                          <p className="text-[18px] pr-[12px]">{item.icon}</p>
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <Link href="/settings">
                    <a className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          {session.user.image ? (
                            <img
                              src={session.user.image}
                              className="flex-shrink-0 rounded-full object-cover w-12 h-12"
                            />
                          ) : (
                            <div className="flex-shrink-0 rounded-full w-12 h-12 bg-blue-500"></div>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {session.user.name}
                          </p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-[280px] md:flex-col md:fixed md:inset-y-0 z-10">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-[#F0F0F0] bg-zinc-50">
            <Dropdown />
            <SearchModal navigation={navigation} />
            <div className="py-3">
              <nav className="flex-1">
                {actions.map((item) => (
                  <Link key={item.name} href={item.url}>
                    <div
                      className={
                        "/" + router.pathname.split("/")[1] == item.url
                          ? "mx-[8px] mb-[2px] px-2 py-2 bg-gray-200 hover:text-[#3F3F3F] text-[#3F3F3F] group flex items-center text-[14px] font-medium rounded cursor-pointer"
                          : "mx-[8px] mb-[2px] px-2 py-2 hover:bg-gray-200 hover:text-[#3F3F3F] text-gray-500 group flex items-center text-[14px] font-medium rounded cursor-pointer"
                      }
                    >
                      <div className="w-[30px] flex items-center justify-center">
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-[#646466] text-sm items-center flex"
                              : "text-gray-500 text-sm items-center flex",
                            "flex-shrink-0 h-[20px] w-[20px] text-sm items-center flex text-[#646466] mr-4"
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="">{item.name}</div>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-[#F0F0F0] pt-4">
              <p className="h-[30px] px-[16px] text-[13px] leading-[14px] font-medium text-[#646466]">
                Navigation
              </p>
            </div>
            <div className="flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.url}>
                    <a
                      onMouseEnter={() => {
                        mutate(`${item.apiRoute}`, async (current) => {
                          return current ?? fetcher(`${item.apiRoute}`);
                        });
                      }}
                      className={
                        "/" + router.pathname.split("/")[1] == item.url
                          ? "bg-gray-200 hover:text-[#3F3F3F] text-[#3F3F3F] group flex items-center px-2 py-2 text-sm font-medium rounded cursor-pointer group"
                          : "hover:bg-gray-200 hover:text-[#3F3F3F] text-gray-500 group flex items-center px-2 py-2 text-sm font-medium rounded cursor-pointer group"
                      }
                    >
                      <div className="text-base mr-4">{item.icon}</div>
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="pt-4">
              <p className="h-[30px] px-[16px] text-[13px] leading-[14px] font-medium text-[#646466]">
                My Team
              </p>
              <div className="py-1 group flex items-center px-2 text-sm font-medium rounded-md w-full">
                <Link href="/settings">
                  <div className="w-full hover:bg-gray-200 hover:text-[#404040] text-[#404040] group flex items-center px-2 py-2 text-sm font-medium rounded cursor-pointer">
                    <div
                      className="mr-3 flex-shrink-0 h-6 w-6 text-sm items-center flex bg-[#455A63] rounded-full justify-center text-white"
                      aria-hidden="true"
                    >
                      {session.user.name ? session.user.name.charAt(0) : ""}
                    </div>
                    {session.name}
                  </div>
                </Link>
              </div>
              <div className="py-1 group flex items-center px-2 text-sm font-medium rounded-md w-full">
                <InvitationModal />
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-[280px] flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white standalone:h-20 standalone:pt-8">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main>{props.props.children}</main>
        </div>
        {!session && !loading && <main>{props.props.children}</main>}
      </div>
      <footer className="hidden standalone:flex standalone:fixed standalone:w-full standalone:bottom-0 bg-white z-[100] border-t border-gray-200 mt-auto">
        <StandaloneLink
          href="/"
          className="flex items-center justify-center w-1/4 py-3 text-gray-500"
          activeClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
          inactiveClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
        >
          {({ isActive }) =>
            isActive ? (
              <HomeIcon className="p-px text-blue-500 w-7 h-7" />
            ) : (
              <HomeIcon className="p-px text-gray-500 w-7 h-7" />
            )
          }
        </StandaloneLink>
        <StandaloneLink
          href="/explore"
          className="flex items-center justify-center w-1/4 py-3 text-gray-500"
          activeClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
          inactiveClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
        >
          {({ isActive }) =>
            isActive ? (
              <SearchIcon className="p-px text-blue-500 w-7 h-7" />
            ) : (
              <SearchIcon className="p-px text-gray-500 w-7 h-7" />
            )
          }
        </StandaloneLink>
        <StandaloneLink
          href="/notifications"
          className="flex items-center justify-center w-1/4 py-3 text-gray-500"
          activeClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
          inactiveClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
        >
          {({ isActive }) =>
            isActive ? (
              <BellIcon className="p-px text-blue-500 w-7 h-7" />
            ) : (
              <BellIcon className="p-px text-gray-500 w-7 h-7" />
            )
          }
        </StandaloneLink>
        <StandaloneLink
          href="/messages"
          className="flex items-center justify-center w-1/4 py-3 text-gray-500"
          activeClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
          inactiveClassName="flex items-center justify-center w-1/4 py-3 text-gray-500"
        >
          {({ isActive }) =>
            isActive ? (
              <InboxIcon className="p-px text-blue-500 w-7 h-7" />
            ) : (
              <InboxIcon className="p-px text-gray-500 w-7 h-7" />
            )
          }
        </StandaloneLink>
      </footer>
    </>
  );
}
