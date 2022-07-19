import { Fragment, useState } from "react";
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
  { name: "All", href: "/projects", current: true },
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

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="w-full">
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
      </div>
    );

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
                          ? "border-[#625df5] text-[#212121]"
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

          {/* Projects list (only on smallest breakpoint) */}
          <div className="mt-10 sm:hidden">
            <div className="px-4 sm:px-6">
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Projects
              </h2>
            </div>
            <ul
              role="list"
              className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
            >
              {data.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/${project.id}`}>
                    <a className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                      <span className="flex items-center truncate space-x-3">
                        <span
                          className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${project.color}`}
                          aria-hidden="true"
                        />
                        <span className="font-medium truncate text-sm leading-6 text-gray-900">
                          {project.name}{" "}
                          <span className="truncate font-normal text-gray-500">
                            in Projects
                          </span>
                        </span>
                      </span>
                      <ChevronRightIcon
                        className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects table (small breakpoint and up) */}
          <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="border-t border-gray-200">
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="lg:pl-2">Project</span>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last updated
                    </th>
                    <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data.map((project, idx) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link href={`/projects/${project.id}`}>
                          <a
                            onMouseEnter={() => {
                              mutate(
                                `/api/projects/${project.id}`,
                                async (current) => {
                                  return (
                                    current ??
                                    fetcher(`/api/projects/${project.id}`)
                                  );
                                }
                              );
                            }}
                            className="px-6 py-3 flex items-center space-x-3 lg:pl-8 lg:pr-6 cursor-pointer text-gray-900"
                          >
                            <div
                              className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${project.color}`}
                              aria-hidden="true"
                            />

                            <span className="truncate hover:text-gray-600 cursor-pointer">
                              {project.name}{" "}
                              <span>
                                <span className="text-gray-500 font-normal">
                                  in Projects
                                </span>
                              </span>
                            </span>
                          </a>
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500 font-medium">
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
                      </td>
                      <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                        {moment(project.updatedAt).format("MMMM Do, YYYY")}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center absolute top-5 right-0 mt-3 mr-5 h-5">
            <div className="relative">
              <button
                type="button"
                className="inline-flex h-9 w-9 max-w-full cursor-pointer items-center rounded-full bg-blue-500 p-0 text-white transition-transform duration-200 ease-out hover:scale-110 hover:transform"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  className="mx-auto h-6 w-6 stroke-current"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 5.75v12.5M18.25 12H5.75"
                  ></path>
                </svg>
              </button>
            </div>
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
  role: "test",
  loading: <p>test</p>,
  unauthorized: "/login-with-different-user", // redirect to this url
};
