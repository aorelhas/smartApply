"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-medium text-lg">Filters</h2>

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
  );
}
