import Link from "next/link";
import Icon from "../../components/Icon";
import type { ProjectOverview } from "../../lib/api";

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div>
      {eyebrow ? <p className="mb-1 text-xs font-medium text-[#534AB7]">{eyebrow}</p> : null}
      <h2 className="text-base font-semibold text-stone-950">{title}</h2>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function OverviewPage({ overview }: { overview: ProjectOverview }) {
  const stats = [
    { label: "장르", value: overview.project.genre ?? "미정" },
    { label: "캐릭터", value: `${overview.stats.characterCount}명` },
    { label: "지역", value: `${overview.stats.regionCount}곳` },
    { label: "최근 수정", value: formatDate(overview.project.updatedAt) },
  ];

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#FAFAF8]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-6">
        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-2 text-sm font-medium text-[#534AB7]">세계관 개요</p>
              <h1 className="text-2xl font-semibold text-stone-950">{overview.project.name}</h1>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {overview.project.description}
              </p>
            </div>

            <Link
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-stone-900 px-3 text-sm font-medium text-white transition hover:bg-stone-700"
              href="/"
            >
              <Icon className="size-4" name="plus" />
              새 프로젝트 만들기
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div className="rounded-md border border-stone-200 bg-[#FAFAF8] p-3" key={item.label}>
                <p className="text-xs text-stone-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-stone-950">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <SectionTitle eyebrow="작업" title="현재 진행 중인 이야기" />
              <Link className="text-sm font-medium text-stone-600 transition hover:text-stone-950" href="/documents">
                전체 보기
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
              {overview.currentWorks.map((work) => (
                <article className="rounded-md border border-stone-200 p-4" key={work.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-950">{work.title}</h3>
                      <p className="mt-1 text-sm leading-5 text-stone-600">{work.detail}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-[#EEEDFE] px-2 py-1 text-[11px] font-medium text-[#534AB7]">
                        {work.status}
                      </span>
                      <Link className="text-xs font-medium text-stone-500 transition hover:text-stone-950" href="/documents">
                        더보기
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <SectionTitle eyebrow="세계관" title="핵심 설정" />
              <Link className="text-sm font-medium text-stone-600 transition hover:text-stone-950" href="/world-settings">
                전체 보기
              </Link>
            </div>
            <ul className="mt-4 grid gap-3">
              {overview.worldNotes.map((note) => (
                <li className="flex gap-3 text-sm leading-6 text-stone-600" key={note.id}>
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#534AB7]" />
                  <span>{note.content}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle eyebrow="인물" title="존재하는 캐릭터" />
            <Link className="text-sm font-medium text-stone-600 transition hover:text-stone-950" href="/character">
              전체 보기
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {overview.characters.map((character) => (
              <article className="rounded-md border border-stone-200 p-4" key={character.name}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-xs font-semibold"
                    style={{ color: character.color }}
                  >
                    {character.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-stone-950">{character.name}</h3>
                    <p className="truncate text-xs text-stone-500">{character.role} · {character.status}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default OverviewPage;
