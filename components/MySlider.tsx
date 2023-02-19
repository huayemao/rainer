import clsx from "clsx";
import * as Slider from "@radix-ui/react-slider";

export function MySlider({
  onValueChange,
  theme,
  value,
  label,
}: {
  onValueChange: (value: number[]) => void;
  theme: string;
  value: number;
  label: string;
}) {
  return (
    <div>
      <Slider.Root
        className="col-span-2 flex relative items-center select-none  touch-none  h-8"
        defaultValue={[value]}
        max={100}
        step={1}
        onValueChange={onValueChange}
        aria-label="Volume"
      >
        <Slider.Track
          className={clsx("relative flex-1 rounded-full h-2", ` bg-${theme}`)}
        >
          <Slider.Range
            className={clsx("absolute rounded-full h-full", `bg-${theme}-dark`)}
          />
        </Slider.Track>
        <Slider.Thumb
          className={clsx(
            "block w-4 h-4 shadow rounded focus:outline-none",
            `bg-${theme}-dark`
          )}
        />
      </Slider.Root>
      <div className="font-bold  text-sm ">
        {label}
      </div>
    </div>
  );
}
