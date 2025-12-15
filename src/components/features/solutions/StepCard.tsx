"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2, Settings, Zap, Sparkles, Home, Palette } from "lucide-react";
import { StepType } from "@prisma/client";

export interface SolutionStepData {
  id: string;
  type: StepType;
  name: string;
  timing: string;
  sameDay: boolean;
  parameters?: Record<string, unknown>;
  notes?: string;
}

function getStepColor(type: StepType): string {
  if (type.startsWith("LASER")) return "#8B0000";
  if (type.startsWith("PEELING")) return "#2E8B57";
  if (type.startsWith("CABINE")) return "#4169E1";
  if (type.startsWith("DOMICILE")) return "#9932CC";
  return "#6B7280";
}

function getStepIcon(type: StepType) {
  if (type.startsWith("LASER")) return Zap;
  if (type.startsWith("PEELING")) return Palette;
  if (type.startsWith("CABINE")) return Sparkles;
  if (type.startsWith("DOMICILE")) return Home;
  return Sparkles;
}

interface StepCardProps {
  step: SolutionStepData;
  index: number;
  onRemove: (id: string) => void;
  onConfigure: (step: SolutionStepData) => void;
}

export function StepCard({ step, index, onRemove, onConfigure }: StepCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const color = getStepColor(step.type);
  const Icon = getStepIcon(step.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50 z-50" : ""}`}
    >
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>

            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm truncate">{step.name}</p>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {step.timing}
                </Badge>
                {step.sameDay && (
                  <Badge className="text-xs bg-blue-100 text-blue-800">Même séance</Badge>
                )}
              </div>
              {step.notes && (
                <p className="text-xs text-gray-500 mt-1 truncate">{step.notes}</p>
              )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onConfigure(step)}
              >
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-red-600"
                onClick={() => onRemove(step.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
