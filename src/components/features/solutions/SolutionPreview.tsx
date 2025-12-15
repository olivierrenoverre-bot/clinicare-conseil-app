"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, FileDown, Share2, Zap, Sparkles, Home, Palette } from "lucide-react";
import { SolutionStepData } from "./StepCard";

interface SolutionPreviewProps {
  name: string;
  onNameChange: (name: string) => void;
  indication: string;
  onIndicationChange: (indication: string) => void;
  steps: SolutionStepData[];
  onSave: () => void;
  onExportPDF: () => void;
  isSaving?: boolean;
}

function getStepIcon(type: string) {
  if (type.startsWith("LASER")) return Zap;
  if (type.startsWith("PEELING")) return Palette;
  if (type.startsWith("CABINE")) return Sparkles;
  if (type.startsWith("DOMICILE")) return Home;
  return Sparkles;
}

function getStepColor(type: string): string {
  if (type.startsWith("LASER")) return "#8B0000";
  if (type.startsWith("PEELING")) return "#2E8B57";
  if (type.startsWith("CABINE")) return "#4169E1";
  if (type.startsWith("DOMICILE")) return "#9932CC";
  return "#6B7280";
}

export function SolutionPreview({
  name,
  onNameChange,
  indication,
  onIndicationChange,
  steps,
  onSave,
  onExportPDF,
  isSaving,
}: SolutionPreviewProps) {
  // Count unique step types
  const laserCount = steps.filter((s) => s.type.startsWith("LASER")).length;
  const peelingCount = steps.filter((s) => s.type.startsWith("PEELING")).length;
  const cabineCount = steps.filter((s) => s.type.startsWith("CABINE")).length;
  const domicileCount = steps.filter((s) => s.type.startsWith("DOMICILE")).length;

  // Calculate duration based on timing
  const timings = steps.map((s) => s.timing);
  const maxTiming = timings.reduce((max, t) => {
    if (t === "Quotidien") return max;
    const num = parseInt(t.replace("J", "").replace("+", "")) || 0;
    return Math.max(max, num);
  }, 0);

  const durationWeeks = Math.ceil(maxTiming / 7) || 1;
  const hasDomicile = domicileCount > 0;

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-sm text-gray-700">Aperçu du protocole</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Name input */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">Nom du protocole</label>
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Mon protocole personnalisé"
              className="font-medium"
            />
          </div>

          {/* Indication input */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">Indication</label>
            <Input
              value={indication}
              onChange={(e) => onIndicationChange(e.target.value)}
              placeholder="Ex: Mélasma, Rides profondes..."
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 py-2">
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-gray-900">{steps.length}</p>
              <p className="text-xs text-gray-500">soins</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-gray-900">
                {durationWeeks}
                {hasDomicile ? "+" : ""}
              </p>
              <p className="text-xs text-gray-500">semaines</p>
            </div>
          </div>

          {/* Step type badges */}
          <div className="flex flex-wrap gap-2">
            {laserCount > 0 && (
              <Badge style={{ backgroundColor: "#8B0000" }} className="text-white">
                <Zap className="h-3 w-3 mr-1" />
                {laserCount} Laser
              </Badge>
            )}
            {peelingCount > 0 && (
              <Badge style={{ backgroundColor: "#2E8B57" }} className="text-white">
                <Palette className="h-3 w-3 mr-1" />
                {peelingCount} Peeling
              </Badge>
            )}
            {cabineCount > 0 && (
              <Badge style={{ backgroundColor: "#4169E1" }} className="text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                {cabineCount} Cabine
              </Badge>
            )}
            {domicileCount > 0 && (
              <Badge style={{ backgroundColor: "#9932CC" }} className="text-white">
                <Home className="h-3 w-3 mr-1" />
                {domicileCount} Domicile
              </Badge>
            )}
          </div>

          {/* Timeline preview */}
          {steps.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-gray-500 block">Timeline</label>
              <div className="flex flex-col gap-1">
                {steps.slice(0, 5).map((step, i) => {
                  const Icon = getStepIcon(step.type);
                  const color = getStepColor(step.type);
                  return (
                    <div key={step.id} className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="w-12 justify-center">
                        {step.timing}
                      </Badge>
                      <Icon className="h-3 w-3" style={{ color }} />
                      <span className="truncate">{step.name}</span>
                    </div>
                  );
                })}
                {steps.length > 5 && (
                  <p className="text-xs text-gray-400 pl-14">
                    + {steps.length - 5} autres soins...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <Button
              className="w-full"
              onClick={onSave}
              disabled={!name || steps.length === 0 || isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={onExportPDF} disabled={steps.length === 0}>
                <FileDown className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" disabled={steps.length === 0}>
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
