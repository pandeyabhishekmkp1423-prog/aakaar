"use client";

import { forwardRef, useImperativeHandle, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Unlink,
} from "lucide-react";

export interface TipTapEditorRef {
  insertImage: (url: string, alt?: string) => void;
  insertLink: (href: string, text?: string) => void;
}

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  onOpenMediaPicker?: () => void;
}

export const TipTapEditor = forwardRef<TipTapEditorRef, TipTapEditorProps>(
  function TipTapEditor({ content, onChange, onOpenMediaPicker }, ref) {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
        }),
        LinkExtension.configure({
          openOnClick: false,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
            class:
              "text-[#0F5C4D] dark:text-[#3FB89C] font-semibold underline underline-offset-4 decoration-2 decoration-[#0F5C4D]/60 hover:decoration-[#0F5C4D] bg-[#0F5C4D]/10 dark:bg-[#3FB89C]/15 px-1.5 py-0.5 rounded transition-all",
          },
        }),
        ImageExtension.configure({
          allowBase64: true,
          HTMLAttributes: {
            class: "max-w-full h-auto rounded-xl my-6 mx-auto border border-line shadow-md block",
          },
        }),
      ],
      content: content || "<p></p>",
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "min-h-[400px] p-5 focus:outline-none text-ink text-base leading-relaxed prose max-w-none " +
            "[&>h1]:text-3xl [&>h1]:font-black [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:text-ink [&>h1]:font-heading " +
            "[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h2]:text-ink [&>h2]:font-heading " +
            "[&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-5 [&>h3]:mb-2.5 [&>h3]:text-ink [&>h3]:font-heading " +
            "[&>h4]:text-lg [&>h4]:font-bold [&>h4]:mt-4 [&>h4]:mb-2 [&>h4]:text-ink [&>h4]:font-heading " +
            "[&>h5]:text-base [&>h5]:font-bold [&>h5]:mt-3 [&>h5]:mb-1.5 [&>h5]:text-ink [&>h5]:font-heading " +
            "[&>h6]:text-sm [&>h6]:font-bold [&>h6]:mt-3 [&>h6]:mb-1 [&>h6]:text-secondary [&>h6]:font-heading [&>h6]:uppercase [&>h6]:tracking-wider " +
            "[&>p]:mb-4 " +
            "[&_a]:text-[#0F5C4D] dark:[&_a]:text-[#3FB89C] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-2 [&_a]:decoration-[#0F5C4D]/60 hover:[&_a]:decoration-[#0F5C4D] [&_a]:font-semibold [&_a]:bg-[#0F5C4D]/10 dark:[&_a]:bg-[#3FB89C]/15 [&_a]:px-1.5 [&_a]:py-0.5 [&_a]:rounded [&_a]:transition-all " +
            "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-6 [&_img]:mx-auto [&_img]:border [&_img]:border-line [&_img]:shadow-md [&_img]:block " +
            "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:mb-4 " +
            "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1.5 [&>ol]:mb-4 " +
            "[&>blockquote]:border-l-4 [&>blockquote]:border-primary-spruce [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4 [&>blockquote]:text-secondary " +
            "[&>pre]:bg-canvas [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:border [&>pre]:border-line [&>pre]:font-mono [&>pre]:text-xs [&>pre]:overflow-x-auto [&>pre]:my-4",
        },
      },
    });

    // Expose image insertion method to parent components
    useImperativeHandle(ref, () => ({
      insertImage: (url: string, alt?: string) => {
        if (!editor) return;
        editor.chain().focus().setImage({ src: url, alt: alt || "" }).run();
      },
      insertLink: (href: string, text?: string) => {
        if (!editor) return;
        if (text && editor.state.selection.empty) {
          editor.chain().focus().insertContent(`<a href="${href}">${text}</a>`).run();
        } else {
          editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
        }
      },
    }));

    // Keep editor in sync if content is loaded asynchronously
    useEffect(() => {
      if (editor && content && content !== editor.getHTML() && !editor.isFocused) {
        editor.commands.setContent(content, { emitUpdate: false });
      }
    }, [content, editor]);

    if (!editor) {
      return null;
    }

    const setLink = () => {
      const previousUrl = editor.getAttributes("link").href || "";
      const url = window.prompt(
        "Enter or paste hyperlink URL (e.g. /services/custom-software or https://...):",
        previousUrl
      );

      if (url === null) return;
      if (url.trim() === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
    };

    const addImage = () => {
      if (onOpenMediaPicker) {
        onOpenMediaPicker();
        return;
      }
      const url = window.prompt("Enter image URL to insert into article content:");
      if (url) {
        editor.chain().focus().setImage({ src: url.trim() }).run();
      }
    };

    return (
      <div className="border border-line rounded-xl overflow-hidden bg-surface transition-colors">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-canvas border-b border-line text-secondary">
          {/* Text Style */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-mist transition-colors ${
              editor.isActive("bold") ? "bg-mist text-primary-spruce font-bold" : ""
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-mist transition-colors ${
              editor.isActive("italic") ? "bg-mist text-primary-spruce" : ""
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-line mx-1" />

          {/* Heading Levels H1 to H6 */}
          <div className="flex items-center gap-0.5 bg-surface border border-line p-0.5 rounded-lg">
            {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: lvl }).run()}
                className={`px-2 py-1 text-xs font-bold rounded transition-colors ${
                  editor.isActive("heading", { level: lvl })
                    ? "bg-primary-spruce text-white shadow-xs"
                    : "hover:bg-mist text-secondary hover:text-ink"
                }`}
                title={`Heading ${lvl} (H${lvl})`}
              >
                H{lvl}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-line mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-mist transition-colors ${
              editor.isActive("bulletList") ? "bg-mist text-primary-spruce" : ""
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-mist transition-colors ${
              editor.isActive("orderedList") ? "bg-mist text-primary-spruce" : ""
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-mist transition-colors ${
              editor.isActive("blockquote") ? "bg-mist text-primary-spruce" : ""
            }`}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded hover:bg-mist transition-colors ${
              editor.isActive("codeBlock") ? "bg-mist text-primary-spruce" : ""
            }`}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-line mx-1" />

          {/* Interlinking / Hyperlink with Active Highlight */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={setLink}
              className={`p-2 rounded hover:bg-mist transition-colors flex items-center gap-1.5 ${
                editor.isActive("link") ? "bg-primary-spruce text-white font-bold" : ""
              }`}
              title="Insert or Edit Link (Ctrl+K)"
            >
              <LinkIcon className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Link</span>
            </button>

            {editor.isActive("link") && (
              <button
                type="button"
                onClick={() => editor.chain().focus().unsetLink().run()}
                className="p-2 rounded hover:bg-mist text-red-500 transition-colors"
                title="Remove Link"
              >
                <Unlink className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Insert Image directly inside content */}
          <button
            type="button"
            onClick={addImage}
            className="p-2 rounded hover:bg-mist transition-colors flex items-center gap-1.5 text-secondary hover:text-ink"
            title="Insert Image into Content"
          >
            <ImageIcon className="w-4 h-4 text-primary-spruce" />
            <span className="text-xs font-semibold hidden sm:inline">Add Image</span>
          </button>

          <div className="w-px h-5 bg-line mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-mist transition-colors disabled:opacity-30"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-mist transition-colors disabled:opacity-30"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Tip helper banner for editor */}
        <div className="px-4 py-1.5 bg-mist/40 border-b border-line text-[11px] text-secondary flex items-center justify-between">
          <span>
            Highlight text to add links or headings (H1–H6). Click <strong>Add Image</strong> to place graphics anywhere in your article.
          </span>
          <span className="font-mono text-[10px] text-secondary/70">
            {editor.getText().trim() ? `${editor.getText().trim().split(/\s+/).length} words` : "0 words"}
          </span>
        </div>

        {/* Editor Content Area */}
        <EditorContent editor={editor} />
      </div>
    );
  }
);
