"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiX, FiFilter } from "react-icons/fi";
import RemoteFilter from "./RemoteFilter";
import ScoreFilter from "./ScoreFilter";
import TechStackFilter from "./TechStackFilter";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (name: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, String(value));
    } else {
      params.delete(name);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push("/", { scroll: false });
  };

  const hasActiveFilters = Array.from(searchParams.keys()).length > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs flex items-center text-gray-500 hover:text-primary-600 transition-colors"
          >
            Clear all
            <FiX className="w-3.5 h-3.5 ml-1" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <ScoreFilter
          value={searchParams.get("minFitScore") || ""}
          onChange={(value) => handleFilterChange("minFitScore", value)}
        />

        <RemoteFilter
          value={searchParams.get("remote") === "true"}
          onChange={(value) => handleFilterChange("remote", value)}
        />

        <TechStackFilter
          value={searchParams.get("techStack")?.split(",") || []}
          onChange={(value) => handleFilterChange("techStack", value.join(","))}
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {searchParams.get("minFitScore") && (
              <FilterBadge
                label={`Score ≥ ${searchParams.get("minFitScore")}%`}
                onRemove={() => handleFilterChange("minFitScore", "")}
              />
            )}
            {searchParams.get("remote") === "true" && (
              <FilterBadge
                label="Remote Only"
                onRemove={() => handleFilterChange("remote", false)}
              />
            )}
            {searchParams
              .get("techStack")
              ?.split(",")
              .map((tech) => (
                <FilterBadge
                  key={tech}
                  label={tech}
                  onRemove={() => {
                    const newTech =
                      searchParams
                        .get("techStack")
                        ?.split(",")
                        .filter((t) => t !== tech) || [];
                    handleFilterChange("techStack", newTech.join(","));
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

const FilterBadge = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <div className="inline-flex items-center pl-2.5 pr-1 py-1 bg-primary-50 text-primary-800 rounded-full text-xs">
    {label}
    <button
      onClick={onRemove}
      className="ml-1.5 rounded-full hover:bg-primary-100 p-0.5 transition-colors"
    >
      <FiX className="w-3.5 h-3.5" />
    </button>
  </div>
);
