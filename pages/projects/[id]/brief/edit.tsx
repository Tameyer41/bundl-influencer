import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChevronRightIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { Fragment, useState, useMemo } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import Router from "next/router";
import Link from "next/link";

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
    { name: "Summary", href: "#", current: true },
    { name: "Tasks", href: "#", current: false },
    { name: "Activity", href: "#", current: false },
    { name: "Documents", href: "#", current: false },
  ];

  return (
    <div>
      <div className="relative border-b border-gray-200 max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/projects/${data.project.id}`}>
              <a className="text-sm font-medium text-gray-900">
                {data.project.name}
              </a>
            </Link>
            <ChevronRightIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <h3 className="text-sm font-medium text-gray-900">
              {" "}
              Project brief{" "}
            </h3>
          </div>
          <div className="flex items-center justify-between sm:ml-6 sm:flex-shrink-0 sm:justify-start space-x-4">
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
            <button
              type="button"
              onClick={() => submitForm()}
              className="bg-[#635bff] text-white px-3 h-9 text-sm rounded text-center"
            >
              Done
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-screen lg:divide-x lg:divide-gray-200">
        {/* Stuff goes here */}
        <Editor
          ref={editor}
          editorState={editor}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
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
    </div>
  );
}
