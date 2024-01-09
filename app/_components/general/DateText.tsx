type Props = {
  date: Date
}

export default function DateText({ date }: Props) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };

  return (
    <span>
      {date.toLocaleDateString("pt-br", options)}
    </span>
  )
}