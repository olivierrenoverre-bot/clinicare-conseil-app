"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import {
  BookOpen, Play, CheckCircle, Lock, Clock, Award,
  GraduationCap, Sparkles, Loader2, ChevronRight
} from "lucide-react";
import Link from "next/link";

interface Module {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  color: string;
  icon: string;
  xpReward: number;
  order: number;
  isActive: boolean;
  _count: {
    lessons: number;
  };
  progress?: {
    completed: boolean;
    lessonsViewed: string;
  };
}

interface UserStats {
  xpPoints: number;
  level: number;
  streak: number;
}

const LEVEL_NAMES: Record<number, string> = {
  1: "Stagiaire",
  2: "Apprentie",
  3: "Praticienne",
  4: "Experte",
  5: "Ambassadrice",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  GraduationCap,
  Sparkles,
};

export default function FormationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [modulesRes, statsRes] = await Promise.all([
          fetch("/api/formation/modules"),
          fetch("/api/formation/stats"),
        ]);

        if (modulesRes.ok) {
          const modulesData = await modulesRes.json();
          setModules(modulesData);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setUserStats(statsData);
        }
      } catch (error) {
        console.error("Erreur chargement données:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  const totalProgress = modules.length > 0
    ? Math.round(modules.filter(m => m.progress?.completed).length / modules.length * 100)
    : 0;

  const getModuleProgress = (module: Module) => {
    if (!module.progress) return 0;
    try {
      const viewed = JSON.parse(module.progress.lessonsViewed || "[]");
      return Math.round((viewed.length / module._count.lessons) * 100);
    } catch {
      return 0;
    }
  };

  const getIconComponent = (iconName: string) => {
    return ICON_MAP[iconName] || BookOpen;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          <div className="pt-2">
            <h1 className="text-2xl font-bold text-gray-900">Formation</h1>
            <p className="text-gray-600">Développez vos compétences CLINICARE</p>
          </div>

          {/* Progression globale et XP */}
          <Card className="bg-gradient-to-br from-[#1B4F72] to-[#2980B9] text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-white/80 text-sm">Progression globale</p>
                  <p className="text-2xl font-bold">{totalProgress}%</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-300" />
                    <span className="font-bold">{userStats?.xpPoints || 0} XP</span>
                  </div>
                  <p className="text-sm text-white/80">
                    Niveau {userStats?.level || 1} - {LEVEL_NAMES[userStats?.level || 1]}
                  </p>
                </div>
              </div>
              <Progress value={totalProgress} className="h-2 bg-white/20" />
              <div className="flex items-center justify-between mt-2 text-sm text-white/80">
                <span>
                  {modules.filter(m => m.progress?.completed).length} / {modules.length} modules complétés
                </span>
                {userStats?.streak && userStats.streak > 0 && (
                  <span className="flex items-center gap-1">
                    🔥 {userStats.streak} jours
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Liste des modules */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Modules de formation</h2>
            <div className="space-y-3">
              {modules.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Aucun module disponible pour le moment.</p>
                    <p className="text-sm mt-1">Les modules de formation arrivent bientôt !</p>
                  </CardContent>
                </Card>
              ) : (
                modules.map((module, index) => {
                  const IconComponent = getIconComponent(module.icon);
                  const progress = getModuleProgress(module);
                  const isLocked = index > 0 && !modules[index - 1].progress?.completed;
                  const isCompleted = module.progress?.completed;

                  return (
                    <Link
                      key={module.id}
                      href={isLocked ? "#" : `/formation/${module.id}`}
                      className={isLocked ? "cursor-not-allowed" : ""}
                    >
                      <Card
                        className={`transition-shadow border-l-4 ${
                          isLocked ? "opacity-60" : "hover:shadow-md cursor-pointer"
                        }`}
                        style={{ borderLeftColor: module.color }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: isCompleted ? "#22c55e" : module.color }}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-6 w-6 text-white" />
                              ) : isLocked ? (
                                <Lock className="h-6 w-6 text-white" />
                              ) : (
                                <IconComponent className="h-6 w-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{module.title}</h3>
                                {isCompleted && (
                                  <Badge className="bg-green-500 text-white text-xs">Complété</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" /> {module._count.lessons} leçons
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {module.duration} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Award className="h-3 w-3" /> {module.xpReward} XP
                                </span>
                              </div>
                              {!isLocked && !isCompleted && progress > 0 && (
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span>{progress}%</span>
                                  </div>
                                  <Progress value={progress} className="h-1" />
                                </div>
                              )}
                            </div>
                            {!isLocked && (
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
      <BottomNavigation userRole={session?.user?.role as string || "ASSISTANT"} />
    </div>
  );
}
