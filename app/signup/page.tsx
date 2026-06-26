"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Icon from "../components/Icon";

type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    imageUrl: string | null;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function signup(payload: { email: string; name: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    try {
      const body = (await response.json()) as { message?: string; error?: string };
      throw new Error(body.message ?? body.error ?? "회원가입에 실패했습니다.");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("회원가입에 실패했습니다.");
    }
  }

  return (await response.json()) as AuthResponse;
}

function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signup({ email, name, password });
      await login({ email, password });
      router.replace("/map");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-5 py-10 text-stone-900">
      <section className="w-full max-w-[420px]">
        <Link className="mb-10 flex w-fit items-center gap-2" href="/">
          <span className="flex size-9 items-center justify-center rounded-md bg-[#534AB7] text-white">
            <Icon className="size-4" name="map" />
          </span>
          <span className="text-sm font-semibold">WorldWeaver</span>
        </Link>

        <div className="mb-7">
          <p className="text-sm font-medium text-[#534AB7]">회원가입</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">새 작업 공간 만들기</h1>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            계정을 만들고 세계관 프로젝트를 저장하세요.
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-stone-700">이름</span>
            <input
              autoComplete="name"
              className="h-12 rounded-md border border-stone-200 bg-white px-3 text-sm outline-none transition focus:border-[#534AB7] focus:ring-4 focus:ring-[#EEEDFE]"
              onChange={(event) => setName(event.target.value)}
              placeholder="작가 이름"
              required
              type="text"
              value={name}
            />
          </label>

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
              autoComplete="new-password"
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
            disabled={isSubmitting}
            type="submit"
          >
            <Icon className="size-4" name="user" />
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <Link
          className="mt-3 flex h-11 items-center justify-center rounded-md border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50"
          href="/login"
        >
          로그인으로 돌아가기
        </Link>
      </section>
    </main>
  );
}

export default SignupPage;
