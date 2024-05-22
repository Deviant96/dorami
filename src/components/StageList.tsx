"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdDelete, MdEdit } from "react-icons/md";

interface Stage {
  id: number;
  name: string;
}

const StageList: React.FC = () => {
  const [stages, setStages] = useState<Stage[]>(() => {
    const savedStages = localStorage.getItem("stages");
    return savedStages ? JSON.parse(savedStages) : [];
  });

  const [newStageName, setNewStageName] = useState("");
  const [editingStage, setEditingStage] = useState<Stage | null>(null);

  useEffect(() => {
    localStorage.setItem("stages", JSON.stringify(stages));
  }, [stages]);

  const handleAddStage = () => {
    if (newStageName.trim()) {
      setStages([...stages, { id: Date.now(), name: newStageName }]);
      setNewStageName("");
    }
  };

  const handleEditStage = (stage: Stage) => {
    setEditingStage(stage);
  };

  const handleSaveEdit = () => {
    if (editingStage && editingStage.name.trim()) {
      setStages(
        stages.map((stage) =>
          stage.id === editingStage.id ? editingStage : stage
        )
      );
      setEditingStage(null);
    }
  };

  const handleDeleteStage = (id: number) => {
    setStages(stages.filter((stage) => stage.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedStages = Array.from(stages);
    const [movedStage] = reorderedStages.splice(result.source.index, 1);
    reorderedStages.splice(result.destination.index, 0, movedStage);

    setStages(reorderedStages);
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
          Example 'Screening', 'Assessment Test', 'Interview with HR', 'Final
          Interview'
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
