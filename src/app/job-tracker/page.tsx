import JobList from "@/components/JobList";
import NavBar from "@/components/NavBar";

export default function JobTracker() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <NavBar />
        <JobList />
      </div>
    </main>
  );
}
