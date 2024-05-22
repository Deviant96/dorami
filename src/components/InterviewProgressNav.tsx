"use client";

import prisma from '@/db/prisma';
import { useEffect, useState } from 'react';

const InterviewProgressNav: React.FC = () => {
  const [stages, setStages] = useState<string[]>([]);

  useEffect(() => {
    const fetchStages = async () => {
      const stages = await prisma.stage.findMany();
      setStages(stages.map(stage => stage.name));
    };

    fetchStages();
  }, []);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, stage: string) => {
    event.dataTransfer.setData('stage', stage);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-300 flex justify-around z-[9999]">
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
