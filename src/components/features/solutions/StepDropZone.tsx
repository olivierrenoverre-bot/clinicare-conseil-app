"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StepCard, SolutionStepData } from "./StepCard";

interface StepDropZoneProps {
  steps: SolutionStepData[];
  onRemoveStep: (id: string) => void;
  onConfigureStep: (step: SolutionStepData) => void;
}

export function StepDropZone({ steps, onRemoveStep, onConfigureStep }: StepDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "step-drop-zone",
  });

  // Group steps by timing for visual clarity
  const groupedByTiming = steps.reduce((acc, step) => {
    const key = step.timing;
    if (!acc[key]) acc[key] = [];
    acc[key].push(step);
    return acc;
  }, {} as Record<string, SolutionStepData[]>);

  const timingOrder = ["J0", "J+7", "J+14", "J+21", "J+28", "Quotidien"];
  const sortedTimings = Object.keys(groupedByTiming).sort(
    (a, b) => timingOrder.indexOf(a) - timingOrder.indexOf(b)
  );

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-sm text-gray-700">Zone de création</h2>

      <div
        ref={setNodeRef}
        className={`min-h-[400px] rounded-lg border-2 border-dashed p-4 transition-colors ${
          isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        {steps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium">Glissez vos soins ici</p>
            <p className="text-xs text-gray-400 mt-1">pour construire votre protocole</p>
          </div>
        ) : (
          <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {sortedTimings.map((timing) => (
                <div key={timing}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded">
                      {timing === "Quotidien" ? "Domicile - Quotidien" : timing}
                    </span>
                    <div className="h-px flex-1 bg-gray-300" />
                  </div>
                  <div className="space-y-2">
                    {groupedByTiming[timing].map((step, index) => (
                      <StepCard
                        key={step.id}
                        step={step}
                        index={index}
                        onRemove={onRemoveStep}
                        onConfigure={onConfigureStep}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
