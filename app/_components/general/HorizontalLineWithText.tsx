type Props = {
  text: string
}

export default function HorizontalLineWithText({ text }: Props) {
  return (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-64 h-px my-4 bg-gray-300 border-0" />
      <span className="absolute px-3 text-gray-900 -translate-x-1/2 bg-white left-1/2">{text}</span>
    </div>
  )
}