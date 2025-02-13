import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    about: {
      title: "Alejandro Bernabe.",
      description: `I am a third-year Computer Science student at Champlain College.
      I decided to study CS because I like technology and the improvements it has brought for us.
      I plan to specialize in networking and cybersecurity since I feel my skills and knowledge can help people and bring them joy.`,
      technology_title: "Technologies I learned.",
      skills_title: "Soft skills",
      skills_description: `My soft skills are teamwork, punctuality, communication, organization, and problem-solving.
      (You can check my CV for more detailed information about my skills and experience :D).`
    },
    resume: {
      title: "My CV",
      description: "Click below to download my CV (English or French) and learn more about my professional background.",
      downloadEN: "Download English CV",
      downloadFR: "Download French CV"
    },
    navbar: {
      about: "About Me",
      projects: "My Projects",
      testimonials: "Testimonials",
      contact: "Contact Me",
      resume: "CV",
      login: "Log In",
      logout: "Log Out",
      switch_language: "FR"
    },
    contact: {
        title: "Contact Me",
        send_email_button: "Send me an email!",
        mail_body: "I'd like to get in touch with you. Please let me know how we can collaborate!"
    },
    projects: {
      title: "My Projects"
    },
    testimonials: {
        title: "Testimonials"
    }
  },
  fr: {
    about: {
      title: "Alejandro Bernabe",
      description: `Je suis étudiant en troisième année d'informatique au Champlain College.
      J'ai décidé d'étudier l'informatique parce que j'aime la technologie et les améliorations qu'elle nous a apportées.
      Je prévois de me spécialiser en réseau et en cybersécurité, car je pense que mes compétences et mes connaissances peuvent aider les gens et leur apporter de la joie.`,
      technology_title: "Technologies que j'ai apprises.",
      skills_title: "Compétences générales", 
      skills_description: `Mes compétences générales sont le travail d'équipe, la ponctualité, la communication, l'organisation et la résolution de problèmes.
      (Vous pouvez consulter mon CV pour plus d'informations détaillées sur mes compétences et mon expérience :D).`
    },
    resume: {
      title: "Mon CV",
      description: "Cliquez ci-dessous pour télécharger mon CV (anglais ou français) et en savoir plus sur mon parcours professionnel.",
      downloadEN: "Télécharger le CV en anglais",
      downloadFR: "Télécharger le CV en français"
    },
    navbar: {
      about: "À Propos",
      projects: "Mes Projets",
      testimonials: "Témoignages",
      contact: "Contactez-moi",
      resume: "CV",
      login: "Connexion",
      logout: "Déconnexion",
      switch_language: "EN"
    },
    contact: {
        title: "Contactez-moi",
        send_email_button: "Envoyez-moi un email !",
        mail_body: "J'aimerais prendre contact avec vous. Merci de me faire savoir comment nous pouvons collaborer !"
    },
    projects: {
      title: "Mes Projets"
    },
    testimonials: {
        title: "Témoignages"
    }
  }
};

const i18n = createI18n({
  locale: 'en',
  globalInjection: true,
  fallbackLocale: 'en',
  messages
});

export default i18n;
