import { Job } from "@/lib/types";
import Link from "next/link";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-lg mb-1">
            <Link
              href={`/jobs/${job.id}`}
              className="text-gray-900 hover:text-blue-600 transition-colors"
            >
              {job.title}
            </Link>
          </h2>
          <p className="text-blue-600">{job.company}</p>
        </div>

        {job.fit_score !== undefined && (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center 
                          text-sm font-bold
                          ${
                            job.fit_score > 80
                              ? "bg-green-100 text-green-800"
                              : job.fit_score > 60
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
          >
            {job.fit_score}%
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.remote && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">🌎</span> Remote
          </span>
        )}

        {job.seniority && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {job.seniority}
          </span>
        )}

        {job.location && (
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
            {job.location}
          </span>
        )}
      </div>

      {job.tech_stack && job.tech_stack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {job.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {job.pitch && (
        <p className="mt-3 text-gray-600 text-sm italic border-l-2 border-gray-200 pl-2">
          "{job.pitch}"
        </p>
      )}

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {job.scraped_at && new Date(job.scraped_at).toLocaleDateString()}
        </span>
        <Link
          href={`/jobs/${job.id}`}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
