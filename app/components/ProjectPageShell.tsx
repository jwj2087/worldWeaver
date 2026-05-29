import type React from "react";
import Icon from "./Icon";
import SideNavigation from "./SideNavigation";

function ProjectHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-stone-200 bg-white px-4">
      <span className="flex size-8 items-center justify-center rounded-md bg-[#534AB7] text-white">
        <Icon className="size-4" name="map" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-stone-900">WorldWeaver</p>
        <p className="truncate text-[11px] text-stone-500">떠다니는 사막 도시</p>
      </div>
    </header>
  );
}

function ProjectPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full bg-white text-stone-900">
      <SideNavigation />

      <section className="flex min-w-0 flex-1 flex-col">
        <ProjectHeader />
        {children}
      </section>
    </main>
  );
}

export default ProjectPageShell;
