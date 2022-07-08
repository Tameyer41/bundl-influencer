import React from "react";
import Link from "next/link";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Router from "next/router";
import useSWR, { mutate } from "swr";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

async function destroy(): Promise<void> {
  const { id } = Router.query;
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}`, {
    method: "DELETE",
  });
  await mutate(`/api/projects/feed`);
  await Router.push("/projects");
}

export default function ProjectNavbar(props) {
  async function duplicate(): Promise<void> {
    const { id } = Router.query;
    let name = `Copy of ${props.data.project.name}`;
    let description = props.data.project.description;
    let privacy = props.data.project.privacy;
    let color = props.data.project.color;
    const body = { name, description, privacy, color };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/projects/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    await mutate(`/api/projects/feed`);
    await Router.push("/");
  }

  return (
    <div className="relative pb-5 sm:pb-0 border-b border-gray-200 mx-auto px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-xl bg-[#48DAFD] items-center justify-center flex">
            <AdjustmentsIcon className="w-8 h-8 text-white"></AdjustmentsIcon>
          </div>
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            {props.data.project.name}
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
            defaultValue={props.tabs.find((tab) => tab.current).name}
          >
            {props.tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-4">
            {props.tabs.map((tab) => (
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
  );
}
