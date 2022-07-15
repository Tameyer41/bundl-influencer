import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import DOMPurify from "dompurify";
import Link from "next/link";
import ProjectNavbar from "../../../../components/layout/projects/ProjectNavbar";

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
    { name: "Deliverables", href: "#", current: false },
    { name: "Shipments", href: "#", current: false },
  ];

  return (
    <div>
      <ProjectNavbar data={data} tabs={tabs} />
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
ProjectBrief.auth = true;
