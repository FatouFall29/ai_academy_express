// const User = require("../models/user");
// // controllers/usersController.js
// const jsonWebToken = require("jsonwebtoken"); // Assurez-vous que jsonwebtoken est installé
// const token_key = process.env.TOKEN_KEY || 'votre_clé_secrète'; // Utiliser une clé secrète pour signer le token


// const getUserParams = body => {
//   return {
//     name: {
//       first: body.first,
//       last: body.last
//     },
//     email: body.email,
//     password: body.password,
//     zipCode: body.zipCode
//   };
// };

// module.exports = {
//   index: (req, res, next) => {
//     User.find({})
//       .then(users => {
//         res.locals.users = users;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
//         next(error);
//       });
//   },

//   indexView: (req, res) => {
//     res.render("users/index", { pageTitle: "Liste des utilisateurs" });
//   },

//   new: (req, res) => {
//     res.render("users/new", { pageTitle: "Créer un utilisateur" });
//   },

//   create: (req, res, next) => {
//     let userParams = getUserParams(req.body);
//     User.create(userParams)
//       .then(user => {
//         res.locals.redirect = "/users";
//         res.locals.user = user;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la création de l'utilisateur: ${error.message}`);
//         res.locals.redirect = "/users/new";
//         next();
//       });
//   },

//   redirectView: (req, res, next) => {
//     let redirectPath = res.locals.redirect;
//     if (redirectPath) res.redirect(redirectPath);
//     else next();
//   },

//   show: (req, res, next) => {
//     let userId = req.params.id;
//     User.findById(userId)
//       .then(user => {
//         res.locals.user = user;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la récupération de l'utilisateur par ID: ${error.message}`);
//         next(error);
//       });
//   },

//   showView: (req, res) => {
//     res.render("users/show", {
//       pageTitle: `Détails de ${res.locals.user.fullName || "l'utilisateur"}`,
//       user: res.locals.user
//     });
//   },

//   edit: (req, res, next) => {
//     let userId = req.params.id;
//     User.findById(userId)
//       .then(user => {
//         res.render("users/edit", {
//           user: user,
//           pageTitle: `Modifier ${user.fullName || "utilisateur"}`
//         });
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la récupération de l'utilisateur par ID: ${error.message}`);
//         next(error);
//       });
//   },

//   update: (req, res, next) => {
//     let userId = req.params.id,
//       userParams = getUserParams(req.body);
//     User.findByIdAndUpdate(userId, {
//       $set: userParams
//     })
//       .then(user => {
//         res.locals.redirect = `/users/${userId}`;
//         res.locals.user = user;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la mise à jour de l'utilisateur par ID: ${error.message}`);
//         next(error);
//       });
//   },
// delete: (req, res, next) => {
//   let userId = req.params.id;
//   User.findByIdAndDelete(userId)
//     .then(() => {
//       res.redirect("/users");
//     })
//     .catch(error => {
//       console.log(`Erreur lors de la suppression : ${error.message}`);
//       next(error);
//     });
// }
// }

// // Méthode pour générer un token API
// module.exports.getApiToken = (req, res) => {
//     if (req.user) { // Vérifie si l'utilisateur est connecté
//         // Générer un token signé
//         const signedToken = jsonWebToken.sign(
//             {
//                 data: req.user._id, // Utiliser l'ID de l'utilisateur
//                 exp: new Date().setDate(new Date().getDate() + 30) // Le token sera valide pendant 30 jours
//             },
//             token_key // La clé secrète pour signer le token
//         );

//         // Passer le token à la vue pour l'afficher
//         res.render("users/api-token", {
//             token: signedToken
//         });
//     } else {
//         req.flash("error", "Vous devez être connecté pour obtenir un token API.");
//         res.redirect("/login"); // Rediriger vers la page de login si l'utilisateur n'est pas connecté
//     }
// };





















const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken"); // Assurez-vous que jsonwebtoken est installé
const token_key = process.env.TOKEN_KEY || 'votre_clé_secrète'; // Utiliser une clé secrète pour signer le token

const getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  };
};

module.exports = {
  index: (req, res, next) => {
    User.find({})
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index", { pageTitle: "Liste des utilisateurs" });
  },

  new: (req, res) => {
    res.render("users/new", { pageTitle: "Créer un utilisateur" });
  },

  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la création de l'utilisateur: ${error.message}`);
        res.locals.redirect = "/users/new";
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération de l'utilisateur par ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show", {
      pageTitle: `Détails de ${res.locals.user.fullName || "l'utilisateur"}`,
      user: res.locals.user
    });
  },

  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user,
          pageTitle: `Modifier ${user.fullName || "utilisateur"}`
        });
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération de l'utilisateur par ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la mise à jour de l'utilisateur par ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndDelete(userId)
      .then(() => {
        res.redirect("/users");
      })
      .catch(error => {
        console.log(`Erreur lors de la suppression : ${error.message}`);
        next(error);
      });
  },

  // getApiToken: (req, res) => {
  //   if (req.user) { // Vérifie si l'utilisateur est connecté
  //       // Générer un token signé
  //       const signedToken = jsonWebToken.sign(
  //           {
  //               data: req.user._id, // Utiliser l'ID de l'utilisateur
  //               exp: new Date().setDate(new Date().getDate() + 30) // Le token sera valide pendant 30 jours
  //           },
  //           token_key // La clé secrète pour signer le token
  //       );

  //       // Passer le token à la vue pour l'afficher
  //       res.render("users/api-token", {
  //           token: signedToken
  //       });
  //   } else {
  //       req.flash("error", "Vous devez être connecté pour obtenir un token API.");
  //       res.redirect("/login"); // Rediriger vers la page de login si l'utilisateur n'est pas connecté
  //   }
  // }

















  getApiToken: (req, res) => {
    const apiToken = req.params.apiToken;  // Récupérer le token API depuis l'URL

    // Rechercher l'utilisateur en fonction de son token API
    User.findOne({ apiToken: apiToken })
      .then(user => {
        if (!user) {
          return res.status(404).send("Utilisateur non trouvé");
        }
        res.render("user/profile", { user });
      })
      .catch(err => {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        res.status(500).send("Erreur serveur");
      });
  },
};
































