import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { PlusSmIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Image from "next/image";
import useSWR, { mutate } from "swr";

async function destroy(): Promise<void> {
  const { id } = Router.query;
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}`, {
    method: "DELETE",
  });
  await mutate(`/api/projects/feed`);
  await Router.push("/projects");
}

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectCreatorPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, error } = useSWR(`/api/projects/${router.query.id}`, fetcher);

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

  async function duplicate(): Promise<void> {
    const { id } = Router.query;
    let name = `Copy of ${data.project.name}`;
    let description = data.project.description;
    let privacy = data.project.privacy;
    let color = data.project.color;
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

  const tabs = [
    { name: "Summary", href: `/projects/${data.project.id}`, current: false },
    {
      name: "Creators",
      href: `/projects/${data.project.id}/creators`,
      current: true,
    },
    { name: "Activity", href: "#", current: false },
    { name: "Documents", href: "#", current: false },
  ];

  return (
    <div>
      <div className="relative pb-5 sm:pb-0 border-b border-gray-200 max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {data.project.name}
          </h3>
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
                        ? "border-[#635bff] text-[#635bff]"
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
      <div className="w-full h-screen">
        <div className=" mt-8 px-6 lg:px-8 py-4 space-y-12">
          <div className="space-y-2">
            <h2 className="font-medium text-xl text-gray-900">
              {" "}
              Project overview
            </h2>
            <p className="text-sm font-normal text-gray-700">
              {" "}
              {data.project.description && data.project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatorPage;
