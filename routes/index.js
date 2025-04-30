// const express = require("express");
// const router = express.Router();

// // Importation de toutes les routes spécifiques
// const userRoutes = require("./userRoutes");
// const courseRoutes = require("./courseRoutes");
// const subscriberRoutes = require("./subscriberRoutes");
// const apiRoutes = require("./apiRoutes");
// const homeRoutes = require("./homeRoutes");
// const errorRoutes = require("./errorRoutes");

// // Définir les sous-chemins
// router.use("/users", userRoutes);
// router.use("/courses", courseRoutes);
// router.use("/subscribers", subscriberRoutes);
// router.use("/api", apiRoutes);
// router.use("/", homeRoutes);
// router.use("/", errorRoutes);

// module.exports = router;











// routes/index.js

const express = require("express");
const router = express.Router();

// Contrôleurs
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const errorController = require("../controllers/errorController");
const subscribersController = require("../controllers/subscribersController");
const usersController = require("../controllers/usersController");
const coursesController = require("../controllers/coursesController");

// Auth routes
router.get("/login", authController.login);
router.post("/login", authController.authenticate);
router.get("/logout", authController.logout, usersController.redirectView);
router.get("/signup", authController.signup);
router.post("/signup", authController.register, usersController.redirectView);

// Routes protégées
router.use("/users", authController.ensureLoggedIn);
router.use("/courses/new", authController.ensureLoggedIn);
router.use("/courses/:id/edit", authController.ensureLoggedIn);

// Pages publiques
router.get("/", homeController.index);
router.get("/about", homeController.about);
router.get("/faq", homeController.faq);
router.get("/contact", homeController.contact);
router.post("/contact", homeController.processContact);

// Abonnés
router.get("/subscribe", subscribersController.new);
router.post("/subscribers", subscribersController.create);
router.get("/subscribers/thanks", (req, res) => {
  res.render("subscribers/thanks", { pageTitle: "Merci pour votre inscription" });
});
router.get("/subscribers/new", subscribersController.new);
router.get("/subscribers/search", subscribersController.search);
router.get("/subscribers", subscribersController.index);
router.post("/subscribers/:id/delete", subscribersController.delete);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.post("/subscribers/:id/edit", subscribersController.update);
router.get("/subscribers/:id", subscribersController.show);

// 👤 Utilisateurs
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id", usersController.delete);
router.get("/users", usersController.index, usersController.indexView);

// 🎓 Cours
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id", coursesController.delete, coursesController.redirectView);

// Erreur 404
router.use(errorController.error404);

module.exports = router;
