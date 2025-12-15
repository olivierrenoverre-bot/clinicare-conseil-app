"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

const LESSONS_CONTENT: Record<string, Record<string, {
  title: string;
  duration: number;
  content: string[];
  quiz?: { question: string; options: string[]; correct: number };
}>> = {
  "1": {
    "1": {
      title: "Histoire de CLINICARE",
      duration: 8,
      content: [
        "CLINICARE est une marque de cosmetiques professionnels creee en 2010 par des dermatologues et des experts en soins de la peau.",
        "La marque est nee de la volonte de proposer des soins efficaces, bases sur la science, accessibles en institut de beaute.",
        "Aujourd'hui, CLINICARE est presente dans plus de 30 pays et continue d'innover avec des formules toujours plus performantes.",
      ],
    },
    "2": {
      title: "Les valeurs de la marque",
      duration: 7,
      content: [
        "Excellence scientifique : Chaque produit est developpe en collaboration avec des dermatologues.",
        "Efficacite prouvee : Des tests cliniques valident l'efficacite de nos formules.",
        "Formation continue : Nous accompagnons nos partenaires avec des formations regulieres.",
        "Ethique : Produits non testes sur les animaux, formules responsables.",
      ],
    },
    "3": {
      title: "Les 4 gammes en bref",
      duration: 10,
      content: [
        "REFRESH (Rouge) : Gamme anti-age ciblent rides et perte de fermete. Actifs cles : Retinol, Peptides.",
        "GLOW (Vert) : Gamme eclat et anti-taches. Actifs cles : Vitamine C, Niacinamide.",
        "PURE (Bleu) : Gamme pour peaux sensibles et reactives. Actifs cles : Aloe vera, Centella asiatica.",
        "TIGHT (Violet) : Gamme fermete et lifting. Actifs cles : DMAE, Collagene marin.",
      ],
    },
    "4": {
      title: "Quiz - Introduction",
      duration: 5,
      content: [
        "Testez vos connaissances sur l'introduction a CLINICARE !",
      ],
      quiz: {
        question: "En quelle annee CLINICARE a-t-elle ete creee ?",
        options: ["2005", "2010", "2015", "2020"],
        correct: 1,
      },
    },
  },
  "2": {
    "1": {
      title: "Les signes du vieillissement cutane",
      duration: 10,
      content: [
        "Le vieillissement cutane se manifeste par plusieurs signes : rides, perte de fermete, taches pigmentaires.",
        "Il existe deux types de vieillissement : intrinseque (genetique) et extrinseque (soleil, pollution, tabac).",
        "La production de collagene diminue de 1% par an apres 25 ans.",
        "Les UVA penetrent profondement dans le derme et accelerent le vieillissement.",
      ],
    },
    "2": {
      title: "Les actifs anti-age REFRESH",
      duration: 12,
      content: [
        "Retinol : Stimule le renouvellement cellulaire et la production de collagene.",
        "Peptides : Messagers cellulaires qui activent la synthese de proteines de la peau.",
        "Acide hyaluronique : Hydrate et repulpe la peau.",
        "Vitamine E : Antioxydant puissant qui protege les cellules.",
      ],
    },
    "3": {
      title: "Le Serum Retinol REFRESH",
      duration: 8,
      content: [
        "Concentration : 0.5% de retinol encapsule pour une liberation progressive.",
        "Application : Le soir, sur peau propre, avant la creme.",
        "Precautions : Utiliser une protection solaire le jour. Eviter pendant la grossesse.",
        "Resultats : Rides attenuees des 4 semaines d'utilisation reguliere.",
      ],
    },
    "4": {
      title: "Protocole cabine REFRESH",
      duration: 10,
      content: [
        "Etape 1 : Demaquillage avec le Cleansing Milk REFRESH",
        "Etape 2 : Gommage enzymatique doux",
        "Etape 3 : Application du masque Retinol 10 minutes",
        "Etape 4 : Serum Retinol REFRESH",
        "Etape 5 : Creme de jour REFRESH avec SPF",
      ],
    },
    "5": {
      title: "Conseils client personnalises",
      duration: 5,
      content: [
        "Ecoutez les besoins specifiques du client avant de recommander.",
        "Commencez par des concentrations faibles pour les debutants.",
        "Proposez une routine progressive sur 3 mois.",
        "Insistez sur l'importance de la protection solaire.",
      ],
    },
    "6": {
      title: "Quiz - Gamme REFRESH",
      duration: 5,
      content: ["Testez vos connaissances sur la gamme REFRESH !"],
      quiz: {
        question: "Quel est l'actif principal de la gamme REFRESH ?",
        options: ["Vitamine C", "Retinol", "Acide glycolique", "Niacinamide"],
        correct: 1,
      },
    },
  },
};

// Default content for modules not yet fully defined
const DEFAULT_LESSON = {
  title: "Contenu en cours de creation",
  duration: 5,
  content: [
    "Ce contenu sera bientot disponible.",
    "Revenez prochainement pour acceder a cette lecon.",
  ],
};

export default function LeconPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  const leconId = params.leconId as string;

  const moduleContent = LESSONS_CONTENT[moduleId];
  const lesson = moduleContent?.[leconId] || DEFAULT_LESSON;

  const handleComplete = () => {
    // In a real app, this would save progress to the database
    const nextLeconId = parseInt(leconId) + 1;
    const nextLesson = moduleContent?.[nextLeconId.toString()];

    if (nextLesson) {
      router.push(`/formation/${moduleId}/lecon/${nextLeconId}`);
    } else {
      router.push(`/formation/${moduleId}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Lecon {leconId}</p>
              <h1 className="text-lg font-bold text-gray-900">{lesson.title}</h1>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {lesson.duration} min
            </div>
          </div>

          {/* Progress bar */}
          <Progress value={parseInt(leconId) * 20} className="h-1" />

          {/* Content */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              {lesson.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          {/* Quiz section if present */}
          {lesson.quiz && (
            <Card className="border-[#1B4F72]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-[#1B4F72]" />
                  <h2 className="font-semibold">Quiz</h2>
                </div>
                <p className="font-medium mb-4">{lesson.quiz.question}</p>
                <div className="space-y-2">
                  {lesson.quiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => {
                        if (index === lesson.quiz!.correct) {
                          alert("Bonne reponse !");
                        } else {
                          alert("Mauvaise reponse, essayez encore.");
                        }
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <Button
              className="flex-1 bg-[#1B4F72] hover:bg-[#1B4F72]/90"
              onClick={handleComplete}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Terminer
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
