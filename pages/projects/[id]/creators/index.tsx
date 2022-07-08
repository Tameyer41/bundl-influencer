import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";
import useSWR, { mutate } from "swr";
import ProjectNavbar from "../../../../components/layout/projects/ProjectNavbar";

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
  console.log(data);

  return (
    <div>
      <ProjectNavbar data={data} tabs={tabs} />
      <div className="w-full h-screen">
        <div className=" mt-8 px-6 lg:px-8 py-4 space-y-12">
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {data.projectCreators.map((user) => (
              <li key={user.user.id} className="relative">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  {user.user.image ? (
                    <img
                      src={user.user.image}
                      alt=""
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />
                  ) : (
                    <p> No image</p>
                  )}

                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {user.user.name}
                    </span>
                  </button>
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {user.user.name}
                </p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                  {user.user.email}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatorPage;
