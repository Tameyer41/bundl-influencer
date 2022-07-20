import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import Modal from "components/ui/Modal";
import moment from "moment";
import { NextPage } from "next";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import { ChevronRightIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { CogIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Router from "next/router";

const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-[#625DF5]",
  },
  // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);

const tabs = [
  { name: "Active", href: "/projects", current: true },
  { name: "Archived", href: "/projects/archived", current: false },
  { name: "Settings", href: "/projects/settings", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function ProjectsHome(props) {
  const { data, error } = useSWR("/api/projects/feed", fetcher);
  const [view, setView] = useState("grid");
  const [query, setQuery] = useState("");

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <main className="lg:max-w-[60rem] lg:mx-auto pt-6 pb-16 px-6 relative">
        <div className="mb-6">
          <h1 className="text-2xl text-[#212121] font-medium">Campaigns</h1>
        </div>
        <div className="block max-w-full overflow-auto mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {tabs.map((tab) => (
                <Link key={tab.name} href={tab.href}>
                  <a
                    className={classNames(
                      tab.current
                        ? "border-[#0C3D8D] text-[#212121]"
                        : "border-transparent text-[#212121] text-opacity-60 hover:text-[#212121]",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                  >
                    {tab.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Projects
            </h1>
          </div>
          <div className="flex">
            <button
              type="button"
              className="mx-4 rounded border border-transparent bg-blue-500 hover:bg-[#625DF5] transition-colors duration-250 text-white  py-2 px-4 text-sm font-medium shadow-sm"
            >
              Create a project
            </button>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span className="sr-only">Previous</span>
                <CogIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
        <div className="flex items-center absolute top-5 right-0 mt-3 mr-5 h-5">
          <div className="relative">
            <button
              type="button"
              className="inline-flex h-9 w-9 max-w-full cursor-pointer items-center rounded-full bg-[#0C3D8D] hover:bg-[#3D64A4] transition duration-250 p-0 text-white ease-out hover:scale-110 hover:transform"
            >
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
            </button>
          </div>
        </div>
      </main>
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
    <>
      {projects ? (
        <main className="lg:max-w-[60rem] lg:mx-auto pt-6 pb-16 px-6 relative">
          <div className="mb-6">
            <h1 className="text-2xl text-[#212121] font-medium">Campaigns</h1>
          </div>
          <div className="block max-w-full overflow-auto mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4">
                {tabs.map((tab) => (
                  <Link key={tab.name} href={tab.href}>
                    <a
                      className={classNames(
                        tab.current
                          ? "border-[#0C3D8D] text-[#212121]"
                          : "border-transparent text-[#212121] text-opacity-60 hover:text-[#212121]",
                        "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                    >
                      {tab.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <>
            <div className="flex items-center">
              <div className="flex h-10 flex-grow items-center">
                <div className="mr-1">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-transparent stroke-current"
                  >
                    <path
                      d="M15.42 6.58a6.25 6.25 0 1 1-8.84 8.84 6.25 6.25 0 0 1 8.84-8.84M19.25 19.25l-3.5-3.5"
                      stroke="#25252D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full border-0 bg-transparent py-1.5 px-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
                  placeholder="Search campaigns by name..."
                />
              </div>
              <div className="ml-2 -mr-1 rounded-lg hover:bg-gray-100">
                <button
                  className="inline-flex h-10 w-10 max-w-full cursor-pointer items-center rounded-lg p-2"
                  type="button"
                  onClick={() => setView("row")}
                >
                  <span
                    className={
                      view === "row"
                        ? "h-6 w-6 flex-shrink-0 text-gray-900"
                        : "h-6 w-6 flex-shrink-0 text-gray-900 opacity-40 hover:opacity-100"
                    }
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                    >
                      <path
                        d="M3.75 5.75h2.5M10.75 5.75h9.5M6.25 12h-2.5M20.25 12h-9.5M3.75 18.25h2.5M10.75 18.25h9.5"
                        stroke="#25252D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button
                  className="inline-flex h-10 w-10 max-w-full cursor-pointer items-center rounded-lg p-2"
                  type="button"
                  onClick={() => setView("grid")}
                >
                  <span
                    className={
                      view === "row"
                        ? "h-6 w-6 flex-shrink-0 text-gray-900 opacity-40 hover:opacity-100"
                        : "h-6 w-6 flex-shrink-0 text-gray-900"
                    }
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                    >
                      <path
                        d="M8.5 3.75h-3c-1 0-1.75.75-1.75 1.75v3c0 1 .75 1.75 1.75 1.75h3c1 0 1.75-.75 1.75-1.75v-3c0-1-.75-1.75-1.75-1.75ZM8.5 13.75h-3c-1 0-1.75.75-1.75 1.75v3c0 1 .75 1.75 1.75 1.75h3c1 0 1.75-.75 1.75-1.75v-3c0-1-.75-1.75-1.75-1.75ZM18.5 3.75h-3c-1 0-1.75.75-1.75 1.75v3c0 1 .75 1.75 1.75 1.75h3c1 0 1.75-.75 1.75-1.75v-3c0-1-.75-1.75-1.75-1.75ZM18.5 13.75h-3c-1 0-1.75.75-1.75 1.75v3c0 1 .75 1.75 1.75 1.75h3c1 0 1.75-.75 1.75-1.75v-3c0-1-.75-1.75-1.75-1.75Z"
                        stroke="#25252D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {view === "row" && (
              <table className="mt-2 w-full table-auto border-collapse border-b border-gray-100">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 pl-0 pr-4 text-left">
                      <h4 className="text-sm font-light text-gray-500">
                        Project Name
                      </h4>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <h4 className="text-sm font-light text-gray-500">
                        Status
                      </h4>
                    </th>
                    <th className="px-4 py-3 text-right">
                      <h4 className="text-right text-sm font-light text-gray-500">
                        Added
                      </h4>
                    </th>
                    <th className="p-4 py-3 pr-1 text-left">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((project, idx) => (
                    <tr
                      key={project.id}
                      className="group border-b border-gray-100 group"
                    >
                      <td className="min-w-[240px] py-3 pl-0 pr-4 group-hover:bg-gray-100">
                        <Link href={`/projects/${project.id}`}>
                          <a className="flex items-center text-sm font-normal text-gray-900">
                            <div
                              className={`mx-2 flex-shrink-0 w-2.5 h-2.5 rounded-full ${project.color}`}
                              aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900 ml-2">
                              {project.name}
                            </p>
                          </a>
                        </Link>
                      </td>
                      <td className="w-full py-3 px-4 group-hover:bg-gray-100">
                        <Link href={`/projects/${project.id}`}>
                          <a className="flex items-center text-sm font-normal">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3 h-6 w-6 fill-transparent stroke-current text-emerald-500"
                            >
                              <path
                                d="m8.75 8.75 6.5 6.5M15.25 8.75l-6.5 6.5"
                                stroke="#F53D6B"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <circle
                                cx="12"
                                cy="12"
                                r="9.25"
                                stroke="#F53D6B"
                                strokeWidth="1.5"
                              ></circle>
                            </svg>
                            <span className="font-normal text-gray-500">
                              In Progress
                            </span>
                          </a>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap text-right text-sm font-normal text-gray-900 group-hover:bg-gray-100">
                        <div className="flex items-center">
                          {moment(project.updatedAt).format("MMMM Do, YYYY")}
                        </div>
                      </td>
                      <td className="!py-2 pr-1 pl-4 group-hover:bg-gray-100">
                        <div className="relative flex h-4 items-center">
                          <Link href={`/projects/${project.id}`}>
                            <button
                              className="inline-flex h-8 w-8 max-w-full cursor-pointer items-center rounded-lg bg-transparent p-1 hover:bg-gray-100"
                              id="headlessui-popover-button-171"
                              type="button"
                              aria-expanded="false"
                            >
                              <svg
                                width="24"
                                height="24"
                                fill="none"
                                className="h-6 w-6 text-gray-900"
                              >
                                <path
                                  fill="currentColor"
                                  d="M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                ></path>
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {view === "grid" && (
              <div className="mt-2 -mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredUsers.map((project, idx) => (
                  <div key={project.id}>
                    <div
                      onMouseEnter={() => {
                        mutate(
                          `/api/projects/${project.id}`,
                          async (current) => {
                            return (
                              current ?? fetcher(`/api/projects/${project.id}`)
                            );
                          }
                        );
                      }}
                      className="group relative max-w-[400px] cursor-pointer rounded-xl p-4 hover:bg-gray-100"
                    >
                      <Link href={`/projects/${project.id}`}>
                        <a
                          className={`h-60  mb-4 rounded-lg flex-shrink-0 grid place-items-center bg-gray-100`}
                        >
                          <p className="text-gray-900 text-xl font-medium">
                            {project.name
                              .split(" ")
                              .map((n) => n[0].toUpperCase())
                              .join("")}
                          </p>
                        </a>
                      </Link>

                      <div className="absolute top-0 right-0 mt-7 mr-7 hidden group-hover:block">
                        <div className="relative h-8 w-8 rounded-lg bg-white hover:bg-gray-50">
                          <button
                            className="inline-flex h-8 w-8 max-w-full items-center rounded-lg p-1"
                            id="headlessui-popover-button-356"
                            type="button"
                            aria-expanded="false"
                          >
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              className="h-6 w-6 text-gray-900"
                            >
                              <path
                                fill="currentColor"
                                d="M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <Link href={`/projects/${project.id}`}>
                        <a>
                          <div className="flex justify-between mt-4">
                            <div className="overflow-hidden">
                              <h2 className="truncate text-sm font-medium text-gray-900">
                                {project.name}
                              </h2>
                              <p className="text-gray-500 text-sm font-normal">
                                <span>
                                  {project.users.length > 1
                                    ? project.users.length + " creators"
                                    : project.users.length + " creator"}{" "}
                                </span>
                              </p>
                            </div>

                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`inline-block h-6 w-6 text-emerald-400`}
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </div>
                          <div className="mt-4 flex items-center">
                            <div className="w-1/2">
                              <p className="text-gray-500 text-sm font-normal">
                                Status
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                —
                              </p>
                            </div>
                            <div className="ml-4 w-1/2 overflow-hidden">
                              <div className="h-6 w-full text-emerald-400">
                                <svg
                                  className="sparkline"
                                  width="92"
                                  height="24"
                                  strokeWidth="1.5"
                                ></svg>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center">
                            <div className="w-full">
                              <p className="text-gray-500 text-sm font-normal">
                                Project Users
                              </p>
                              <div className="mt-1 text-sm font-medium text-gray-900">
                                <div className="flex items-center space-x-2">
                                  <div className="flex flex-shrink-0 -space-x-1">
                                    {project.users.map((user) => (
                                      <div key={user.userId}>
                                        {user.user.image ? (
                                          <Image
                                            src={user.user.image}
                                            className="flex-shrink-0 rounded-full max-w-none object-cover"
                                            width={24}
                                            height={24}
                                          />
                                        ) : (
                                          <div className="flex-shrink-0 rounded-full w-6 h-6 bg-indigo-600"></div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  {project.users.length > 4 ? (
                                    <span className="flex-shrink-0 text-xs leading-5 font-medium">
                                      +{project.users.length - 4}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
          <div className="mt-4 -mr-2 flex items-center justify-between">
            <span className="text-sm font-normal text-gray-900">
              {data.length > 1
                ? data.length + " results"
                : data.length + " result"}
            </span>
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
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
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
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
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
      ) : (
        <div className="h-[90vh] grid place-items-center">
          <div className="md:w-[430px] space-y-4 rounded-lg p-6 bg-white">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#625DF5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-center text-3xl font-medium text-gray-700">
              No projects found
            </h1>
            <p className="text-center text-sm text-gray-600">
              Creating a problem is as easy and pressing the button found below.
              You can view all of your current and past projects.
            </p>
            <div className="flex items-center justify-between rounded border border-gray-200 p-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200">
                  🛟
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Create a project
                  </p>
                  <p className="text-xs font-normal text-gray-500">
                    (385) 145 1736
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-[#7E623A]">
                  Action needed
                </p>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#625DF5]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <a
              href="#"
              className="flex justify-center text-sm font-normal text-gray-500"
            >
              Cancel porting{" "}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
ProjectsHome.auth = {
  role: "admin",
  loading: <p>test</p>,
  unauthorized: "/creators", // redirect to this url
};
