export const JobCardSkeleton: React.FC = () => {
  return (
    <div
      className={`p-4 rounded shadow-md bg-white mb-4 relative border-2 border-gray-200 animate-pulse`}
    >
      <div className="flex items-center gap-2">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>

      <div className="h-4 bg-gray-300 rounded mt-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-full"></div>
      <div className="absolute right-0 top-0 space-x-2 mt-4 me-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="mt-2">
        <ul className="list-none">
          <li className="text-sm text-gray-600 inline">
            <div className="inline-block w-20 h-4 bg-gray-300 rounded"></div>
            <span> {`->`} </span>
          </li>
          <li className="text-sm text-gray-600 inline">
            <div className="inline-block w-20 h-4 bg-gray-300 rounded"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};
