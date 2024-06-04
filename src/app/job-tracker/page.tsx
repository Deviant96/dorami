import { getAllJobs } from "@/app/api/getAllJobs";
import JobList from "@/components/JobList";
import { JobWithProgress } from "@/types/JobWithProgress";

export default async function Page() {
  const jobs: JobWithProgress[] = await getAllJobs();

  return <JobList jobs={jobs} />;
}
