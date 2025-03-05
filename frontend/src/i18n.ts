import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    about: {
      title: "Alejandro Bernabe",
      technology_title: "Technologies I learned.",
      skills_title: "Soft skills",
      aboutme: "About Me",
      update_button: "Update About Me",
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
      switch_language: "FR",
      comment: "Comment",
      proyecto: "Projects",
      technology: "Technologies",
      edit: "Edit About"
    },
    contact: {
      title: "Contact Me",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      message: "Message",
      send_email_button: "Send Email",
      emailSent: "Email sent successfully!",
      emailFailed: "Failed to send email."
    },
    projects: {
      title: "My Projects",
      add_project: "Add Project",
      update_project: "Update Project",
      description: "Description",
      link: "Link",
      slug: "Slug",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      projects: "Projects",
      name: "Name"
    },
    testimonials: {
      title: "Testimonials",
      your_name: "Your name",
      your_testimonial: "Your testimonial",
      submit: "Submit",
      thank_you: "Thank you! Your comment is awaiting approval.",
      error_message: "An error occurred. Please try again later."
    },
    admin: {
      panel: "Admin Panel",
      approve_reject_delete: "Approve, reject, or delete submitted comments below.",
      pending_comments: "Pending Comments",
      no_pending_comments: "No pending comments.",
      all_comments: "All Comments",
      no_comments_available: "No comments available.",
      approve: "Approve",
      reject: "Reject",
      delete: "Delete"
    },
    technologies: {
      add_technology: "Add Technology",
      name: "Name",
      icon: "Icon",
      update_technology: "Update Technology",
      technologies: "Technologies",
      edit: "Edit",
      delete: "Delete"
    },
    languages: {
      en: "English",
      fr: "French"
    }
  },
  fr: {
    about: {
      title: "Alejandro Bernabe",
      technology_title: "Technologies que j'ai apprises.",
      skills_title: "Compétences générales",
      aboutme: "À Propos de Moi",
      update_button: "Mettre à jour À Propos de Moi",
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
      switch_language: "EN",
      comment: "Commentaire",
      proyecto: "Projets",
      technology: "Technologies",
      edit: "Modifier À Propos"
    },
    contact: {
      title: "Contactez-moi",
      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Email",
      message: "Message",
      send_email_button: "Envoyer un email",
      emailSent: "Email envoyé avec succès !",
      emailFailed: "Échec de l'envoi de l'email."
    },
    projects: {
      title: "Mes Projets",
      add_project: "Ajouter un projet",
      update_project: "Mettre à jour le projet",
      description: "Description",
      link: "Lien",
      slug: "Slug",
      view: "Voir",
      edit: "Modifier",
      delete: "Supprimer",
      projects: "Projets",
      name: "Nom"
    },
    testimonials: {
      title: "Témoignages",
      your_name: "Votre nom",
      your_testimonial: "Votre témoignage",
      submit: "Soumettre",
      thank_you: "Merci ! Votre commentaire est en attente d'approbation.",
      error_message: "Une erreur s'est produite. Veuillez réessayer plus tard."
    },
    admin: {
      panel: "Panneau d'administration",
      approve_reject_delete: "Approuvez, rejetez ou supprimez les commentaires soumis ci-dessous.",
      pending_comments: "Commentaires en attente",
      no_pending_comments: "Aucun commentaire en attente.",
      all_comments: "Tous les commentaires",
      no_comments_available: "Aucun commentaire disponible.",
      approve: "Approuver",
      reject: "Rejeter",
      delete: "Supprimer"
    },
    technologies: {
      add_technology: "Ajouter une technologie",
      name: "Nom",
      icon: "Icône",
      update_technology: "Mettre à jour la technologie",
      technologies: "Technologies",
      edit: "Modifier",
      delete: "Supprimer"
    },
    languages: {
      en: "Anglais",
      fr: "Français"
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