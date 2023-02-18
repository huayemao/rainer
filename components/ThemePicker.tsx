import React from "react";

type Props = {
  onChange: (color: string) => void;
  activeTheme: string;
};

export default function ThemePicker({ onChange, activeTheme }: Props) {
  return (
    <div className="flex gap-2">
      <div
        className="w-12 h-12 bg-gold border-[rgb(175,170,154)] border-2 text-gold text-lg flex justify-center items-center font-bold"
        onClick={() => onChange("gold")}
      >
        {activeTheme === "gold" && "✓"}
      </div>
      <div
        className="w-12 h-12 bg-plant border-[rgb(62,101,83)] border-2 text-plant text-lg flex justify-center items-center font-bold"
        onClick={() => onChange("plant")}
      >
        {activeTheme === "plant" && "✓"}
      </div>
    </div>
  );
}
