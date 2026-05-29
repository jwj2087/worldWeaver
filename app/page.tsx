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
              <p className="mb-2 text-sm font-medium text-[#534AB7]">생성 채팅</p>
              <h1 className="text-2xl font-semibold text-stone-900 md:text-3xl">
                떠다니는 사막 도시를 어떻게 확장할까요?
              </h1>
            </div>

            <form className="rounded-3xl border border-stone-200 bg-white p-3 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
              <textarea
                aria-label="세계관 생성 프롬프트"
                className="min-h-24 w-full resize-none bg-transparent px-2 py-2 text-[15px] leading-6 text-stone-900 outline-none placeholder:text-stone-400"
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="예: 기억을 거래하는 마법사 길드와 도시의 금지된 규칙을 만들어줘"
                value={prompt}
              />

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  className="flex h-9 items-center gap-2 rounded-full border border-stone-200 px-3 text-sm text-stone-600 transition hover:bg-stone-50 hover:text-stone-900"
                  type="button"
                >
                  <Icon className="size-4" name="sparkles" />
                  빠른 설정
                </button>

                <button
                  aria-label="생성하기"
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
