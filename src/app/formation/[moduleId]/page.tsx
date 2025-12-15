"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import {
  ArrowLeft, Play, CheckCircle, Clock, Award, BookOpen,
  Loader2, FileText, Video, HelpCircle, Lightbulb
} from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  type: string;
  duration: number;
  xpReward: number;
  order: number;
  completed?: boolean;
}

interface ModuleDetail {
  id: string;
  title: string;
  description: string;
  color: string;
  duration: number;
  xpReward: number;
  level: string;
  lessons: Lesson[];
  progress?: {
    completed: boolean;
    lessonsViewed: string;
  };
}

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  INTRO: Lightbulb,
  THEORY: FileText,
  EXERCISE: BookOpen,
  QUIZ: HelpCircle,
  VIDEO: Video,
  SUMMARY: CheckCircle,
};

const TYPE_LABELS: Record<string, string> = {
  INTRO: "Introduction",
  THEORY: "Théorie",
  EXERCISE: "Exercice",
  QUIZ: "Quiz",
  VIDEO: "Vidéo",
  SUMMARY: "Résumé",
};

export default function ModuleDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<ModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchModule() {
      try {
        const res = await fetch(`/api/formation/modules/${moduleId}`);
        if (res.ok) {
          const data = await res.json();
          setModule(data);
        }
      } catch (error) {
        console.error("Erreur chargement module:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated" && moduleId) {
      fetchModule();
    }
  }, [status, moduleId]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 pb-20 p-4">
          <p className="text-center text-gray-500">Module non trouvé</p>
          <Link href="/formation">
            <Button className="mt-4 mx-auto block">Retour aux modules</Button>
          </Link>
        </div>
        <BottomNavigation userRole="ASSISTANT" />
      </div>
    );
  }

  const completedLessons = module.lessons.filter(l => l.completed).length;
  const progress = Math.round((completedLessons / module.lessons.length) * 100);
  const nextLesson = module.lessons.find(l => !l.completed);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-sm text-gray-600">{module.description}</p>
            </div>
          </div>

          {/* Progression */}
          <Card style={{ borderLeftColor: module.color, borderLeftWidth: 4 }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-600 text-sm">Progression</p>
                  <p className="text-2xl font-bold" style={{ color: module.color }}>
                    {progress}%
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold">{module.xpReward} XP</span>
                  </div>
                  <p className="text-sm text-gray-500">à débloquer</p>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">
                {completedLessons} / {module.lessons.length} leçons complétées
              </p>
            </CardContent>
          </Card>

          {/* Bouton continuer */}
          {nextLesson && (
            <Link href={`/formation/${moduleId}/${nextLesson.id}`}>
              <Button
                className="w-full"
                style={{ backgroundColor: module.color }}
              >
                <Play className="h-4 w-4 mr-2" />
                {completedLessons === 0 ? "Commencer" : "Continuer"} : {nextLesson.title}
              </Button>
            </Link>
          )}

          {/* Liste des leçons */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Contenu du module</h2>
            <Card>
              <CardContent className="p-0">
                {module.lessons.map((lesson, index) => {
                  const IconComponent = TYPE_ICONS[lesson.type] || FileText;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/formation/${moduleId}/${lesson.id}`}
                    >
                      <div
                        className={`flex items-center gap-4 p-4 ${
                          index < module.lessons.length - 1 ? "border-b" : ""
                        } hover:bg-gray-50 transition-colors`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            lesson.completed
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <span className="font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-sm">{lesson.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {TYPE_LABELS[lesson.type] || lesson.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {lesson.duration} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="h-3 w-3" /> {lesson.xpReward} XP
                            </span>
                          </div>
                        </div>
                        <IconComponent className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <BottomNavigation userRole={session?.user?.role as string || "ASSISTANT"} />
    </div>
  );
}
