import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Focus from "@tiptap/extension-focus";
import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { mutate } from "swr";
import { ColorHighlighter } from "./ColorHighlighter";
import { SmilieReplacer } from "./SmilieReplacer";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Commands from "./suggestion/commands";
import getSuggestionItems from "./suggestion/item";
import renderItems from "./suggestion/renderItems";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default (props) => {
  const router = useRouter();
  const editor = useEditor({
    extensions: [
      CustomDocument,
      ColorHighlighter,
      SmilieReplacer,
      Highlight,
      Typography,
      StarterKit.configure({
        document: false,
      }),
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      Focus.configure({
        mode: "deepest",
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `${props.project.name + " brief"}`;
          }

          return `${props.project.name + " brief"}`;
        },
      }),
    ],
    autofocus: "end",
    content: `${
      props.project.brief
        ? props.project.brief
        : `<div>
          <p></p>
          <h1>${props.project.name + "'s brief"}</h1>
          <p></p>
          <hr />
          <p></p>
          <p>
            You can add all sorts of fun to your brief, including emojis,
            hexadecimal colors, and more!
          </p>
        </div>`
    }
    
    `,
  });

  async function submitForm(): Promise<void> {
    let brief = editor.getHTML();
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

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#6B6F76">
              <path d="M10.0476 6.38226C10.561 5.86314 10.912 5.20165 11.0566 4.48076C11.2012 3.75987 11.1329 3.01169 10.8603 2.33005C10.5878 1.6484 10.1231 1.06366 9.52451 0.649142C8.92595 0.234628 8.22017 0.00880624 7.4957 0H2.48332C2.28883 0 2.10231 0.0784506 1.96478 0.218093C1.82726 0.357736 1.75 0.547133 1.75 0.744617C1.75 0.942102 1.82726 1.1315 1.96478 1.27114C2.10231 1.41078 2.28883 1.48923 2.48332 1.48923H3.0776C3.1165 1.48923 3.1538 1.50493 3.18131 1.53285C3.20881 1.56078 3.22426 1.59866 3.22426 1.63816V12.3618C3.22426 12.4013 3.20881 12.4392 3.18131 12.4671C3.1538 12.4951 3.1165 12.5108 3.0776 12.5108H2.48332C2.28883 12.5108 2.10231 12.5892 1.96478 12.7289C1.82726 12.8685 1.75 13.0579 1.75 13.2554C1.75 13.4529 1.82726 13.6423 1.96478 13.7819C2.10231 13.9215 2.28883 14 2.48332 14H8.32816C9.21784 13.9924 10.079 13.6804 10.7725 13.1144C11.466 12.5485 11.9513 11.7617 12.1501 10.8811C12.3488 10.0005 12.2493 9.07754 11.8677 8.26144C11.4861 7.44533 10.8447 6.7837 10.0471 6.38346L10.0476 6.38226ZM7.4957 1.48923C8.07472 1.49882 8.62684 1.73911 9.03297 2.15828C9.4391 2.57745 9.66671 3.14192 9.66671 3.72994C9.66671 4.31796 9.4391 4.88242 9.03297 5.30159C8.62684 5.72076 8.07472 5.96105 7.4957 5.97064H4.83757C4.79867 5.97064 4.76136 5.95495 4.73386 5.92702C4.70635 5.89909 4.6909 5.86121 4.6909 5.82172V1.63935C4.6909 1.59985 4.70635 1.56197 4.73386 1.53404C4.76136 1.50612 4.79867 1.49043 4.83757 1.49043L7.4957 1.48923ZM8.32875 12.5096H4.83757C4.79867 12.5096 4.76136 12.4939 4.73386 12.466C4.70635 12.438 4.6909 12.4001 4.6909 12.3606V7.6088C4.6909 7.5693 4.70635 7.53142 4.73386 7.50349C4.76136 7.47556 4.79867 7.45988 4.83757 7.45988H7.4957C7.50567 7.45988 7.51506 7.45988 7.52445 7.45988H7.53207H8.32875C8.98161 7.47006 9.60433 7.74055 10.0625 8.21294C10.5206 8.68533 10.7774 9.32173 10.7774 9.98472C10.7774 10.6477 10.5206 11.2841 10.0625 11.7565C9.60433 12.2289 8.98161 12.4994 8.32875 12.5096Z"></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#6B6F76">
              <path d="M12.4269 0.875H8.16152C7.97636 0.875 7.79878 0.94365 7.66786 1.06585C7.53693 1.18805 7.46338 1.35378 7.46338 1.5266C7.46338 1.69941 7.53693 1.86515 7.66786 1.98734C7.79878 2.10954 7.97636 2.17819 8.16152 2.17819H8.76806C8.79307 2.1782 8.81761 2.18447 8.83913 2.19635C8.86065 2.20824 8.87836 2.2253 8.8904 2.24575C8.90244 2.26621 8.90838 2.2893 8.90759 2.31263C8.9068 2.33596 8.89931 2.35866 8.8859 2.37836L2.53005 11.7014C2.50479 11.7383 2.46994 11.7687 2.42874 11.7898C2.38755 11.8108 2.34133 11.8219 2.29436 11.8218H0.698138C0.512981 11.8218 0.335406 11.8905 0.20448 12.0127C0.0735536 12.1349 0 12.3006 0 12.4734C0 12.6462 0.0735536 12.812 0.20448 12.9342C0.335406 13.0564 0.512981 13.125 0.698138 13.125H4.96348C5.14864 13.125 5.32622 13.0564 5.45714 12.9342C5.58807 12.812 5.66162 12.6462 5.66162 12.4734C5.66162 12.3006 5.58807 12.1349 5.45714 12.0127C5.32622 11.8905 5.14864 11.8218 4.96348 11.8218H4.35694C4.33194 11.8218 4.30739 11.8155 4.28587 11.8036C4.26435 11.7918 4.24664 11.7747 4.2346 11.7542C4.22256 11.7338 4.21662 11.7107 4.21741 11.6874C4.2182 11.664 4.22569 11.6413 4.2391 11.6216L10.5949 2.29913C10.6201 2.26208 10.655 2.23157 10.6962 2.21043C10.7374 2.18929 10.7836 2.1782 10.8306 2.17819H12.4269C12.612 2.17819 12.7896 2.10954 12.9205 1.98734C13.0514 1.86515 13.125 1.69941 13.125 1.5266C13.125 1.35378 13.0514 1.18805 12.9205 1.06585C12.7896 0.94365 12.612 0.875 12.4269 0.875Z"></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#6B6F76">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.2926 2.47533L11.3518 1.39602C8.59067 -1.3135 3.37862 0.0838002 3.37862 4.18215C3.37862 4.7405 3.49659 5.24954 3.68451 5.69156H5.4235C5.23057 5.52087 5.15237 5.3411 5.05838 5.10546C4.94683 4.8426 4.89079 4.54441 4.89079 4.18215C4.89079 1.5657 8.4055 0.623447 10.2926 2.47533ZM3.959 10.8121L2.625 11.5243C4.70809 15.4265 11.375 14.4673 11.375 9.78237C11.375 9.40909 11.3331 9.0624 11.2491 8.74144L9.61347 8.74445C9.66152 8.81785 9.7053 8.89551 9.74501 8.9777C9.81368 9.16043 9.86283 9.44342 9.86283 9.78237C9.86283 12.7708 5.35109 13.4199 3.959 10.8121ZM0.75 6.375C0.335786 6.375 0 6.71079 0 7.125C0 7.53921 0.335786 7.875 0.75 7.875H13.25C13.6642 7.875 14 7.53921 14 7.125C14 6.71079 13.6642 6.375 13.25 6.375H0.75Z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Body
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            h1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            h2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            h3
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            h4
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <div className="absolute bottom-20 right-20">
        <div className="flex items-center space-x-4">
          <Link href={`/projects/${props.project.id}`}>
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
            className="bg-[#0C3D8D] hover:bg-[#3D64A4] transition-colors duration-250 text-white px-3 h-9 text-sm rounded text-center"
          >
            Submit Brief
          </button>
        </div>
      </div>
    </>
  );
};
