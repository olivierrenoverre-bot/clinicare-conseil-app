"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { StepLibrary, LIBRARY_CATEGORIES } from "./StepLibrary";
import { StepDropZone } from "./StepDropZone";
import { StepConfigModal } from "./StepConfigModal";
import { SolutionPreview } from "./SolutionPreview";
import { SolutionStepData } from "./StepCard";
import { StepType } from "@prisma/client";
import { useRouter } from "next/navigation";

// Generate unique IDs
function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function SolutionBuilder() {
  const router = useRouter();
  const [steps, setSteps] = useState<SolutionStepData[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("laser");
  const [configStep, setConfigStep] = useState<SolutionStepData | null>(null);
  const [name, setName] = useState("");
  const [indication, setIndication] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Find the display name for a step type from the library
  const findStepInfo = (type: StepType) => {
    for (const category of LIBRARY_CATEGORIES) {
      const item = category.items.find((i) => i.type === type);
      if (item) return { name: item.name, description: item.description };
    }
    return { name: type, description: "" };
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    // Check if dragging from library (new item)
    const isLibraryItem = Object.values(StepType).includes(active.id as StepType);

    if (isLibraryItem && over.id === "step-drop-zone") {
      const type = active.id as StepType;
      const info = findStepInfo(type);

      // Determine default timing based on type
      const defaultTiming = type.startsWith("DOMICILE") ? "Quotidien" : "J0";

      const newStep: SolutionStepData = {
        id: generateId(),
        type,
        name: info.name,
        timing: defaultTiming,
        sameDay: false,
      };
      setSteps([...steps, newStep]);
      // Open config modal for new step
      setConfigStep(newStep);
    } else if (!isLibraryItem) {
      // Reordering existing steps
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setSteps(arrayMove(steps, oldIndex, newIndex));
      }
    }
  };

  const handleRemoveStep = useCallback((id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleConfigureStep = useCallback((step: SolutionStepData) => {
    setConfigStep(step);
  }, []);

  const handleSaveStepConfig = useCallback((updatedStep: SolutionStepData) => {
    setSteps((prev) => prev.map((s) => (s.id === updatedStep.id ? updatedStep : s)));
    setConfigStep(null);
  }, []);

  const handleSave = async () => {
    if (!name || steps.length === 0) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/solutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          indication,
          steps: steps.map((s, index) => ({
            order: index,
            type: s.type,
            name: s.name,
            timing: s.timing,
            sameDay: s.sameDay,
            parameters: s.parameters || {},
            notes: s.notes || "",
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/cabine/solutions/${data.id}`);
      } else {
        console.error("Failed to save solution");
      }
    } catch (error) {
      console.error("Error saving solution:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log("Export PDF");
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        {/* Library - Left column */}
        <div className="lg:col-span-3 overflow-y-auto">
          <Card className="h-full">
            <CardContent className="p-4">
              <StepLibrary
                expandedCategory={expandedCategory}
                onToggleCategory={(id) =>
                  setExpandedCategory(expandedCategory === id ? null : id)
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Drop zone - Center column */}
        <div className="lg:col-span-6 overflow-y-auto">
          <StepDropZone
            steps={steps}
            onRemoveStep={handleRemoveStep}
            onConfigureStep={handleConfigureStep}
          />
        </div>

        {/* Preview - Right column */}
        <div className="lg:col-span-3 overflow-y-auto">
          <SolutionPreview
            name={name}
            onNameChange={setName}
            indication={indication}
            onIndicationChange={setIndication}
            steps={steps}
            onSave={handleSave}
            onExportPDF={handleExportPDF}
            isSaving={isSaving}
          />
        </div>
      </div>

      {/* Config Modal */}
      <StepConfigModal
        step={configStep}
        onClose={() => setConfigStep(null)}
        onSave={handleSaveStepConfig}
      />

      {/* Drag overlay */}
      <DragOverlay>
        {activeId && (
          <Card className="shadow-lg opacity-90">
            <CardContent className="p-3">
              <p className="font-medium text-sm">Déplacement...</p>
            </CardContent>
          </Card>
        )}
      </DragOverlay>
    </DndContext>
  );
}
