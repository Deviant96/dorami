interface JobCardProps {
  companyName: string;
  isForeign: boolean;
  details: string;
  date: string;
  notes: string;
  status: 'pass' | 'do not pass' | 'gone' | 'cancel';
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

const JobCard: React.FC<JobCardProps> = ({ companyName, isForeign, details, date, notes, status, onDragStart }) => {
  return (
    <div 
      className="p-4 border rounded shadow-md bg-white mb-4"
      draggable
      onDragStart={onDragStart}
    >
      <h3 className="text-xl font-bold">{companyName} {isForeign && <span className="text-sm text-gray-500">(Foreign)</span>}</h3>
      <p className="text-sm text-gray-600">{details}</p>
      <p className="text-sm text-gray-600">{date}</p>
      <p className="text-sm text-gray-600">{notes}</p>
      <p className={`text-sm mt-2 ${status === 'pass' ? 'text-green-500' : status === 'do not pass' ? 'text-red-500' : status === 'gone' ? 'text-yellow-500' : 'text-gray-500'}`}>
        {status}
      </p>
    </div>
  );
};

export default JobCard;
