import { Job } from "@/lib/types";
import Link from "next/link";

export default function JobDetail({ job }: { job: Job }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to jobs
        </Link>
      </div>

      <article className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-xl text-blue-600">{job.company}</p>
          </div>

          {job.fit_score && (
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold
              ${
                job.fit_score > 80
                  ? "bg-green-100 text-green-800"
                  : job.fit_score > 60
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              Match: {job.fit_score}%
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.remote && (
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
              Remote
            </span>
          )}
          {job.seniority && (
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {job.seniority}
            </span>
          )}
          {job.location && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {job.location}
            </span>
          )}
        </div>

        {job.tech_stack && job.tech_stack.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {job.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.pitch && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium mb-2">AI Recommendation</h3>
            <p className="italic">"{job.pitch}"</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-medium mb-2">Job Description</h3>
          <div className="prose max-w-none">
            {job.description || "No description available"}
          </div>
        </div>

        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Apply on {job.source || "original site"} →
          </a>
        )}
      </article>
    </div>
  );
}
