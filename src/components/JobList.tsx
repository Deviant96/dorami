"use client";

import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import { DragDropContext, Droppable, Draggable, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import prisma from "@/db/prisma";
import { JobWithProgress } from "@/types/JobWithProgress";
import { createJobs, deleteJobs, updateJobs } from "@/datas/jobs";


const JobList = (props: { jobs: JobWithProgress[] }) => {
  const [jobs, setJobs] = useState<JobWithProgress[]>(props.jobs);
  const [editingJob, setEditingJob] = useState<JobWithProgress | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setJobs(props.jobs);
    };

    fetchJobs();
  }, []);

  const handleSaveJob = async (job: any) => {
    const res = job.id
      ? await updateJobs(job.id, job)
      : await createJobs(job, jobs.length);
      // await prisma.job.create({
      //     data: { ...job, order: jobs.length },
      //   });
    const savedJob = res.data;

    setJobs(prevJobs => {
      const jobExists = prevJobs.find(j => j.id === savedJob.id);
      if (jobExists) {
        return prevJobs.map(j => (j.id === savedJob.id ? { ...j, ...savedJob } : j));
      } else {
        return [...prevJobs, { ...savedJob, progress: [] }];
      }
    });
    setEditingJob(null);
  };

  const handleEditJob = (id: number) => {
    const jobToEdit = jobs.find((job) => job.id === id);
    setEditingJob(jobToEdit || null);
  };

  const handleDeleteJob = async (id: number) => {
    const res = await deleteJobs(id);
    res && setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
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
            ? { ...job, progress: [...job.progress, { stage, jobId, stageId: stage.id, id: 0 }] }
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
        onClick={() => setEditingJob({} as JobWithProgress)}
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
      {/* <InterviewProgressNav /> */}
    </div>
  );
};

export default JobList;
