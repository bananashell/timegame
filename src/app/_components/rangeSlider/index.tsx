import { CSSProperties, ChangeEvent, useRef, useState } from "react";

export const RangeSlider = ({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      "value" in e.currentTarget &&
      typeof e.currentTarget.value === "string"
    ) {
      setCurrentValue(+e.currentTarget.value);
      onChange(+e.currentTarget.value);
    }
  };

  //   const percentage =
  //     calculatePercentage(currentValue, min, max) *
  //     (inputRef?.current?.clientWidth ?? 0);

  return (
    <section className="w-full px-12 relative box-border">
      {/* <div
        className="translate-x-[calc(var(--translateX))]  pointer-events-none w-20 text-center origin-center"
        style={{ "--translateX": `${percentage}px` } as CSSProperties}
      >
        {currentValue}
      </div> */}
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        onChange={handleChange}
        value={currentValue}
        className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
[&::-webkit-slider-thumb]:w-24
[&::-webkit-slider-thumb]:h-24
[&::-webkit-slider-thumb]:-mt-10
[&::-webkit-slider-thumb]:appearance-none
[&::-webkit-slider-thumb]:bg-white
[&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:transition-all
[&::-webkit-slider-thumb]:duration-150
[&::-webkit-slider-thumb]:ease-in-out
[&::-webkit-slider-thumb]:dark:bg-slate-700

[&::-moz-range-thumb]:w-24
[&::-moz-range-thumb]:h-24
[&::-moz-range-thumb]:appearance-none
[&::-moz-range-thumb]:bg-white
[&::-moz-range-thumb]:border-4
[&::-moz-range-thumb]:border-blue-600
[&::-moz-range-thumb]:rounded-full
[&::-moz-range-thumb]:transition-all
[&::-moz-range-thumb]:duration-150
[&::-moz-range-thumb]:ease-in-out

[&::-webkit-slider-runnable-track]:w-full
[&::-webkit-slider-runnable-track]:h-2
[&::-webkit-slider-runnable-track]:bg-gray-100
[&::-webkit-slider-runnable-track]:rounded-full
[&::-webkit-slider-runnable-track]:dark:bg-gray-700

[&::-moz-range-track]:w-full
[&::-moz-range-track]:h-2
[&::-moz-range-track]:bg-gray-100
[&::-moz-range-track]:rounded-full"
        id="basic-range-slider-usage"
      />
    </section>
  );
};

function calculatePercentage(
  value: number,
  minValue: number,
  maxValue: number,
): number {
  // Calculate the range
  const range = maxValue - minValue;

  // Calculate the distance of the value from the minimum
  const distanceFromMin = value - minValue;

  // Calculate the percentage
  const percentage = distanceFromMin / range;

  // Ensure the percentage is within the range of 0 to 100
  return Math.max(0, Math.min(1, percentage));
}
