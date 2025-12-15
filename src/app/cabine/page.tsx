"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { Search, Filter, Sparkles, Droplets, Sun, Zap, Layers } from "lucide-react";
import Link from "next/link";

const GAMMES = [
  { id: "REFRESH", name: "Refresh", color: "bg-red-500", borderColor: "#ef4444", icon: Zap, description: "Anti-age, Rides" },
  { id: "GLOW", name: "Glow", color: "bg-green-500", borderColor: "#22c55e", icon: Sun, description: "Eclat, Anti-taches" },
  { id: "PURE", name: "Pure", color: "bg-blue-500", borderColor: "#3b82f6", icon: Droplets, description: "Peaux sensibles" },
  { id: "TIGHT", name: "Tight", color: "bg-purple-500", borderColor: "#a855f7", icon: Sparkles, description: "Fermete, Lifting" },
];

const PRODUITS_DEMO = [
  { id: 1, name: "Cleansing Gel PURE", gamme: "PURE", category: "Nettoyant", prix: 32 },
  { id: 2, name: "Essence Vitaminee GLOW", gamme: "GLOW", category: "Essence", prix: 45 },
  { id: 3, name: "Serum Retinol REFRESH", gamme: "REFRESH", category: "Serum", prix: 65 },
  { id: 4, name: "Creme Lift TIGHT", gamme: "TIGHT", category: "Creme", prix: 78 },
  { id: 5, name: "Masque Hydratant PURE", gamme: "PURE", category: "Masque", prix: 38 },
  { id: 6, name: "Ampoule EGF REFRESH", gamme: "REFRESH", category: "Ampoule", prix: 89 },
];

export default function CabinePage() {
  const [search, setSearch] = useState("");
  const [selectedGamme, setSelectedGamme] = useState<string | null>(null);

  const filteredProducts = PRODUITS_DEMO.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchGamme = !selectedGamme || p.gamme === selectedGamme;
    return matchSearch && matchGamme;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          <div className="pt-2">
            <h1 className="text-2xl font-bold text-gray-900">Cabine</h1>
            <p className="text-gray-600">Recherchez un produit CLINICARE</p>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtres par gamme */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedGamme === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGamme(null)}
            >
              Tous
            </Button>
            {GAMMES.map((gamme) => (
              <Button
                key={gamme.id}
                variant={selectedGamme === gamme.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGamme(gamme.id)}
                className={selectedGamme === gamme.id ? gamme.color : ""}
              >
                {gamme.name}
              </Button>
            ))}
          </div>

          {/* Section Laser */}
          <Link href="/cabine/laser">
            <Card className="border-l-4 border-l-red-800 bg-gradient-to-r from-red-50 to-orange-50 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-800 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900">Protocoles Laser</h3>
                      <p className="text-sm text-red-700">RESOLVE • FRAX • ZOOM</p>
                    </div>
                  </div>
                  <Badge className="bg-red-800 text-white">Nouveau</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Section Solutions Personnalisées */}
          <Link href="/cabine/solutions">
            <Card className="border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Layers className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900">Mes Solutions</h3>
                      <p className="text-sm text-blue-700">Créer des protocoles personnalisés</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">Nouveau</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Grille des gammes */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Les 4 Gammes</h2>
            <div className="grid grid-cols-2 gap-3">
              {GAMMES.map((gamme) => (
                <Card
                  key={gamme.id}
                  className={`border-l-4 cursor-pointer hover:shadow-md transition-shadow`}
                  style={{ borderLeftColor: gamme.borderColor }}
                  onClick={() => setSelectedGamme(gamme.id)}
                >
                  <CardContent className="p-4">
                    <div className={`${gamme.color} w-10 h-10 rounded-lg flex items-center justify-center mb-2`}>
                      <gamme.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge className={`${gamme.color} text-white mb-1`}>{gamme.name}</Badge>
                    <p className="text-xs text-gray-600">{gamme.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Liste des produits */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Produits {selectedGamme && `- ${selectedGamme}`} ({filteredProducts.length})
            </h2>
            <div className="space-y-3">
              {filteredProducts.map((produit) => (
                <Card key={produit.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{produit.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{produit.category}</Badge>
                          <Badge className={`text-xs text-white ${
                            produit.gamme === "REFRESH" ? "bg-red-500" :
                            produit.gamme === "GLOW" ? "bg-green-500" :
                            produit.gamme === "PURE" ? "bg-blue-500" : "bg-purple-500"
                          }`}>
                            {produit.gamme}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#1B4F72]">{produit.prix} EUR</p>
                        <Link href={`/cabine/produit/${produit.id}`}>
                          <Button size="sm" variant="outline" className="mt-1">
                            Details
                          </Button>
                        </Link>
                      </div>
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
