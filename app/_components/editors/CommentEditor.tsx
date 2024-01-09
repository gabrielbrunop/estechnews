import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { FaBold, FaCode, FaItalic, FaList, FaListOl, FaQuoteLeft, FaRegFileCode, FaStrikethrough } from "react-icons/fa"
import { MdClear } from "react-icons/md";

type Props = {
  initialContent: string,
  onUpdate: (html: string) => void
}

type MenuButtonProps = React.PropsWithChildren<{
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  isActive?: boolean
}>

function MenuButton({ children, onClick, disabled, isActive }: MenuButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={isActive ? 'is-active ' : ''}>
      {children}
    </button>
  )
}

function MenuBar() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-4 bg-gray-100 w-full py-2 px-6">
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <FaBold />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <FaItalic />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <FaStrikethrough />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
      >
        <FaCode />
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
        <MdClear />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <FaList />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <FaListOl />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
      >
        <FaRegFileCode />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <FaQuoteLeft />
      </MenuButton>
    </div>
  )
}

const extensions = [
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

export default function Editor({ initialContent, onUpdate }: Props) {
  return (
    <div className="flex flex-col gap-4 border-2 rounded w-full min-h-[8em]">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={initialContent}
        onUpdate={(e) => onUpdate(e.editor.getHTML())}
        editorProps={{
          attributes: {
            class: "px-8 pb-2 prose prose-slate max-w-none antialised prose-h1:text-3xl prose-h1:font-medium prose-a:text-blue-600 break-words outline-none"
          }
        }}
        children={undefined}
      >
      </EditorProvider>
    </div>
  )
}