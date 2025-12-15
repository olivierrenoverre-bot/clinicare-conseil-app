"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import {
  ArrowLeft,
  Zap,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Info,
  Target,
  Gauge,
  Grid3X3,
  Repeat,
  ThermometerSun,
} from "lucide-react";

// Données des protocoles RESOLVE
const RESOLVE_SESSIONS = [
  {
    session: 1,
    energie: "20-25 mJ",
    fluence: "10-12 J/cm²",
    couverture: "20%",
    spot: "7mm",
    passages: 2,
    description: "Séance d'initiation - paramètres doux pour évaluer la tolérance",
  },
  {
    session: 2,
    energie: "25-30 mJ",
    fluence: "12-14 J/cm²",
    couverture: "25%",
    spot: "7mm",
    passages: 2,
    description: "Augmentation progressive des paramètres",
  },
  {
    session: 3,
    energie: "30-35 mJ",
    fluence: "14-16 J/cm²",
    couverture: "30%",
    spot: "7mm",
    passages: 2,
    description: "Paramètres optimaux pour résultats visibles",
  },
  {
    session: 4,
    energie: "35-40 mJ",
    fluence: "16-18 J/cm²",
    couverture: "30-35%",
    spot: "7mm",
    passages: 2,
    description: "Séance intensive - surveillance renforcée",
  },
];

// Données des protocoles FRAX
const FRAX_SESSIONS = [
  {
    session: 1,
    energie: "15-20 mJ",
    fluence: "150-200 mJ/microspot",
    couverture: "10-15%",
    spot: "120μm",
    passages: 1,
    description: "Première séance - évaluation de la cicatrisation",
  },
  {
    session: 2,
    energie: "20-25 mJ",
    fluence: "200-250 mJ/microspot",
    couverture: "15-20%",
    spot: "120μm",
    passages: 1,
    description: "Intensification selon tolérance",
  },
  {
    session: 3,
    energie: "25-30 mJ",
    fluence: "250-300 mJ/microspot",
    couverture: "20-25%",
    spot: "120μm",
    passages: 1,
    description: "Séance optimale - résultats maximaux",
  },
];

// Données des protocoles ZOOM
const ZOOM_SESSIONS = [
  {
    session: 1,
    energie: "2.5-3.0 J/cm²",
    fluence: "N/A",
    couverture: "Zone ciblée",
    spot: "3mm",
    passages: 1,
    description: "Test sur petite zone - observer blanchiment",
  },
  {
    session: 2,
    energie: "3.0-3.5 J/cm²",
    fluence: "N/A",
    couverture: "Zone étendue",
    spot: "3mm",
    passages: 1,
    description: "Traitement progressif des zones",
  },
  {
    session: 3,
    energie: "3.5-4.0 J/cm²",
    fluence: "N/A",
    couverture: "Zone complète",
    spot: "3mm",
    passages: 1,
    description: "Finitions et retouches",
  },
];

const PROTOCOLS_DATA: Record<
  string,
  {
    name: string;
    color: string;
    icon: string;
    description: string;
    sessions: typeof RESOLVE_SESSIONS;
    postSoins: string[];
    precautions: string[];
    phototypes: string;
    dureeSeance: string;
  }
> = {
  RESOLVE: {
    name: "RESOLVE",
    color: "#C41E3A",
    icon: "🔴",
    description: "Laser fractionné non-ablatif 1540nm pour le rajeunissement cutané",
    sessions: RESOLVE_SESSIONS,
    postSoins: [
      "Appliquer crème apaisante (Cicaplast ou équivalent)",
      "SPF 50 obligatoire pendant 4 semaines",
      "Éviter exposition solaire directe",
      "Pas de maquillage pendant 24h",
      "Hydratation intensive recommandée",
    ],
    precautions: [
      "Test cutané 48h avant sur peau sensible",
      "Vérifier absence de bronzage récent",
      "Prophylaxie antivirale si antécédent herpès",
      "Contre-indiqué si grossesse/allaitement",
    ],
    phototypes: "I à IV (prudence phototype V)",
    dureeSeance: "30-45 minutes",
  },
  FRAX: {
    name: "FRAX",
    color: "#2E8B57",
    icon: "🟢",
    description: "Laser fractionné ablatif CO2 10600nm pour resurfacing intensif",
    sessions: FRAX_SESSIONS,
    postSoins: [
      "Pansement hydrocolloïde les premiers jours",
      "Vaseline ou Aquaphor pour cicatrisation",
      "SPF 50 obligatoire pendant 8 semaines minimum",
      "Éviction sociale 7-10 jours",
      "Pas de maquillage pendant 1 semaine",
    ],
    precautions: [
      "Arrêt rétinoides 1 mois avant",
      "Photos avant/après obligatoires",
      "Anesthésie topique recommandée",
      "Surveillance cicatrisation J7 et J14",
      "Contre-indiqué phototypes V-VI",
    ],
    phototypes: "I à IV uniquement",
    dureeSeance: "45-90 minutes selon zone",
  },
  ZOOM: {
    name: "ZOOM",
    color: "#4169E1",
    icon: "🔵",
    description: "Laser Q-Switched Nd:YAG 1064/532nm pour lésions pigmentaires",
    sessions: ZOOM_SESSIONS,
    postSoins: [
      "Ne pas gratter les croûtelles",
      "Crème cicatrisante 2x/jour",
      "SPF 50 strictement obligatoire",
      "Éviter chaleur et sport 48h",
      "Pas d'exposition solaire 6 semaines",
    ],
    precautions: [
      "Distance pièce à main : 1-2cm max",
      "Endpoint : blanchiment immédiat",
      "Éviter superposition des impacts",
      "Prudence sur mélasma (risque rebond)",
      "Lunettes protection 1064nm obligatoires",
    ],
    phototypes: "I à V (adapter énergie)",
    dureeSeance: "15-30 minutes",
  },
};

export default function LaserProtocolPage() {
  const router = useRouter();
  const params = useParams();
  const protocolId = params.protocolId as string;
  const [selectedSession, setSelectedSession] = useState<number>(1);

  const protocol = PROTOCOLS_DATA[protocolId];

  if (!protocol) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
        <p className="text-gray-600">Protocole non trouvé</p>
        <Button onClick={() => router.push("/cabine/laser")} className="mt-4">
          Retour aux protocoles
        </Button>
      </div>
    );
  }

  const currentSession = protocol.sessions.find((s) => s.session === selectedSession);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/cabine/laser")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{protocol.icon}</span>
                <h1 className="text-2xl font-bold" style={{ color: protocol.color }}>
                  {protocol.name}
                </h1>
              </div>
              <p className="text-gray-600 text-sm">{protocol.description}</p>
            </div>
          </div>

          {/* Info rapide */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Phototypes</p>
                  <p className="font-medium text-sm">{protocol.phototypes}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Durée</p>
                  <p className="font-medium text-sm">{protocol.dureeSeance}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sélection séance */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Settings className="h-5 w-5" style={{ color: protocol.color }} />
              Paramètres par séance
            </h2>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {protocol.sessions.map((s) => (
                <Button
                  key={s.session}
                  variant={selectedSession === s.session ? "default" : "outline"}
                  style={
                    selectedSession === s.session
                      ? { backgroundColor: protocol.color }
                      : { borderColor: protocol.color, color: protocol.color }
                  }
                  onClick={() => setSelectedSession(s.session)}
                  className="min-w-[80px]"
                >
                  Séance {s.session}
                </Button>
              ))}
            </div>

            {currentSession && (
              <Card style={{ borderLeftColor: protocol.color, borderLeftWidth: 4 }}>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4 italic">{currentSession.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${protocol.color}20` }}
                      >
                        <Zap className="h-5 w-5" style={{ color: protocol.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Énergie</p>
                        <p className="font-bold">{currentSession.energie}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${protocol.color}20` }}
                      >
                        <Gauge className="h-5 w-5" style={{ color: protocol.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fluence</p>
                        <p className="font-bold">{currentSession.fluence}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${protocol.color}20` }}
                      >
                        <Grid3X3 className="h-5 w-5" style={{ color: protocol.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Couverture</p>
                        <p className="font-bold">{currentSession.couverture}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${protocol.color}20` }}
                      >
                        <Target className="h-5 w-5" style={{ color: protocol.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Spot</p>
                        <p className="font-bold">{currentSession.spot}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 col-span-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${protocol.color}20` }}
                      >
                        <Repeat className="h-5 w-5" style={{ color: protocol.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Nombre de passages</p>
                        <p className="font-bold">{currentSession.passages}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Soins post-traitement */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Soins post-traitement
            </h2>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {protocol.postSoins.map((soin, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {soin}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Précautions */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Précautions spécifiques
            </h2>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {protocol.precautions.map((precaution, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {precaution}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Rappel sécurité */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Rappel de sécurité laser
              </h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Lunettes de protection adaptées OBLIGATOIRES (patient ET opérateur)</li>
                <li>• Vérifier l'absence de bijoux métalliques sur la zone</li>
                <li>• Aspiration des fumées si laser ablatif</li>
                <li>• Signalétique laser active sur la porte</li>
                <li>• Extincteur CO2 à proximité</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
