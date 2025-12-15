"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sparkles, Home, Palette } from "lucide-react";
import { StepType } from "@prisma/client";

// Library items definition
export const LIBRARY_CATEGORIES = [
  {
    id: "laser",
    name: "Laser",
    icon: Zap,
    color: "#8B0000",
    items: [
      { type: "LASER_RESOLVE" as StepType, name: "RESOLVE", description: "Fractionné non-ablatif 1540nm" },
      { type: "LASER_FRAX" as StepType, name: "FRAX", description: "Fractionné ablatif CO2" },
      { type: "LASER_ZOOM" as StepType, name: "ZOOM", description: "Q-Switched pigmentaire" },
    ],
  },
  {
    id: "peeling",
    name: "Peelings",
    icon: Palette,
    color: "#2E8B57",
    items: [
      { type: "PEELING_REFRESH" as StepType, name: "Peeling REFRESH", description: "Anti-âge intensif" },
      { type: "PEELING_GLOW" as StepType, name: "Peeling GLOW", description: "Éclaircissant anti-taches" },
      { type: "PEELING_PURE" as StepType, name: "Peeling PURE", description: "Purifiant anti-acné" },
    ],
  },
  {
    id: "cabine",
    name: "Cabine",
    icon: Sparkles,
    color: "#4169E1",
    items: [
      { type: "CABINE_REFRESH" as StepType, name: "Protocole REFRESH", description: "Soin anti-âge cabine" },
      { type: "CABINE_GLOW" as StepType, name: "Protocole GLOW", description: "Soin éclat cabine" },
      { type: "CABINE_PURE" as StepType, name: "Protocole PURE", description: "Soin purifiant cabine" },
      { type: "CABINE_TIGHT" as StepType, name: "Protocole TIGHT", description: "Soin fermeté cabine" },
    ],
  },
  {
    id: "domicile",
    name: "Domicile",
    icon: Home,
    color: "#9932CC",
    items: [
      { type: "DOMICILE_REFRESH" as StepType, name: "Routine REFRESH", description: "Routine anti-âge quotidienne" },
      { type: "DOMICILE_GLOW" as StepType, name: "Routine GLOW", description: "Routine éclat quotidienne" },
      { type: "DOMICILE_PURE" as StepType, name: "Routine PURE", description: "Routine purifiante quotidienne" },
      { type: "DOMICILE_TIGHT" as StepType, name: "Routine TIGHT", description: "Routine fermeté quotidienne" },
    ],
  },
];

interface DraggableItemProps {
  type: StepType;
  name: string;
  description: string;
  color: string;
}

function DraggableItem({ type, name, description, color }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: type,
    data: { type, name, description },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: color }}>
        <CardContent className="p-3">
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

interface StepLibraryProps {
  expandedCategory: string | null;
  onToggleCategory: (categoryId: string) => void;
}

export function StepLibrary({ expandedCategory, onToggleCategory }: StepLibraryProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-sm text-gray-700 mb-3">Bibliothèque de soins</h2>
      {LIBRARY_CATEGORIES.map((category) => (
        <div key={category.id}>
          <button
            onClick={() => onToggleCategory(category.id)}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <category.icon className="h-4 w-4" style={{ color: category.color }} />
            </div>
            <span className="font-medium text-sm" style={{ color: category.color }}>
              {category.name}
            </span>
            <Badge variant="outline" className="ml-auto text-xs">
              {category.items.length}
            </Badge>
          </button>
          {expandedCategory === category.id && (
            <div className="pl-4 mt-2 space-y-2">
              {category.items.map((item) => (
                <DraggableItem
                  key={item.type}
                  type={item.type}
                  name={item.name}
                  description={item.description}
                  color={category.color}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
