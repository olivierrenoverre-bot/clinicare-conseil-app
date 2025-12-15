"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { BookOpen, Play, CheckCircle, Lock, Clock, Award } from "lucide-react";
import Link from "next/link";

const MODULES = [
  {
    id: 1,
    title: "Introduction CLINICARE",
    description: "Decouvrez la marque et sa philosophie",
    lessons: 4,
    duration: 30,
    progress: 100,
    completed: true,
    xp: 100,
  },
  {
    id: 2,
    title: "Gamme REFRESH",
    description: "Anti-age et rides - Produits et protocoles",
    lessons: 6,
    duration: 45,
    progress: 65,
    completed: false,
    xp: 150,
  },
  {
    id: 3,
    title: "Gamme GLOW",
    description: "Eclat et anti-taches",
    lessons: 5,
    duration: 40,
    progress: 0,
    completed: false,
    locked: false,
    xp: 150,
  },
  {
    id: 4,
    title: "Gamme PURE",
    description: "Peaux sensibles et reactives",
    lessons: 5,
    duration: 35,
    progress: 0,
    completed: false,
    locked: true,
    xp: 150,
  },
  {
    id: 5,
    title: "Gamme TIGHT",
    description: "Fermete et lifting",
    lessons: 5,
    duration: 40,
    progress: 0,
    completed: false,
    locked: true,
    xp: 150,
  },
  {
    id: 6,
    title: "Protocoles Laser",
    description: "RESOLVE, FRAX et ZOOM",
    lessons: 8,
    duration: 60,
    progress: 0,
    completed: false,
    locked: true,
    xp: 200,
  },
];

export default function FormationPage() {
  const totalProgress = Math.round(
    MODULES.reduce((acc, m) => acc + m.progress, 0) / MODULES.length
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          <div className="pt-2">
            <h1 className="text-2xl font-bold text-gray-900">Formation</h1>
            <p className="text-gray-600">Developpez vos competences CLINICARE</p>
          </div>

          {/* Progression globale */}
          <Card className="bg-gradient-to-br from-[#1B4F72] to-[#2980B9] text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-white/80 text-sm">Progression globale</p>
                  <p className="text-2xl font-bold">{totalProgress}%</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-yellow-300" />
                  <span className="font-bold">250 XP</span>
                </div>
              </div>
              <Progress value={totalProgress} className="h-2 bg-white/20" />
              <p className="text-sm text-white/80 mt-2">
                {MODULES.filter(m => m.completed).length} / {MODULES.length} modules completes
              </p>
            </CardContent>
          </Card>

          {/* Liste des modules */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Modules de formation</h2>
            <div className="space-y-3">
              {MODULES.map((module) => (
                <Card
                  key={module.id}
                  className={`transition-shadow ${module.locked ? "opacity-60" : "hover:shadow-md cursor-pointer"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        module.completed ? "bg-green-500" :
                        module.locked ? "bg-gray-300" :
                        module.progress > 0 ? "bg-[#1B4F72]" : "bg-gray-400"
                      }`}>
                        {module.completed ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : module.locked ? (
                          <Lock className="h-6 w-6 text-white" />
                        ) : (
                          <BookOpen className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{module.title}</h3>
                          {module.completed && (
                            <Badge className="bg-green-500 text-white text-xs">Complete</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" /> {module.lessons} lecons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {module.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" /> {module.xp} XP
                          </span>
                        </div>
                        {!module.locked && !module.completed && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                      {!module.locked && (
                        <Link href={`/formation/${module.id}`}>
                          <Button
                            size="sm"
                            variant={module.completed ? "outline" : "default"}
                          >
                            {module.completed ? "Revoir" : module.progress > 0 ? "Continuer" : "Commencer"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
