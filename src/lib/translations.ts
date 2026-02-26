export type Locale = "en" | "fr";
export type VisitorType = "recruiter" | "collaborator" | "curious" | "visitor";

export const translations = {
  en: {
    entry: {
      heading: "Before we begin",
      subheading: "Who are you?",
      options: {
        recruiter: "Recruiter",
        collaborator: "Collaborator",
        curious: "Curious",
        visitor: "Just visiting",
      },
      hint: "This will personalize your experience.",
    },
    hero: {
      recruiter: {
        headline: "Looking for your next hire?",
        sub: "Here's the proof of work.",
      },
      collaborator: {
        headline: "Let's build something together.",
        sub: "Ideas need accomplices.",
      },
      curious: {
        headline: "Welcome, curious mind.",
        sub: "Dig around. Break things. Ask questions.",
      },
      visitor: {
        headline: "Cyprien Métivier-Robcis",
        sub: "Portfolio — Finance, Creative, Photography.",
      },
    },
    nav: {
      about: "About",
      finance: "Finance",
      creative: "Creative",
      photography: "Photography",
      projects: "Projects",
      contact: "Contact",
    },
    about: {
      title: "About",
      recruiter: {
        bio: "Cyprien Métivier--Robcis — Finance student, Paris. Hybrid profile: financial analysis, tech automation, and visual design. Looking for a 4-month internship in finance — open to Paris, Zürich, or Montréal.",
      },
      collaborator: {
        bio: "Cyprien Métivier--Robcis — Finance student, Paris. Hybrid profile: financial analysis, tech automation, and visual design. Looking for a 4-month internship in finance — open to Paris, Zürich, or Montréal.",
        extra: "Available for freelance work in design, automation (n8n), and development.",
      },
      curious: {
        bio: "Based in Paris, near Parc Monceau. I shoot with a Fuji X-T5, build things with code, design with Illustrator, and climb when I can. Always working on something.",
      },
      visitor: {
        bio: "Based in Paris, near Parc Monceau. I shoot with a Fuji X-T5, build things with code, design with Illustrator, and climb when I can. Always working on something.",
      },
    },
    sections: {
      about: {
        title: "About",
        placeholder: "",
      },
      finance: {
        title: "Finance",
        placeholder: "Financial projects & experience — coming soon.",
        cvPreview: "Preview CV",
        cvDownload: "Download CV",
        cvFile: "/cv/Resume_Cyprien_EN_26.pdf",
        experience: [
          {
            company: "SIIMBA",
            location: "Paris",
            year: "2024",
            role: "Asset Management & Family Office Intern",
            description: "Portfolio analysis up to \u20AC2.15M, financial modelling, client meetings, structured product follow-ups.",
          },
          {
            company: "ESLSCA Business School Paris",
            location: "Paris",
            year: "2023 \u2014 2026",
            role: "Bachelor in Market Finance",
            description: "Financial analysis, corporate finance, capital markets, economics.",
          },
          {
            company: "EF Education",
            location: "Santa Barbara & Victoria",
            year: "2022 \u2014 2023",
            role: "Academic exchange program",
            description: "Business and sales courses.",
          },
        ],
        seeking: "Open to a 4-month internship in Private Equity, Corporate Finance, or Fintech \u2014 Paris, Montr\u00E9al, or Z\u00FCrich. Starting June 2026.",
        seekingLabel: "Currently seeking",
        linkedin: "Connect on LinkedIn",
      },
      creative: {
        title: "Creative",
        placeholder: "Creative work & direction — coming soon.",
      },
      photography: {
        title: "Photography",
        placeholder: "Visual stories — coming soon.",
      },
      projects: {
        title: "Projects",
        placeholder: "Selected projects — coming soon.",
      },
      contact: {
        title: "Contact",
        placeholder: "Get in touch — coming soon.",
      },
    },
  },
  fr: {
    entry: {
      heading: "Avant de commencer",
      subheading: "Qui êtes-vous\u00A0?",
      options: {
        recruiter: "Recruteur",
        collaborator: "Collaborateur",
        curious: "Curieux",
        visitor: "Simple visiteur",
      },
      hint: "Cela personnalisera votre expérience.",
    },
    hero: {
      recruiter: {
        headline: "À la recherche de votre prochain talent\u00A0?",
        sub: "Voici les preuves.",
      },
      collaborator: {
        headline: "Construisons quelque chose ensemble.",
        sub: "Les idées ont besoin de complices.",
      },
      curious: {
        headline: "Bienvenue, esprit curieux.",
        sub: "Explorez. Cassez. Questionnez.",
      },
      visitor: {
        headline: "Cyprien Métivier-Robcis",
        sub: "Portfolio — Finance, Créatif, Photographie.",
      },
    },
    nav: {
      about: "À propos",
      finance: "Finance",
      creative: "Créatif",
      photography: "Photographie",
      projects: "Projets",
      contact: "Contact",
    },
    about: {
      title: "À propos",
      recruiter: {
        bio: "Cyprien Métivier--Robcis — Étudiant en finance, Paris. Profil hybride\u00A0: analyse financière, automatisation tech, et design visuel. À la recherche d\u2019un stage de 4 mois en finance — ouvert à Paris, Zürich, ou Montréal.",
      },
      collaborator: {
        bio: "Cyprien Métivier--Robcis — Étudiant en finance, Paris. Profil hybride\u00A0: analyse financière, automatisation tech, et design visuel. À la recherche d\u2019un stage de 4 mois en finance — ouvert à Paris, Zürich, ou Montréal.",
        extra: "Disponible pour du freelance en design, automatisation (n8n) et développement.",
      },
      curious: {
        bio: "Basé à Paris, près du Parc Monceau. Je shoot avec un Fuji X-T5, je construis des trucs avec du code, je design sur Illustrator, et je grimpe quand je peux. Toujours en train de bosser sur quelque chose.",
      },
      visitor: {
        bio: "Basé à Paris, près du Parc Monceau. Je shoot avec un Fuji X-T5, je construis des trucs avec du code, je design sur Illustrator, et je grimpe quand je peux. Toujours en train de bosser sur quelque chose.",
      },
    },
    sections: {
      about: {
        title: "À propos",
        placeholder: "",
      },
      finance: {
        title: "Finance",
        placeholder: "Projets financiers — bientôt.",
        cvPreview: "Aperçu CV",
        cvDownload: "Télécharger CV",
        cvFile: "/cv/Resume_Cyprien_FR_26.pdf",
        experience: [
          {
            company: "SIIMBA",
            location: "Paris",
            year: "2024",
            role: "Stagiaire Gestion d\u2019Actifs & Family Office",
            description: "Analyse de portefeuille jusqu\u2019\u00E0 2,15M\u20AC, mod\u00E9lisation financi\u00E8re, rendez-vous clients, suivi produits structur\u00E9s.",
          },
          {
            company: "ESLSCA Business School Paris",
            location: "Paris",
            year: "2023 \u2014 2026",
            role: "Bachelor Finance de March\u00E9",
            description: "Analyse financi\u00E8re, finance d\u2019entreprise, march\u00E9s de capitaux, \u00E9conomie.",
          },
          {
            company: "EF Education",
            location: "Santa Barbara & Victoria",
            year: "2022 \u2014 2023",
            role: "Programme d\u2019\u00E9change acad\u00E9mique",
            description: "Cours de commerce et de vente.",
          },
        ],
        seeking: "Disponible pour un stage de 4 mois en Private Equity, Finance d\u2019Entreprise ou Fintech \u2014 Paris, Montr\u00E9al ou Z\u00FCrich. Disponible \u00E0 partir de juin 2026.",
        seekingLabel: "Actuellement",
        linkedin: "Me rejoindre sur LinkedIn",
      },
      creative: {
        title: "Créatif",
        placeholder: "Travail créatif — bientôt.",
      },
      photography: {
        title: "Photographie",
        placeholder: "Histoires visuelles — bientôt.",
      },
      projects: {
        title: "Projets",
        placeholder: "Projets sélectionnés — bientôt.",
      },
      contact: {
        title: "Contact",
        placeholder: "Entrer en contact — bientôt.",
      },
    },
  },
} as const;

export function t(locale: Locale) {
  return translations[locale];
}
