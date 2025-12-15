"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import {
  Plus,
  Search,
  Star,
  StarOff,
  Zap,
  Sparkles,
  Home,
  Palette,
  ArrowLeft,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SolutionListItem {
  id: string;
  name: string;
  indication: string | null;
  isTemplate: boolean;
  isFavorite: boolean;
  stepCount: number;
  stepTypes: string[];
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

type FilterType = "all" | "mine" | "templates" | "favorites";

export default function SolutionsPage() {
  const router = useRouter();
  const [solutions, setSolutions] = useState<SolutionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const response = await fetch("/api/solutions");
      if (response.ok) {
        const data = await response.json();
        setSolutions(data);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string, currentState: boolean) => {
    try {
      await fetch(`/api/solutions/${id}/favorite`, {
        method: currentState ? "DELETE" : "POST",
      });
      setSolutions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isFavorite: !currentState } : s))
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const filteredSolutions = solutions.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.indication?.toLowerCase().includes(search.toLowerCase());

    switch (filter) {
      case "mine":
        return matchSearch && !s.isTemplate;
      case "templates":
        return matchSearch && s.isTemplate;
      case "favorites":
        return matchSearch && s.isFavorite;
      default:
        return matchSearch;
    }
  });

  // Get unique step type categories for each solution
  const getUniqueCategories = (types: string[]) => {
    const categories = new Set<string>();
    types.forEach((type) => {
      if (type.startsWith("LASER")) categories.add("LASER");
      else if (type.startsWith("PEELING")) categories.add("PEELING");
      else if (type.startsWith("CABINE")) categories.add("CABINE");
      else if (type.startsWith("DOMICILE")) categories.add("DOMICILE");
    });
    return Array.from(categories);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/cabine")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Mes Solutions</h1>
              <p className="text-gray-600">Protocoles personnalisés et templates</p>
            </div>
            <Link href="/cabine/solutions/creer">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une solution..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(["all", "mine", "templates", "favorites"] as FilterType[]).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === "all" && "Tous"}
                {f === "mine" && "Mes créations"}
                {f === "templates" && "Templates"}
                {f === "favorites" && (
                  <>
                    <Star className="h-3 w-3 mr-1" />
                    Favoris
                  </>
                )}
              </Button>
            ))}
          </div>

          {/* Solutions list */}
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : filteredSolutions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Aucune solution trouvée</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {filter === "all"
                    ? "Créez votre premier protocole personnalisé"
                    : "Aucun résultat pour ce filtre"}
                </p>
                <Link href="/cabine/solutions/creer">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un protocole
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredSolutions.map((solution) => {
                const categories = getUniqueCategories(solution.stepTypes);

                return (
                  <Link key={solution.id} href={`/cabine/solutions/${solution.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {solution.name}
                              </h3>
                              {solution.isTemplate && (
                                <Badge variant="outline" className="text-xs">
                                  Template
                                </Badge>
                              )}
                            </div>
                            {solution.indication && (
                              <p className="text-sm text-gray-500 mt-1">{solution.indication}</p>
                            )}

                            <div className="flex items-center gap-2 mt-2">
                              {categories.map((cat) => {
                                const Icon = getStepIcon(cat);
                                const color = getStepColor(cat);
                                return (
                                  <div
                                    key={cat}
                                    className="w-6 h-6 rounded flex items-center justify-center"
                                    style={{ backgroundColor: `${color}20` }}
                                  >
                                    <Icon className="h-3 w-3" style={{ color }} />
                                  </div>
                                );
                              })}
                              <span className="text-xs text-gray-400">
                                {solution.stepCount} étapes
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(solution.id, solution.isFavorite);
                            }}
                          >
                            {solution.isFavorite ? (
                              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
