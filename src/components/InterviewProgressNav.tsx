import React, { useState } from 'react';

const InterviewProgressNav: React.FC = () => {
  const [stages, setStages] = useState<string[]>(() => {
    const savedStages = localStorage.getItem('stages');
    return savedStages ? JSON.parse(savedStages).map((stage: { id: number, name: string }) => stage.name) : [];
  });

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, stage: string) => {
    event.dataTransfer.setData('stage', stage);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-300 flex justify-around">
      {stages.map((stage) => (
        <div
          key={stage}
          className="p-2 rounded cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, stage)}
        >
          <span className="text-xs border border-gray-400 rounded-xl py-1 px-2">{stage}</span>
        </div>
      ))}
    </div>
  );
};

export default InterviewProgressNav;
