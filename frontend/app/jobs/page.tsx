import { fetchJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
  const jobs = await fetchJobs({ limit: 10 });

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">
              {job.title} @ {job.company}
            </h2>
            <p>
              Fit Score: <strong>{job.fit_score}</strong>
            </p>
            <p>Pitch: {job.pitch}</p>
            <p>Seniority: {job.seniority}</p>
            <p>Tech Stack: {job.tech_stack?.join(", ")}</p>
            <p>Remote: {job.remote ? "Yes" : "No"}</p>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View Job
            </a>
          </div>
        ))
      )}
    </main>
  );
}
