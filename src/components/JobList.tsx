'use client';

import { useState } from 'react';
import JobCard from './JobCard';

interface Job {
  id: number;
  companyName: string;
  isForeign: boolean;
  details: string;
  date: string;
  notes: string;
  status: 'pass' | 'do not pass' | 'gone' | 'cancel';
  progress: string[];
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    // Initial sample job data
    {
      id: 1,
      companyName: 'Company A',
      isForeign: false,
      details: 'Details about Company A',
      date: '2024-05-21',
      notes: 'Initial interview',
      status: 'pass',
      progress: [],
    },
  ]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, jobId: number) => {
    event.dataTransfer.setData('text/plain', jobId.toString());
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, progressStage: string) => {
    const jobId = parseInt(event.dataTransfer.getData('text/plain'), 10);
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, progress: [...job.progress, progressStage] } : job
      )
    );
  };

  const stages = ['Screening', 'Assessment Test', 'Interview with HR', 'Final Interview'];

  return (
    <div className="flex space-x-4">
      <div className="w-1/3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            companyName={job.companyName}
            isForeign={job.isForeign}
            details={job.details}
            date={job.date}
            notes={job.notes}
            status={job.status}
            onDragStart={(event) => handleDragStart(event, job.id)}
          />
        ))}
      </div>
      <div className="w-2/3 flex space-x-4">
        {stages.map((stage) => (
          <div
            key={stage}
            className="w-full p-4 border rounded shadow-md bg-gray-100"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => handleDrop(event, stage)}
          >
            <h3 className="text-xl font-bold mb-4">{stage}</h3>
            {jobs
              .filter((job) => job.progress.includes(stage))
              .map((job) => (
                <JobCard
                  key={job.id}
                  companyName={job.companyName}
                  isForeign={job.isForeign}
                  details={job.details}
                  date={job.date}
                  notes={job.notes}
                  status={job.status}
                  onDragStart={(event) => handleDragStart(event, job.id)}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
