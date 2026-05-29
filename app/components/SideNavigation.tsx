"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";

const navItems = [
  { label: "개요", icon: "home", href: "/overview" },
  { label: "생성 채팅", icon: "message", href: "/" },
  { label: "세계관 설정", icon: "book", href: "/world-settings" },
  { label: "캐릭터", icon: "users", href: "/characters" },
  { label: "지역과 지도", icon: "map", href: "/map" },
  { label: "진영 & 세력", icon: "flag", href: "/factions" },
  { label: "연표", icon: "timeline", href: "/timeline" },
  { label: "문서", icon: "archive", href: "/documents" },
];

const recentItems = [
  "북부 왕국 설정",
  "아르테미스",
  "1장 이동 경로",
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-stone-200 bg-[#F7F7F5] transition-[width] duration-200 md:flex ${
        isOpen ? "w-[260px]" : "w-16"
      }`}
    >
      <div className={`flex h-14 items-center ${isOpen ? "justify-between px-3" : "justify-center px-2"}`}>
        {isOpen ? (
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#534AB7] text-white">
              <Icon className="size-4" name="map" />
            </span>
            <span className="truncate text-sm font-semibold text-stone-900">WorldWeaver</span>
          </div>
        ) : null}

        <button
          aria-label={isOpen ? "사이드바 접기" : "사이드바 펼치기"}
          className="flex size-9 items-center justify-center rounded-md text-stone-600 transition hover:bg-stone-200/70 hover:text-stone-950"
          onClick={() => setIsOpen((current) => !current)}
          title={isOpen ? "사이드바 접기" : "사이드바 펼치기"}
          type="button"
        >
          <Icon className="size-4" name={isOpen ? "panelLeftClose" : "panelLeftOpen"} />
        </button>
      </div>

      <div className={isOpen ? "px-2 pb-2" : "px-2 pb-2"}>
        <button
          aria-label="현재 프로젝트: 떠다니는 사막 도시"
          className={`flex h-11 w-full items-center rounded-lg bg-white text-left text-stone-900 shadow-sm transition hover:bg-stone-50 ${
            isOpen ? "gap-2 px-2.5" : "justify-center px-0"
          }`}
          title="떠다니는 사막 도시"
          type="button"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#E8E0B8] text-xs font-bold text-[#5F4B12]">
            사
          </span>
          {isOpen ? (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">떠다니는 사막 도시</span>
                <span className="block truncate text-[11px] text-stone-500">프로젝트 전환</span>
              </span>
              <Icon className="size-3.5 shrink-0 text-stone-400" name="chevronDown" />
            </>
          ) : null}
        </button>

        <Link
          aria-label="새 프로젝트"
          className={`mt-2 flex h-10 w-full items-center rounded-md text-[13px] font-medium text-stone-700 transition hover:bg-stone-200/70 hover:text-stone-950 ${
            isOpen ? "gap-2.5 px-2.5 text-left" : "justify-center px-0"
          }`}
          href="/"
          title="새 프로젝트"
        >
          <Icon className="size-4 shrink-0" name="plus" />
          {isOpen ? "새 프로젝트" : null}
        </Link>
      </div>

      <nav aria-label="대시보드 메뉴" className="flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          const className = `flex h-10 items-center rounded-md text-left text-[13px] transition ${
            isOpen ? "gap-2.5 px-2.5" : "justify-center px-0"
          } ${
            isActive
              ? "bg-white font-medium text-stone-950 shadow-sm"
              : "text-stone-600 hover:bg-stone-200/70 hover:text-stone-950"
          }`;
          const content = (
            <>
              <Icon className="size-4 shrink-0" name={item.icon} />
              {isOpen ? item.label : null}
            </>
          );

          return item.href ? (
            <Link
              aria-current={isActive ? "page" : undefined}
              aria-label={isOpen ? undefined : item.label}
              className={className}
              href={item.href}
              key={item.label}
              title={isOpen ? undefined : item.label}
            >
              {content}
            </Link>
          ) : (
            <button
              aria-label={isOpen ? undefined : item.label}
              className={className}
              key={item.label}
              title={isOpen ? undefined : item.label}
              type="button"
            >
              {content}
            </button>
          );
        })}
      </nav>

      {isOpen ? (
        <div className="mt-5 px-2">
          <p className="px-2.5 pb-2 text-[11px] font-medium text-stone-400">최근 작업</p>
          <div className="grid gap-1">
            {recentItems.map((item) => (
              <button
                className="truncate rounded-md px-2.5 py-2 text-left text-[13px] text-stone-600 transition hover:bg-stone-200/70 hover:text-stone-950"
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex-1" />

      <div className={isOpen ? "p-2" : "p-2"}>
        <button
          aria-label="계정 설정"
          className={`flex h-10 w-full items-center rounded-md text-[13px] font-medium text-stone-700 transition hover:bg-stone-200/70 hover:text-stone-950 ${
            isOpen ? "gap-2.5 px-2.5 text-left" : "justify-center px-0"
          }`}
          title="계정 설정"
          type="button"
        >
          <Icon className="size-4 shrink-0" name="user" />
          {isOpen ? "계정 설정" : null}
        </button>
      </div>
    </aside>
  );
}

export default SideNavigation;
