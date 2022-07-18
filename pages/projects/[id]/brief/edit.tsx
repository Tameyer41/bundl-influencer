import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useState, useMemo } from "react";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import Router from "next/router";
import Link from "next/link";
import ProjectNavbar from "../../../../components/layout/projects/ProjectNavbar";
import Tiptap from "../../../../components/wysiwyg/Tiptap";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function ProjectBrief() {
  const { data: session, status } = useSession();

  const [convertedContent, setConvertedContent] = useState(null);
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

  async function submitForm(): Promise<void> {
    let brief = convertedContent;
    const body = { brief };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/projects/${router.query.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    await mutate(`/api/projects/${router.query.id}`);
    await Router.push(`/projects/${router.query.id}`);
  }

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
  return (
    <div>
      <ProjectNavbar data={data} tabs={tabs} />
      <div className="max-w-7xl mx-auto">
        <Tiptap projectName={data.project.name} />
      </div>
    </div>
  );
}
ProjectBrief.auth = true;
