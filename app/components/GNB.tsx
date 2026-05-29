import ActionButton from "./ActionButton";
import Icon from "./Icon";

function GNB() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-stone-300 bg-white px-4 sticky top-0 left-0 right-0 z-10">
      <Icon className="size-5 text-[#534AB7]" name="map" />
      <span className="text-sm font-semibold text-stone-900">WorldMap Studio</span>
      <div className="flex-1" />
      <ActionButton icon="sparkles">지도 생성</ActionButton>
      <ActionButton icon="plus">캐릭터 추가</ActionButton>
      <div className="ml-1 flex size-7 items-center justify-center rounded-full bg-[#EEEDFE] text-[#534AB7]">
        <Icon className="size-4" name="user" />
      </div>
    </header>
  );
}

export default GNB;
