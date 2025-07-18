"use client";

export default function RemoteFilter({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center h-5">
        <input
          id="remote-filter"
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
      </div>
      <label
        htmlFor="remote-filter"
        className="ml-3 text-sm font-medium text-gray-700"
      >
        Remote Only
      </label>
    </div>
  );
}
