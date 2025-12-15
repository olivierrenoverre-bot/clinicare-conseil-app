"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import {
  ArrowLeft,
  FileDown,
  Share2,
  Star,
  StarOff,
  Edit,
  Trash2,
  Zap,
  Sparkles,
  Home,
  Palette,
} from "lucide-react";

interface SolutionStep {
  id: string;
  order: number;
  type: string;
  name: string;
  timing: string;
  sameDay: boolean;
  parameters: Record<string, unknown> | null;
  notes: string | null;
}

interface Solution {
  id: string;
  name: string;
  description: string | null;
  indication: string | null;
  isTemplate: boolean;
  isPublic: boolean;
  isFavorite: boolean;
  steps: SolutionStep[];
  createdAt: string;
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

export default function SolutionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolution();
  }, [id]);

  const fetchSolution = async () => {
    try {
      const response = await fetch(`/api/solutions/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSolution(data);
      } else {
        router.push("/cabine/solutions");
      }
    } catch (error) {
      console.error("Error fetching solution:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!solution) return;
    try {
      await fetch(`/api/solutions/${id}/favorite`, {
        method: solution.isFavorite ? "DELETE" : "POST",
      });
      setSolution({ ...solution, isFavorite: !solution.isFavorite });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce protocole ?")) return;

    try {
      await fetch(`/api/solutions/${id}`, { method: "DELETE" });
      router.push("/cabine/solutions");
    } catch (error) {
      console.error("Error deleting solution:", error);
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log("Export PDF");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Chargement...</p>
        </div>
        <BottomNavigation userRole="ASSISTANT" />
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Solution non trouvée</p>
        </div>
        <BottomNavigation userRole="ASSISTANT" />
      </div>
    );
  }

  // Group steps by timing
  const groupedByTiming = solution.steps.reduce((acc, step) => {
    const key = step.timing;
    if (!acc[key]) acc[key] = [];
    acc[key].push(step);
    return acc;
  }, {} as Record<string, SolutionStep[]>);

  const timingOrder = ["J0", "J+7", "J+14", "J+21", "J+28", "Quotidien"];
  const sortedTimings = Object.keys(groupedByTiming).sort(
    (a, b) => timingOrder.indexOf(a) - timingOrder.indexOf(b)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/cabine/solutions")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 truncate">{solution.name}</h1>
                {solution.isTemplate && (
                  <Badge variant="outline">Template</Badge>
                )}
              </div>
              {solution.indication && (
                <p className="text-gray-600">{solution.indication}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleFavorite}>
              {solution.isFavorite ? (
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ) : (
                <StarOff className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleExportPDF}>
              <FileDown className="h-4 w-4 mr-2" />
              Exporter PDF
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">{solution.steps.length}</p>
                <p className="text-xs text-gray-500">Étapes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">{sortedTimings.length}</p>
                <p className="text-xs text-gray-500">Sessions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {solution.steps.filter((s) => s.type.startsWith("DOMICILE")).length > 0
                    ? "Oui"
                    : "Non"}
                </p>
                <p className="text-xs text-gray-500">Domicile</p>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Timeline du protocole</h2>
            <div className="space-y-4">
              {sortedTimings.map((timing) => (
                <div key={timing}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={
                        timing === "Quotidien"
                          ? "bg-purple-600 text-white"
                          : "bg-blue-600 text-white"
                      }
                    >
                      {timing === "Quotidien" ? "Domicile - Quotidien" : timing}
                    </Badge>
                    {groupedByTiming[timing].some((s) => s.sameDay) && (
                      <span className="text-xs text-gray-500">
                        (certains soins combinés en même séance)
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 ml-4">
                    {groupedByTiming[timing].map((step) => {
                      const Icon = getStepIcon(step.type);
                      const color = getStepColor(step.type);

                      return (
                        <Card key={step.id} className="border-l-4" style={{ borderLeftColor: color }}>
                          <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${color}20` }}
                              >
                                <Icon className="h-5 w-5" style={{ color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{step.name}</h3>
                                  {step.sameDay && (
                                    <Badge className="text-xs bg-blue-100 text-blue-800">
                                      Même séance
                                    </Badge>
                                  )}
                                </div>
                                {step.notes && (
                                  <p className="text-sm text-gray-500 mt-1">{step.notes}</p>
                                )}
                                {step.parameters && Object.keys(step.parameters).length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {Object.entries(step.parameters).map(([key, value]) => (
                                      <Badge key={key} variant="outline" className="text-xs">
                                        {key}: {String(value)}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Delete button */}
          {!solution.isTemplate && (
            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer ce protocole
              </Button>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
