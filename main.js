const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connexion réussie à MongoDB avec Mongoose !");
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

// const methodOverride = require("method-override");
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
// Configuration de EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Définir le titre global
app.use((req, res, next) => {
  res.locals.pageTitle = "AI Academy";
  next();
});

// Importation des contrôleurs
const subscribersController = require("./controllers/subscribersController");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");


// 🔹 Routes publiques
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/faq", homeController.faq);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);


// 🔹 Routes Abonnés (Subscribers)
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


// 🔹 Routes Utilisateurs (Users)
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id", usersController.delete);



// 🔹 Routes Cours (Courses)
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
// app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
app.delete("/courses/:id", coursesController.delete, coursesController.redirectView);


// 🔹 Gestion des erreurs
app.use(errorController.error404);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
