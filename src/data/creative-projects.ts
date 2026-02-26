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
    slug: "branding-01",
    title: "Branding Project",
    titleFR: "Projet de Branding",
    tagline: "Visual identity for a contemporary brand",
    taglineFR: "Identit\u00E9 visuelle pour une marque contemporaine",
    category: "Branding",
    thumbnail: "/placeholder-branding.svg",
    description:
      "A complete visual identity system built from the ground up, logo, typography, color palette, and brand guidelines. The approach was rooted in minimalism with sharp geometric forms and a restrained color language. Every element was designed to feel deliberate and uncompromising.",
    descriptionFR:
      "Un syst\u00E8me d\u2019identit\u00E9 visuelle complet construit de z\u00E9ro, logo, typographie, palette de couleurs et charte graphique. L\u2019approche \u00E9tait enracin\u00E9e dans le minimalisme avec des formes g\u00E9om\u00E9triques nettes et un langage chromatique sobre. Chaque \u00E9l\u00E9ment a \u00E9t\u00E9 con\u00E7u pour para\u00EEtre d\u00E9lib\u00E9r\u00E9 et sans compromis.",
    images: [
      "/placeholder-branding-1.svg",
      "/placeholder-branding-2.svg",
      "/placeholder-branding-3.svg",
    ],
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
