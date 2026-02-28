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
}

export const creativeProjects: CreativeProject[] = [
  {
    slug: "finance-tracker-app",
    title: "Finance Tracker App",
    titleFR: "Finance Tracker App",
    tagline: "A personal finance app, from Illustrator to Xcode",
    taglineFR: "Une app de finances personnelles, d\u2019Illustrator \u00E0 Xcode",
    category: "Product Design & Development",
    tags: ["Illustrator", "Xcode", "Swift", "UI Design"],
    date: "October 2024",
    dateFR: "Octobre 2024",
    thumbnail: "/creative/finance-tracker/Visuals_Finance_Tracker_App.png",
    heroImage: "/creative/finance-tracker/Visuals_Finance_Tracker_App.png",
    heroBg: "",
    description:
      "I built this app because I already had an Excel spreadsheet to track my finances: budgeting, daily expenses, income - but opening a laptop every time felt tedious. I wanted something simple, clean, and always in my pocket.\n\nI started by designing the full UI in Illustrator, using native Apple components for a familiar feel. Then I coded it in Xcode, one of my first real coding projects, built with the early days of ChatGPT as a co-pilot.\n\nThe app has three core sections: a Dashboard (monthly overview of income vs. expenses), a Tracker (add expenses and income, see your live balance), and a Budget Planner (set spending and income targets). A Settings tab lets you choose your currency.",
    descriptionFR:
      "J\u2019ai cr\u00E9\u00E9 cette app parce que j\u2019avais d\u00E9j\u00E0 un Excel pour tracker mes finances, budget, d\u00E9penses quotidiennes, revenus - mais ouvrir un ordi \u00E0 chaque fois, c\u2019\u00E9tait contraignant. Je voulais quelque chose de simple, propre, et toujours dans ma poche.\n\nJ\u2019ai commenc\u00E9 par designer toute l\u2019interface sur Illustrator, en utilisant les composants Apple natifs. Ensuite j\u2019ai cod\u00E9 sur Xcode, un de mes premiers vrais projets de code, construit avec les d\u00E9buts de ChatGPT comme co-pilote.\n\nL\u2019app a trois sections : un Dashboard (vue mensuelle revenus/d\u00E9penses), un Tracker (ajouter d\u00E9penses et revenus, voir le solde en temps r\u00E9el), et un Budget Planner (d\u00E9finir ses objectifs). Un onglet Settings pour choisir sa devise.",
    images: [],
  },
  {
    slug: "elljomi-logo-redesign",
    title: "Elljomi \u2014 Logo Redesign",
    titleFR: "Elljomi \u2014 Refonte du Logo",
    tagline: "Modernizing a Swiss catering brand",
    taglineFR: "Moderniser l\u2019identit\u00E9 d\u2019un traiteur suisse",
    category: "Branding",
    tags: ["Illustrator", "Brand Identity", "Logo Design"],
    date: "2024",
    dateFR: "2024",
    thumbnail: "/creative/elljomi/elljomi-logo-after-white.png",
    heroBg: "",
    websiteUrl: "https://elljomi.ch",
    description:
      "Elljomi is a Swiss catering company whose logo felt dated and visually heavy. The brief was simple: modernize it while keeping the brand\u2019s identity intact. I kept the circular structure and the core elements \u2014 the chef\u2019s hat, the wordmark, the stars \u2014 but stripped everything back. Lighter strokes, cleaner typography, more breathing room. The result is a logo that works on both light and dark backgrounds, scales properly at any size, and feels premium without losing its warmth. Delivered with a full brand guidelines document.",
    descriptionFR:
      "Elljomi est un traiteur suisse dont le logo paraissait dat\u00E9 et visuellement trop charg\u00E9. La mission\u00A0: le moderniser tout en pr\u00E9servant l\u2019identit\u00E9 de la marque. J\u2019ai conserv\u00E9 la structure circulaire et les \u00E9l\u00E9ments cl\u00E9s \u2014 la toque, le wordmark, les \u00E9toiles \u2014 mais j\u2019ai tout \u00E9pur\u00E9. Traits plus fins, typographie plus claire, plus d\u2019espace. Livr\u00E9 avec un document de brand guidelines complet.",
    detailText:
      "The original logo was a raster image \u2014 pixelated at large sizes and impossible to scale cleanly. The first step was to fully vectorize it in Illustrator, rebuilding every element from scratch as clean vector paths.\n\nBeyond vectorization, I redesigned the details while keeping the original DNA intact. The strokes are cleaner and more consistent. The chef\u2019s hat is now better integrated into the composition, sitting more naturally above the wordmark. \u201CCatering\u201D moved to the right, the cutlery icon shifted left \u2014 creating better visual balance. The decorative swipe line underneath was removed entirely, as it hurt readability. The three stars went from white to gold, adding a touch of warmth and premium feel.",
    detailTextFR:
      "Le logo original \u00E9tait une image matricielle \u2014 pixelis\u00E9e \u00E0 grande taille et impossible \u00E0 agrandir proprement. La premi\u00E8re \u00E9tape a \u00E9t\u00E9 de le vectoriser enti\u00E8rement dans Illustrator, en reconstruisant chaque \u00E9l\u00E9ment en trac\u00E9s vectoriels propres.\n\nAu-del\u00E0 de la vectorisation, j\u2019ai redesign\u00E9 les d\u00E9tails tout en conservant l\u2019ADN original. Les traits sont plus nets et coh\u00E9rents. La toque est mieux int\u00E9gr\u00E9e dans la composition, plac\u00E9e plus naturellement au-dessus du wordmark. \u00ABCatering\u00BB a \u00E9t\u00E9 d\u00E9plac\u00E9 \u00E0 droite, les couverts \u00E0 gauche \u2014 pour un meilleur \u00E9quilibre visuel. La ligne d\u00E9corative en bas a \u00E9t\u00E9 supprim\u00E9e, elle nuisait \u00E0 la lisibilit\u00E9. Les trois \u00E9toiles sont pass\u00E9es du blanc au jaune dor\u00E9, apportant chaleur et \u00E9l\u00E9gance.",
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
    title: "Caribbean Islands \u2014 Data Comparison",
    titleFR: "Îles Caraïbes \u2014 Comparaison de données",
    tagline: "Comparing economic indicators across three island nations",
    taglineFR: "Comparaison d\u2019indicateurs économiques entre trois nations insulaires",
    category: "Data Visualization",
    tags: ["Data Visualization", "Academic", "Economics", "Illustrator"],
    date: "2025",
    dateFR: "2025",
    thumbnail: "/creative/caribbean/map-caribbean.svg",
    description: "",
    descriptionFR: "",
    images: [],
  },
  {
    slug: "illustration-01",
    title: "Illustration Series",
    titleFR: "S\u00E9rie d\u2019Illustrations",
    tagline: "Exploring form through ink and vector",
    taglineFR: "Explorer la forme par l\u2019encre et le vecteur",
    category: "Illustration",
    thumbnail: "/placeholder-illustration.svg",
    description:
      "A series of illustrations blending hand-drawn ink work with digital vector techniques. The project explores tension between organic imperfection and computational precision, each piece starts analog and ends digital, preserving the texture of the hand throughout.",
    descriptionFR:
      "Une s\u00E9rie d\u2019illustrations m\u00EAlant travail \u00E0 l\u2019encre fait main et techniques vectorielles num\u00E9riques. Le projet explore la tension entre l\u2019imperfection organique et la pr\u00E9cision computationnelle, chaque pi\u00E8ce commence en analogique et se termine en num\u00E9rique, pr\u00E9servant la texture de la main tout au long du processus.",
    images: [
      "/placeholder-illustration-1.svg",
      "/placeholder-illustration-2.svg",
      "/placeholder-illustration-3.svg",
    ],
  },
];

export function getProjectBySlug(slug: string): CreativeProject | undefined {
  return creativeProjects.find((p) => p.slug === slug);
}
