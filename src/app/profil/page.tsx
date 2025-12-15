"use client";

import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { User, Award, Trophy, Star, LogOut, Settings, ChevronRight } from "lucide-react";

const BADGES = [
  { id: 1, name: "Premier pas", description: "Premiere connexion", earned: true, icon: Star },
  { id: 2, name: "Studieux", description: "5 lecons completees", earned: true, icon: Award },
  { id: 3, name: "Expert REFRESH", description: "Module REFRESH complete", earned: false, icon: Trophy },
  { id: 4, name: "Conseiller Or", description: "10 diagnostics realises", earned: false, icon: Award },
];

const STATS = [
  { label: "Modules completes", value: "1/6" },
  { label: "Quiz reussis", value: "3" },
  { label: "Diagnostics", value: "12" },
  { label: "Jours consecutifs", value: "7" },
];

export default function ProfilPage() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          {/* Header profil */}
          <Card className="bg-gradient-to-br from-[#1B4F72] to-[#2980B9] text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{session?.user?.name || "Marie Demo"}</h1>
                  <p className="text-white/80">{session?.user?.email || "demo@clinicare.fr"}</p>
                  <Badge className="bg-white/20 text-white mt-1">Assistant</Badge>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Niveau 2 - Produits</p>
                  <Progress value={65} className="h-2 bg-white/20 mt-1 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-300" />
                  <span className="font-bold">1250 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Statistiques</h2>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-[#1B4F72]">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Badges obtenus</h2>
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((badge) => (
                <Card key={badge.id} className={!badge.earned ? "opacity-50" : ""}>
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      badge.earned ? "bg-yellow-400" : "bg-gray-300"
                    }`}>
                      <badge.icon className={`h-5 w-5 ${badge.earned ? "text-yellow-800" : "text-gray-500"}`} />
                    </div>
                    <h3 className="font-medium text-sm">{badge.name}</h3>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Actions */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Parametres</h2>
            <Card>
              <CardContent className="p-0">
                <button className="w-full flex items-center justify-between p-4 border-b hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span>Parametres</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-red-600"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <span>Deconnexion</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
