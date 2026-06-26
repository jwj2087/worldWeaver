"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Icon from "../components/Icon";
import { useAuth } from "../auth/AuthProvider";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.replace(searchParams.get("next") ?? "/map");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-[#FAFAF8] text-stone-900">
      <section className="hidden min-h-screen w-[42%] flex-col justify-between bg-[#293241] p-8 text-white lg:flex">
        <Link className="flex w-fit items-center gap-2" href="/">
          <span className="flex size-9 items-center justify-center rounded-md bg-white text-[#534AB7]">
            <Icon className="size-4" name="map" />
          </span>
          <span className="text-sm font-semibold">WorldWeaver</span>
        </Link>

        <div>
          <p className="text-sm font-medium text-[#B8E0D2]">세계관 작업실</p>
          <h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight">
            지도, 캐릭터, 진영을 한 프로젝트에서 이어가세요.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-stone-200">
            로그인하면 저장된 프로젝트와 최근 세계관 작업을 이어서 편집할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-stone-300">
          <span className="rounded-md border border-white/15 px-3 py-2">Map</span>
          <span className="rounded-md border border-white/15 px-3 py-2">Character</span>
          <span className="rounded-md border border-white/15 px-3 py-2">Timeline</span>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-[420px]">
          <Link className="mb-10 flex w-fit items-center gap-2 lg:hidden" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-[#534AB7] text-white">
              <Icon className="size-4" name="map" />
            </span>
            <span className="text-sm font-semibold">WorldWeaver</span>
          </Link>

          <div className="mb-7">
            <p className="text-sm font-medium text-[#534AB7]">로그인</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">다시 오신 걸 환영합니다</h1>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              이메일과 비밀번호를 입력해 프로젝트 작업 공간으로 이동하세요.
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">이메일</span>
              <input
                autoComplete="email"
                className="h-12 rounded-md border border-stone-200 bg-white px-3 text-sm outline-none transition focus:border-[#534AB7] focus:ring-4 focus:ring-[#EEEDFE]"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">비밀번호</span>
              <input
                autoComplete="current-password"
                className="h-12 rounded-md border border-stone-200 bg-white px-3 text-sm outline-none transition focus:border-[#534AB7] focus:ring-4 focus:ring-[#EEEDFE]"
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="8자 이상"
                required
                type="password"
                value={password}
              />
            </label>

            {errorMessage ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <button
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-md bg-stone-950 px-4 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
              disabled={isSubmitting || isLoading}
              type="submit"
            >
              <Icon className="size-4" name="user" />
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <Link
            className="mt-3 flex h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50"
            href="/signup"
          >
            회원가입 바로가기
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
