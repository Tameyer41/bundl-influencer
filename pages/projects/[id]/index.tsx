import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { PlusSmIcon } from "@heroicons/react/solid";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import ProjectNavbar from "../../../components/layout/projects/ProjectNavbar";
import DOMPurify from "dompurify";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Project = () => {
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

  const tabs = [
    { name: "Summary", href: `/projects/${data.project.id}`, current: true },
    {
      name: "Creators",
      href: `/projects/${data.project.id}/creators`,
      current: false,
    },
    { name: "Documents", href: "#", current: false },
    { name: "Deliverables", href: "#", current: false },
    { name: "Shipments", href: "#", current: false },
    { name: "Settings", href: "#", current: false },
  ];

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div>
      <ProjectNavbar data={data} tabs={tabs} />
      <div className="w-full grid grid-cols-12 h-screen lg:divide-x lg:divide-gray-200">
        <div className="col-span-12 lg:col-span-8 max-w-5xl mt-2 px-6 lg:px-8 py-4 space-y-12">
          <div className="space-y-2">
            <h2 className="font-medium text-lg text-gray-900">
              {" "}
              Project overview
            </h2>
            <p className="text-sm font-normal text-gray-700">
              {" "}
              {data.project.description && data.project.description}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-medium text-lg text-gray-900">
              {" "}
              Project roles{" "}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <div className="flex items-center space-x-2 group">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 group-hover:border-gray-300 group-hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <a className="text-sm font-normal text-gray-500 group-hover:text-gray-700 cursor-pointer">
                  {" "}
                  Add member{" "}
                </a>
              </div>
              {data.projectAdmins.map((user) => (
                <div className="flex items-center space-x-2" key={user.user.id}>
                  {user.user.image ? (
                    <Image
                      src={user.user.image}
                      className="flex-shrink-0 rounded-full max-w-none object-cover"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="flex-shrink-0 rounded-full w-8 h-8 bg-indigo-600"></div>
                  )}
                  <div>
                    <p className="text-sm text-gray-900">{user.user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-medium text-lg text-gray-900">Key resources</h2>
            {data.project.brief ? (
              <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <Link href={`/projects/${data.project.id}/brief`}>
                  <a className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                    <div className="flex flex-grow flex-col space-y-2 p-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        {data.project.name}'s Project Brief
                      </h2>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <p className="text-sm font-normal text-gray-500">
                            {data.projectAdmins[0].user.name}
                          </p>
                          <p className="text-sm font-normal text-gray-500">∙</p>
                          <p className="text-sm font-normal text-gray-500">
                            TBD
                          </p>
                        </div>
                        <p className="text-sm font-normal text-gray-500">
                          🔒 {data.project.name}
                        </p>
                      </div>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
                        <span className="text-xs font-medium leading-none text-white">
                          {(
                            data.projectAdmins[0].user.name
                              .split(" ")
                              .shift()
                              .charAt(0) +
                            data.projectAdmins[0].user.name
                              .split(" ")
                              .pop()
                              .charAt(0)
                          ).toUpperCase()}
                        </span>
                      </span>
                    </div>
                    <div className="flex-shrink-0 items-end bg-gray-100 px-4 py-3">
                      <p className="text-normal text-sm text-gray-500">
                        Last viewed just now
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="w-full border border-gray-200 rounded-md py-4 px-8 mx-auto items-center justify-center text-center space-y-2">
                <p className="max-w-sm mx-auto text-sm font-normal text-gray-700">
                  {" "}
                  Align your team around a shared vision with a project brief
                  and supporting files.{" "}
                </p>
                <div className="flex items-center space-x-2 justify-center">
                  <Link href={`/projects/${data.project.id}/brief/edit`}>
                    <a className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-500 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create project brief
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add files and links
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h2 className="font-medium text-lg text-gray-900">Milestones</h2>
            <p className="text-sm font-normal text-gray-700">
              Milestones coming soon
            </p>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 bg-slate-100 max-w-5xl pt-12 px-6 lg:px-8 pb-4 space-y-6">
          <div className="flex items-baseline justify-between">
            <p className="text-lg font-medium text-teal-500"> On track </p>
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update status
            </button>
          </div>
          <div className="w-full bg-white shadow rounded-md p-4 space-y-1 border-t-8 border-teal-500">
            <p className="text-sm font-medium text-gray-900">
              {" "}
              All systems go for launch{" "}
            </p>
            <p className="text-sm font-normal text-gray-700">
              {" "}
              Project is all set up and ready to progress. Add milestones to set
              goals for your team.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
Project.auth = true;
