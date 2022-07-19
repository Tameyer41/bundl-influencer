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
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      StarterKit.configure({
        document: false,
      }),
      Focus.configure({
        mode: "deepest",
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `${props.projectName + " brief"}`;
          }

          return `${props.projectName + " brief"}`;
        },
      }),
    ],
    autofocus: "end",
    content: `${
      props.project.brief ? (
        props.project.brief
      ) : (
        <div>
          <p></p>
          <h1>${props.projectName + " brief"}</h1>
          <p></p>
          <hr />
          <p></p>
          <p>
            You can add all sorts of fun to your brief, including emojis,
            hexadecimal colors, and more!
          </p>
        </div>
      )
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
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
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
