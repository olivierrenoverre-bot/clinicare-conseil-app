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
