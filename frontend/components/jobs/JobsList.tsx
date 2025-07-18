"use client";

import { Job } from "@/lib/types";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/api/jobs";
import { useSearchParams } from "next/navigation";

export default function JobsList({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const searchParams = useSearchParams();

  // Re-fetch when search params change
  useEffect(() => {
    const debounce = setTimeout(() => {
      const fetchFilteredJobs = async () => {
        setLoading(true);
        try {
          const remote = searchParams.get("remote") === "true";
          const minFitScore = searchParams.get("minFitScore")
            ? parseInt(searchParams.get("minFitScore") as string)
            : undefined;
          const techStack = searchParams.get("techStack") || undefined;

          const newJobs = await fetchJobs({
            remote,
            minFitScore,
            techStack,
            limit,
            offset: 0,
          });

          setJobs(newJobs);
          setPage(1);
          setHasMore(newJobs.length > 0);
        } catch (error) {
          console.error("Failed to fetch jobs with filters:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredJobs();
    }, 400); // debounce by 400ms

    return () => clearTimeout(debounce);
  }, [searchParams]);

  // Load more jobs (infinite scroll)
  const loadMoreJobs = async () => {
    setLoading(true);
    try {
      const remote = searchParams.get("remote") === "true";
      const minFitScore = searchParams.get("minFitScore")
        ? parseInt(searchParams.get("minFitScore") as string)
        : undefined;
      const techStack = searchParams.get("techStack") || undefined;

      const nextPage = page + 1;
      const moreJobs = await fetchJobs({
        remote,
        minFitScore,
        techStack,
        limit,
        offset: page * limit,
      });

      setJobs((prev) => [...prev, ...moreJobs]);
      if (moreJobs.length === limit) {
        setPage(nextPage);
      }
      if (moreJobs.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Setup infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        loadMoreJobs();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, searchParams, page]);

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-2xl text-gray-500 mb-2">No jobs found</div>
        <p className="text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-6 text-gray-500">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
}
