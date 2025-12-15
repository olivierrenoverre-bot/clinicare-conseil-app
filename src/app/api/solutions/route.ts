import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/solutions - List all solutions
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

    // Get user's solutions and public templates
    const solutions = await prisma.solution.findMany({
      where: {
        OR: [
          { createdById: user.id },
          { isTemplate: true },
          { isPublic: true },
        ],
      },
      include: {
        steps: {
          orderBy: { order: "asc" },
        },
        favorites: {
          where: { userId: user.id },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform for response
    const result = solutions.map((s) => ({
      id: s.id,
      name: s.name,
      indication: s.indication,
      isTemplate: s.isTemplate,
      isFavorite: s.favorites.length > 0,
      stepCount: s.steps.length,
      stepTypes: s.steps.map((step) => step.type),
      createdAt: s.createdAt.toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/solutions - Create a new solution
export async function POST(request: Request) {
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

    const body = await request.json();
    const { name, indication, description, steps } = body;

    if (!name || !steps || steps.length === 0) {
      return NextResponse.json(
        { error: "Nom et étapes requis" },
        { status: 400 }
      );
    }

    // Create solution with steps
    const solution = await prisma.solution.create({
      data: {
        name,
        indication,
        description,
        createdById: user.id,
        steps: {
          create: steps.map((step: {
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

    return NextResponse.json(solution, { status: 201 });
  } catch (error) {
    console.error("Error creating solution:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
