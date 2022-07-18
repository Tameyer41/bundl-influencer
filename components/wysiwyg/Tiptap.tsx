import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Focus from "@tiptap/extension-focus";
import React from "react";

import { ColorHighlighter } from "./ColorHighlighter";
import { SmilieReplacer } from "./SmilieReplacer";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default (props) => {
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
    content: `
    <div>
      <p></p>
      <h1>
        ${props.projectName + " brief"}
      </h1>
      <p></p>
      <hr />
      <p></p>
      <p>
        You can add all sorts of fun to your brief, including emojis, hexadecimal colors, and more! 
      </p>
      </div>
    `,
    onUpdate({ editor }) {
      console.log(editor.getHTML());
    },
  });

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
    </>
  );
};