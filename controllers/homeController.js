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

exports.courses = (req, res) => {
  let filteredCourses = [...courses];
  const selectedLevel = req.query.level;
  const selectedPrice = req.query.maxPrice;


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
exports.contact = (req, res) => {
  res.render("contact", {
    pageTitle: "Contact",
    errors: [],              
    formData: {}             
  });
};
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
