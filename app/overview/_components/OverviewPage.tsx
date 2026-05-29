import Link from "next/link";
import Icon from "../../components/Icon";

const stats = [
  { label: "장르", value: "사막 판타지 · 미스터리" },
  { label: "캐릭터", value: "8명" },
  { label: "지역", value: "12곳" },
  { label: "최근 수정", value: "오늘" },
];

const currentWorks = [
  {
    title: "1장 이동 경로 정리",
    detail: "북부 시장에서 기억 경매장까지의 동선을 다듬는 중",
    status: "진행 중",
  },
  {
    title: "마법사 길드 규칙",
    detail: "기억 거래의 금기와 처벌 체계를 생성 채팅에서 확장 중",
    status: "초안",
  },
  {
    title: "도시 부유 장치 설정",
    detail: "사막 위 도시가 떠 있는 원리와 유지 비용을 보강 예정",
    status: "보강 필요",
  },
];

const characters = [
  { initials: "아르", name: "아르테미스", role: "기억 감정사 · 주인공", tone: "bg-[#EEEDFE] text-[#534AB7]" },
  { initials: "케", name: "케인", role: "사막 안내자 · 조력자", tone: "bg-[#E2F7EF] text-[#1D7A5C]" },
  { initials: "말", name: "말로크", role: "경매장 관리자 · 적대자", tone: "bg-[#FAECE7] text-[#993C1D]" },
  { initials: "나", name: "나디아", role: "부유 장치 기술자", tone: "bg-[#F4EBCB] text-[#74580C]" },
];

const worldNotes = [
  "사막 위에 떠 있는 도시 아스라에서는 기억이 화폐처럼 거래된다.",
  "도시를 지탱하는 부유 장치는 매달 한 사람의 가장 강한 기억을 연료로 요구한다.",
  "왕실은 기억 경매를 합법화했지만, 잃어버린 기억을 복제하는 행위는 금지되어 있다.",
];

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

function OverviewPage() {
  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#FAFAF8]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-6">
        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-medium text-[#534AB7]">세계관 개요</p>
              <h1 className="text-2xl font-semibold text-stone-950">떠다니는 사막 도시</h1>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                기억을 화폐처럼 거래하는 사막 도시를 배경으로, 잃어버린 과거를 추적하는 감정사와
                도시를 떠받치는 비밀 장치의 진실을 따라가는 판타지 미스터리 세계관입니다.
              </p>
            </div>

            <Link
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-stone-900 px-3 text-sm font-medium text-white transition hover:bg-stone-700"
              href="/"
            >
              <Icon className="size-4" name="message" />
              생성 채팅 열기
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
              {currentWorks.map((work) => (
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
              {worldNotes.map((note) => (
                <li className="flex gap-3 text-sm leading-6 text-stone-600" key={note}>
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#534AB7]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle eyebrow="인물" title="존재하는 캐릭터" />
            <Link className="text-sm font-medium text-stone-600 transition hover:text-stone-950" href="/characters">
              전체 보기
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {characters.map((character) => (
              <article className="rounded-md border border-stone-200 p-4" key={character.name}>
                <div className="flex items-center gap-3">
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${character.tone}`}>
                    {character.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-stone-950">{character.name}</h3>
                    <p className="truncate text-xs text-stone-500">{character.role}</p>
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
