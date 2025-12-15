"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SolutionStepData } from "./StepCard";

const TIMING_OPTIONS = ["J0", "J+7", "J+14", "J+21", "J+28", "Quotidien"];

interface StepConfigModalProps {
  step: SolutionStepData | null;
  onClose: () => void;
  onSave: (step: SolutionStepData) => void;
}

export function StepConfigModal({ step, onClose, onSave }: StepConfigModalProps) {
  const [timing, setTiming] = useState("J0");
  const [sameDay, setSameDay] = useState(false);
  const [notes, setNotes] = useState("");
  const [parameters, setParameters] = useState<Record<string, string>>({});

  useEffect(() => {
    if (step) {
      setTiming(step.timing);
      setSameDay(step.sameDay);
      setNotes(step.notes || "");
      setParameters((step.parameters as Record<string, string>) || {});
    }
  }, [step]);

  if (!step) return null;

  const isLaser = step.type.startsWith("LASER");
  const isPeeling = step.type.startsWith("PEELING");

  const handleSave = () => {
    onSave({
      ...step,
      timing,
      sameDay,
      notes,
      parameters,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Configuration : {step.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Timing */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Timing</Label>
            <div className="flex flex-wrap gap-2">
              {TIMING_OPTIONS.map((t) => (
                <Badge
                  key={t}
                  variant={timing === t ? "default" : "outline"}
                  className={`cursor-pointer ${timing === t ? "bg-blue-600" : ""}`}
                  onClick={() => setTiming(t)}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Same day option */}
          {timing !== "Quotidien" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sameDay"
                checked={sameDay}
                onChange={(e) => setSameDay(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="sameDay" className="text-sm cursor-pointer">
                Même séance que l&apos;étape précédente
              </Label>
            </div>
          )}

          {/* Laser parameters */}
          {isLaser && (
            <div className="space-y-4 p-3 bg-red-50 rounded-lg">
              <h3 className="text-sm font-medium text-red-800">Paramètres laser</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Énergie (mJ)</Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={parameters.energie || ""}
                    onChange={(e) => setParameters({ ...parameters, energie: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Couverture (%)</Label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={parameters.couverture || ""}
                    onChange={(e) => setParameters({ ...parameters, couverture: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Spot (mm)</Label>
                  <Input
                    type="number"
                    placeholder="7"
                    value={parameters.spot || ""}
                    onChange={(e) => setParameters({ ...parameters, spot: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Passages</Label>
                  <Input
                    type="number"
                    placeholder="2"
                    value={parameters.passages || ""}
                    onChange={(e) => setParameters({ ...parameters, passages: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Peeling parameters */}
          {isPeeling && (
            <div className="space-y-4 p-3 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">Paramètres peeling</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Temps de pose (min)</Label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={parameters.tempsPose || ""}
                    onChange={(e) => setParameters({ ...parameters, tempsPose: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Couches</Label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={parameters.couches || ""}
                    onChange={(e) => setParameters({ ...parameters, couches: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Notes personnelles</Label>
            <Textarea
              placeholder="Ajoutez des notes pour ce soin..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Valider</Button>
        </div>
      </div>
    </div>
  );
}
