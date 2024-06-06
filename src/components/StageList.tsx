"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdDelete, MdEdit } from "react-icons/md";
import prisma from "@/db/prisma";
import { createState, deleteState, getAllStages, updateState } from "@/datas/stages";
import { useSession } from "next-auth/react";

interface Stage {
  id: number;
  order: number;
  name: string;
}

const StageList: React.FC = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [newStageName, setNewStageName] = useState("");
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      setUserId(parseInt(session.userData.id as string));
    }

    const fetchStages = async () => {
      if (!userId) return;
      const res = await getAllStages(userId);
      setStages(res);
    }
    fetchStages();
  }, [session, userId]);

  const handleAddStage = async () => {
    if (!userId) return;
    if (newStageName.trim()) {
      const newStage = await createState(userId, newStageName);
      setStages([...stages, newStage.data]);
      setNewStageName('');
    }
  };

  const handleEditStage = (stage: Stage) => {
    setEditingStage(stage);
  };

  const handleSaveEdit = async () => {
    if (!userId) return;
    if (editingStage && editingStage.name.trim()) {
      const id = editingStage.id;
      const name = editingStage.name;

      const updatedStage = await updateState(userId, id, name);
      setStages(stages.map(stage => (stage.id === updatedStage.id ? updatedStage : stage)));
      setEditingStage(null);
    }
  };

  const handleDeleteStage = async (id: number) => {
    if (!userId) return;
    await deleteState(userId, id);
    setStages(stages.filter(stage => stage.id !== id));
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const reorderedStages = Array.from(stages);
    const [movedStage] = reorderedStages.splice(result.source.index, 1);
    reorderedStages.splice(result.destination.index, 0, movedStage);

    setStages(reorderedStages);

    for (let i = 0; i < reorderedStages.length; i++) {
      await updateState(userId as number, reorderedStages[i].id, i)
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Stages</h2>
      <div className="flex">
        <input
          type="text"
          value={editingStage ? editingStage.name : newStageName}
          onChange={(e) =>
            editingStage
              ? setEditingStage({ ...editingStage, name: e.target.value })
              : setNewStageName(e.target.value)
          }
          className="border p-2 flex-grow"
          placeholder="Add new stage or edit stage"
        />
        <button
          onClick={editingStage ? handleSaveEdit : handleAddStage}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          {editingStage ? "Save" : "Add"}
        </button>
      </div>
      <div className="mb-4">
        <small className="text-gray-500 italic">
          example: Screening, Assessment Test, Interview with HR, Final
          Interview
        </small>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stages">
          {(provided) => (
            <ul
              className="list-disc"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stages.map((stage, index) => (
                <Draggable
                  key={stage.id.toString()}
                  draggableId={stage.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="flex justify-between items-center mb-2 p-2 bg-white border rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {stage.name}
                      <div className="flex space-x-2 gap-2">
                        <button
                          onClick={() => handleEditStage(stage)}
                          className="text-xl text-blue-500 hover:text-blue-700"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteStage(stage.id)}
                          className="text-xl text-red-500 hover:text-red-700"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default StageList;
