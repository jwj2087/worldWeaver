function PlaceholderPage({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#FAFAF8]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-5 py-6">
        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <p className="mb-2 text-sm font-medium text-[#534AB7]">떠다니는 사막 도시</p>
          <h1 className="text-2xl font-semibold text-stone-950">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">{description}</p>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <article className="rounded-md border border-stone-200 p-4" key={item}>
                <h2 className="text-sm font-semibold text-stone-950">{item}</h2>
                <p className="mt-1 text-sm leading-5 text-stone-500">
                  이 항목의 세부 정보와 생성 결과가 여기에 정리됩니다.
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PlaceholderPage;
