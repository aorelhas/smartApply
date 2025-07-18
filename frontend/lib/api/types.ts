export interface HealthResponse {
  status: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  seniority?: string;
  tech_stack?: string[];
  description?: string;
  fit_score?: number;
  pitch?: string;
  source?: string;
  url?: string;
  scraped_at?: string;
  processed?: boolean;
  created_at?: string;
}

export interface FetchJobsParams {
  remote?: boolean;
  minFitScore?: number;
  techStack?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
