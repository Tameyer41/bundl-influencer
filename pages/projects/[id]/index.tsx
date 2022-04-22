import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";

async function destroy(): Promise<void> {
  const { id } = Router.query;
  await fetch(`http://localhost:3000/api/projects/${id}`, {
    method: "DELETE",
  });
  await Router.push("/projects");
}

export async function getStaticProps({ params }) {
  // fetch single post detail
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/projects/${params.id}`
  );
  const project = await response.json();
  return {
    props: project,
    revalidate: 10,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await fetch(
    `${process.env.NEXTAUTH_URL}/api/projects/feed`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const ids = projects.map((project) => project.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Project = (props) => {
  const { data: session, status } = useSession();
  console.log(props);
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const tabs = [
    { name: "Summary", href: "#", current: true },
    { name: "Tasks", href: "#", current: false },
    { name: "Activity", href: "#", current: false },
    { name: "Documents", href: "#", current: false },
  ];

  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div className="p-8">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li key="projects">
              <div className="flex items-center">
                <Link href="/projects">
                  <p className="cursor-pointer text-sm font-medium text-[#212121] hover:text-[#212121] text-opacity-60">
                    Projects
                  </p>
                </Link>
              </div>
            </li>
            <li key={props.project.id}>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link href="#">
                  <p className="ml-4 text-sm font-medium text-[#3F3F3F] cursor-pointer hover:text-opacity-90">
                    {props.project.name}
                  </p>
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        {/* Avatar group */}
        <div className="flex items-center">
          <div className="flex -space-x-1 relative z-0 overflow-hidden pr-3 border-r border-gray-200">
            <img
              className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="relative z-0 inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center ml-3 p-1 rounded-full shadow-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-medium text-[#3F3F3F]">
          {props.project.name}
        </h1>
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-xs text-sm font-medium rounded-md text-[#212121] text-opacity-60 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => destroy(props.project.id)}
          >
            Delete Project
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-xs text-sm font-medium rounded-md text-[#212121] text-opacity-60 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit Project
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="mt-4">
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-500 hover:text-[#212121] text-opacity-60",
                    "px-3 py-2 font-medium text-sm rounded-md"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="mt-4 grid grid-cols-12 gap-12">
        <div className="col-span-8">
          <h2 className="text-base font-medium text-[#3F3F3F]">
            Project Details
          </h2>
          <p className="mt-2 text-sm font-normal text-[#212121] text-opacity-60">
            {props.project.description}
          </p>
        </div>
        <div className="col-span-4">
          <h2 className="text-base font-medium text-[#3F3F3F]">Tasks</h2>
          {/* Task Well */}
          <div className="mt-2 w-full h-full bg-gray-50 rounded-md p-4">
            Tasks go inside here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
