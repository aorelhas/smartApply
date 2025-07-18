"use client";

import { Job } from "@/lib/types";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/api/jobs";

interface JobsListProps {
  initialJobs: Job[];
}

export default function JobsList({ initialJobs }: JobsListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  // Load more jobs when reaching bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      ) {
        return;
      }
      loadMoreJobs();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const loadMoreJobs = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const newJobs = await fetchJobs({
        limit,
        offset: nextPage * limit,
      });

      if (newJobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more jobs:", error);
    } finally {
      setLoading(false);
    }
  };

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
