import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const modules = await prisma.module.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { lessons: true },
        },
        progress: {
          where: { userId: user.id },
          select: {
            completed: true,
            lessonsViewed: true,
          },
        },
      },
    });

    // Transform to include first progress item
    const modulesWithProgress = modules.map((module) => ({
      ...module,
      progress: module.progress[0] || null,
    }));

    return NextResponse.json(modulesWithProgress);
  } catch (error) {
    console.error("Erreur API modules:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
