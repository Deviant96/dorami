'use client';

import JobList from "@/components/JobList";
import StageList from "@/components/StageList";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"jobs" | "stages">("jobs");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <button
            onClick={() => setCurrentPage("jobs")}
            className={`mr-4 ${currentPage === "jobs" ? "font-bold" : ""}`}
          >
            Job Application Tracker
          </button>
          <button
            onClick={() => setCurrentPage("stages")}
            className={`${currentPage === "stages" ? "font-bold" : ""}`}
          >
            Manage Stages
          </button>
        </nav>
        {currentPage === "jobs" ? <JobList /> : <StageList />}
      </div>
    </main>
  );
}
