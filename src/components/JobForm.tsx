"use client";

import { Job } from '@/types/Job';
import { useState } from 'react';

interface JobFormProps {
  onSave: (job: Job) => void;
  onCancel: () => void;
  existingJob?: Job;
}

const JobForm: React.FC<JobFormProps> = ({ onSave, onCancel, existingJob }) => {
  const [job, setJob] = useState<Job>({
    id: existingJob?.id || Date.now(),
    companyName: existingJob?.companyName || '',
    isForeign: existingJob?.isForeign || false,
    details: existingJob?.details || '',
    date: existingJob?.date || '',
    notes: existingJob?.notes || '',
    status: existingJob?.status || 'pass',
    progress: existingJob?.progress || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = (e.target as HTMLInputElement);
    setJob({
      ...job,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(job);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white mb-4">
      <div className="mb-4">
        <label className="block text-gray-700">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={job.companyName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Foreign Company</label>
        <input
          type="checkbox"
          name="isForeign"
          checked={job.isForeign}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Details</label>
        <textarea
          name="details"
          value={job.details}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={job.date}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={job.notes}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          name="status"
          value={job.status}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="pass">Pass</option>
          <option value="do not pass">Do Not Pass</option>
          <option value="on-going">On-Going</option>
          <option value="gone">Gone</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="text-gray-500">Cancel</button>
        <button type="submit" className="text-blue-500">Save</button>
      </div>
    </form>
  );
};

export default JobForm;
