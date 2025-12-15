import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/solutions/[id]/favorite - Add to favorites
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
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

    const solution = await prisma.solution.findUnique({
      where: { id: params.id },
    });

    if (!solution) {
      return NextResponse.json({ error: "Solution non trouvée" }, { status: 404 });
    }

    // Check if already favorited
    const existing = await prisma.solutionFavorite.findUnique({
      where: {
        userId_solutionId: {
          userId: user.id,
          solutionId: params.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Déjà en favoris" });
    }

    await prisma.solutionFavorite.create({
      data: {
        userId: user.id,
        solutionId: params.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/solutions/[id]/favorite - Remove from favorites
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
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

    await prisma.solutionFavorite.deleteMany({
      where: {
        userId: user.id,
        solutionId: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
