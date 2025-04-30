// const express = require("express");
// const router = express.Router();
// const usersController = require("../controllers/usersController");
// const authController = require("../controllers/authController");

// // Middleware pour vérifier si l'utilisateur est connecté
// router.use(authController.ensureLoggedIn);

// // Routes CRUD pour les utilisateurs
// router.get("/", usersController.index, usersController.indexView);
// router.get("/new", usersController.new);
// router.post("/create", usersController.validate, usersController.create, usersController.redirectView);
// router.get("/:id", usersController.show, usersController.showView);
// router.get("/:id/edit", usersController.edit);
// router.put("/:id/update", usersController.update, usersController.redirectView);
// router.delete("/:id/delete", usersController.delete, usersController.redirectView);
// router.get("/api-token", usersController.getApiToken);
// module.exports = router;
















// // userRoutes.js

// const express = require("express");
// const router = express.Router();
// const usersController = require("../controllers/usersController");
// const authController = require("../controllers/authController");

// // Middleware pour vérifier si l'utilisateur est connecté
// router.use(authController.ensureLoggedIn);

// // Routes CRUD pour les utilisateurs
// router.get("/", usersController.index, usersController.indexView);
// router.get("/new", usersController.new);
// router.post("/create", usersController.validate, usersController.create, usersController.redirectView);
// router.get("/:id", usersController.show, usersController.showView);
// router.get("/:id/edit", usersController.edit);
// router.put("/:id/update", usersController.update, usersController.redirectView);
// router.delete("/:id/delete", usersController.delete, usersController.redirectView);

// // Modifier la route API Token pour utiliser apiToken
// router.get("/api-token/:apiToken", usersController.getApiToken);  // Changement ici
// // Route pour la page API Docs
// router.get("/api-docs", usersController.apiDocsView);  // Nouvelle route ajoutée ici
// module.exports = router;















// userRoutes.js

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

// Middleware pour vérifier si l'utilisateur est connecté
router.use(authController.ensureLoggedIn);

// Routes CRUD pour les utilisateurs
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post("/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

// Route pour la page API Docs
router.get("/api-docs", usersController.apiDocsView);  // Nouvelle// Dans userRoutes.js
router.get("/api-token", usersController.getApiToken); 

module.exports = router;

