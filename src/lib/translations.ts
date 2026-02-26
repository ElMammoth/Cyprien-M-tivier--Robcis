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
    sections: {
      about: {
        title: "About",
        placeholder: "More about me — coming soon.",
      },
      finance: {
        title: "Finance",
        placeholder: "Financial projects & experience — coming soon.",
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
    sections: {
      about: {
        title: "À propos",
        placeholder: "En savoir plus — bientôt.",
      },
      finance: {
        title: "Finance",
        placeholder: "Projets financiers — bientôt.",
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
