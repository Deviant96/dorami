"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import InterviewProgressNav from "./InterviewProgressNav";
import { DragDropContext, Droppable, Draggable, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { Job } from "@/types/Job";
import prisma from "@/db/prisma";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await prisma.job.findMany({
        include: {
          progress: {
            include: {
              stage: true,
            },
          },
        },
        orderBy: { order: 'asc' }
      });
      setJobs(jobs);
    };

    fetchJobs();
  }, []);

  const handleSaveJob = async (job: any) => {
    const savedJob = job.id
      ? await prisma.job.update({
          where: { id: job.id },
          data: job,
        })
      : await prisma.job.create({
          data: { ...job, order: jobs.length },
        });

    setJobs(prevJobs => {
      const jobExists = prevJobs.find(j => j.id === savedJob.id);
      if (jobExists) {
        return prevJobs.map(j => (j.id === savedJob.id ? savedJob : j));
      } else {
        return [...prevJobs, savedJob];
      }
    });
    setEditingJob(null);
  };

  const handleEditJob = (id: number) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setEditingJob(jobToEdit || null);
  };

  const handleDeleteJob = async (id: number) => {
    await prisma.job.delete({ where: { id } });
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleDropProgress = async (event: React.DragEvent<HTMLDivElement>, jobId: number) => {
    const stageName = event.dataTransfer.getData('stage');
    const stage = await prisma.stage.findFirst({ where: { name: stageName } });

    if (stage) {
      await prisma.jobProgress.create({
        data: {
          jobId,
          stageId: stage.id,
        },
      });

      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId
            ? { ...job, progress: [...job.progress, { stage }] }
            : job
        )
      );
    }
  };
  

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const reorderedJobs = Array.from(jobs);
    const [movedJob] = reorderedJobs.splice(result.source.index, 1);
    reorderedJobs.splice(result.destination.index, 0, movedJob);

    setJobs(reorderedJobs);

    for (let i = 0; i < reorderedJobs.length; i++) {
      await prisma.job.update({
        where: { id: reorderedJobs[i].id },
        data: { order: i }
      });
    }
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
          job={editingJob}
          onSave={handleSaveJob}
          onCancel={() => setEditingJob(null)}
        />
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="jobs">
          {(provided) => (
            <div
              className="grid grid-cols-1 gap-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jobs.map((job, index) => (
                <Draggable
                  key={job.id.toString()}
                  draggableId={job.id.toString()}
                  index={index}
                >
                  {(provided: DraggableProvided, draggableSnapshot: DraggableStateSnapshot) => (
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
                        onDrag={draggableSnapshot.isDragging}
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
