import Icon from "../../components/Icon";

function AppHeader() {
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

export default AppHeader;
