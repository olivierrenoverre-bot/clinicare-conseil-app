"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { ArrowLeft, Droplets, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const PRODUITS_DATA: Record<string, {
  id: number;
  name: string;
  gamme: string;
  category: string;
  prix: number;
  description: string;
  actifs: string[];
  utilisation: string[];
  precautions: string[];
}> = {
  "1": {
    id: 1,
    name: "Cleansing Gel PURE",
    gamme: "PURE",
    category: "Nettoyant",
    prix: 32,
    description: "Gel nettoyant doux sans savon pour les peaux sensibles et reactives. Nettoie en douceur tout en respectant le film hydrolipidique.",
    actifs: ["Aloe vera bio", "Extrait de camomille", "Glycerine vegetale", "Eau thermale"],
    utilisation: [
      "Appliquer matin et soir sur peau humide",
      "Masser delicatement en mouvements circulaires",
      "Rincer abondamment a l'eau tiede",
      "Secher en tamponnant"
    ],
    precautions: ["Eviter le contour des yeux", "Usage externe uniquement"]
  },
  "2": {
    id: 2,
    name: "Essence Vitaminee GLOW",
    gamme: "GLOW",
    category: "Essence",
    prix: 45,
    description: "Essence concentree en vitamine C stabilisee pour un teint eclatant et unifie. Combat les taches pigmentaires.",
    actifs: ["Vitamine C 15%", "Niacinamide 5%", "Acide ferulique", "Alpha-arbutine"],
    utilisation: [
      "Appliquer le matin apres le nettoyage",
      "Tapoter quelques gouttes sur le visage",
      "Laisser penetrer avant le serum",
      "Toujours utiliser une protection solaire"
    ],
    precautions: ["Ne pas utiliser avec des AHA/BHA", "Conserver au refrigerateur apres ouverture"]
  },
  "3": {
    id: 3,
    name: "Serum Retinol REFRESH",
    gamme: "REFRESH",
    category: "Serum",
    prix: 65,
    description: "Serum anti-age au retinol encapsule 0.5%. Stimule le renouvellement cellulaire et reduit visiblement les rides.",
    actifs: ["Retinol encapsule 0.5%", "Peptides biomimetiques", "Squalane", "Vitamine E"],
    utilisation: [
      "Utiliser le soir uniquement",
      "Appliquer sur peau seche et propre",
      "Commencer 2x/semaine puis augmenter",
      "Eviter le contour des yeux"
    ],
    precautions: [
      "Ne pas utiliser pendant la grossesse",
      "Protection solaire obligatoire",
      "Peut provoquer des rougeurs les premieres semaines"
    ]
  },
  "4": {
    id: 4,
    name: "Creme Lift TIGHT",
    gamme: "TIGHT",
    category: "Creme",
    prix: 78,
    description: "Creme effet tenseur immediat avec action liftante longue duree. Redefinit l'ovale du visage.",
    actifs: ["DMAE 3%", "Collagene marin", "Peptides liftants", "Acide hyaluronique"],
    utilisation: [
      "Appliquer matin et soir",
      "Masser en remontant vers les tempes",
      "Insister sur l'ovale et le cou",
      "Peut etre utilisee en base de maquillage"
    ],
    precautions: ["Eviter le contour des yeux"]
  },
  "5": {
    id: 5,
    name: "Masque Hydratant PURE",
    gamme: "PURE",
    category: "Masque",
    prix: 38,
    description: "Masque apaisant et hydratant intense pour les peaux sensibles deshydratees. Effet seconde peau.",
    actifs: ["Centella asiatica", "Ceramides", "Beurre de karite", "Panthenol"],
    utilisation: [
      "Appliquer en couche epaisse 1-2x/semaine",
      "Laisser poser 15-20 minutes",
      "Masser l'excedent ou rincer",
      "Ideal apres un soin en cabine"
    ],
    precautions: ["Test de tolerance recommande"]
  },
  "6": {
    id: 6,
    name: "Ampoule EGF REFRESH",
    gamme: "REFRESH",
    category: "Ampoule",
    prix: 89,
    description: "Ampoule concentree au facteur de croissance epidermique. Regeneration cellulaire intense.",
    actifs: ["EGF (Epidermal Growth Factor)", "Acide hyaluronique bas poids moleculaire", "Collagene natif"],
    utilisation: [
      "Cure de 10 ampoules recommandee",
      "1 ampoule par jour pendant 10 jours",
      "Appliquer sur peau propre",
      "Masser jusqu'a absorption complete"
    ],
    precautions: [
      "USAGE EXTERNE UNIQUEMENT",
      "Ne pas avaler",
      "Conserver au refrigerateur"
    ]
  }
};

export default function ProduitPage() {
  const params = useParams();
  const router = useRouter();
  const produitId = params.id as string;
  const produit = PRODUITS_DATA[produitId];

  const getGammeColor = (gamme: string) => {
    switch (gamme) {
      case "REFRESH": return "bg-red-500";
      case "GLOW": return "bg-green-500";
      case "PURE": return "bg-blue-500";
      case "TIGHT": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  if (!produit) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 pb-20 p-4">
          <p>Produit non trouve</p>
          <Button className="mt-4" onClick={() => router.push("/cabine")}>
            Retour aux produits
          </Button>
        </div>
        <BottomNavigation userRole="ASSISTANT" />
      </div>
    );
  }

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
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`${getGammeColor(produit.gamme)} text-white`}>
                  {produit.gamme}
                </Badge>
                <Badge variant="outline">{produit.category}</Badge>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{produit.name}</h1>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#1B4F72]">{produit.prix} EUR</p>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-700 leading-relaxed">{produit.description}</p>
            </CardContent>
          </Card>

          {/* Actifs */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="h-5 w-5 text-[#1B4F72]" />
                <h2 className="font-semibold">Actifs cles</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {produit.actifs.map((actif, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {actif}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Utilisation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-[#1B4F72]" />
                <h2 className="font-semibold">Mode d'emploi</h2>
              </div>
              <ul className="space-y-2">
                {produit.utilisation.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Precautions */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h2 className="font-semibold text-orange-800">Precautions</h2>
              </div>
              <ul className="space-y-2">
                {produit.precautions.map((precaution, index) => (
                  <li key={index} className="text-sm text-orange-700">
                    • {precaution}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
