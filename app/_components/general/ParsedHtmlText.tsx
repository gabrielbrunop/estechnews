type Props = {
  content: string
}

export default function ParsedHtmlText({ content }: Props) {
  const parsedHtml = content.replaceAll("\u00A0", " ");

  return (
    <div
      className="w-full prose prose-slate max-w-none antialised prose-h1:text-3xl prose-h1:font-medium prose-a:text-blue-600 break-words"
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  )
}