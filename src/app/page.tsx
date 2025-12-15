"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, GraduationCap, TrendingUp, Award, Clock, ChevronRight, Loader2 } from "lucide-react";
import { BottomNavigation } from "@/components/features/BottomNavigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4F72]" />
      </div>
    );
  }

  const userName = session?.user?.name || "Marie";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-6">
          <div className="pt-2">
            <h1 className="text-2xl font-bold text-gray-900">Bonjour {userName} !</h1>
            <p className="text-gray-600">Prete a accompagner vos clients ?</p>
          </div>

          <Card className="bg-gradient-to-br from-[#1B4F72] to-[#2980B9] text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm">Niveau 2</p>
                  <p className="text-xl font-bold">Produits</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-300" />
                  <span className="font-bold">1250 XP</span>
                </div>
              </div>
              <Progress value={65} className="h-2 bg-white/20" />
              <div className="flex items-center justify-between mt-2 text-sm text-white/80">
                <span>65% complete</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>7 jours consecutifs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-lg font-semibold mb-3">Actions rapides</h2>
            <div className="space-y-3">
              <Link href="/cabine">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4">
                    <div className="bg-blue-500 p-3 rounded-lg mr-4">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Rechercher un produit</h3>
                      <p className="text-sm text-gray-500">Trouver rapidement le bon produit</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/formation">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4">
                    <div className="bg-purple-500 p-3 rounded-lg mr-4">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Continuer la formation</h3>
                      <p className="text-sm text-gray-500">Module 2.3 - Gamme REFRESH</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Les 4 Gammes</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <Badge className="bg-red-500 text-white mb-2">Refresh</Badge>
                  <p className="text-sm text-gray-600">Anti-age</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <Badge className="bg-green-500 text-white mb-2">Glow</Badge>
                  <p className="text-sm text-gray-600">Eclat</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <Badge className="bg-blue-500 text-white mb-2">Pure</Badge>
                  <p className="text-sm text-gray-600">Sensibles</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <Badge className="bg-purple-500 text-white mb-2">Tight</Badge>
                  <p className="text-sm text-gray-600">Fermete</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-base">Rappels de securite</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-red-700 space-y-1">
              <p>• Ampoules EGF = Usage externe uniquement</p>
              <p>• ZOOM : max 1-2 cm de la peau</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
