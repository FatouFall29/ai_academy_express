const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const subscribersController = require("./controllers/subscribersController");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

mongoose.connect("mongodb://localhost:27017/ai_academy");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connexion réussie à MongoDB avec Mongoose !");
});

const app = express();

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

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Pages publiques
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/courses", homeController.courses);
app.get("/faq", homeController.faq);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);




// Formulaire d’abonnement
app.get("/subscribe", subscribersController.new);
app.post("/subscribers", subscribersController.create);

// Page de remerciement
app.get("/subscribers/thanks", (req, res) => {
  res.render("subscribers/thanks", { pageTitle: "Merci pour votre inscription" });
});

// Liste et gestion des abonnés
app.get("/subscribers/new", subscribersController.new); // IMPORTANT : AVANT `:id`
app.get("/subscribers/search", subscribersController.search);
app.get("/subscribers", subscribersController.index);
app.post("/subscribers/:id/delete", subscribersController.delete);
app.get("/subscribers/:id/edit", subscribersController.edit);
// Soumet la modification
app.post("/subscribers/:id/edit", subscribersController.update);
// app.post("/subscribers/:id/update", subscribersController.update);
app.get("/subscribers/:id", subscribersController.show); // DOIT ÊTRE EN DERNIER !

app.use(errorController.error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

