"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";

const navItems = [
  { label: "지도", icon: "map", href: "/map" },
  { label: "캐릭터", icon: "users", href: "/character" },
  { label: "진영", icon: "flag", href: "/factions" },
  { label: "세계관", icon: "book", href: "/world" },
  { label: "연표", icon: "timeline", href: "/timeline" },
];

const projects = [
  {
    name: "떠다니는 사막 도시",
    genre: "사막 판타지",
    initials: "사",
    tone: "bg-[#E8E0B8] text-[#5F4B12]",
    active: true,
  },
  {
    name: "심해 도서관",
    genre: "해양 미스터리",
    initials: "심",
    tone: "bg-[#DCEBFA] text-[#23527A]",
  },
  {
    name: "유리 숲 왕국",
    genre: "동화 판타지",
    initials: "유",
    tone: "bg-[#E2F7EF] text-[#1D7A5C]",
  },
  {
    name: "기계 달의 연대기",
    genre: "스팀펑크 SF",
    initials: "달",
    tone: "bg-[#FAECE7] text-[#993C1D]",
  },
];

const recentItems = [
  "아스라 지도 초안",
  "캐릭터 위치 표시",
  "왕실 영향권 레이어",
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const activeProject = projects.find((project) => project.active) ?? projects[0];

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

      <div className="px-2 pb-2">
        {isOpen ? <p className="px-2.5 pb-1.5 text-[11px] font-medium text-stone-400">프로젝트</p> : null}
        <div className="relative">
          <button
            aria-expanded={isProjectMenuOpen}
            aria-label="프로젝트 선택"
            className={`flex h-11 w-full items-center rounded-lg bg-white text-left text-stone-900 shadow-sm transition hover:bg-stone-50 ${
              isOpen ? "gap-2 px-2.5" : "justify-center px-0"
            }`}
            onClick={() => setIsProjectMenuOpen((current) => !current)}
            title={activeProject.name}
            type="button"
          >
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${activeProject.tone}`}>
              {activeProject.initials}
            </span>
            {isOpen ? (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold">{activeProject.name}</span>
                  <span className="block truncate text-[11px] text-stone-500">{activeProject.genre}</span>
                </span>
                <Icon className="size-3.5 shrink-0 text-stone-400" name="chevronDown" />
              </>
            ) : null}
          </button>

          {isProjectMenuOpen ? (
            <div
              className={`absolute z-20 mt-1 rounded-lg border border-stone-200 bg-white p-1 shadow-lg ${
                isOpen ? "left-0 right-0" : "left-12 w-60"
              }`}
            >
              {projects.map((project) => (
                <Link
                  className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-left transition ${
                    project.active ? "bg-[#F7F6FF] text-stone-950" : "text-stone-600 hover:bg-stone-50"
                  }`}
                  href="/map"
                  key={project.name}
                  onClick={() => setIsProjectMenuOpen(false)}
                >
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${project.tone}`}>
                    {project.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold">{project.name}</span>
                    <span className="block truncate text-[11px] text-stone-500">{project.genre}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

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
          <p className="px-2.5 pb-2 text-[11px] font-medium text-stone-400">최근 지도 작업</p>
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

      <div className="p-2">
        <Link
          aria-label="계정 설정"
          className={`flex h-10 w-full items-center rounded-md text-[13px] font-medium text-stone-700 transition hover:bg-stone-200/70 hover:text-stone-950 ${
            isOpen ? "gap-2.5 px-2.5 text-left" : "justify-center px-0"
          }`}
          href="/account"
          title="계정 설정"
        >
          <Icon className="size-4 shrink-0" name="user" />
          {isOpen ? "계정 설정" : null}
        </Link>
      </div>
    </aside>
  );
}

export default SideNavigation;
