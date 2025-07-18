"use client";

import { useState, useEffect } from "react";

export default function ScoreFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [localValue]);

  const scores = [
    { value: "", label: "All scores" },
    { value: "70", label: "70%+ (Good)" },
    { value: "80", label: "80%+ (Great)" },
    { value: "90", label: "90%+ (Excellent)" },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Minimum Match Score
      </label>

      <div className="flex flex-wrap gap-2">
        {scores.map((score) => (
          <button
            key={score.value}
            type="button"
            onClick={() => {
              setLocalValue(score.value);
              onChange(score.value);
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              value === score.value
                ? "bg-primary-100 text-primary-800 border border-primary-300 font-medium"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {score.label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        <input
          type="range"
          min="0"
          max="100"
          value={localValue || "0"}
          onChange={(e) => setLocalValue(e.target.value)}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>Selected: {localValue || "0"}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
