"use client";

export default function RemoteFilter({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center">
      <input
        id="remote-filter"
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="remote-filter" className="ml-2 text-sm text-gray-700">
        Remote Only
      </label>
    </div>
  );
}
