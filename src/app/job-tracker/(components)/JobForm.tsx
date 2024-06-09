"use client";

import { JobWithProgress } from '@/types/JobWithProgress';
import fillDateForm from '@/utils/fillDateForm';
import { useState } from 'react';

interface JobFormProps {
  job: JobWithProgress;
  onSave: (job: JobWithProgress) => void;
  onCancel: () => void;
  isUpdatingJob?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSave, onCancel, isUpdatingJob }) => {
  const [formData, setFormData] = useState(job);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = (e.target as HTMLInputElement);
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jobData: any = { ...formData };
    const date = jobData.date ? jobData.date : fillDateForm(jobData.date);
    jobData.date = (new Date(date)).toISOString()
    jobData.isForeign = jobData.isForeign ? jobData.isForeign : false;
    jobData.details = jobData.details ? jobData.details : "";
    jobData.status = jobData.status ? jobData.status : "on-going";

    onSave(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white mb-4">
      <div className="mb-4">
        <label className="block text-gray-700">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Foreign Company</label>
        <input
          type="checkbox"
          name="isForeign"
          checked={formData.isForeign}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Details</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={isUpdatingJob ? new Date(formData.date).toISOString().split('T')[0] : ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status || "on-going"}
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
