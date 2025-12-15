import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
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

    const moduleId = params.moduleId;

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        lessons: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            duration: true,
            xpReward: true,
            order: true,
          },
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

    if (!module) {
      return NextResponse.json({ error: "Module non trouvé" }, { status: 404 });
    }

    // Get lesson progress
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lessonId: { in: module.lessons.map(l => l.id) },
      },
      select: {
        lessonId: true,
        completed: true,
      },
    });

    const lessonProgressMap = new Map(
      lessonProgress.map(lp => [lp.lessonId, lp.completed])
    );

    // Add completion status to each lesson
    const lessonsWithProgress = module.lessons.map(lesson => ({
      ...lesson,
      completed: lessonProgressMap.get(lesson.id) || false,
    }));

    return NextResponse.json({
      ...module,
      lessons: lessonsWithProgress,
      progress: module.progress[0] || null,
    });
  } catch (error) {
    console.error("Erreur API module:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
