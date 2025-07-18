import { Job, FetchJobsParams } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchJobs({
  remote,
  minFitScore,
  techStack,
  limit = 10,
  offset = 0,
  sortBy = "fit_score",
  sortOrder = "desc",
}: FetchJobsParams = {}): Promise<Job[]> {
  const params = new URLSearchParams();

  if (remote !== undefined) params.append("remote", String(remote));
  if (minFitScore !== undefined)
    params.append("min_fit_score", String(minFitScore));
  if (techStack) params.append("tech_stack", techStack);
  params.append("limit", String(limit));
  params.append("offset", String(offset));
  params.append("sort_by", sortBy);
  params.append("sort_order", sortOrder);

  const res = await fetch(`${API_URL}/jobs?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}

export async function fetchJobDetails(id: string): Promise<Job | null> {
  const res = await fetch(`${API_URL}/jobs/${id}`);

  if (!res.ok) {
    console.error(`Failed to fetch job details for ID ${id}`);
    return null;
  }

  return res.json();
}
