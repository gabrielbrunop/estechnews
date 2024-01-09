export default async function LoadingPostCard() {
  const randomQuantityTitle = Math.ceil(Math.random() * 8);

  const getRandomWidth = () => {
    const possibleWidthsSet = ["w-8", "w-16", "w-20", "w-24"];
    return possibleWidthsSet[Math.floor(Math.random() * (possibleWidthsSet.length - 1))];
  }

  const makeArray = (size: number, generateItem: Function) =>
    Array.from({ length: size }, () => generateItem());

  return (
    <div className="border-2 border-gray-200 rounded-md py-3 px-5 animate-pulse">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="w-16 h-4 bg-slate-300 rounded" />
          <span>•</span>
          <span className="w-14 h-4 bg-gray-300 rounded" />
        </div>
        <div className="flex flex-row gap-1.5 my-2">
          {
            makeArray(randomQuantityTitle, () =>
              <span className={`${getRandomWidth()} h-4 bg-slate-300 rounded`} />
            )
          }
        </div>
        <span className="w-16 h-4 bg-slate-300 rounded pt-2 mt-2" />
      </div>
    </div>
  )
}