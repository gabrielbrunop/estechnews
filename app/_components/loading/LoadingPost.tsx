export default async function LoadingPost() {
  const randomQuantityTitle = Math.max(5, Math.ceil(Math.random() * 10));
  const randomQuantityContent = Math.max(20, Math.ceil(Math.random() * 70));
  const randomQuantityContentParagraphs = Math.max(2, Math.ceil(Math.random() * 5));

  const getRandomWidth = (widthSet: string[]) => {
    return widthSet[Math.floor(Math.random() * (widthSet.length - 1))];
  }

  const makeArray = (size: number, generateItem: Function) =>
    Array.from({ length: size }, () => generateItem());

  return (
    <article className="w-full flex flex-col gap-3 py-4">
      <div className="flex text-sm sm:text-base gap-2 text-gray-500 whitespace-nowrap flex-wrap">
        {
          makeArray(randomQuantityTitle, () =>
            <span className={`${getRandomWidth(["w-20", "w-24", "w-32", "w-40"])} h-8 bg-slate-300 rounded`} />
          )
        }
      </div>
      <header className="w-full flex flex-col gap-4 pt-4">
        <div className="flex text-sm sm:text-base gap-2 text-gray-500 whitespace-nowrap flex-wrap">
          {
            makeArray(randomQuantityTitle, () =>
              <span className={`${getRandomWidth(["w-20", "w-24", "w-32", "w-40"])} h-4 bg-slate-300 rounded`} />
            )
          }
        </div>
      </header>
      <section className="w-full flex flex-col py-4 gap-5" >
        {
          makeArray(randomQuantityContentParagraphs, () =>
            <div className="flex text-sm sm:text-base gap-2 text-gray-500 whitespace-nowrap flex-wrap">
              {
                makeArray(randomQuantityContent, () =>
                  <span className={`${getRandomWidth(["w-8", "w-16", "w-20", "w-24"])} h-4 bg-slate-300 rounded`} />
                )
              }
            </div>
          )
        }
      </section>
    </article>
  )
}