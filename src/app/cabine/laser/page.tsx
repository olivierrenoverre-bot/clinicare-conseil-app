"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { ArrowLeft, Zap, Target, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LASER_PROTOCOLS = [
  {
    id: "RESOLVE",
    name: "RESOLVE",
    color: "#C41E3A",
    description: "Laser fractionné non-ablatif pour le rajeunissement cutané",
    indications: ["Rides fines", "Texture irrégulière", "Cicatrices d'acné", "Pores dilatés", "Relâchement léger"],
    seances: "3-6 séances",
    intervalle: "4-6 semaines",
    icon: "🔴",
  },
  {
    id: "FRAX",
    name: "FRAX",
    color: "#2E8B57",
    description: "Laser fractionné ablatif pour le resurfacing intensif",
    indications: ["Rides profondes", "Cicatrices", "Vergetures", "Photo-vieillissement sévère", "Kératoses"],
    seances: "1-3 séances",
    intervalle: "6-8 semaines",
    icon: "🟢",
  },
  {
    id: "ZOOM",
    name: "ZOOM",
    color: "#4169E1",
    description: "Laser Q-Switched pour les lésions pigmentaires",
    indications: ["Taches solaires", "Lentigos", "Mélasma superficiel", "Tatouages", "Taches de rousseur"],
    seances: "2-4 séances",
    intervalle: "4 semaines",
    icon: "🔵",
  },
];

const CONTRE_INDICATIONS = [
  { label: "Grossesse / Allaitement", gravity: "STOP" },
  { label: "Peau bronzée récente", gravity: "ATTENDRE" },
  { label: "Roaccutane < 6 mois", gravity: "STOP" },
  { label: "Herpès actif", gravity: "PROPHYLAXIE" },
  { label: "Infection cutanée", gravity: "STOP" },
  { label: "Phototype VI", gravity: "PRUDENCE" },
];

export default function LaserPage() {
  const router = useRouter();
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/cabine")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Protocoles Laser</h1>
              <p className="text-gray-600">RESOLVE, FRAX et ZOOM</p>
            </div>
          </div>

          {/* Sélection du laser */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Choisir un protocole</h2>
            <div className="grid grid-cols-3 gap-3">
              {LASER_PROTOCOLS.map((protocol) => (
                <Card
                  key={protocol.id}
                  className={`cursor-pointer transition-all ${
                    selectedProtocol === protocol.id
                      ? "ring-2 ring-offset-2"
                      : "hover:shadow-md"
                  }`}
                  style={{
                    borderColor: protocol.color,
                    borderWidth: 2,
                    ...(selectedProtocol === protocol.id && { ringColor: protocol.color }),
                  }}
                  onClick={() => setSelectedProtocol(protocol.id)}
                >
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl">{protocol.icon}</span>
                    <p className="font-bold mt-2" style={{ color: protocol.color }}>
                      {protocol.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Détails du protocole sélectionné */}
          {selectedProtocol && (
            <section className="space-y-4">
              {LASER_PROTOCOLS.filter((p) => p.id === selectedProtocol).map((protocol) => (
                <div key={protocol.id}>
                  <Card style={{ borderLeftColor: protocol.color, borderLeftWidth: 4 }}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: protocol.color }}>
                            {protocol.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{protocol.description}</p>
                        </div>
                        <Badge style={{ backgroundColor: protocol.color }} className="text-white">
                          Laser
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Séances</p>
                            <p className="font-medium">{protocol.seances}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Intervalle</p>
                            <p className="font-medium">{protocol.intervalle}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Indications :</p>
                        <div className="flex flex-wrap gap-2">
                          {protocol.indications.map((ind, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {ind}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Link href={`/cabine/laser/${protocol.id}`}>
                        <Button className="w-full" style={{ backgroundColor: protocol.color }}>
                          <Zap className="h-4 w-4 mr-2" />
                          Voir les paramètres détaillés
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </section>
          )}

          {/* Contre-indications */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Contre-indications
            </h2>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-2">
                  {CONTRE_INDICATIONS.map((ci, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge
                        className={`text-xs ${
                          ci.gravity === "STOP"
                            ? "bg-red-500"
                            : ci.gravity === "ATTENDRE"
                            ? "bg-yellow-500"
                            : ci.gravity === "PROPHYLAXIE"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        } text-white`}
                      >
                        {ci.gravity}
                      </Badge>
                      <span className="text-sm text-gray-700">{ci.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Rappels sécurité */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Rappels de sécurité</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• ZOOM : Distance max 1-2 cm de la peau</li>
                <li>• Lunettes de protection OBLIGATOIRES</li>
                <li>• Test sur petite zone avant traitement complet</li>
                <li>• SPF 50 obligatoire post-traitement</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
