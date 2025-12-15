"use client";

import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/features/BottomNavigation";
import { SolutionBuilder } from "@/components/features/solutions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateSolutionPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 pb-20">
        <div className="p-4 space-y-4 h-full">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/cabine/solutions")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Créer un protocole</h1>
              <p className="text-gray-600">Glissez-déposez les soins pour construire votre solution</p>
            </div>
          </div>

          {/* Solution Builder */}
          <div className="flex-1" style={{ minHeight: "calc(100vh - 200px)" }}>
            <SolutionBuilder />
          </div>
        </div>
      </div>
      <BottomNavigation userRole="ASSISTANT" />
    </div>
  );
}
