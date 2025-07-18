"use client";

export default function ScoreFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Minimum Fit Score
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="">Any score</option>
        <option value="70">70%+</option>
        <option value="80">80%+</option>
        <option value="90">90%+</option>
      </select>
    </div>
  );
}
