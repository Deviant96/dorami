"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import InterviewProgressNav from "./InterviewProgressNav";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Job } from "@/app/types/Job";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
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

  const handleDropProgress = (
    event: React.DragEvent<HTMLDivElement>,
    jobId: number
  ) => {
    const stage = event.dataTransfer.getData("stage");
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, progress: [...new Set([...job.progress, stage])] }
          : job
      )
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedJobs = Array.from(jobs);
    const [movedJob] = reorderedJobs.splice(result.source.index, 1);
    reorderedJobs.splice(result.destination.index, 0, movedJob);

    setJobs(reorderedJobs);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setEditingJob({} as Job)}
        className="mb-4 text-blue-500"
      >
        Add Job
      </button>
      {editingJob && (
        <JobForm
          onSave={handleSaveJob}
          onCancel={() => setEditingJob(null)}
          existingJob={editingJob}
        />
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="jobs">
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jobs.map((job, index) => (
                <Draggable
                  key={job.id.toString()}
                  draggableId={job.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <JobCard
                        key={job.id}
                        job={job}
                        onEdit={handleEditJob}
                        onDelete={handleDeleteJob}
                        onDrop={handleDropProgress}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <InterviewProgressNav />
    </div>
  );
};

export default JobList;
