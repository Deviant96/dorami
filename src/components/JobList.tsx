"use client";

import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import { DragDropContext, Droppable, Draggable, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import prisma from "@/db/prisma";
import { JobWithProgress } from "@/types/JobWithProgress";
import { createJobs, deleteJobs, getAllJobs, updateJobs } from "@/datas/jobs";
import { useSession } from "next-auth/react";
import { assignJobProgress, getStageByName } from "@/datas/stages";
import InterviewProgressNav from "./InterviewProgressNav";

const JobList = () => {
  const [jobs, setJobs] = useState<JobWithProgress[]>([]);
  const [editingJob, setEditingJob] = useState<JobWithProgress | null>(null);
  console.log('editingJob', editingJob)
  const { data: session } = useSession();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      setUserId(parseInt(session.userData.id as string));
    }

    if(userId) {
      const fetchJobs = async () => {
        const data = await getAllJobs(userId);
        setJobs(data);
      };

      fetchJobs();
    }
  }, [session, userId]);

  const handleSaveJob = async (job: any) => {
    if(!session) return null;
    const userId = parseInt(session.userData.id as string);
    const res = job.id
      ? await updateJobs(userId, job.id, job)
      : await createJobs(userId, job, jobs.length);
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
    if(!userId) return null;
    const res = await deleteJobs(userId, id);
    res && setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleDropProgress = async (event: React.DragEvent<HTMLDivElement>, jobId: number) => {
    if(!userId) return;
    const stageName = event.dataTransfer.getData('stage');
    const stage = await getStageByName(userId, stageName);

    if (stage) {
      await assignJobProgress(userId, jobId, stage.id)

      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId
            ? { ...job, progress: [...job.progress, { stage, jobId, stageId: stage.id, id: 0, userId }] }
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
      updateJobs(userId as number, reorderedJobs[i].id, i)
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
          isUpdatingJob={Object.keys(editingJob).length !== 0}
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
              {Array.from(jobs).map((job, index) => (
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
