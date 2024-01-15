"use client"

import { Color } from '@tiptap/extension-color'
import LinkExtension from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Youtube from '@tiptap/extension-youtube'
import { Editor as TiptapEditor, EditorContent, useCurrentEditor, useEditor, Mark, Extension, Node } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useState } from 'react'
import { FaBold, FaCode, FaItalic, FaLink, FaList, FaListOl, FaQuoteLeft, FaRegFileCode, FaStrikethrough, FaYoutube } from "react-icons/fa"
import { GoHorizontalRule } from "react-icons/go";
import { MdClear } from "react-icons/md";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";

const YoutubeVideoSize = {
  width: 426,
  height: 240
}

type ExtensionOptions = "links" | "youtube";

type MenuOptions = 
  "paragraphs" | "bold" | "italic" | "strike" | "code" | "bulletList" |
  "orderedList" | "link" | "youtube" | "codeBlock" | "blockquote" | 
  "hr" | "undo" | "redo" | "clear";

type Props = {
  initialContent: string,
  extensions: ExtensionOptions[],
  menu: MenuOptions[],
  small?: boolean,
  onUpdate: (html: string) => void,
  className?: string
}

type MenuBarProps = {
  editor: TiptapEditor | null,
  options: MenuOptions[],
  className: string
}

type MenuButtonProps = React.PropsWithChildren<{
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  isActive?: boolean
}>

function MenuButton({ children, onClick, disabled, isActive }: MenuButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={isActive ? 'is-active ' : ''}>
      {children}
    </button>
  )
}

function SelectTextType({ children }: React.PropsWithChildren) {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [type, setType] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newType = Number(e.target.value);

    if (newType === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: newType as any }).run()
    }

    setType(newType);
  }

  const getIsActive = () => {
    return (
      type ?
        editor.isActive('paragraph') :
        editor.isActive('heading', { level: type })
    )
  }

  return (
    <select
      onChange={handleChange}
      className={(getIsActive() ? "is-active " : "") + "py-1 bg-inherit outline-none"}
    >
      {children}
    </select>
  )
}

function MenuBar({ editor, options, className }: MenuBarProps) {
  if (!editor) return null;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addYoutubeVideo = useCallback(() => {
    const url = prompt('URL');

    if (url === null || url === '') return;

    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  const optionElements: Record<MenuOptions, React.ReactElement> = {
    paragraphs:
      <SelectTextType>
        <option value="0">Parágrafo</option>
        <option value="1">Subtítulo 1</option>
        <option value="2">Subtítulo 2</option>
        <option value="3">Subtítulo 3</option>
        <option value="4">Subtítulo 4</option>
      </SelectTextType>,
    bold:
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}>
        <FaBold />
      </MenuButton>,
    italic:
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}>
        <FaItalic />
      </MenuButton>,
    strike:
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}>
        <FaStrikethrough />
      </MenuButton>,
    code:
      <MenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}>
        <FaCode />
      </MenuButton>,
    clear:
      <MenuButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
        <MdClear />
      </MenuButton>,
    bulletList:
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}>
        <FaList />
      </MenuButton>,
    orderedList:
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}>
        <FaListOl />
      </MenuButton>,
    link:
      <MenuButton
        onClick={() => setLink()}
        isActive={editor.isActive('link')}>
        <FaLink />
      </MenuButton>,
    youtube:
      <MenuButton
        onClick={addYoutubeVideo}
        isActive={editor.isActive('youtube')}>
        <FaYoutube />
      </MenuButton>,
    codeBlock:
      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}>
        <FaRegFileCode />
      </MenuButton>,
    blockquote:
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}>
        <FaQuoteLeft />
      </MenuButton>,
    hr:
      <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <GoHorizontalRule />
      </MenuButton>,
    undo:
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}>
        <RiArrowGoBackFill />
      </MenuButton>,
    redo:
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}>
        <RiArrowGoForwardFill />
      </MenuButton>
  }

  return (
    <div className={className}>
      {options.map(opt => optionElements[opt])}
    </div>
  )
}

const getExtensions = (extensionList: ExtensionOptions[]) => {
  const extensions: (Mark | Extension | Node)[] = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as any),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false
      },
    })
  ];

  for (const extension of extensionList) {
    switch (extension) {
      case "links":
        extensions.push(LinkExtension.configure({
          linkOnPaste: true,
          protocols: ['http', 'https']
        }));
        break;
      case "youtube":
        extensions.push(Youtube.configure({
          inline: false,
          ...YoutubeVideoSize
        }));
      default:
        break;
    }
  }

  return extensions;
}

export default function Editor({ initialContent, onUpdate, className, extensions, menu, small=false }: Props) {
  const editor = useEditor({
    extensions: getExtensions(extensions),
    content: initialContent,
    onUpdate: (e) => onUpdate(e.editor.getHTML()),
    editorProps: {
      attributes: {
        class: `px-8 ${small ? "pb-2" : "pb-4"} prose prose-slate max-w-none antialised prose-h1:text-3xl prose-h1:font-medium prose-a:text-blue-600 break-words outline-none`
      }
    }
  });

  return (
    <div className="flex flex-col border-2 rounded w-full">
      <MenuBar editor={editor} options={menu} className={`flex flex-wrap gap-4 bg-gray-100 w-full ${small ? "py-2 px-4" : "py-4 px-6"}`} />
      <div className={`min-h-[20em] py-6 max-h-[40vh] overflow-y-auto ${className}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}