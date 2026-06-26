"use client";

import { useState } from "react";
import Icon from "./components/Icon";
import SideNavigation from "./components/SideNavigation";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  return (
    <main className="flex h-screen w-full bg-white text-stone-900">
      <SideNavigation />

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#534AB7] text-white">
            <Icon className="size-4" name="map" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-900">WorldWeaver</p>
            <p className="truncate text-[11px] text-stone-500">떠다니는 사막 도시</p>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-8">
          <div className="w-full max-w-3xl">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-medium text-[#534AB7]">새 프로젝트</p>
              <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
                어떤 지도를 만들까요?
              </h1>
              <p className="mt-3 text-sm text-stone-500">
                세계의 지형, 도시, 세력권, 캐릭터 위치를 텍스트로 설명해 주세요.
              </p>
            </div>

            <form className="rounded-3xl border border-stone-200 bg-white p-3 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
              <textarea
                aria-label="지도 생성 프롬프트"
                className="min-h-24 w-full resize-none bg-transparent px-2 py-2 text-[15px] leading-6 text-stone-900 outline-none placeholder:text-stone-400"
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="예: 거대한 내륙해를 중심으로 북쪽에는 얼음 왕국, 남쪽에는 사막 제국, 동쪽에는 마법 숲이 있는 대륙 지도를 만들어줘"
                value={prompt}
              />

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {["대륙", "도시", "왕국", "항로", "던전"].map((option) => (
                  <button
                    className="h-8 rounded-full border border-stone-200 px-3 text-xs font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                    key={option}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3">
                <span className="text-xs text-stone-400">생성 후 지도, 캐릭터, 진영 위치를 함께 관리할 수 있어요.</span>
                <button
                  aria-label="지도 생성하기"
                  className="flex size-9 items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700 disabled:bg-stone-300"
                  disabled={!prompt.trim()}
                  type="submit"
                >
                  <Icon className="size-4" name="send" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
