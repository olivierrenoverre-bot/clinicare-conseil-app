import { PrismaClient, DifficultyLevel, LessonType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ============ MODULE 1 : Connaissance de la Marque ============
const MODULE_1 = {
  id: "M1",
  title: "Connaissance de la Marque CLINICARE",
  description: "Découvrez l'identité, les valeurs et les piliers scientifiques",
  duration: 120,
  level: DifficultyLevel.BEGINNER,
  order: 1,
  color: "#1E3A5F",
  icon: "GraduationCap",
  xpReward: 100,
};

const MODULE_1_LESSONS = [
  {
    id: "M1-L1",
    title: "Pourquoi maîtriser sa marque ?",
    description: "Ancrage motivationnel",
    type: LessonType.INTRO,
    duration: 15,
    xpReward: 10,
    order: 1,
    content: {
      slides: [
        {
          type: "question",
          title: "Question d'ouverture",
          content: "Quelle est votre principale difficulté pour vendre des produits en cabine ?",
        },
        {
          type: "text",
          title: "Le saviez-vous ?",
          content: "Une esthéticienne qui maîtrise parfaitement ses produits vend en moyenne 30% de plus.",
          highlight: true,
        },
        {
          type: "text",
          title: "L'objectif de cette formation",
          content: "Connaître parfaitement votre marque, ce n'est pas pour réciter une leçon. C'est pour que votre cliente vous fasse confiance instantanément. Aujourd'hui, on construit ensemble VOS arguments.",
        },
        {
          type: "objectives",
          title: "À la fin de ce module, vous saurez :",
          items: [
            { text: "Présenter CLINICARE en 2 minutes à une cliente" },
            { text: "Expliquer la différence cosmétique vs cosméceutique" },
            { text: "Argumenter les 3 piliers scientifiques (EGF, LMWHA, actifs botaniques)" },
            { text: "Identifier les actifs récurrents et leurs bénéfices clients" },
          ],
        },
      ],
    },
  },
  {
    id: "M1-L2",
    title: "Origine et positionnement",
    description: "Identité CLINICARE",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 15,
    order: 2,
    content: {
      slides: [
        {
          type: "hero",
          title: "CLINICARE",
          content: "Formule Cosméceutique Révolutionnaire",
        },
        {
          type: "table",
          title: "Carte d'identité CLINICARE",
          data: [
            { label: "Origine", value: "Suède — Formule cosméceutique révolutionnaire" },
            { label: "Positionnement", value: "Entre cosmétique classique et médecine esthétique" },
            { label: "Certifications", value: "ISO 9001 (qualité) et ISO 14001 (environnement)" },
            { label: "Distribution France", value: "STD Cosmétique — www.cliniccarefrance.com" },
          ],
        },
        {
          type: "text",
          title: "La promesse CLINICARE",
          content: "Offrir des résultats visibles et durables grâce à des formules combinant actifs haute technologie et extraits naturels.",
          style: "quote",
        },
        {
          type: "grid",
          title: "Les 4 gammes principales",
          items: [
            { name: "REFRESH", benefit: "Anti-âge, Rajeunissement", icon: "🔴" },
            { name: "GLOW", benefit: "Éclat, Anti-taches", icon: "🟢" },
            { name: "PURE", benefit: "Peaux sensibles, Anti-acné", icon: "🔵" },
            { name: "TIGHT", benefit: "Fermeté, Lifting", icon: "🟣" },
          ],
        },
      ],
    },
  },
  {
    id: "M1-L3",
    title: "La différence clé",
    description: "Cosmétique vs Cosméceutique",
    type: LessonType.THEORY,
    duration: 15,
    xpReward: 15,
    order: 3,
    content: {
      slides: [
        {
          type: "comparison",
          title: "Cosmétique vs Cosméceutique",
          left: {
            title: "Cosmétique classique",
            items: [
              "Concentration actifs : Faible (marketing)",
              "Pénétration : Superficie (épiderme)",
              "Résultats : Confort immédiat",
              "Équivalent : Supermarché/Parfumerie",
            ],
          },
          right: {
            title: "Cosméceutique CLINICARE",
            items: [
              "Concentration actifs : Élevée (efficacité prouvée)",
              "Pénétration : Profonde (derme)",
              "Résultats : Transformation visible",
              "Équivalent : Médecine esthétique",
            ],
            highlight: true,
          },
        },
        {
          type: "keypoint",
          title: "L'argument clé",
          content: "CLINICARE contient la même concentration d'actifs que les traitements injectables, sans aiguille.",
          icon: "💉",
        },
      ],
    },
  },
  {
    id: "M1-L4",
    title: "Créer ma phrase signature",
    description: "Exercice pratique",
    type: LessonType.EXERCISE,
    duration: 10,
    xpReward: 20,
    order: 4,
    content: {
      slides: [
        {
          type: "text",
          title: "Exercice pratique",
          content: "Complétez cette phrase avec vos propres mots : ClinicCare, c'est une marque __________ qui __________ grâce à __________.",
        },
        {
          type: "list",
          title: "Exemples de réponses",
          items: [
            { icon: "💬", text: "« ...cosméceutique suédoise qui rajeunit visiblement la peau grâce à des concentrations actives de niveau médical. »" },
            { icon: "💬", text: "« ...professionnelle qui répare et régénère grâce au facteur de croissance EGF. »" },
            { icon: "💬", text: "« ...scientifique qui transforme la peau grâce à l'acide hyaluronique à faible poids moléculaire. »" },
          ],
        },
      ],
    },
  },
  {
    id: "M1-L5",
    title: "L'EGF (Facteur de Croissance Épidermique)",
    description: "Pilier scientifique N°1",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 15,
    order: 5,
    content: {
      slides: [
        {
          type: "hero",
          title: "PILIER N°1",
          content: "L'EGF - Epidermal Growth Factor",
        },
        {
          type: "definition",
          title: "Qu'est-ce que l'EGF ?",
          content: "Protéine naturellement présente dans notre peau qui stimule le renouvellement cellulaire et la synthèse de collagène. Nom INCI : sh-Oligopeptide-1",
        },
        {
          type: "list",
          title: "Les actions de l'EGF",
          items: [
            { icon: "🔄", text: "Stimule la prolifération des kératinocytes" },
            { icon: "✨", text: "Accélère la cicatrisation" },
            { icon: "⏳", text: "Diminue naturellement avec l'âge (d'où le vieillissement)" },
            { icon: "✅", text: "Présent dans TOUS les produits CLINICARE" },
          ],
        },
        {
          type: "argument",
          title: "Argument de vente",
          content: "L'EGF stimule naturellement le renouvellement de votre peau, comme si vous pouviez remonter le temps cellulaire.",
        },
        {
          type: "fact",
          title: "Le saviez-vous ?",
          content: "L'EGF a valu le Prix Nobel de médecine à Stanley Cohen en 1986 pour sa découverte.",
          icon: "🏆",
        },
      ],
    },
  },
  {
    id: "M1-L6",
    title: "Le LMWHA (Acide Hyaluronique)",
    description: "Pilier scientifique N°2",
    type: LessonType.THEORY,
    duration: 15,
    xpReward: 15,
    order: 6,
    content: {
      slides: [
        {
          type: "hero",
          title: "PILIER N°2",
          content: "LMWHA - Low Molecular Weight Hyaluronic Acid",
        },
        {
          type: "definition",
          title: "Qu'est-ce que le LMWHA ?",
          content: "Contrairement à l'acide hyaluronique classique, le LMWHA a un poids moléculaire réduit permettant une pénétration profonde dans la peau.",
        },
        {
          type: "comparison",
          title: "AH classique vs LMWHA",
          left: {
            title: "AH Classique",
            items: ["Grosses molécules", "Reste en surface", "Hydratation superficielle", "Effet temporaire"],
          },
          right: {
            title: "LMWHA CLINICARE",
            items: ["Petites molécules", "Pénètre en profondeur", "Hydrate les couches profondes", "Effet repulpant visible"],
            highlight: true,
          },
        },
        {
          type: "keypoint",
          title: "L'argument massue",
          content: "CLINICARE utilise la même concentration d'acide hyaluronique que les fillers injectables, sans aiguille !",
          icon: "💉",
        },
      ],
    },
  },
  {
    id: "M1-L7",
    title: "Les actifs botaniques",
    description: "Pilier scientifique N°3",
    type: LessonType.THEORY,
    duration: 15,
    xpReward: 15,
    order: 7,
    content: {
      slides: [
        {
          type: "hero",
          title: "PILIER N°3",
          content: "Les Actifs Botaniques",
        },
        {
          type: "text",
          title: "La philosophie CLINICARE",
          content: "Combiner le meilleur de la science et de la nature : des actifs botaniques rigoureusement sélectionnés et dosés scientifiquement pour une efficacité maximale et une tolérance optimale.",
        },
        {
          type: "grid",
          title: "Les stars botaniques",
          items: [
            { name: "Centella Asiatica", benefit: "Cicatrisant, raffermissant", icon: "🌱" },
            { name: "Camomille", benefit: "Anti-inflammatoire", icon: "🌼" },
            { name: "Thé vert", benefit: "Antioxydant puissant", icon: "🍃" },
            { name: "Réglisse", benefit: "Éclaircissant, apaisant", icon: "🌾" },
            { name: "Pourpier", benefit: "Apaisant, antioxydant", icon: "🥬" },
          ],
        },
        {
          type: "argument",
          title: "Argument de vente",
          content: "Le meilleur de la nature, dosé scientifiquement pour des résultats prouvés.",
        },
      ],
    },
  },
  {
    id: "M1-L8",
    title: "Les actifs récurrents CLINICARE",
    description: "Glossaire des actifs clés",
    type: LessonType.THEORY,
    duration: 15,
    xpReward: 15,
    order: 8,
    content: {
      slides: [
        {
          type: "table",
          title: "Glossaire des actifs clés",
          data: [
            { label: "Pourpier maraîcher", value: "Apaisant, antioxydant — Quasi tous" },
            { label: "Beta Glucan", value: "Régénérant, immunostimulant — Ampoules" },
            { label: "Centella Asiatica", value: "Cicatrisant, raffermissant — Tous" },
            { label: "Camomille", value: "Anti-inflammatoire — Tous" },
            { label: "Thé vert", value: "Antioxydant puissant — Tous" },
            { label: "Réglisse", value: "Éclaircissant, apaisant — Gamme GLOW" },
            { label: "Allantoine", value: "Cicatrisant, adoucissant — Tous" },
          ],
        },
        {
          type: "keypoint",
          title: "Conseil pro",
          content: "Quand une cliente vous demande la composition, focalisez-vous sur 2-3 actifs clés et leurs bénéfices concrets. Trop d'information tue l'information !",
          icon: "💡",
        },
      ],
    },
  },
  {
    id: "M1-L9",
    title: "Quiz de validation Module 1",
    description: "Testez vos connaissances",
    type: LessonType.QUIZ,
    duration: 15,
    xpReward: 25,
    order: 9,
    content: {
      slides: [
        {
          type: "hero",
          title: "Quiz Module 1",
          content: "Testez vos connaissances sur la marque CLINICARE",
        },
        {
          type: "text",
          title: "Instructions",
          content: "Ce quiz comporte 8 questions. Vous devez obtenir au moins 80% pour valider le module. Bonne chance !",
        },
      ],
    },
  },
];

// ============ MODULE 2 : Gamme GLOW ============
const MODULE_2 = {
  id: "M2",
  title: "Gamme GLOW - Anti-pigmentaire & Éclat",
  description: "Maîtrisez la gamme GLOW : produits, actifs éclaircissants et protocoles anti-taches",
  duration: 150,
  level: DifficultyLevel.INTERMEDIATE,
  order: 2,
  color: "#2E8B57",
  icon: "Sparkles",
  xpReward: 150,
};

const MODULE_2_LESSONS = [
  {
    id: "M2-L1",
    title: "Introduction à la gamme GLOW",
    description: "Pourquoi ce module est crucial",
    type: LessonType.INTRO,
    duration: 10,
    xpReward: 10,
    order: 1,
    content: {
      slides: [
        {
          type: "question",
          title: "Question d'ouverture",
          content: "Combien d'entre vous ont réussi à proposer une solution efficace à une cliente désespérée par ses taches brunes ?",
        },
        {
          type: "list",
          title: "Pourquoi ce module est crucial",
          items: [
            { icon: "🥇", text: "N°1 : Problèmes pigmentaires = demande n°1 après l'anti-âge" },
            { icon: "📈", text: "+15% : Croissance annuelle du marché" },
            { icon: "💎", text: "Premium : Une experte en pigmentation = positionnement haut de gamme" },
          ],
        },
        {
          type: "objectives",
          title: "À la fin de ce module, vous saurez :",
          items: [
            { text: "Identifier les 6 produits de la gamme GLOW" },
            { text: "Expliquer le mécanisme de la pigmentation cutanée" },
            { text: "Argumenter les actifs éclaircissants (Arbutine, Acide kojique, Mûrier blanc)" },
            { text: "Recommander le protocole GLOW adapté" },
          ],
        },
      ],
    },
  },
  {
    id: "M2-L2",
    title: "Comprendre la pigmentation cutanée",
    description: "Le mécanisme de la pigmentation",
    type: LessonType.THEORY,
    duration: 25,
    xpReward: 15,
    order: 2,
    content: {
      slides: [
        {
          type: "hero",
          title: "La pigmentation",
          content: "Comprendre pour mieux traiter",
        },
        {
          type: "list",
          title: "Le mécanisme de la pigmentation",
          items: [
            { icon: "1️⃣", text: "Stimulation : UV/inflammation → signal aux mélanocytes" },
            { icon: "2️⃣", text: "Production : Tyrosinase activée → production mélanine" },
            { icon: "3️⃣", text: "Transfert : Mélanine transférée aux kératinocytes" },
            { icon: "4️⃣", text: "Migration : Kératinocytes remontent en surface = tache visible" },
          ],
        },
        {
          type: "keypoint",
          title: "La cible n°1",
          content: "La TYROSINASE est l'enzyme clé. Tous les actifs GLOW visent à l'inhiber pour bloquer la production de mélanine à la source.",
          icon: "🎯",
        },
        {
          type: "table",
          title: "Types de taches",
          data: [
            { label: "Lentigos solaires", value: "UV cumulés — Bords nets — Bon pronostic" },
            { label: "Mélasma", value: "Hormones + UV — Plaques symétriques — Récidivant" },
            { label: "PIH", value: "Acné, blessure — Zone ancienne lésion — Variable" },
            { label: "Éphélides", value: "Génétique — Taches de rousseur — Stable" },
          ],
        },
      ],
    },
  },
  {
    id: "M2-L3",
    title: "Les 6 produits de la gamme GLOW",
    description: "La gamme GLOW complète",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 15,
    order: 3,
    content: {
      slides: [
        {
          type: "hero",
          title: "La gamme GLOW",
          content: "6 produits pour un teint uniforme",
        },
        {
          type: "grid",
          title: "Les produits GLOW",
          items: [
            { name: "Ampoules EGF GLOW", benefit: "Traitement intensif cabine", icon: "💉" },
            { name: "Tonique GLOW", benefit: "Après nettoyage, 1-2 gouttes", icon: "💧" },
            { name: "Essence GLOW", benefit: "Matin/soir, 1-2 gouttes", icon: "✨" },
            { name: "Sérum GLOW", benefit: "Après essence, 1-2 gouttes", icon: "🧴" },
            { name: "EGF Glow Mask", benefit: "15-20 min après procédure", icon: "🎭" },
            { name: "Peeling GLOW", benefit: "Usage professionnel uniquement", icon: "⚗️" },
          ],
        },
        {
          type: "warning",
          title: "Important",
          content: "Le Peeling GLOW et les Ampoules EGF sont réservés à l'usage professionnel en cabine.",
        },
      ],
    },
  },
  {
    id: "M2-L4",
    title: "Les actifs éclaircissants",
    description: "Arguments de vente",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 15,
    order: 4,
    content: {
      slides: [
        {
          type: "table",
          title: "Les actifs clés GLOW",
          data: [
            { label: "Arbutine (Busserole)", value: "Inhibe la tyrosinase de façon réversible" },
            { label: "Acide kojique (Champignons)", value: "Inhibe la tyrosinase + chélate le cuivre" },
            { label: "Mûrier blanc (Morus alba)", value: "Inhibe la tyrosinase naturellement" },
            { label: "Yuzu / Orange Jeju", value: "Inhibe la tyrosinase + antioxydant" },
          ],
        },
        {
          type: "argument",
          title: "L'argument Arbutine",
          content: "Bloque la fabrication de mélanine à la source, naturellement. Très bien tolérée, c'est l'alternative à l'hydroquinone.",
        },
        {
          type: "argument",
          title: "L'argument Acide kojique",
          content: "Utilisé au Japon depuis des siècles pour un teint de porcelaine. Double action dépigmentante.",
        },
        {
          type: "keypoint",
          title: "La force de GLOW",
          content: "CLINICARE combine 4 actifs anti-tyrosinase à concentration professionnelle. C'est comme comparer un sérum de supermarché à un soin de médecine esthétique.",
          icon: "💪",
        },
      ],
    },
  },
  {
    id: "M2-L5",
    title: "Le Peeling GLOW en détail",
    description: "Composition et avantages",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 15,
    order: 5,
    content: {
      slides: [
        {
          type: "hero",
          title: "Peeling GLOW",
          content: "Peeling chimique superficiel doux",
        },
        {
          type: "table",
          title: "Composition du Peeling",
          data: [
            { label: "Acide glycolique", value: "28%" },
            { label: "Acide mandélique", value: "6%" },
            { label: "Acide kojique", value: "4%" },
            { label: "Arbutine", value: "2%" },
            { label: "pH", value: "1.7 (acide)" },
          ],
        },
        {
          type: "comparison",
          title: "Avantages vs peelings classiques",
          left: {
            title: "Peelings classiques",
            items: ["Douleur intense", "Rougeurs importantes", "Desquamation visible", "Maquillage interdit 7 jours"],
          },
          right: {
            title: "Peeling GLOW",
            items: ["50% moins de douleur", "Quasi aucune rougeur", "Desquamation invisible", "Maquillage possible dès J+1"],
            highlight: true,
          },
        },
        {
          type: "warning",
          title: "Contre-indications absolues",
          content: "Grossesse/allaitement • Plaie ouverte, infection • Allergie aux AHA • Traitement Roaccutane",
        },
      ],
    },
  },
  {
    id: "M2-L6",
    title: "Protocole cabine GLOW",
    description: "Les 8 étapes du soin",
    type: LessonType.THEORY,
    duration: 25,
    xpReward: 20,
    order: 6,
    content: {
      slides: [
        {
          type: "hero",
          title: "Protocole Éclat Anti-taches",
          content: "45-60 minutes de soin",
        },
        {
          type: "list",
          title: "Les 8 étapes",
          items: [
            { icon: "1️⃣", text: "Cleansing Lotion (5 min) — Effleurages doux" },
            { icon: "2️⃣", text: "Concentrated Cleansing Foam (3 min) — Mousse légère, rinçage" },
            { icon: "3️⃣", text: "Tonique GLOW (2 min) — Coton ou mains" },
            { icon: "4️⃣", text: "Peeling GLOW optionnel (5-10 min) — Pinceau, neutraliser" },
            { icon: "5️⃣", text: "Ampoules EGF GLOW (10 min) — Airbrush ou massage" },
            { icon: "6️⃣", text: "2-in-1 Massage Cream (15 min) — Manœuvres drainantes" },
            { icon: "7️⃣", text: "EGF Glow Mask (15-20 min) — Couche épaisse" },
            { icon: "8️⃣", text: "Sérum GLOW + SPF50 (5 min) — Protection finale" },
          ],
        },
        {
          type: "keypoint",
          title: "Conseil d'experte",
          content: "Le Peel Blender permet d'ajuster l'intensité du peeling selon la sensibilité de la cliente. N'hésitez pas à commencer doucement !",
          icon: "💡",
        },
      ],
    },
  },
  {
    id: "M2-L7",
    title: "Routine domicile & argumentation",
    description: "Conseils et objections",
    type: LessonType.THEORY,
    duration: 15,
    xpReward: 15,
    order: 7,
    content: {
      slides: [
        {
          type: "comparison",
          title: "Routine domicile GLOW",
          left: {
            title: "Matin",
            items: ["Tonique GLOW (1-2 gouttes)", "Essence GLOW (1-2 gouttes)", "SPF 50 (CRITIQUE !)"],
          },
          right: {
            title: "Soir",
            items: ["Tonique GLOW (1-2 gouttes)", "Essence GLOW (1-2 gouttes)", "Sérum GLOW (1-2 gouttes)"],
            highlight: false,
          },
        },
        {
          type: "warning",
          title: "⚠️ MESSAGE CLÉ À MARTELER",
          content: "Sans SPF quotidien, tous vos efforts seront anéantis. Le soleil refabrique les taches plus vite qu'on ne les efface !",
        },
        {
          type: "list",
          title: "Réponses aux objections",
          items: [
            { icon: "💰", text: "« C'est cher » → 50ml = 3-4 mois, soit moins de 1€/jour" },
            { icon: "🤔", text: "« J'ai déjà essayé » → CLINICARE = concentration professionnelle" },
            { icon: "⏱️", text: "« Combien de temps ? » → 4-6 semaines premiers résultats" },
            { icon: "😰", text: "« J'ai peur que ça irrite » → Arbutine très bien tolérée" },
          ],
        },
      ],
    },
  },
  {
    id: "M2-L8",
    title: "Quiz de validation Module 2",
    description: "Testez vos connaissances GLOW",
    type: LessonType.QUIZ,
    duration: 20,
    xpReward: 30,
    order: 8,
    content: {
      slides: [
        {
          type: "hero",
          title: "Quiz Module 2",
          content: "Testez vos connaissances sur la gamme GLOW",
        },
        {
          type: "text",
          title: "Instructions",
          content: "Ce quiz comporte 8 questions. Vous devez obtenir au moins 80% pour valider le module. Bonne chance !",
        },
      ],
    },
  },
];

// ============ MODULE 6 : Protocoles Laser ============
const MODULE_6 = {
  id: "M6",
  title: "Protocoles Laser - RESOLVE, FRAX, ZOOM",
  description: "Maîtrisez les paramètres et protocoles des traitements laser en cabine",
  duration: 180,
  level: DifficultyLevel.ADVANCED,
  order: 6,
  color: "#8B0000",
  icon: "Zap",
  xpReward: 200,
};

const MODULE_6_LESSONS = [
  {
    id: "M6-L1",
    title: "Introduction aux lasers esthétiques",
    description: "Principes fondamentaux",
    type: LessonType.INTRO,
    duration: 15,
    xpReward: 15,
    order: 1,
    content: {
      slides: [
        {
          type: "hero",
          title: "Lasers Esthétiques",
          content: "RESOLVE - FRAX - ZOOM",
        },
        {
          type: "question",
          title: "Question d'ouverture",
          content: "Quelle est votre plus grande appréhension concernant l'utilisation des lasers en cabine ?",
        },
        {
          type: "list",
          title: "Pourquoi maîtriser les lasers ?",
          items: [
            { icon: "💎", text: "Premium : Les soins laser représentent le segment le plus rentable" },
            { icon: "🎯", text: "Résultats : Efficacité supérieure aux soins cosmétiques seuls" },
            { icon: "⚡", text: "Technologie : Positionnement haut de gamme" },
          ],
        },
        {
          type: "objectives",
          title: "À la fin de ce module, vous saurez :",
          items: [
            { text: "Comprendre les principes de base des 3 types de laser" },
            { text: "Maîtriser les paramètres séance par séance" },
            { text: "Identifier les contre-indications absolues et relatives" },
            { text: "Appliquer les protocoles de sécurité" },
          ],
        },
      ],
    },
  },
  {
    id: "M6-L2",
    title: "Les 3 types de laser",
    description: "RESOLVE, FRAX et ZOOM",
    type: LessonType.THEORY,
    duration: 25,
    xpReward: 20,
    order: 2,
    content: {
      slides: [
        {
          type: "hero",
          title: "3 Lasers, 3 Actions",
          content: "Chaque laser a ses indications spécifiques",
        },
        {
          type: "grid",
          title: "Vue d'ensemble",
          items: [
            { name: "RESOLVE", benefit: "Fractionné non-ablatif 1540nm", icon: "🔴" },
            { name: "FRAX", benefit: "Fractionné ablatif CO2 10600nm", icon: "🟢" },
            { name: "ZOOM", benefit: "Q-Switched Nd:YAG 1064/532nm", icon: "🔵" },
          ],
        },
        {
          type: "comparison",
          title: "Non-ablatif vs Ablatif",
          left: {
            title: "Non-ablatif (RESOLVE)",
            items: [
              "Ne détruit pas l'épiderme",
              "Chauffe le derme en profondeur",
              "Downtime minimal (1-2 jours)",
              "Séances multiples nécessaires",
            ],
          },
          right: {
            title: "Ablatif (FRAX)",
            items: [
              "Crée des microcanaux dans l'épiderme",
              "Vaporise les tissus superficiels",
              "Downtime important (7-10 jours)",
              "Résultats plus spectaculaires",
            ],
            highlight: true,
          },
        },
        {
          type: "keypoint",
          title: "Le laser Q-Switched (ZOOM)",
          content: "Émet des impulsions ultra-courtes (nanosecondes) qui fragmentent les pigments sans endommager les tissus environnants. Idéal pour les taches pigmentaires et les tatouages.",
          icon: "⚡",
        },
      ],
    },
  },
  {
    id: "M6-L3",
    title: "Protocole RESOLVE",
    description: "Paramètres et indications",
    type: LessonType.THEORY,
    duration: 25,
    xpReward: 25,
    order: 3,
    content: {
      slides: [
        {
          type: "hero",
          title: "RESOLVE",
          content: "Laser fractionné non-ablatif 1540nm",
        },
        {
          type: "list",
          title: "Indications RESOLVE",
          items: [
            { icon: "✅", text: "Rides fines et ridules" },
            { icon: "✅", text: "Texture irrégulière de la peau" },
            { icon: "✅", text: "Cicatrices d'acné légères à modérées" },
            { icon: "✅", text: "Pores dilatés" },
            { icon: "✅", text: "Relâchement cutané léger" },
          ],
        },
        {
          type: "table",
          title: "Paramètres par séance",
          data: [
            { label: "Séance 1", value: "20-25 mJ | 10-12 J/cm² | 20% | Spot 7mm" },
            { label: "Séance 2", value: "25-30 mJ | 12-14 J/cm² | 25% | Spot 7mm" },
            { label: "Séance 3", value: "30-35 mJ | 14-16 J/cm² | 30% | Spot 7mm" },
            { label: "Séance 4", value: "35-40 mJ | 16-18 J/cm² | 30-35% | Spot 7mm" },
          ],
        },
        {
          type: "keypoint",
          title: "Protocole recommandé",
          content: "3-6 séances espacées de 4-6 semaines. Toujours commencer par les paramètres les plus doux pour évaluer la tolérance.",
          icon: "📋",
        },
        {
          type: "fact",
          title: "Phototypes compatibles",
          content: "I à IV (prudence extrême sur phototype V)",
          icon: "🎯",
        },
      ],
    },
  },
  {
    id: "M6-L4",
    title: "Protocole FRAX",
    description: "Resurfacing intensif CO2",
    type: LessonType.THEORY,
    duration: 25,
    xpReward: 25,
    order: 4,
    content: {
      slides: [
        {
          type: "hero",
          title: "FRAX",
          content: "Laser fractionné ablatif CO2 10600nm",
        },
        {
          type: "list",
          title: "Indications FRAX",
          items: [
            { icon: "✅", text: "Rides profondes et sillons" },
            { icon: "✅", text: "Cicatrices atrophiques profondes" },
            { icon: "✅", text: "Vergetures anciennes" },
            { icon: "✅", text: "Photo-vieillissement sévère" },
            { icon: "✅", text: "Kératoses actiniques" },
          ],
        },
        {
          type: "table",
          title: "Paramètres par séance",
          data: [
            { label: "Séance 1", value: "15-20 mJ | 150-200 mJ/microspot | 10-15%" },
            { label: "Séance 2", value: "20-25 mJ | 200-250 mJ/microspot | 15-20%" },
            { label: "Séance 3", value: "25-30 mJ | 250-300 mJ/microspot | 20-25%" },
          ],
        },
        {
          type: "warning",
          title: "⚠️ Précautions spécifiques FRAX",
          content: "• Anesthésie topique OBLIGATOIRE\n• Photos avant/après obligatoires\n• Arrêt rétinoides 1 mois avant\n• CONTRE-INDIQUÉ phototypes V-VI",
        },
        {
          type: "keypoint",
          title: "Suites attendues",
          content: "Érythème intense J1-J3, desquamation J3-J7, éviction sociale recommandée 7-10 jours. Résultats visibles dès J14.",
          icon: "📆",
        },
      ],
    },
  },
  {
    id: "M6-L5",
    title: "Protocole ZOOM",
    description: "Lésions pigmentaires Q-Switched",
    type: LessonType.THEORY,
    duration: 25,
    xpReward: 25,
    order: 5,
    content: {
      slides: [
        {
          type: "hero",
          title: "ZOOM",
          content: "Laser Q-Switched Nd:YAG 1064/532nm",
        },
        {
          type: "list",
          title: "Indications ZOOM",
          items: [
            { icon: "✅", text: "Taches solaires (lentigos)" },
            { icon: "✅", text: "Taches de vieillesse" },
            { icon: "✅", text: "Mélasma superficiel (prudence !)" },
            { icon: "✅", text: "Tatouages (toutes couleurs)" },
            { icon: "✅", text: "Taches de rousseur (éphélides)" },
          ],
        },
        {
          type: "table",
          title: "Paramètres par séance",
          data: [
            { label: "Séance 1", value: "2.5-3.0 J/cm² | Spot 3mm | 1 passage" },
            { label: "Séance 2", value: "3.0-3.5 J/cm² | Spot 3mm | 1 passage" },
            { label: "Séance 3", value: "3.5-4.0 J/cm² | Spot 3mm | 1 passage" },
          ],
        },
        {
          type: "keypoint",
          title: "Endpoint clinique",
          content: "Blanchiment immédiat de la tache = bon résultat. Si pas de blanchiment après 2 passages, ne pas insister !",
          icon: "🎯",
        },
        {
          type: "warning",
          title: "⚠️ Règle d'or ZOOM",
          content: "Distance pièce à main : 1-2 cm MAXIMUM de la peau. Au-delà, perte d'efficacité. En-deçà, risque de brûlure.",
        },
      ],
    },
  },
  {
    id: "M6-L6",
    title: "Contre-indications laser",
    description: "Sécurité patient",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 20,
    order: 6,
    content: {
      slides: [
        {
          type: "hero",
          title: "Contre-indications",
          content: "La sécurité avant tout",
        },
        {
          type: "table",
          title: "Contre-indications ABSOLUES",
          data: [
            { label: "Grossesse / Allaitement", value: "🔴 STOP - Reporter le traitement" },
            { label: "Traitement Roaccutane < 6 mois", value: "🔴 STOP - Risque cicatriciel" },
            { label: "Infection cutanée active", value: "🔴 STOP - Traiter d'abord" },
            { label: "Herpès actif (face)", value: "🔴 STOP - Prophylaxie antivirale" },
            { label: "Cancer cutané", value: "🔴 STOP - Avis médical obligatoire" },
          ],
        },
        {
          type: "table",
          title: "Contre-indications RELATIVES",
          data: [
            { label: "Peau bronzée récente", value: "🟡 ATTENDRE 4-6 semaines" },
            { label: "Phototype VI", value: "🟡 PRUDENCE extrême - test obligatoire" },
            { label: "Antécédent herpès", value: "🔵 PROPHYLAXIE antivirale 5 jours avant" },
            { label: "Peau sensibilisée (peeling récent)", value: "🟡 ATTENDRE cicatrisation complète" },
          ],
        },
        {
          type: "keypoint",
          title: "Règle d'or",
          content: "Dans le doute, NE PAS TRAITER. Il vaut mieux reporter une séance que créer une complication.",
          icon: "⚖️",
        },
      ],
    },
  },
  {
    id: "M6-L7",
    title: "Protocole de sécurité cabine",
    description: "Checklist obligatoire",
    type: LessonType.THEORY,
    duration: 20,
    xpReward: 20,
    order: 7,
    content: {
      slides: [
        {
          type: "hero",
          title: "Sécurité Laser",
          content: "Checklist avant chaque séance",
        },
        {
          type: "list",
          title: "AVANT la séance",
          items: [
            { icon: "☑️", text: "Vérifier le consentement éclairé signé" },
            { icon: "☑️", text: "Revoir les contre-indications avec le patient" },
            { icon: "☑️", text: "Installer la signalétique LASER sur la porte" },
            { icon: "☑️", text: "Préparer les lunettes de protection (patient + opérateur)" },
            { icon: "☑️", text: "Retirer bijoux métalliques de la zone" },
            { icon: "☑️", text: "Vérifier l'absence de maquillage/crème" },
          ],
        },
        {
          type: "list",
          title: "PENDANT la séance",
          items: [
            { icon: "👁️", text: "Lunettes portées en PERMANENCE" },
            { icon: "💨", text: "Aspiration des fumées si laser ablatif" },
            { icon: "❄️", text: "Refroidissement si nécessaire (air froid, gel)" },
            { icon: "📢", text: "Communication constante avec le patient" },
          ],
        },
        {
          type: "list",
          title: "APRÈS la séance",
          items: [
            { icon: "🧊", text: "Application crème apaisante" },
            { icon: "☀️", text: "Rappel SPF 50 obligatoire" },
            { icon: "📝", text: "Consignes post-traitement écrites" },
            { icon: "📅", text: "Programmation séance suivante" },
          ],
        },
        {
          type: "warning",
          title: "⚠️ Équipement de sécurité",
          content: "Extincteur CO2 à proximité obligatoire. Ne jamais laisser le laser sans surveillance quand il est allumé.",
        },
      ],
    },
  },
  {
    id: "M6-L8",
    title: "Quiz de validation Module 6",
    description: "Testez vos connaissances Laser",
    type: LessonType.QUIZ,
    duration: 25,
    xpReward: 35,
    order: 8,
    content: {
      slides: [
        {
          type: "hero",
          title: "Quiz Module 6",
          content: "Testez vos connaissances sur les protocoles laser",
        },
        {
          type: "text",
          title: "Instructions",
          content: "Ce quiz comporte 10 questions. Vous devez obtenir au moins 80% pour valider le module. Les questions portent sur les paramètres, contre-indications et protocoles de sécurité. Bonne chance !",
        },
      ],
    },
  },
];

// ============ BADGES ============
const BADGES = [
  {
    id: "novice",
    code: "novice",
    name: "🌱 Novice",
    description: "Terminer le Module 1",
    xpValue: 0,
    condition: "MODULE_1_COMPLETE",
  },
  {
    id: "glow-master",
    code: "glow-master",
    name: "✨ Glow Master",
    description: "Terminer le Module GLOW avec 100%",
    xpValue: 75,
    condition: "MODULE_2_PERFECT",
  },
  {
    id: "initie",
    code: "initie",
    name: "🌿 Initié(e)",
    description: "Terminer 3 modules",
    xpValue: 50,
    condition: "MODULES_3",
  },
  {
    id: "expert",
    code: "expert",
    name: "🌳 Expert(e)",
    description: "Terminer tous les modules",
    xpValue: 100,
    condition: "ALL_MODULES",
  },
  {
    id: "perfectionniste",
    code: "perfectionniste",
    name: "⭐ Perfectionniste",
    description: "100% à tous les quiz",
    xpValue: 150,
    condition: "ALL_QUIZZES_PERFECT",
  },
  {
    id: "assidu",
    code: "assidu",
    name: "🔥 Assidu(e)",
    description: "30 jours consécutifs",
    xpValue: 200,
    condition: "STREAK_30",
  },
  {
    id: "laser-expert",
    code: "laser-expert",
    name: "⚡ Expert Laser",
    description: "Terminer le Module Laser avec 100%",
    xpValue: 100,
    condition: "MODULE_6_PERFECT",
  },
];

async function main() {
  console.log("🌱 Seeding formation data...");

  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@clinicare.fr" },
    update: {},
    create: {
      email: "demo@clinicare.fr",
      password: hashedPassword,
      name: "Marie Demo",
      role: "ASSISTANT",
      xpPoints: 0,
      level: 1,
      streak: 0,
    },
  });
  console.log("✅ Demo user created:", demoUser.email);

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@clinicare.fr" },
    update: {},
    create: {
      email: "admin@clinicare.fr",
      password: adminPassword,
      name: "Admin CLINICARE",
      role: "ADMIN",
      xpPoints: 5000,
      level: 5,
      streak: 30,
    },
  });
  console.log("✅ Admin user created");

  // Create Module 1
  await prisma.module.upsert({
    where: { id: MODULE_1.id },
    update: MODULE_1,
    create: MODULE_1,
  });
  console.log("✅ Module 1 created:", MODULE_1.title);

  // Create Module 1 lessons
  for (const lesson of MODULE_1_LESSONS) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: { ...lesson, moduleId: MODULE_1.id },
      create: { ...lesson, moduleId: MODULE_1.id },
    });
  }
  console.log(`✅ ${MODULE_1_LESSONS.length} lessons created for Module 1`);

  // Create Module 2
  await prisma.module.upsert({
    where: { id: MODULE_2.id },
    update: MODULE_2,
    create: MODULE_2,
  });
  console.log("✅ Module 2 created:", MODULE_2.title);

  // Create Module 2 lessons
  for (const lesson of MODULE_2_LESSONS) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: { ...lesson, moduleId: MODULE_2.id },
      create: { ...lesson, moduleId: MODULE_2.id },
    });
  }
  console.log(`✅ ${MODULE_2_LESSONS.length} lessons created for Module 2`);

  // Create Module 6 (Laser)
  await prisma.module.upsert({
    where: { id: MODULE_6.id },
    update: MODULE_6,
    create: MODULE_6,
  });
  console.log("✅ Module 6 created:", MODULE_6.title);

  // Create Module 6 lessons
  for (const lesson of MODULE_6_LESSONS) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: { ...lesson, moduleId: MODULE_6.id },
      create: { ...lesson, moduleId: MODULE_6.id },
    });
  }
  console.log(`✅ ${MODULE_6_LESSONS.length} lessons created for Module 6`);

  // Create badges
  for (const badge of BADGES) {
    await prisma.badge.upsert({
      where: { id: badge.id },
      update: badge,
      create: badge,
    });
  }
  console.log(`✅ ${BADGES.length} badges created`);

  console.log("\n🎉 Formation seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
