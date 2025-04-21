// document.addEventListener('DOMContentLoaded', () => {
//   // Mettre en évidence le lien de navigation actif
//   const currentPath = window.location.pathname;
//   const navLinks = document.querySelectorAll('nav ul li a');
//   navLinks.forEach(link => {
//   if (link.getAttribute('href') === currentPath) {
//   link.style.fontWeight = 'bold';
//   link.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
//   }
//   });


//   // FAQ interactive
//   const faqQuestions = document.querySelectorAll('.faq-question');

//   faqQuestions.forEach(question => {
//     question.addEventListener('click', () => {
//       // Masquer toutes les réponses
//       document.querySelectorAll('.faq-answer').forEach(answer => {
//         answer.style.display = 'none';
//       });

//       // Afficher la réponse de la question cliquée
//       const answer = question.nextElementSibling;
//       answer.style.display = 'block';
//     });
//   });




//   // Animation simple pour les messages de succès
//   const thanksMessage = document.querySelector('.thanks-message');
//   if (thanksMessage) {
//   thanksMessage.style.animation = 'fadeIn 1s ease-in';
//   }
//   });
//   // Fonction de validation du formulaire de contact
//   const contactForm = document.querySelector('form[action="/contact"]');
//   if (contactForm) {
//   contactForm.addEventListener('submit', (e) => {
//   const emailInput = contactForm.querySelector('#email');
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(emailInput.value)) {
//   e.preventDefault();
//   alert('Veuillez entrer une adresse email valide.');
//   }
//   });
//   }











const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const methodOverride = require("method-override");

// Contrôleurs
const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const subscribersController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");

const app = express();

// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("✅ Connexion réussie à MongoDB !");
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "ai-academy-secret-key",
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
  res.locals.notification = req.session.notification;
  delete req.session.notification;
  next();
});
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----------------------------------
// Routes publiques (Page d'accueil)
// -----------------------------------
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/faq", homeController.faq);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);

// -----------------------------------
// Routes Abonnés
// -----------------------------------
app.get("/subscribe", subscribersController.new);
app.post("/subscribers", subscribersController.create);
app.get("/subscribers/thanks", (req, res) => {
  res.render("subscribers/thanks", { pageTitle: "Merci pour votre inscription" });
});
app.get("/subscribers/new", subscribersController.new);
app.get("/subscribers/search", subscribersController.search);
app.get("/subscribers", subscribersController.index);
app.post("/subscribers/:id/delete", subscribersController.delete);
app.get("/subscribers/:id/edit", subscribersController.edit);
app.post("/subscribers/:id/edit", subscribersController.update);
app.get("/subscribers/:id", subscribersController.show);

// -----------------------------------
// Routes Utilisateurs
// -----------------------------------
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// -----------------------------------
// Routes Cours (CRUD)
// -----------------------------------
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// -----------------------------------
// 404 - Page non trouvée
// -----------------------------------
app.use(errorController.error404);

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré : http://localhost:${PORT}`);
});
