"use client";

import { getAllStages } from '@/libs/stages';
import prisma from '@/db/prisma';
import { Stage } from '@/types/Stage';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const InterviewProgressNav: React.FC = () => {
  const [stages, setStages] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStages = async () => {
      if (!session) return;
      const stageResponse = await getAllStages(parseInt(session?.userData.id as string));
      if (stageResponse.success && stageResponse.data) {
        const stages: Stage[] = stageResponse.data;
        setStages(stages.map(stage => stage.name));
      } else {
        console.error(stageResponse.message || "Failed to fetch stages");
      }
    };

    fetchStages();
  }, [session]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, stage: string) => {
    event.dataTransfer.setData('stage', stage);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-300 flex justify-around z-[9999]">
      {stages.length === 0 ? (
        <div className="text-sm font-mono">No interview stages exist. Add one by going to 
        <Link href="/manage-stages" className="text-blue-600">{" Manage Stages"}</Link></div>
      ) : (
      stages.map((stage) => (
        <div
          key={stage}
          className="p-2 rounded cursor-pointer"
          draggable
          onDragStart={(event) => handleDragStart(event, stage)}
        >
          <span className="text-xs border border-gray-400 rounded-xl py-1 px-2">{stage}</span>
        </div>
      )))}
    </div>
  );
};

export default InterviewProgressNav;
