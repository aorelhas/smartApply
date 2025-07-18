import { fetchJobDetails } from "@/lib/api/jobs";
import { notFound } from "next/navigation";
import JobDetail from "@/components/jobs/JobDetail";

export default async function JobPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const job = await fetchJobDetails(id);

  if (!job) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <JobDetail job={job} />
    </div>
  );
}
