import { JobWithProgress } from "@/types/JobWithProgress";
import { BiWorld } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";

interface JobCardProps {
  job: JobWithProgress;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, jobId: number) => void;
  onDrag: boolean;
}

const JobStatusStyled  = (jobStatus: string) : string => {
  let jobStyled;
  switch(jobStatus) {
    case "pass": jobStyled = "text-[#2a9d8f]"; break;
    case "on-going": jobStyled = "text-[#00b4d8]"; break;
    case "do not pass": jobStyled = "text-red-500"; break;
    case "gone": jobStyled = "text-yellow-500"; break;
    default: jobStyled = "text-gray-500";
  }
  return jobStyled;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onDrop, onDrag }) => {
  return (
    <div
      className={`p-4 rounded shadow-md bg-white mb-4 relative ${onDrag ? "border-2 border-blue-500" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(event) => onDrop(event, job.id)}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold">
          {job.companyName}{" "}
          {job.isForeign && (
            <BiWorld className="inline text-sm text-[#219ebc]" title="Foreign" aria-label="Foreign" />
          )}
        </h3>
        <span
        className={`text-sm ${JobStatusStyled(job.status)}`}
        >
          {`(${job.status})`}
        </span>
        {job.date ? "•" : ""}
        <span className="text-xs text-gray-500">{new Date(job.date).toLocaleDateString()}</span>
      </div>
      
      <p className="text-sm text-gray-600">{job.details}</p>
      <p className="text-xs text-gray-600 mt-3"></p>
      <p className="text-xs text-gray-600 italic mt-3">{job.notes}</p>
      <div className="absolute right-0 top-0 space-x-2 mt-4 me-4">
        <button
          onClick={() => onEdit(job.id)}
          className="text-xl text-blue-500 hover:text-blue-700"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="text-xl text-red-500 hover:text-red-700"
        >
          <MdDelete />
        </button>
      </div>
      <div className="mt-2">
        <ul className="list-none">
          {job.progress.map((progress, index) => (
            <li key={index} className="text-sm text-gray-600 inline">
              <span className="text-xs border rounded-xl py-1 px-2">{progress.stage.name}</span>
              <span> {job.progress.length === index + 1 ? "" : "->"} </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobCard;
