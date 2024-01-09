import { Color } from '@tiptap/extension-color'
import LinkExtension from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Youtube from '@tiptap/extension-youtube'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
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

function MenuBar() {
  const { editor } = useCurrentEditor();
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

  return (
    <div className="flex flex-wrap gap-4 bg-gray-100 w-full py-4 px-6">
      <SelectTextType>
        <option value="0">Parágrafo</option>
        <option value="1">Subtítulo 1</option>
        <option value="2">Subtítulo 2</option>
        <option value="3">Subtítulo 3</option>
        <option value="4">Subtítulo 4</option>
      </SelectTextType>
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
        onClick={setLink}
        isActive={editor.isActive('link')}
      >
        <FaLink />
      </MenuButton>
      <MenuButton
        onClick={addYoutubeVideo}
        isActive={editor.isActive('youtube')}
      >
        <FaYoutube />
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
      <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <GoHorizontalRule />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <RiArrowGoBackFill />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RiArrowGoForwardFill />
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
  }),
  LinkExtension.configure({
    linkOnPaste: true,
    protocols: ['http', 'https']
  }),
  Youtube.configure({
    inline: false,
    ...YoutubeVideoSize
  })
];

export default function Editor({ initialContent, onUpdate }: Props) {
  return (
    <div className="flex flex-col gap-8 border-2 rounded w-full min-h-[20em]">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={initialContent}
        onUpdate={(e) => onUpdate(e.editor.getHTML())}
        editorProps={{
          attributes: {
            class: "px-8 pt-1 pb-4 prose prose-slate max-w-none antialised prose-h1:text-3xl prose-h1:font-medium prose-a:text-blue-600 break-words outline-none"
          }
        }}
        children={undefined}
      >
      </EditorProvider>
    </div>
  )
}