// src/components/InterviewProgressNav.tsx
import React, { useState, useEffect } from 'react';

const InterviewProgressNav: React.FC = () => {
  const [stages, setStages] = useState<string[]>(() => {
    const savedStages = localStorage.getItem('stages');
    return savedStages ? JSON.parse(savedStages).map((stage: { id: number, name: string }) => stage.name) : [];
  });

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, stage: string) => {
    event.dataTransfer.setData('stage', stage);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white flex justify-around">
      {stages.map((stage) => (
        <div
          key={stage}
          className="p-2 bg-blue-600 rounded cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, stage)}
        >
          {stage}
        </div>
      ))}
    </div>
  );
};

export default InterviewProgressNav;
