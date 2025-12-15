import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/solutions/[id] - Get a single solution
export async function GET(
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
      include: {
        steps: {
          orderBy: { order: "asc" },
        },
        favorites: {
          where: { userId: user.id },
        },
      },
    });

    if (!solution) {
      return NextResponse.json({ error: "Solution non trouvée" }, { status: 404 });
    }

    // Check access
    if (
      solution.createdById !== user.id &&
      !solution.isTemplate &&
      !solution.isPublic
    ) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    return NextResponse.json({
      ...solution,
      isFavorite: solution.favorites.length > 0,
    });
  } catch (error) {
    console.error("Error fetching solution:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/solutions/[id] - Update a solution
export async function PUT(
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

    // Only owner can update
    if (solution.createdById !== user.id) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const body = await request.json();
    const { name, indication, description, steps } = body;

    // Update solution
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing steps
      await tx.solutionStep.deleteMany({
        where: { solutionId: params.id },
      });

      // Update solution with new steps
      return tx.solution.update({
        where: { id: params.id },
        data: {
          name,
          indication,
          description,
          steps: {
            create: steps?.map((step: {
              order: number;
              type: string;
              name: string;
              timing: string;
              sameDay: boolean;
              parameters?: Record<string, unknown>;
              notes?: string;
            }) => ({
              order: step.order,
              type: step.type,
              name: step.name,
              timing: step.timing,
              sameDay: step.sameDay || false,
              parameters: step.parameters || {},
              notes: step.notes || "",
            })),
          },
        },
        include: {
          steps: {
            orderBy: { order: "asc" },
          },
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating solution:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/solutions/[id] - Delete a solution
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

    const solution = await prisma.solution.findUnique({
      where: { id: params.id },
    });

    if (!solution) {
      return NextResponse.json({ error: "Solution non trouvée" }, { status: 404 });
    }

    // Only owner can delete (templates are protected)
    if (solution.createdById !== user.id || solution.isTemplate) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    await prisma.solution.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting solution:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
