import { Job } from "@/lib/types";
import JobsList from "@/components/jobs/JobsList";
import Filters from "@/components/filters/Filters";
import { fetchJobs } from "@/lib/api/jobs";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const remote = resolvedSearchParams.remote === "true";
  const minFitScore = resolvedSearchParams.minFitScore
    ? parseInt(resolvedSearchParams.minFitScore as string)
    : undefined;
  const techStack = resolvedSearchParams.techStack
    ? (resolvedSearchParams.techStack as string).split(",")
    : undefined;

  const initialJobs = await fetchJobs({
    remote,
    minFitScore,
    techStack,
    limit: 20,
    sortBy: "fit_score",
    sortOrder: "desc",
  });

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AI-Powered Job Matches
        </h1>
        <p className="text-gray-600 mt-2">
          Jobs tailored to your skills and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            <Filters />
          </div>
        </div>

        <div className="lg:col-span-3">
          <JobsList initialJobs={initialJobs} />
        </div>
      </div>
    </main>
  );
}
