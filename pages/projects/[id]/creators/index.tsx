import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import useSWR, { mutate } from "swr";
import ProjectNavbar from "../../../../components/layout/projects/ProjectNavbar";
import Link from "next/link";
import Image from "next/image";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectCreatorPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, error } = useSWR(`/api/projects/${router.query.id}`, fetcher);
  const [view, setView] = useState("row");

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
    { name: "Summary", href: `/projects/${data.project.id}`, current: false },
    {
      name: "Creators",
      href: `/projects/${data.project.id}/creators`,
      current: true,
    },
    { name: "Documents", href: "#", current: false },
    { name: "Deliverables", href: "#", current: false },
    { name: "Shipments", href: "#", current: false },
    { name: "Settings", href: "#", current: false },
  ];
  console.log(data);

  return (
    <div>
      <ProjectNavbar data={data} tabs={tabs} />
      <div className="w-full h-screen">
        <div className="mt-2 px-6 lg:px-8 py-4 space-y-4">
          {data.projectCreators.length > 0 ? (
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full border-0 bg-transparent py-1.5 px-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-0"
                    placeholder="Search users by name..."
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {view === "row" && (
                <table className="w-full table-auto border-collapse border-b border-gray-100">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pl-0 pr-4 text-left">
                        <h4 className="text-sm font-light text-gray-500">
                          URL
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
                    {data.projectCreators.map((user) => (
                      <tr
                        key={user.user.id}
                        className="group border-b border-gray-100"
                      >
                        <td className="min-w-[240px] py-3 pl-0 pr-4">
                          <div className="flex items-center text-sm font-normal text-gray-900">
                            {user.user.image ? (
                              <Image
                                src={user.user.image}
                                className="flex-shrink-0 bg-gray-100 rounded object-cover pointer-events-none group-hover:opacity-75"
                                width={32}
                                height={24}
                              />
                            ) : (
                              <div className="w-8 h-6 mr-2 bg-gray-200 rounded flex-shrink-0"></div>
                            )}
                            <p className="text-sm font-medium text-gray-900 ml-2">
                              {user.user.email}
                            </p>
                          </div>
                        </td>
                        <td className="w-full py-3 px-4">
                          <div className="flex items-center text-sm font-normal">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3 h-6 w-6 fill-transparent stroke-current text-red-500"
                            >
                              <path
                                d="m8.75 8.75 6.5 6.5M15.25 8.75l-6.5 6.5"
                                stroke="#F53D6B"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <circle
                                cx="12"
                                cy="12"
                                r="9.25"
                                stroke="#F53D6B"
                                stroke-width="1.5"
                              ></circle>
                            </svg>
                            <span className="font-normal text-gray-500">
                              Not Connected
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap text-right text-sm font-normal text-gray-900">
                          <div className="flex items-center">17 Jul 2022</div>
                        </td>
                        <td className="!py-2 pr-1 pl-4">
                          <div className="relative flex h-4 items-center">
                            <Link href={`/creators/${user.user.id}`}>
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
                <div className="-mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {data.projectCreators.map((user) => (
                    <div>
                      <div className="group relative max-w-[400px] cursor-pointer rounded-xl p-4 hover:bg-gray-100">
                        {user.user.image ? (
                          <Image
                            src={user.user.image}
                            className="flex-shrink-0 bg-gray-200 rounded-lg object-cover pointer-events-none"
                            height="240"
                            width="320"
                          />
                        ) : (
                          <div className="h-60 w-80 mb-4 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        )}

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
                                className="h-6 w-6"
                              >
                                <path
                                  fill="currentColor"
                                  d="M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="overflow-hidden">
                            <h2 className="truncate text-sm font-medium text-gray-900">
                              {user.user.name}
                            </h2>
                            <p className="text-gray-500 text-sm font-normal">
                              <span>{user.user.email}</span>
                            </p>
                          </div>
                          <span className="text-emerald-400">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-block h-6 w-6 fill-current"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                                fill="#2DCA72"
                              ></circle>
                            </svg>
                          </span>
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
                                stroke-width="1.5"
                              ></svg>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center">
                          <div className="w-full">
                            <p className="text-gray-500 text-sm font-normal">
                              Total Deliverables
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              —
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="overflow-hidden">
              <div className="grid place-items-center h-[650px]">
                <div
                  data-empty-state-target="emptyState"
                  className="text-center"
                >
                  <img
                    src="https://ik.imagekit.io/9km72asqu/Shipping_Empty_State_WKvEcNLjK.png?updatedAt=1640561745610"
                    className="w-1/2 mx-auto"
                  />
                  <p className="mt-8 text-xl font-medium text-[#172B4D] text-center">
                    No creators found
                  </p>
                  <p className="mt-2 text-sm text-[#172B4D] max-w-xl mx-auto mb-8 text-center">
                    Add a few creators to your campaign to get this party
                    started
                  </p>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Select Creators
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatorPage;
ProjectCreatorPage.auth = true;
