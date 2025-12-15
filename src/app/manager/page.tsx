"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { Users, TrendingUp, Award, BookOpen, BarChart3 } from "lucide-react";

const EQUIPE = [
  { id: 1, name: "Marie", progress: 65, xp: 1250, streak: 7 },
  { id: 2, name: "Sophie", progress: 45, xp: 890, streak: 3 },
  { id: 3, name: "Julie", progress: 80, xp: 1800, streak: 12 },
  { id: 4, name: "Emma", progress: 30, xp: 450, streak: 1 },
];

const STATS_GLOBALES = [
  { label: "Membres actifs", value: "4/5", icon: Users },
  { label: "Progression moyenne", value: "55%", icon: TrendingUp },
  { label: "Quiz reussis", value: "23", icon: BookOpen },
  { label: "XP total equipe", value: "4390", icon: Award },
];

export default function ManagerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4">
          <div className="pt-2">
            <h1 className="text-2xl font-bold text-gray-900">Espace Manager</h1>
            <p className="text-gray-600">Suivez les performances de votre equipe</p>
          </div>

          {/* Stats globales */}
          <div className="grid grid-cols-2 gap-3">
            {STATS_GLOBALES.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1B4F72]/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-[#1B4F72]" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-[#1B4F72]">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Classement equipe */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Classement de l equipe</h2>
            <Card>
              <CardContent className="p-0">
                {EQUIPE.sort((a, b) => b.xp - a.xp).map((membre, index) => (
                  <div
                    key={membre.id}
                    className={`flex items-center gap-4 p-4 ${index < EQUIPE.length - 1 ? "border-b" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? "bg-yellow-400 text-yellow-800" :
                      index === 1 ? "bg-gray-300 text-gray-600" :
                      index === 2 ? "bg-orange-300 text-orange-800" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{membre.name}</h3>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold text-sm">{membre.xp} XP</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex-1">
                          <Progress value={membre.progress} className="h-1" />
                        </div>
                        <span className="text-xs text-gray-500">{membre.progress}%</span>
                        <Badge variant="outline" className="text-xs">
                          {membre.streak}j
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Actions rapides */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 text-[#1B4F72] mx-auto mb-2" />
                  <p className="font-medium">Rapport detaille</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-[#1B4F72] mx-auto mb-2" />
                  <p className="font-medium">Gerer l equipe</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      <BottomNavigation userRole="MANAGER" />
    </div>
  );
}
