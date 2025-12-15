import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// XP thresholds for leveling up
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000];

function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export async function POST(
  request: Request,
  { params }: { params: { lessonId: string } }
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

    const lessonId = params.lessonId;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: true,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Leçon non trouvée" }, { status: 404 });
    }

    // Check if already completed
    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
    });

    if (existingProgress?.completed) {
      return NextResponse.json({
        message: "Leçon déjà complétée",
        xpEarned: 0,
      });
    }

    // Mark lesson as complete
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      create: {
        userId: user.id,
        lessonId,
        completed: true,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
    });

    // Update user XP
    const newXp = user.xpPoints + lesson.xpReward;
    const newLevel = calculateLevel(newXp);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        xpPoints: newXp,
        level: newLevel,
      },
    });

    // Check if all lessons in module are complete
    const moduleLessons = await prisma.lesson.findMany({
      where: { moduleId: lesson.moduleId },
      select: { id: true },
    });

    const completedLessons = await prisma.lessonProgress.count({
      where: {
        userId: user.id,
        lessonId: { in: moduleLessons.map(l => l.id) },
        completed: true,
      },
    });

    // Update module progress
    const allLessonsComplete = completedLessons === moduleLessons.length;

    await prisma.progress.upsert({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: lesson.moduleId,
        },
      },
      create: {
        userId: user.id,
        moduleId: lesson.moduleId,
        completed: allLessonsComplete,
        completedAt: allLessonsComplete ? new Date() : null,
        lessonsViewed: JSON.stringify(moduleLessons.map(l => l.id).slice(0, completedLessons)),
      },
      update: {
        completed: allLessonsComplete,
        completedAt: allLessonsComplete ? new Date() : undefined,
        lessonsViewed: JSON.stringify(moduleLessons.map(l => l.id).slice(0, completedLessons)),
      },
    });

    // If module complete, add module XP bonus
    let totalXpEarned = lesson.xpReward;
    if (allLessonsComplete) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          xpPoints: { increment: lesson.module.xpReward },
        },
      });
      totalXpEarned += lesson.module.xpReward;
    }

    return NextResponse.json({
      message: "Leçon complétée",
      xpEarned: totalXpEarned,
      newXp: newXp + (allLessonsComplete ? lesson.module.xpReward : 0),
      newLevel,
      moduleComplete: allLessonsComplete,
    });
  } catch (error) {
    console.error("Erreur completion leçon:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
