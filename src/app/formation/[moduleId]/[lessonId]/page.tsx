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
  ArrowLeft, ArrowRight, CheckCircle, Clock, Award,
  Loader2, X, Lightbulb, BookOpen, List, Quote, AlertTriangle, Target
} from "lucide-react";

interface Slide {
  type: string;
  title?: string;
  content?: string;
  items?: Array<{ icon?: string; text?: string; label?: string; value?: string; name?: string; benefit?: string }>;
  highlight?: boolean;
  style?: string;
  data?: Array<{ label: string; value: string }>;
  columns?: string[];
  left?: { title: string; items: string[] };
  right?: { title: string; items: string[]; highlight?: boolean };
}

interface LessonContent {
  slides: Slide[];
}

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  content: LessonContent;
  type: string;
  duration: number;
  xpReward: number;
  order: number;
  module: {
    id: string;
    title: string;
    color: string;
  };
}

export default function LessonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await fetch(`/api/formation/lessons/${lessonId}`);
        if (res.ok) {
          const data = await res.json();
          setLesson(data);
        }
      } catch (error) {
        console.error("Erreur chargement leçon:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated" && lessonId) {
      fetchLesson();
    }
  }, [status, lessonId]);

  const handleComplete = async () => {
    setCompleting(true);
    try {
      const res = await fetch(`/api/formation/lessons/${lessonId}/complete`, {
        method: "POST",
      });

      if (res.ok) {
        router.push(`/formation/${moduleId}`);
      }
    } catch (error) {
      console.error("Erreur completion:", error);
    } finally {
      setCompleting(false);
    }
  };

  const handleNext = () => {
    if (lesson && currentSlide < lesson.content.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 pb-20 p-4">
          <p className="text-center text-gray-500">Leçon non trouvée</p>
          <Button className="mt-4 mx-auto block" onClick={() => router.back()}>
            Retour
          </Button>
        </div>
        <BottomNavigation userRole="ASSISTANT" />
      </div>
    );
  }

  const slides = lesson.content?.slides || [];
  const totalSlides = slides.length;
  const progress = totalSlides > 0 ? Math.round(((currentSlide + 1) / totalSlides) * 100) : 100;
  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        {/* Header fixe */}
        <div
          className="sticky top-0 z-10 p-4 border-b"
          style={{ backgroundColor: lesson.module.color }}
        >
          <div className="flex items-center justify-between text-white mb-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => router.push(`/formation/${moduleId}`)}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <p className="text-sm text-white/80">{lesson.module.title}</p>
              <h1 className="font-semibold">{lesson.title}</h1>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              {lesson.duration} min
            </div>
          </div>
          <Progress value={progress} className="h-1 bg-white/30" />
          <p className="text-xs text-white/80 text-center mt-1">
            {currentSlide + 1} / {totalSlides}
          </p>
        </div>

        {/* Contenu du slide */}
        <div className="p-4">
          {currentSlideData ? (
            <SlideRenderer slide={currentSlideData} color={lesson.module.color} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Leçon terminée !</h2>
                <p className="text-gray-600">
                  Vous avez gagné {lesson.xpReward} XP
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handlePrev}
              disabled={currentSlide === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>
            {isLastSlide ? (
              <Button
                className="flex-1"
                style={{ backgroundColor: lesson.module.color }}
                onClick={handleComplete}
                disabled={completing}
              >
                {completing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Terminer (+{lesson.xpReward} XP)
              </Button>
            ) : (
              <Button
                className="flex-1"
                style={{ backgroundColor: lesson.module.color }}
                onClick={handleNext}
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <BottomNavigation userRole={session?.user?.role as string || "ASSISTANT"} />
    </div>
  );
}

// Composant pour rendre les différents types de slides
function SlideRenderer({ slide, color }: { slide: Slide; color: string }) {
  switch (slide.type) {
    case "hero":
      return (
        <Card className="border-0 overflow-hidden">
          <div
            className="p-8 text-center text-white"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
            {slide.content && (
              <p className="text-white/90">{slide.content}</p>
            )}
          </div>
        </Card>
      );

    case "text":
      return (
        <Card className={slide.highlight ? "border-l-4" : ""} style={slide.highlight ? { borderLeftColor: color } : {}}>
          <CardContent className="pt-6">
            {slide.title && (
              <h3 className="font-semibold text-lg mb-3">{slide.title}</h3>
            )}
            <p className={`text-gray-700 leading-relaxed ${slide.style === "quote" ? "italic border-l-4 pl-4" : ""}`}>
              {slide.content}
            </p>
          </CardContent>
        </Card>
      );

    case "question":
      return (
        <Card className="border-l-4" style={{ borderLeftColor: color }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 flex-shrink-0" style={{ color }} />
              <div>
                <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
                <p className="text-gray-700">{slide.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "objectives":
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5" style={{ color }} />
              <h3 className="font-semibold text-lg">{slide.title}</h3>
            </div>
            <ul className="space-y-3">
              {slide.items?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{typeof item === "string" ? item : item.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );

    case "list":
      return (
        <Card>
          <CardContent className="pt-6">
            {slide.title && (
              <h3 className="font-semibold text-lg mb-4">{slide.title}</h3>
            )}
            <ul className="space-y-3">
              {slide.items?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon || "•"}</span>
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );

    case "table":
      return (
        <Card>
          <CardContent className="pt-6">
            {slide.title && (
              <h3 className="font-semibold text-lg mb-4">{slide.title}</h3>
            )}
            <div className="space-y-2">
              {slide.data?.map((row, i) => (
                <div key={i} className="flex justify-between py-2 border-b last:border-0">
                  <span className="text-gray-600">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );

    case "comparison":
      return (
        <Card>
          <CardContent className="pt-6">
            {slide.title && (
              <h3 className="font-semibold text-lg mb-4 text-center">{slide.title}</h3>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <h4 className="font-medium text-center mb-3">{slide.left?.title}</h4>
                <ul className="space-y-2 text-sm">
                  {slide.left?.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="p-3 rounded-lg text-white"
                style={{ backgroundColor: slide.right?.highlight ? color : "#6b7280" }}
              >
                <h4 className="font-medium text-center mb-3">{slide.right?.title}</h4>
                <ul className="space-y-2 text-sm">
                  {slide.right?.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "keypoint":
      return (
        <Card className="border-2" style={{ borderColor: color }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: color + "20" }}
              >
                {slide.icon || "💡"}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
                <p className="text-gray-700">{slide.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "definition":
      return (
        <Card>
          <CardContent className="pt-6">
            <Badge style={{ backgroundColor: color }} className="text-white mb-3">
              Définition
            </Badge>
            <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
            <p className="text-gray-700">{slide.content}</p>
          </CardContent>
        </Card>
      );

    case "argument":
      return (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="h-5 w-5" style={{ color }} />
              <span className="text-sm font-medium" style={{ color }}>
                Argument de vente
              </span>
            </div>
            <p className="text-lg italic text-gray-800">« {slide.content} »</p>
          </CardContent>
        </Card>
      );

    case "fact":
      return (
        <Card className="border-l-4 border-yellow-400 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{slide.icon || "📌"}</span>
              <div>
                <h4 className="font-medium mb-1">{slide.title}</h4>
                <p className="text-gray-700">{slide.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "warning":
      return (
        <Card className="border-l-4 border-orange-400 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 mb-2">{slide.title}</h4>
                <p className="text-orange-700">{slide.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "grid":
      return (
        <Card>
          <CardContent className="pt-6">
            {slide.title && (
              <h3 className="font-semibold text-lg mb-4">{slide.title}</h3>
            )}
            <div className="grid grid-cols-2 gap-3">
              {slide.items?.map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl mb-1 block">{item.icon}</span>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card>
          <CardContent className="pt-6">
            {slide.title && (
              <h3 className="font-semibold text-lg mb-3">{slide.title}</h3>
            )}
            {slide.content && (
              <p className="text-gray-700">{slide.content}</p>
            )}
          </CardContent>
        </Card>
      );
  }
}
