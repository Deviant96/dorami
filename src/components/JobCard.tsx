import { Job } from '@/app/types/Job';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface JobCardProps {
  job: Job;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, jobId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onDrop }) => {
  return (
    <div 
      className="p-4 border rounded shadow-md bg-white mb-4 relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(event) => onDrop(event, job.id)}
    >
      <h3 className="text-xl font-bold">{job.companyName} {job.isForeign && <span className="text-sm text-gray-500">(Foreign)</span>}</h3>
      <p className="text-sm text-gray-600">{job.details}</p>
      <p className="text-sm text-gray-600">{job.date}</p>
      <p className="text-sm text-gray-600">{job.notes}</p>
      <p className={`text-sm mt-2 ${job.status === 'pass' ? 'text-green-500' : job.status === 'do not pass' ? 'text-red-500' : job.status === 'gone' ? 'text-yellow-500' : 'text-gray-500'}`}>
        {job.status}
      </p>
      <div className="absolute right-0 top-0 space-x-2 mt-4 me-4">
        <button onClick={() => onEdit(job.id)} className="text-xl text-blue-500 hover:text-blue-700"><MdEdit /></button>
        <button onClick={() => onDelete(job.id)} className="text-xl text-red-500 hover:text-red-700"><MdDelete /></button>
      </div>
      <div className="mt-4">
        <h4 className="font-bold">Progress</h4>
        <ul className="list-disc pl-5">
          {job.progress.map((progress, index) => (
            <li key={index} className="text-sm text-gray-600">{progress}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobCard;
