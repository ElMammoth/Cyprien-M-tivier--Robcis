export interface BeforeAfter {
  before: string;
  after: string;
  labelBefore?: string;
  labelAfter?: string;
}

export interface LogoVariation {
  src: string;
  label: string;
  labelFR?: string;
}

export interface PdfEmbed {
  src: string;
  titleEN: string;
  titleFR: string;
}

export interface CreativeProject {
  slug: string;
  title: string;
  titleFR: string;
  tagline: string;
  taglineFR: string;
  category: string;
  tags?: string[];
  date?: string;
  dateFR?: string;
  thumbnail: string;
  heroImage?: string;
  heroBg?: string;
  description: string;
  descriptionFR: string;
  images: string[];
  beforeAfter?: BeforeAfter;
  logoVariations?: {
    titleEN: string;
    titleFR: string;
    items: LogoVariation[];
  };
  pdfEmbed?: PdfEmbed;
  detailText?: string;
  detailTextFR?: string;
  websiteUrl?: string;
  faviconUrl?: string;
  /** YYYYMM for sorting (e.g. 202510 for October 2025). Higher = more recent. */
  sortDate?: number;
  /** Where to render the hero image relative to the text content. Defaults to 'top'. */
  heroPosition?: 'top' | 'bottom';
}

export const creativeProjects: CreativeProject[] = [
  {
    slug: "olympe-saas",
    title: "Olympe — SaaS for Wealth Advisors",
    titleFR: "Olympe — SaaS pour Conseillers en Gestion de Patrimoine",
    tagline: "From 45 minutes of admin to 2 minutes and a click",
    taglineFR: "45 minutes d’administratif réduit à 2 minutes et un clic",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "SaaS", "Dark Mode"],
    date: "April 2026",
    dateFR: "Avril 2026",
    sortDate: 202604,
    thumbnail: "/creative/olympe/olympe-logo.svg",
    heroImage: "/creative/olympe/olympe-cover.jpg",
    heroPosition: "top",
    heroBg: "",
    websiteUrl: "https://www.olympe-saas.com",
    faviconUrl: "/creative/olympe/olympe-favicon.ico",
    description:
      "The name came first. Growing up with Asterix & Obelix, the Vénérable du Sommet was a constant presence in the stories — untouchable, all-powerful, sitting above everything on his mountain. Mount Olympus. That image stuck. When it was time to name the product, Olympe felt inevitable: a premium ring, immediately clear, and that quiet authority that wealth management clients expect.\n\nThe problem it solves is real. After every client meeting, a French wealth advisor (CGP) spends 45 minutes on pure admin: writing the report, logging action items, drafting a follow-up email. Olympe connects to Zoom, Teams or Meet, transcribes the meeting, and generates the full structured report automatically. Review in 2 minutes, export, send. Done.\n\nI built the marketing site using Claude Code as my main development environment — with a custom project setup specifically configured for this codebase. For the brand visuals, I used Nanobanana Pro to generate imagery that genuinely matched the identity I’d built: warm, Mediterranean, premium without the coldness of typical fintech.",
    descriptionFR:
      "Le nom est venu en premier. En grandissant avec Astérix et Obélix, le Vénérable du Sommet revenait constamment dans les histoires — intouchable, tout-puissant, perché au-dessus de tout sur sa montagne. Le mont Olympe. Cette image est restée. Quand est venu le moment de nommer le produit, Olympe s’est imposé : une consonance premium, immédiatement lisible, et cette autorité tranquille que les clients des CGP attendent naturellement.\n\nLe problème qu’il résout est bien réel. Après chaque réunion client, un CGP passe 45 minutes sur de l’administratif pur : rédiger le compte-rendu, noter les actions, écrire l’email de suivi. Olympe se connecte à Zoom, Teams ou Meet, transcrit la réunion et utilise l’IA pour générer automatiquement le compte-rendu structuré. 2 minutes de relecture, un clic d’export, un clic d’envoi.",
    detailText:
      "The name came before the product — and it matters more than people think.\n\nGrowing up watching Asterix & Obelix, the Vénérable du Sommet was always there in the stories: all-powerful, untouchable, sitting above everything on his mountain. Mount Olympus. That image stayed with me. When it came time to name this SaaS, Olympe felt inevitable: it has a premium consonance, it’s immediately intelligible to a French ear, and it carries the kind of quiet authority that wealth management clients already associate with seriousness. You don’t have to explain it. It just sounds right.\n\nThe problem Olympe solves is one I took seriously from the start. After every client meeting, a French wealth advisor (CGP) faces 45 minutes of paperwork: structuring notes into a formal report, extracting action items, drafting a follow-up email that sounds professional without being robotic. It’s not complex work — but it’s exhausting, and it compounds every single week. Olympe connects to Zoom, Teams or Meet (or accepts a direct audio upload), transcribes the meeting via Deepgram, and passes the transcript to Claude (Anthropic’s AI) to generate the complete report in the native CGP format — summary, key decisions, tasks, next steps. The advisor reviews it in 2 minutes, exports to PDF or Word, sends the follow-up email with one click.\n\nFor the development workflow, I built a dedicated Claude Code environment specifically for this project — not just running the CLI, but configuring project-level hooks, custom context, and settings tuned to this codebase. That setup genuinely changed how I worked: faster iteration loops, less context-switching between thinking and typing, more space to focus on the design decisions that actually shape what the user experiences.\n\nFor the visual assets — the brand imagery that gives the landing page its warmth and atmosphere — I used Nanobanana Pro. Generating images that authentically reflect a brand is harder than it sounds. The Olympe palette is rust/terracotta (#c96b4e): warm, Mediterranean, premium without the coldness of most fintech defaults. Nanobanana Pro let me iterate in that direction and land on visuals that felt like they genuinely belonged to Olympe, not like stock photos borrowed from some other SaaS.\n\nThe site is a complete conversion funnel built from scratch in Next.js 16: Hero, Features Bento grid, How It Works, auto-rotating Testimonials, Pricing (Solo 89€/mo, Cabinet 179€/mo), FAQ, Footer. Beyond that: six secondary pages, including a detailed Features breakdown, full Documentation, Support, Terms of Service, a GDPR-compliant Privacy Policy with every sub-processor listed (Supabase, Vercel, Deepgram, Anthropic, Stripe), and Legal Notice. All in plain French. Zero backend. Fully static. Vercel in one click.",
    detailTextFR:
      "Le nom est venu avant le produit — et c’est plus important qu’il n’y paraît.\n\nEn grandissant avec Astérix et Obélix, les dieux de l’Olympe revenaient constamment dans les histoires : tout-puissants, intouchables, perchés au sommet de leur montagne. Le mont Olympe. Les vénérables au sommet. Cette image est restée. Quand est venu le moment de nommer ce SaaS, Olympe s’est imposé : une consonance premium, immédiatement lisible pour une oreille française, et cette autorité tranquille que les clients en gestion de patrimoine associent spontanément au sérieux. Pas besoin d’expliquer. Ça sonne juste.\n\nLe problème qu’Olympe résout, je l’ai pris au sérieux dès le départ. Après chaque réunion client, un CGP passe 45 minutes sur de l’administratif pur : structurer ses notes en compte-rendu formel, extraire les actions, rédiger un email de suivi qui sonne professionnel sans être robotique. Ce n’est pas un travail complexe — mais c’est épuisant, et ça s’accumule chaque semaine. Olympe se connecte à Zoom, Teams ou Meet (ou accepte un fichier audio), transcrit la réunion via Deepgram, puis passe la transcription à Claude (l'IA d'Anthropic) pour générer automatiquement le compte-rendu complet au format CGP natif : synthèse, décisions clés, actions, prochaines étapes. Le conseiller relit en 2 minutes, exporte en PDF ou Word, envoie l’email de suivi en un clic.\n\nPour le développement, j’ai construit un environnement Claude Code dédié spécifiquement à ce projet — pas juste lancer le CLI, mais configurer des hooks au niveau projet, du contexte sur mesure et des settings adaptés à cette base de code. Cet environnement a vraiment changé ma façon de travailler : des boucles d’itération plus rapides, moins de changements de contexte entre la réflexion et l’exécution, plus de place pour se concentrer sur les décisions de design qui façonnent vraiment l’expérience utilisateur.\n\nPour les visuels — les images de marque qui donnent sa chaleur et son atmosphère au site — j’ai utilisé Nanobanana Pro. Générer des images qui reflètent authentiquement une marque, c’est plus difficile qu’il n’y paraît. La palette Olympe est rust/terracotta (#c96b4e) : chaude, méditerranéenne, premium sans la froideur de la fintech classique. Nanobanana Pro m’a permis d’itérer dans cette direction et d’arriver à des visuels qui appartenaient vraiment à Olympe, pas à une banque de photos générique.\n\nLe site est un tunnel de conversion complet construit de zéro sur Next.js 16 : Hero, Features Bento, How It Works, Témoignages en rotation, Pricing (Solo 89€/mois, Cabinet 179€/mois), FAQ, Footer. Plus six pages secondaires : Fonctionnalités détaillées, Documentation, Support, CGU, Politique de confidentialité conforme RGPD avec tous les sous-traitants listés (Supabase, Vercel, Deepgram, Anthropic, Stripe), et Mentions légales. Tout en français clair. Zéro backend. Entièrement statique. Vercel en un clic.",
    images: ["/creative/olympe/olympe-dashboard.png"],
  },
  {
    slug: "finance-tracker-app",
    title: "Finance Tracker App",
    titleFR: "Finance Tracker App",
    tagline: "A personal finance app, from Illustrator to Xcode",
    taglineFR: "Une app de finances personnelles, d’Illustrator à Xcode",
    category: "Product Design & Development",
    tags: ["Illustrator", "Xcode", "Swift", "UI Design"],
    date: "October 2024",
    dateFR: "Octobre 2024",
    sortDate: 202410,
    thumbnail: "/creative/finance-tracker/Visuals_Finance_Tracker_App.png",
    heroImage: "/creative/finance-tracker/Visuals_Finance_Tracker_App.png",
    heroPosition: "bottom",
    heroBg: "",
    description:
      "I built this app because I already had an Excel spreadsheet to track my finances: budgeting, daily expenses, income - but opening a laptop every time felt tedious. I wanted something simple, clean, and always in my pocket.\n\nI started by designing the full UI in Illustrator, using native Apple components for a familiar feel. Then I coded it in Xcode, one of my first real coding projects, built with the early days of ChatGPT as a co-pilot.\n\nThe app has three core sections: a Dashboard (monthly overview of income vs. expenses), a Tracker (add expenses and income, see your live balance), and a Budget Planner (set spending and income targets). A Settings tab lets you choose your currency.",
    descriptionFR:
      "J’ai créé cette app parce que j’avais déjà un Excel pour tracker mes finances, budget, dépenses quotidiennes, revenus - mais ouvrir un ordi à chaque fois, c’était contraignant. Je voulais quelque chose de simple, propre, et toujours dans ma poche.\n\nJ’ai commencé par designer toute l’interface sur Illustrator, en utilisant les composants Apple natifs. Ensuite j’ai codé sur Xcode, un de mes premiers vrais projets de code, construit avec les débuts de ChatGPT comme co-pilote.\n\nL’app a trois sections : un Dashboard (vue mensuelle revenus/dépenses), un Tracker (ajouter dépenses et revenus, voir le solde en temps réel), et un Budget Planner (définir ses objectifs). Un onglet Settings pour choisir sa devise.",
    images: [],
  },
  {
    slug: "elljomi-logo-redesign",
    title: "Elljomi — Logo Redesign",
    titleFR: "Elljomi — Refonte du Logo",
    tagline: "Modernizing a Swiss catering brand",
    taglineFR: "Moderniser l’identité d’un traiteur suisse",
    category: "Branding",
    tags: ["Illustrator", "Brand Identity", "Logo Design"],
    date: "December 2024",
    dateFR: "Décembre 2024",
    sortDate: 202412,
    thumbnail: "/creative/elljomi/elljomi-logo-after-white.png",
    heroBg: "",
    websiteUrl: "https://elljomi.ch",
    description:
      "Elljomi is a Swiss catering company whose logo felt dated and visually heavy. The brief was simple: modernize it while keeping the brand’s identity intact. I kept the circular structure and the core elements — the chef’s hat, the wordmark, the stars — but stripped everything back. Lighter strokes, cleaner typography, more breathing room. The result is a logo that works on both light and dark backgrounds, scales properly at any size, and feels premium without losing its warmth. Delivered with a full brand guidelines document.",
    descriptionFR:
      "Elljomi est un traiteur suisse dont le logo paraissait daté et visuellement trop chargé. La mission : le moderniser tout en préservant l’identité de la marque. J’ai conservé la structure circulaire et les éléments clés — la toque, le wordmark, les étoiles — mais j’ai tout épuré. Traits plus fins, typographie plus claire, plus d’espace. Livré avec un document de brand guidelines complet.",
    detailText:
      "The original logo was a raster image — pixelated at large sizes and impossible to scale cleanly. The first step was to fully vectorize it in Illustrator, rebuilding every element from scratch as clean vector paths.\n\nBeyond vectorization, I redesigned the details while keeping the original DNA intact. The strokes are cleaner and more consistent. The chef’s hat is now better integrated into the composition, sitting more naturally above the wordmark. “Catering” moved to the right, the cutlery icon shifted left — creating better visual balance. The decorative swipe line underneath was removed entirely, as it hurt readability. The three stars went from white to gold, adding a touch of warmth and premium feel.",
    detailTextFR:
      "Le logo original était une image matricielle — pixelisée à grande taille et impossible à agrandir proprement. La première étape a été de le vectoriser entièrement dans Illustrator, en reconstruisant chaque élément en tracés vectoriels propres.\n\nAu-delà de la vectorisation, j’ai redesigné les détails tout en conservant l’ADN original. Les traits sont plus nets et cohérents. La toque est mieux intégrée dans la composition, placée plus naturellement au-dessus du wordmark. «Catering» a été déplacé à droite, les couverts à gauche — pour un meilleur équilibre visuel. La ligne décorative en bas a été supprimée, elle nuisait à la lisibilité. Les trois étoiles sont passées du blanc au jaune doré, apportant chaleur et élégance.",
    images: [],
    beforeAfter: {
      before: "/creative/elljomi/elljomi-logo-before.png",
      after: "/creative/elljomi/elljomi-logo-after-white.png",
      labelBefore: "BEFORE",
      labelAfter: "AFTER",
    },
    logoVariations: {
      titleEN: "Logo Variations",
      titleFR: "Variations du logo",
      items: [
        {
          src: "/creative/elljomi/elljomi-logo-after-white.png",
          label: "Primary",
          labelFR: "Principal",
        },
        {
          src: "/creative/elljomi/elljomi-logo-text.png",
          label: "Text Version",
          labelFR: "Version texte",
        },
        {
          src: "/creative/elljomi/elljomi-logo-mark.png",
          label: "Logo Mark",
          labelFR: "Symbole",
        },
      ],
    },
    pdfEmbed: {
      src: "/creative/elljomi/elljomi-guidelines.pdf",
      titleEN: "Brand Guidelines",
      titleFR: "Charte graphique",
    },
  },
  {
    slug: "caribbean-islands-comparison",
    title: "Caribbean Islands — Data Comparison",
    titleFR: "Îles Caraïbes — Comparaison de données",
    tagline: "Comparing economic indicators across three island nations",
    taglineFR: "Comparaison d’indicateurs économiques entre trois nations insulaires",
    category: "Data Visualization",
    tags: ["Data Visualization", "Academic", "Economics", "Illustrator"],
    date: "2025",
    dateFR: "2025",
    sortDate: 202500,
    thumbnail: "/creative/caribbean/map-caribbean.svg",
    description: "",
    descriptionFR: "",
    images: [],
  },
  {
    slug: "maldives-mauritius-comparison",
    title: "Maldives & Mauritius — Data Comparison",
    titleFR: "Maldives & Maurice — Comparaison de données",
    tagline: "Comparing two Indian Ocean island nations",
    taglineFR: "Comparaison de deux nations insulaires de l’océan Indien",
    category: "Data Visualization",
    tags: ["Data Visualization", "Academic", "Economics", "Illustrator"],
    date: "2025",
    dateFR: "2025",
    sortDate: 202501,
    thumbnail: "/creative/maldives-mauritius/map-maldives.svg",
    description: "",
    descriptionFR: "",
    images: [],
  },
];

export function getProjectBySlug(slug: string): CreativeProject | undefined {
  return creativeProjects.find((p) => p.slug === slug);
}
