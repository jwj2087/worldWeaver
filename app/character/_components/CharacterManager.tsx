import type { Character, CharacterRelationship } from "../../lib/api";
import Icon from "../../components/Icon";

function relationshipLabel(relationship: CharacterRelationship, characters: Character[]) {
  const target = characters.find((character) => character.id === relationship.targetCharacterId);
  const source = characters.find((character) => character.id === relationship.sourceCharacterId);

  return target?.name ?? source?.name ?? "관계";
}

function CharacterManager({
  characters,
  relationships,
}: {
  characters: Character[];
  relationships: CharacterRelationship[];
}) {
  const selected = characters[0];
  const selectedRelationships = selected
    ? relationships.filter(
        (relationship) =>
          relationship.sourceCharacterId === selected.id || relationship.targetCharacterId === selected.id,
      )
    : [];
  const tags = Array.from(new Set(characters.flatMap((character) => character.tags))).slice(0, 6);

  if (!selected) {
    return (
      <div className="min-h-0 flex-1 overflow-auto bg-[#FAFAF8]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6">
          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <p className="mb-2 text-sm font-medium text-[#534AB7]">캐릭터 관리</p>
            <h1 className="text-2xl font-semibold text-stone-950">등록된 캐릭터가 없습니다</h1>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#FAFAF8]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6">
        <section className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-[#534AB7]">캐릭터 관리</p>
            <h1 className="text-2xl font-semibold text-stone-950">등장인물과 관계를 정리하세요</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              백엔드 캐릭터 API에서 받은 인물, 진영, 서사 흐름, 관계 데이터를 표시합니다.
            </p>
          </div>

          <button
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-stone-900 px-3 text-sm font-medium text-white transition hover:bg-stone-700"
            type="button"
          >
            <Icon className="size-4" name="plus" />
            캐릭터 추가
          </button>
        </section>

        <section className="grid min-h-[620px] gap-5 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-stone-200 bg-white p-4">
            <div className="flex gap-2">
              <input
                aria-label="캐릭터 검색"
                className="h-9 min-w-0 flex-1 rounded-md border border-stone-200 px-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#534AB7]"
                placeholder="캐릭터 검색"
                type="search"
              />
              <button
                className="flex size-9 items-center justify-center rounded-md border border-stone-200 text-stone-600 transition hover:bg-stone-50 hover:text-stone-950"
                type="button"
              >
                <Icon className="size-4" name="settings" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-1 rounded-md bg-stone-100 p-1 text-xs font-medium text-stone-600">
              {["전체", "주요", "조연"].map((item, index) => (
                <button
                  className={`h-8 rounded ${index === 0 ? "bg-white text-stone-950 shadow-sm" : "hover:bg-white/70"}`}
                  key={item}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              {characters.map((character, index) => (
                <button
                  className={`flex w-full items-start gap-3 rounded-md border p-3 text-left transition ${
                    index === 0
                      ? "border-[#AFA9EC] bg-[#F7F6FF]"
                      : "border-stone-200 bg-white hover:bg-stone-50"
                  }`}
                  key={character.id}
                  type="button"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-xs font-semibold"
                    style={{ color: character.color }}
                  >
                    {character.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-stone-950">{character.name}</span>
                      <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] text-stone-600">
                        {character.status}
                      </span>
                    </span>
                    <span className="mt-1 block truncate text-xs text-stone-500">{character.role}</span>
                    <span className="mt-2 block truncate text-[11px] text-stone-400">
                      {character.factionName ?? "소속 없음"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
            <section className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-sm font-semibold"
                    style={{ color: selected.color }}
                  >
                    {selected.initials}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-stone-950">{selected.name}</h2>
                    <p className="mt-1 text-sm text-stone-500">
                      {selected.role} · {selected.factionName ?? "소속 없음"}
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex h-9 items-center justify-center rounded-md border border-stone-200 px-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-950"
                  type="button"
                >
                  편집
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-stone-500">역할</span>
                  <input className="h-10 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-[#534AB7]" defaultValue={selected.role} />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-stone-500">상태</span>
                  <input className="h-10 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-[#534AB7]" defaultValue={selected.status} />
                </label>
              </div>

              <label className="mt-4 grid gap-2">
                <span className="text-xs font-medium text-stone-500">서사 아크</span>
                <textarea
                  className="min-h-28 resize-none rounded-md border border-stone-200 px-3 py-2 text-sm leading-6 outline-none focus:border-[#534AB7]"
                  defaultValue={selected.arc}
                />
              </label>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-stone-950">캐릭터 메모</h3>
                <div className="mt-3 grid gap-2">
                  {selected.notes.map((note) => (
                    <div className="rounded-md border border-stone-200 bg-[#FAFAF8] px-3 py-2 text-sm text-stone-600" key={note}>
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="grid gap-5">
              <section className="rounded-lg border border-stone-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-stone-950">관계</h3>
                <div className="mt-3 grid gap-3">
                  {selectedRelationships.map((relationship) => (
                    <article className="rounded-md border border-stone-200 p-3" key={relationship.id}>
                      <p className="text-sm font-semibold text-stone-950">{relationshipLabel(relationship, characters)}</p>
                      <p className="mt-1 text-xs leading-5 text-stone-500">{relationship.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-stone-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-stone-950">빠른 분류</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 transition hover:bg-stone-50 hover:text-stone-950"
                      key={tag}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CharacterManager;
