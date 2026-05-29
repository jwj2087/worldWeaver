import type React from "react";
import Icon from "./Icon";

function ActionButton({
  children,
  icon,
  primary = false,
}: {
  children?: React.ReactNode;
  icon?: string;
  primary?: boolean;
}) {
  return (
    <button
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-medium transition hover:-translate-y-px hover:shadow-sm ${
        primary
          ? "border-[#534AB7] bg-[#534AB7] text-white"
          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
      }`}
      type="button"
    >
      {icon ? <Icon className="size-4" name={icon} /> : null}
      {children}
    </button>
  );
}

export default ActionButton;
