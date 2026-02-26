export interface CreativeProject {
  slug: string;
  title: string;
  titleFR: string;
  tagline: string;
  taglineFR: string;
  category: string;
  thumbnail: string;
  description: string;
  descriptionFR: string;
  images: string[];
}

export const creativeProjects: CreativeProject[] = [
  {
    slug: "branding-01",
    title: "Branding Project",
    titleFR: "Projet de Branding",
    tagline: "Visual identity for a contemporary brand",
    taglineFR: "Identité visuelle pour une marque contemporaine",
    category: "Branding",
    thumbnail: "/placeholder-branding.svg",
    description:
      "A complete visual identity system built from the ground up — logo, typography, color palette, and brand guidelines. The approach was rooted in minimalism with sharp geometric forms and a restrained color language. Every element was designed to feel deliberate and uncompromising.",
    descriptionFR:
      "Un système d\u2019identité visuelle complet construit de zéro — logo, typographie, palette de couleurs et charte graphique. L\u2019approche était enracinée dans le minimalisme avec des formes géométriques nettes et un langage chromatique sobre. Chaque élément a été conçu pour paraître délibéré et sans compromis.",
    images: [
      "/placeholder-branding-1.svg",
      "/placeholder-branding-2.svg",
      "/placeholder-branding-3.svg",
    ],
  },
  {
    slug: "illustration-01",
    title: "Illustration Series",
    titleFR: "Série d\u2019Illustrations",
    tagline: "Exploring form through ink and vector",
    taglineFR: "Explorer la forme par l\u2019encre et le vecteur",
    category: "Illustration",
    thumbnail: "/placeholder-illustration.svg",
    description:
      "A series of illustrations blending hand-drawn ink work with digital vector techniques. The project explores tension between organic imperfection and computational precision — each piece starts analog and ends digital, preserving the texture of the hand throughout.",
    descriptionFR:
      "Une série d\u2019illustrations mêlant travail à l\u2019encre fait main et techniques vectorielles numériques. Le projet explore la tension entre l\u2019imperfection organique et la précision computationnelle — chaque pièce commence en analogique et se termine en numérique, préservant la texture de la main tout au long du processus.",
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
