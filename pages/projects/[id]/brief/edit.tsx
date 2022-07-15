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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

export default function ProjectBrief() {
  const { data: session, status } = useSession();
  const Editor = useMemo(() => {
    return dynamic(
      () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
      { ssr: false }
    );
  }, []);
  const [editor, setEditor] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const router = useRouter();
  const { data, error } = useSWR(`/api/projects/${router.query.id}`, fetcher);

  const handleEditorChange = (state) => {
    setEditor(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editor.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
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
    { name: "Activity", href: "#", current: false },
    { name: "Documents", href: "#", current: false },
    { name: "Deliverables", href: "#", current: false },
    { name: "Shipments", href: "#", current: false },
  ];
  return (
    <div>
      <ProjectNavbar data={data} tabs={tabs} />
      <div className="w-full h-screen lg:divide-x lg:divide-gray-200 px-8 text-black mt-4">
        {/* Stuff goes here */}
        <Editor
          ref={editor}
          editorState={editor}
          placeholder={"Write your project brief here..."}
          wrapperClassName="wrapper-class bg-white"
          editorClassName="editor-class"
          toolbarClassName="!text-gray-700 !border-b !border-r-0 !border-l-0 !border-t-0 !border-gray-200 !pb-4 toolbar-class"
          onEditorStateChange={handleEditorChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          hashtag={{
            separator: " ",
            trigger: "#",
          }}
        />
      </div>
      <div className="absolute bottom-20 right-20">
        <div className="flex items-center space-x-4">
          <Link href={`/projects/${data.project.id}`}>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <span className="sr-only">Back</span>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => submitForm()}
            className="bg-[#635bff] text-white px-3 h-9 text-sm rounded text-center"
          >
            Submit Brief
          </button>
        </div>
      </div>
    </div>
  );
}
ProjectBrief.auth = true;
