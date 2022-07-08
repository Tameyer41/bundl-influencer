import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AdjustmentsIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { Fragment, useState, useMemo } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import useSWR, { mutate } from "swr";
import DOMPurify from "dompurify";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function ProjectBrief() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { data, error } = useSWR(`/api/projects/${router.query.id}`, fetcher);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

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

  const tabs = [
    { name: "Summary", href: `/projects/${data.project.id}`, current: true },
    {
      name: "Creators",
      href: `/projects/${data.project.id}/creators`,
      current: false,
    },
    { name: "Activity", href: "#", current: false },
    { name: "Documents", href: "#", current: false },
  ];

  return (
    <div>
      <div className="relative pb-5 sm:pb-0 border-b border-gray-200 mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-xl bg-[#48DAFD] items-center justify-center flex">
              <AdjustmentsIcon className="w-8 h-8 text-white"></AdjustmentsIcon>
            </div>
            <h3 className="text-2xl leading-6 font-medium text-gray-900">
              {data.project.name}
            </h3>
          </div>
          <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Open
            </span>
            <Menu as="div" className="ml-3 relative inline-block text-left">
              <div>
                <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex justify-between px-4 py-2 text-sm"
                          )}
                        >
                          <span>Edit</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => duplicate()}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "w-full flex justify-between px-4 py-2 text-sm"
                          )}
                        >
                          <span>Duplicate</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => destroy()}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "w-full flex justify-between px-4 py-2 text-sm"
                          )}
                        >
                          <span>Archive</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-4">
              {tabs.map((tab) => (
                <Link key={tab.name} href={tab.href}>
                  <a
                    className={classNames(
                      tab.current
                        ? "border-cyan-600 text-cyan-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="w-full h-screen lg:divide-x lg:divide-gray-200 mt-4">
        <Link href={`/projects/${data.project.id}`}>
          <a className="mt-4 ml-8 text-sm font-medium text-gray-500 hover:text-gray-700">
            {" "}
            Return to summary{" "}
          </a>
        </Link>
        {/* Stuff goes here */}
        <div className="prose lg:prose-xl px-4 sm:px-6 lg:px-8">
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(data.project.brief)}
          ></div>
        </div>
      </div>
    </div>
  );
}
