import { useState } from "react";
import Modal from "components/ui/Modal";
import { format } from "date-fns";
import { NextPage } from "next";
import useSWR from "swr";
import { CogIcon, XIcon } from "@heroicons/react/outline";

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
    bgColorClass: "bg-[#CEAA75]",
  },
  // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

const AdminHome: NextPage<{
  projects: { name: string; id: string; description: string }[];
}> = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, error } = useSWR("/api/projects/feed", fetcher);

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

  let today = format(new Date(), "EEEE, LLLL d");

  return (
    <>
      <div className="min-h-full">
        {/* Main column */}
        <div className="flex flex-col">
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Overview
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
            {/* Home Dashboard Info */}
            <div className="grid place-items-center">
              <p className="mb-1 text-base font-normal">{today}</p>
              <h1 className="text-3xl font-normal">Good morning, Tyler</h1>
              <div className="mt-4 mb-3 flex h-12 items-center rounded-full bg-[#f9f8f8]">
                <div className="mx-4 text-sm text-[#6d6e6f]">My week</div>
                <div className="h-6 border-r border-[#edeae9]"></div>
                <div className="mx-4 text-sm text-[#6d6e6f]">
                  <span className="text-base font-medium text-gray-900">0</span>{" "}
                  tasks completed
                </div>
                <div className="h-6 border-r border-[#edeae9]"></div>
                <div className="mx-4 text-sm text-[#6d6e6f]">
                  <span className="text-base font-medium text-gray-900">0</span>{" "}
                  collaborations
                </div>
              </div>
            </div>
            {/*  Start of main checklist */}
            <div className="mx-auto max-w-7xl px-8">
              <div className="w-full rounded-xl border border-gray-200 grid grid-cols-4 bg-white mt-4">
                <div className="col-span-1 p-6 space-y-4">
                  <div className="ring-1 ring-sky-400 relative block bg-sky-50 border rounded-lg shadow-sm px-4 py-2.5 cursor-pointer sm:flex sm:space-x-4 focus:outline-none items-center">
                    <span className="flex items-center">
                      <span className="text-sm flex flex-col">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-gray-500">
                          <span className="text-base font-medium leading-none text-gray-500">
                            1
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right">
                      <span className="font-medium text-gray-900">
                        Customize home
                      </span>
                    </span>
                  </div>
                  <div className="border-gray-300 relative block bg-white border rounded-lg hover:shadow-sm px-4 py-2.5 cursor-pointer sm:flex sm:space-x-4 focus:outline-none items-center">
                    <span className="flex items-center">
                      <span className="text-sm flex flex-col">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-gray-500">
                          <span className="text-base font-medium leading-none text-gray-500">
                            2
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right">
                      <span className="font-medium text-gray-900">
                        Try out goals
                      </span>
                    </span>
                  </div>
                </div>
                <div className="col-span-3 bg-slate-50 p-6 relative grid place-items-center rounded-r-xl">
                  <div className="absolute top-4 right-4">
                    <XIcon className="h-5 w-5 text-gray-500"></XIcon>
                  </div>
                  <div className="flex items-center space-x-6 max-w-2xl">
                    <img
                      src="https://cdn.loom.com/assets/[1]/home-empty-state-202b040f5f82bdb987f401a6a21fe2e1.png"
                      className="w-1/2"
                    />
                    <p className="text-sm font-normal text-gray-700">
                      Customize your background to make home your own
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
