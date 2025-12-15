"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { ArrowLeft, Play, CheckCircle, Clock, Award, BookOpen } from "lucide-react";
import Link from "next/link";

const MODULES_DATA: Record<string, {
  id: number;
  title: string;
  description: string;
  lessons: { id: number; title: string; duration: number; completed: boolean }[];
  xp: number;
}> = {
  "1": {
    id: 1,
    title: "Introduction CLINICARE",
    description: "Decouvrez la marque et sa philosophie",
    xp: 100,
    lessons: [
      { id: 1, title: "Histoire de CLINICARE", duration: 8, completed: true },
      { id: 2, title: "Les valeurs de la marque", duration: 7, completed: true },
      { id: 3, title: "Les 4 gammes en bref", duration: 10, completed: true },
      { id: 4, title: "Quiz - Introduction", duration: 5, completed: true },
    ],
  },
  "2": {
    id: 2,
    title: "Gamme REFRESH",
    description: "Anti-age et rides - Produits et protocoles",
    xp: 150,
    lessons: [
      { id: 1, title: "Les signes du vieillissement cutane", duration: 10, completed: true },
      { id: 2, title: "Les actifs anti-age REFRESH", duration: 12, completed: true },
      { id: 3, title: "Le Serum Retinol REFRESH", duration: 8, completed: true },
      { id: 4, title: "Protocole cabine REFRESH", duration: 10, completed: false },
      { id: 5, title: "Conseils client personnalises", duration: 5, completed: false },
      { id: 6, title: "Quiz - Gamme REFRESH", duration: 5, completed: false },
    ],
  },
  "3": {
    id: 3,
    title: "Gamme GLOW",
    description: "Eclat et anti-taches",
    xp: 150,
    lessons: [
      { id: 1, title: "Comprendre les taches pigmentaires", duration: 10, completed: false },
      { id: 2, title: "Les actifs eclaircissants GLOW", duration: 12, completed: false },
      { id: 3, title: "L'Essence Vitaminee GLOW", duration: 8, completed: false },
      { id: 4, title: "Protocole cabine GLOW", duration: 10, completed: false },
      { id: 5, title: "Quiz - Gamme GLOW", duration: 5, completed: false },
    ],
  },
  "4": {
    id: 4,
    title: "Gamme PURE",
    description: "Peaux sensibles et reactives",
    xp: 150,
    lessons: [
      { id: 1, title: "Identifier les peaux sensibles", duration: 8, completed: false },
      { id: 2, title: "Les actifs apaisants PURE", duration: 10, completed: false },
      { id: 3, title: "Le Cleansing Gel PURE", duration: 7, completed: false },
      { id: 4, title: "Protocole cabine PURE", duration: 10, completed: false },
      { id: 5, title: "Quiz - Gamme PURE", duration: 5, completed: false },
    ],
  },
  "5": {
    id: 5,
    title: "Gamme TIGHT",
    description: "Fermete et lifting",
    xp: 150,
    lessons: [
      { id: 1, title: "La perte de fermete cutanee", duration: 10, completed: false },
      { id: 2, title: "Les actifs liftants TIGHT", duration: 12, completed: false },
      { id: 3, title: "La Creme Lift TIGHT", duration: 8, completed: false },
      { id: 4, title: "Protocole cabine TIGHT", duration: 10, completed: false },
      { id: 5, title: "Quiz - Gamme TIGHT", duration: 5, completed: false },
    ],
  },
  "6": {
    id: 6,
    title: "Protocoles Laser",
    description: "RESOLVE, FRAX et ZOOM",
    xp: 200,
    lessons: [
      { id: 1, title: "Introduction aux technologies laser", duration: 10, completed: false },
      { id: 2, title: "Le protocole RESOLVE", duration: 12, completed: false },
      { id: 3, title: "Le protocole FRAX", duration: 12, completed: false },
      { id: 4, title: "Le protocole ZOOM", duration: 10, completed: false },
      { id: 5, title: "Securite et contre-indications", duration: 8, completed: false },
      { id: 6, title: "Conseils post-traitement", duration: 5, completed: false },
      { id: 7, title: "Cas pratiques", duration: 8, completed: false },
      { id: 8, title: "Quiz - Protocoles Laser", duration: 5, completed: false },
    ],
  },
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  const module = MODULES_DATA[moduleId];

  if (!module) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 pb-20 p-4">
          <p>Module non trouve</p>
          <Link href="/formation">
            <Button className="mt-4">Retour aux modules</Button>
          </Link>
        </div>
        <BottomNavigation userRole="ASSISTANT" />
      </div>
    );
  }

  const completedLessons = module.lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedLessons / module.lessons.length) * 100);
  const totalDuration = module.lessons.reduce((acc, l) => acc + l.duration, 0);
  const nextLesson = module.lessons.find((l) => !l.completed);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header avec retour */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-sm text-gray-600">{module.description}</p>
            </div>
          </div>

          {/* Carte progression */}
          <Card className="bg-gradient-to-br from-[#1B4F72] to-[#2980B9] text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-white/80 text-sm">Progression</p>
                  <p className="text-2xl font-bold">{progress}%</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-300" />
                  <span className="font-bold">{module.xp} XP</span>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
              <div className="flex items-center justify-between mt-2 text-sm text-white/80">
                <span>{completedLessons} / {module.lessons.length} lecons</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {totalDuration} min
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Bouton continuer */}
          {nextLesson && (
            <Link href={`/formation/${moduleId}/lecon/${nextLesson.id}`}>
              <Button className="w-full bg-[#1B4F72] hover:bg-[#1B4F72]/90">
                <Play className="h-4 w-4 mr-2" />
                Continuer : {nextLesson.title}
              </Button>
            </Link>
          )}

          {/* Liste des lecons */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Contenu du module</h2>
            <Card>
              <CardContent className="p-0">
                {module.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/formation/${moduleId}/lecon/${lesson.id}`}
                    className="block"
                  >
                    <div
                      className={`flex items-center gap-4 p-4 ${
                        index < module.lessons.length - 1 ? "border-b" : ""
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{lesson.title}</h3>
                        <p className="text-xs text-gray-500">{lesson.duration} min</p>
                      </div>
                      {lesson.completed ? (
                        <Badge className="bg-green-100 text-green-700">Termine</Badge>
                      ) : (
                        <Play className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
