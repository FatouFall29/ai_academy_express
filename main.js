const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");

const app = express();

// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("✅ Connexion réussie à MongoDB avec Mongoose !");
});

// Configuration de l'application
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// Configuration des cookies et sessions
app.use(cookieParser("secret_passcode"));
app.use(session({
  secret: "secret_passcode",
  cookie: { maxAge: 4000000 },
  resave: false,
  saveUninitialized: false
}));

// Flash messages
app.use(flash());

// Passport.js
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// Middleware global
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.pageTitle = "AI Academy";
  next();
});

// Contrôleurs
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");

// 🔐 Auth routes
app.get("/login", authController.login);
app.post("/login", authController.authenticate);
app.get("/logout", authController.logout, usersController.redirectView);
app.get("/signup", authController.signup);
app.post("/signup", authController.register, usersController.redirectView);

// 🔐 Routes protégées
app.use("/users", authController.ensureLoggedIn);
app.use("/courses/new", authController.ensureLoggedIn);
app.use("/courses/:id/edit", authController.ensureLoggedIn);

// 🌐 Pages publiques
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/faq", homeController.faq);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);

// 📩 Abonnés
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

// 👤 Utilisateurs
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id", usersController.delete);
app.get("/users", usersController.index, usersController.indexView);

// 🎓 Cours
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id", coursesController.delete, coursesController.redirectView);

// Erreur 404
app.use(errorController.error404);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

