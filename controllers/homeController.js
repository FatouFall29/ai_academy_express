// const courses = [
//   {
//   title: "Introduction à l'IA",
//   description: "Découvrez les fondamentaux de l'intelligence artificielle.",
//   price: 199,
//   level: "Débutant"
//   },
//   {
//   title: "Machine Learning Fondamental",
//   description: "Apprenez les principes du machine learning et les algorithmes de base.",
//   price: 299,
//   level: "Intermédiaire"
//   },
//   {
//   title: "Deep Learning Avancé",
//   description: "Maîtrisez les réseaux de neurones profonds et leurs applications.",
//   price: 399,
//   level: "Avancé"
//   }


//   ];
//   exports.index = (req, res) => {
//   res.render("index", { pageTitle: "Accueil" });
//   };
//   exports.about = (req, res) => {
//   res.render("about", { pageTitle: "À propos" });
//   };
//   exports.courses = (req, res) => {
//   res.render("courses", {
//   pageTitle: "Nos Cours",
//   courses: courses
//   });
//   };
//   exports.contact = (req, res) => {
//   res.render("contact", { pageTitle: "Contact" });
//   };
//   // exports.processContact = (req, res) => {
//   // console.log("Données du formulaire reçues:");
//   // console.log(req.body);
//   // res.render("thanks", {
//   // pageTitle: "Merci",
//   // formData: req.body
//   // });
//   // };

//   exports.processContact = (req, res) => {
//     const { name, email, course } = req.body;
  
//     if (!name || !email || !course) {
//       req.session.notification = "Tous les champs sont obligatoires.";
//       return res.redirect("/contact");
//     }
  
//     // Si tout est correct
//     req.session.notification = "Votre message a bien été envoyé. Merci !";
//     res.redirect("/contact");
//   };
  
// exports.faq = (req, res) => {
//   res.render("faq", { pageTitle: "FAQ" });
// };














const courses = [
  {
    title: "Introduction à l'IA",
    description: "Découvrez les fondamentaux de l'intelligence artificielle.",
    price: 199,
    level: "Débutant"
  },
  {
    title: "Machine Learning Fondamental",
    description: "Apprenez les principes du machine learning et les algorithmes de base.",
    price: 299,
    level: "Intermédiaire"
  },
  {
    title: "Deep Learning Avancé",
    description: "Maîtrisez les réseaux de neurones profonds et leurs applications.",
    price: 399,
    level: "Avancé"
  }
];

exports.index = (req, res) => {
  res.render("index", { pageTitle: "Accueil" });
};

exports.about = (req, res) => {
  res.render("about", { pageTitle: "À propos" });
};

// exports.courses = (req, res) => {
//   res.render("courses", {
//     pageTitle: "Nos Cours",
//     courses: courses
//   });
// };












// exports.courses = (req, res) => {
//   let filteredCourses = [...courses];
//   const selectedLevel = req.query.level;
//   const selectedPrice = req.query.maxPrice;

//   if (selectedLevel) {
//     filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
//   }

//   if (selectedPrice) {
//     const max = parseFloat(selectedPrice);
//     filteredCourses = filteredCourses.filter(course => course.price <= max);
//   }

//   res.render("courses", {
//     pageTitle: "Nos Cours",
//     courses: filteredCourses,
//     selectedLevel,
//     selectedPrice
//   });
// };















exports.courses = (req, res) => {
  let filteredCourses = [...courses];
  const selectedLevel = req.query.level;
  const selectedPrice = req.query.maxPrice;

  // Extraire tous les prix disponibles (sans doublons)
  const availablePrices = [...new Set(courses.map(course => course.price))];

  if (selectedLevel) {
    filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
  }

  if (selectedPrice) {
    const max = parseFloat(selectedPrice);
    filteredCourses = filteredCourses.filter(course => course.price === max);
  }

  res.render("courses", {
    pageTitle: "Nos Cours",
    courses: filteredCourses,
    selectedLevel,
    selectedPrice,
    availablePrices
  });
};


// exports.contact = (req, res) => {
//   res.render("contact", { pageTitle: "Contact" });
// };

// exports.processContact = (req, res) => {
//   const { name, email, course } = req.body;

//   if (!name || !email || !course) {
//     req.session.notification = "Tous les champs sont obligatoires.";
//     return res.redirect("/contact");
//   }

//   req.session.notification = "Votre message a bien été envoyé. Merci !";
//   res.redirect("/contact");
// };












// exports.processContact = (req, res) => {
//   const { name, email, course, message } = req.body;

//   const errors = [];

//   if (!name || name.trim() === "") errors.push("Le nom est requis.");
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Un email valide est requis.");
//   if (!course) errors.push("Veuillez sélectionner un cours.");
//   if (!message || message.trim() === "") errors.push("Le message ne peut pas être vide.");

//   if (errors.length > 0) {
//     req.session.notification = errors.join(" ");
//     return res.redirect("/contact");
//   }

//   req.session.notification = "Votre message a bien été envoyé. Merci !";
//   res.redirect("/contact");
// };
















exports.contact = (req, res) => {
  res.render("contact", {
    pageTitle: "Contact",
    errors: [],              // <- toujours définir errors
    formData: {}             // <- et formData vide au chargement
  });
};


// exports.processContact = (req, res) => {
//   const { name, email, course, message } = req.body;
//   const errors = [];

//   // Validation
//   if (!name || name.trim() === "") {
//     errors.push("Le nom est requis.");
//   }

//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     errors.push("Une adresse email valide est requise.");
//   }

//   if (!course) {
//     errors.push("Veuillez sélectionner un cours.");
//   }

//   if (!message || message.trim() === "") {
//     errors.push("Le message ne peut pas être vide.");
//   }

//   // Si erreurs, on réaffiche le formulaire avec les erreurs et les données déjà saisies
//   if (errors.length > 0) {
//     return res.render("contact", {
//       pageTitle: "Contact",
//       errors,
//       formData: req.body
//     });
//   }

  // Sinon on affiche la page de remerciement
//   res.render("thanks", {
//     pageTitle: "Merci",
//     formData: req.body
//   });
// };














exports.processContact = (req, res) => {
  const { name, email, course, message } = req.body;
  const errors = [];

  if (!name || name.trim().split(" ").length < 2) {
    errors.push("Veuillez indiquer votre prénom et votre nom.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Veuillez entrer une adresse email valide.");
  }

  if (!course) {
    errors.push("Veuillez sélectionner un cours.");
  }

  if (!message || message.trim().length < 10) {
    errors.push("Veuillez entrer un message d'au moins 10 caractères.");
  }

  if (errors.length > 0) {
    return res.render("contact", {
      pageTitle: "Contact",
      errors,
      formData: { name, email, course, message }
    });
  }


  res.render("thanks", {
    pageTitle: "Merci pour votre message",
    formData: { name, email, course, message }
  });
};


exports.faq = (req, res) => {
  res.render("faq", { pageTitle: "FAQ" });
};










// exports.index = (req, res) => {
//   res.render("home", { pageTitle: "Accueil" });
// };

// exports.about = (req, res) => {
//   res.render("about", { pageTitle: "À propos" });
// };

// exports.courses = (req, res) => {
//   res.render("courses", { pageTitle: "Cours" });
// };

// exports.faq = (req, res) => {
//   res.render("faq", { pageTitle: "FAQ" });
// };

// exports.contact = (req, res) => {
//   res.render("contact", { pageTitle: "Contact" });
// };

// exports.processContact = (req, res) => {
//   // Traitement du formulaire de contact ici...
//   req.session.notification = "Message envoyé avec succès !";
//   res.redirect("/contact");
// };
