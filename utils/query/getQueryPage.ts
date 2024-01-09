export default function getQueryPage(page: string | string[] | undefined) {
  return Math.max(1, Number(page ?? 1));
}