'use client';

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobForm from './JobForm';
import InterviewProgressNav from './InterviewProgressNav';
import { Job } from '@/app/types/Job';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSaveJob = (job: Job) => {
    setJobs((prevJobs) => {
      const jobExists = prevJobs.find((j) => j.id === job.id);
      if (jobExists) {
        return prevJobs.map((j) => (j.id === job.id ? job : j));
      } else {
        return [...prevJobs, job];
      }
    });
    setEditingJob(null);
  };

  const handleEditJob = (id: number) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setEditingJob(jobToEdit || null);
  };

  const handleDeleteJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleDropProgress = (event: React.DragEvent<HTMLDivElement>, jobId: number) => {
    const stage = event.dataTransfer.getData('stage');
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, progress: [...new Set([...job.progress, stage])] } : job
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => setEditingJob({} as Job)} className="mb-4 text-blue-500">Add Job</button>
      {editingJob && <JobForm onSave={handleSaveJob} onCancel={() => setEditingJob(null)} existingJob={editingJob} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onDrop={handleDropProgress}
          />
        ))}
      </div>
      <InterviewProgressNav />
    </div>
  );
};

export default JobList;
