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
    heroImage: "/creative/olympe/olympe-logo.svg",
    heroPosition: "bottom",
    heroBg: "",
    websiteUrl: "https://www.olympe-saas.com",
    description:
      "Every wealth advisor knows the feeling. The client meeting wraps up — a good one, an hour of trust built carefully — and then comes the part nobody talks about: the 45-minute admin tax. Notes to rewrite, a report to structure, tasks to extract, a follow-up email to draft. You glance at the clock and realize half your afternoon is gone, without moving a single client forward.\n\nThat’s the problem Olympe was built to solve.\n\nOlympe is a SaaS for independent French wealth advisors (CGPs). It connects to their video meetings — Zoom, Teams, Google Meet — or accepts an audio upload, then transcribes and generates a structured report in the native CGP format: meeting summary, key decisions, action items, next steps. The advisor reviews it in 2 minutes, exports to PDF or Word, and sends the follow-up email with one click.\n\nI designed and built the full marketing site: architecture, design system, UI components, six legal pages, and SEO — all from scratch in Next.js 16. The brand palette is a warm rust/terracotta, deliberately chosen to feel premium and human — a world away from the cold blues of most fintech.",
    descriptionFR:
      "Tout conseiller en gestion de patrimoine connaît ce moment. La réunion client se termine — une bonne heure, de la confiance construite patiemment — et arrive ce dont personne ne parle vraiment : la taxe administrative. Notes à rédiger, compte-rendu à structurer, tâches à extraire, email de suivi à composer. On regarde l’horloge et on réalise que l’après-midi est déjà entamée, sans avoir fait avancer un seul client.\n\nC’est ce problème qu’Olympe résout.\n\nOlympe est un SaaS vertical pour CGP indépendants français. Il se connecte aux réunions Zoom, Teams ou Meet — ou accepte un fichier audio — transcrit, et génère automatiquement un compte-rendu structuré au format CGP natif : synthèse, décisions clés, actions à mener, prochaines étapes. Le conseiller relit en 2 minutes, exporte en PDF ou Word, et envoie l’email de suivi en un clic.\n\nJ’ai conçu et développé l’intégralité du site marketing : architecture, design system, composants UI, six pages légales, SEO — de zéro sur Next.js 16. La palette est un rust/terracotta chaud, choisie pour paraître premium et humaine — loin des bleus froids de la fintech classique.",
    detailText:
      "The brief was clear: build something that makes wealth advisors’ lives measurably better, and looks like it means it.\n\nI started from a premium SaaS landing page template and rebuilt it from the ground up for OLYMPE — new brand, new editorial voice, new design system. The color story was one of the first decisions. I could have gone safe with dark blues or corporate greys. Instead I chose rust/terracotta (#c96b4e): warm, trustworthy, premium without the coldness of fintech defaults. The palette works in both light and dark mode with careful contrast tuning throughout.\n\nThe site is structured as a full conversion funnel. A Hero that hooks in three seconds (“Moins d’admin. Plus de clients.”). A Features Bento grid that shows the product rather than just describing it. A How It Works section with three crystal-clear steps. Auto-rotating testimonials in the authentic voice of a CGP. A Pricing section that’s direct and honest — no dark patterns, no buried asterisks. An FAQ that addresses real objections. A Footer with a clean call-to-action.\n\nBeyond the landing page, I wrote six secondary pages: a detailed Features breakdown with six anchored sections, a full Documentation guide, a Support page, Terms of Service, a GDPR-compliant Privacy Policy with all sub-processors listed (Supabase, Vercel, Deepgram, Anthropic, Stripe), and Legal Notice — all in plain French, no legalese.\n\nStack: Next.js 16 App Router, TypeScript strict mode, Tailwind CSS v4, Motion (ex-Framer Motion) for fluid animations, Lenis for buttery smooth scroll with dynamic offset handling, next-themes for dark mode. Zero backend, zero database — fully static, deployable to Vercel in one click.",
    detailTextFR:
      "Le brief était clair : construire quelque chose qui améliore mesurablement la vie des CGP, et qui le montre.\n\nJ’ai démarré d’un template de landing page SaaS premium et l’ai entièrement rebrandé pour OLYMPE — nouvelle identité, nouvelle voix éditoriale, nouveau design system. Le choix de couleur a été l’une des premières décisions. J’aurais pu aller sur du bleu corporate ou du gris institutionnel. J’ai choisi le rust/terracotta (#c96b4e) : chaud, crédible, premium sans la froideur de la fintech classique. La palette fonctionne en mode clair et sombre avec un soin particulier apporté aux contrastes.\n\nLe site est structuré comme un tunnel de conversion complet. Un Hero qui accroche en trois secondes (« Moins d’admin. Plus de clients. »). Un Features Bento qui montre le produit plutôt que de simplement l’expliquer. Un How It Works en trois étapes limpides. Des témoignages en rotation automatique dans la voix authentique d’un CGP. Un Pricing direct et honnête — zéro dark pattern, zéro astérisque caché. Une FAQ qui répond aux vraies objections. Un Footer avec un CTA propre.\n\nAu-delà de la landing page, j’ai rédigé six pages secondaires : Fonctionnalités détaillées avec six sections ancrées, Documentation complète, Support, CGU, Politique de confidentialité conforme RGPD avec tous les sous-traitants listés (Supabase, Vercel, Deepgram, Anthropic, Stripe), et Mentions légales — tout en français clair, sans jargon juridique.\n\nStack : Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, Motion pour les animations fluides, Lenis pour le scroll élégant avec offset dynamique, next-themes pour le dark mode. Zéro backend, zéro base de données — entièrement statique, déployable sur Vercel en un clic.",
    images: [],
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
