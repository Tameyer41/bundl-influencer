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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

const ProjectsHome: NextPage<{
  projects: { name: string; id: string; description: string }[];
}> = (props) => {
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
              className="mx-4 rounded border border-transparent bg-[#625DF5] hover:bg-[#342DF2] transition-colors duration-250 text-white  py-2 px-4 text-sm font-medium shadow-sm"
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
        <div className="min-h-full">
          {/* Main column */}
          <div className="flex flex-col">
            <main className="flex-1">
              {/* Page title & actions */}
              <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                    Projects
                  </h1>
                </div>
                <div className="flex">
                  <Modal />
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
              {/* Pinned projects */}
              <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  Pinned Projects
                </h2>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3"
                >
                  {pinnedProjects.map((project) => (
                    <li
                      key={project.id}
                      className="relative col-span-1 flex shadow-sm rounded-md"
                    >
                      <div
                        className={classNames(
                          project.bgColorClass,
                          "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                        )}
                      >
                        {project.initials}
                      </div>
                      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                          <a
                            href="#"
                            className="text-gray-900 font-medium hover:text-gray-600"
                          >
                            {project.title}
                          </a>
                          <p className="text-gray-500">
                            {project.totalMembers} Members
                          </p>
                        </div>
                        <Menu as="div" className="flex-shrink-0 pr-2">
                          <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500">
                            <span className="sr-only">Open options</span>
                            <DotsVerticalIcon
                              className="w-5 h-5"
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
                            <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      View
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Removed from pinned
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Share
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </li>
                  ))}
                </ul>
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
                                        unoptimized={true}
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
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="h-[90vh] grid place-items-center">
          <div className="md:w-[430px] space-y-4 rounded-lg p-6 bg-white">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#CAA53D]"
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
                    className="h-4 w-4 text-[#7E623A]"
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
};

export default ProjectsHome;
