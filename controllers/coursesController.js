// const Course = require("../models/course");
// // Fonction utilitaire pour extraire les paramètres du cours du corps de la requête
// const getCourseParams = body => {
// return {
// title: body.title,
// description: body.description,
// maxStudents: body.maxStudents,
// cost: body.cost
// };
// };
// module.exports = {
// index: (req, res, next) => {
// Course.find({})
// .then(courses => {
// res.locals.courses = courses;
// next();
// })
// .catch(error => {
// console.log(`Erreur lors de la récupération des cours: ${error.message}`);
// next(error);
// });
// },
// indexView: (req, res) => {
// res.render("courses/index");
// },
// new: (req, res) => {
// res.render("courses/new");
// },
// create: (req, res, next) => {
// let courseParams = getCourseParams(req.body);
// Course.create(courseParams)
// .then(course => {

// res.locals.redirect = "/courses";
// res.locals.course = course;
// next();
// })
// .catch(error => {
// console.log(`Erreur lors de la création du cours: ${error.message}`);
// res.locals.redirect = "/courses/new";
// next();
// });
// },
// redirectView: (req, res, next) => {
// let redirectPath = res.locals.redirect;
// if (redirectPath) res.redirect(redirectPath);
// else next();
// },
// show: (req, res, next) => {
// let courseId = req.params.id;
// Course.findById(courseId)
// .populate("students")
// .then(course => {
// res.locals.course = course;
// next();
// })
// .catch(error => {
// console.log(`Erreur lors de la récupération du cours par ID: ${error.message}`);
// next(error);
// });
// },
// showView: (req, res) => {
// res.render("courses/show");
// },
// edit: (req, res, next) => {
// let courseId = req.params.id;
// Course.findById(courseId)
// .then(course => {
// res.render("courses/edit", {
// course: course
// });
// })
// .catch(error => {
// console.log(`Erreur lors de la récupération du cours par ID: ${error.message}`);
// next(error);
// });
// },

// update: (req, res, next) => {
// let courseId = req.params.id,
// courseParams = getCourseParams(req.body);
// Course.findByIdAndUpdate(courseId, {
// $set: courseParams
// })
// .then(course => {
// res.locals.redirect = `/courses/${courseId}`;
// res.locals.course = course;
// next();
// })
// .catch(error => {
// console.log(`Erreur lors de la mise à jour du cours par ID: ${error.message}`);
// next(error);
// });
// },
// delete: (req, res, next) => {
// let courseId = req.params.id;
// Course.findByIdAndRemove(courseId)
// .then(() => {
// res.locals.redirect = "/courses";
// next();
// })
// .catch(error => {
// console.log(`Erreur lors de la suppression du cours par ID: ${error.message}`);
// next();
// });
// }
// };









// const Course = require("../models/course");

// const getCourseParams = body => {
//   return {
//     title: body.title,
//     description: body.description,
//     maxStudents: body.maxStudents,
//     cost: body.cost
//   };
// };

// module.exports = {
//   // Afficher tous les cours
//   index: (req, res, next) => {
//     Course.find({})
//       .then(courses => {
//         res.locals.courses = courses;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la récupération des cours: ${error.message}`);
//         next(error);
//       });
//   },

//   // Rendu de la page des cours
//   indexView: (req, res) => {
//     res.render("courses/index", {
//       courses: res.locals.courses
//     });
//   },

//   // Afficher le formulaire de création de cours
//   new: (req, res) => {
//     res.render("courses/new");
//   },

//   // Créer un nouveau cours
//   create: (req, res, next) => {
//     let courseParams = getCourseParams(req.body);
//     Course.create(courseParams)
//       .then(course => {
//         res.locals.redirect = "/courses";
//         res.locals.course = course;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la création du cours: ${error.message}`);
//         res.locals.redirect = "/courses/new";
//         next();
//       });
//   },

//   // Redirection après action
//   redirectView: (req, res, next) => {
//     let redirectPath = res.locals.redirect;
//     if (redirectPath) res.redirect(redirectPath);
//     else next();
//   },

//   // Afficher un cours en particulier
//   show: (req, res, next) => {
//     let courseId = req.params.id;
//     Course.findById(courseId)
//       .then(course => {
//         if (course) {
//           res.locals.course = course;
//           next();
//         } else {
//           res.locals.course = null;
//           next();
//         }
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la récupération du cours par ID: ${error.message}`);
//         next(error);
//       });
//   },

//   // Vue pour afficher un cours
//   showView: (req, res) => {
//     const course = res.locals.course;
//     if (!course) {
//       res.render("error", { message: "Cours introuvable." });
//     } else {
//       res.render("courses/show", { course });
//     }
//   },

//   // Formulaire d'édition d'un cours
//   edit: (req, res, next) => {
//     let courseId = req.params.id;
//     Course.findById(courseId)
//       .then(course => {
//         if (course) {
//           res.render("courses/edit", { course });
//         } else {
//           res.render("error", { message: "Cours introuvable pour édition." });
//         }
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la récupération du cours pour édition: ${error.message}`);
//         next(error);
//       });
//   },

//   // Mise à jour d’un cours
//   update: (req, res, next) => {
//     let courseId = req.params.id,
//         courseParams = getCourseParams(req.body);
//     Course.findByIdAndUpdate(courseId, { $set: courseParams }, { new: true })
//       .then(course => {
//         res.locals.redirect = `/courses/${courseId}`;
//         res.locals.course = course;
//         next();
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la mise à jour du cours: ${error.message}`);
//         next(error);
//       });
//   },
// exports.delete = (req, res, next) => {
//     const courseId = req.params.id;
  
//     Course.findByIdAndDelete(courseId)
//       .then(() => {
//         req.session.notification = {
//           type: "success",
//           message: "Cours supprimé avec succès."
//         };
//         res.redirect("/courses");
//       })
//       .catch(error => {
//         console.error("Erreur lors de la suppression :", error);
//         next(error);
//       });
//   }
// };

















const Course = require("../models/course");
const User = require("../models/user");

// Afficher tous les cours
exports.index = (req, res, next) => {
  Course.find({})
    .populate("students")
    .then(courses => {
      res.locals.courses = courses;
      next();
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des cours :", error);
      next(error);
    });
};

exports.indexView = (req, res) => {
  res.render("courses/index", {
    pageTitle: "Liste des cours",
    courses: res.locals.courses
  });
};

// Formulaire de création de cours
exports.new = (req, res) => {
  res.render("courses/new", { pageTitle: "Nouveau cours" });
};

// Créer un nouveau cours
exports.create = (req, res, next) => {
  let courseParams = {
    title: req.body.title,
    description: req.body.description,
    maxStudents: req.body.maxStudents,
    cost: req.body.cost
  };

  Course.create(courseParams)
    .then(course => {
      req.session.notification = {
        type: "success",
        message: "Cours créé avec succès !"
      };
      res.locals.redirect = "/courses";
      next();
    })
    .catch(error => {
      console.error("Erreur lors de la création du cours :", error);
      req.session.notification = {
        type: "error",
        message: "Erreur lors de la création du cours."
      };
      res.locals.redirect = "/courses/new";
      next();
    });
};

// Afficher les détails d’un cours
exports.show = (req, res, next) => {
  const courseId = req.params.id;

  Course.findById(courseId)
    .populate("students")
    .then(course => {
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.error("Erreur lors de la récupération du cours :", error);
      next(error);
    });
};

exports.showView = (req, res) => {
  res.render("courses/show", {
    pageTitle: res.locals.course.title,
    course: res.locals.course
  });
};

// Formulaire d'édition de cours
exports.edit = (req, res, next) => {
  const courseId = req.params.id;

  Course.findById(courseId)
    .then(course => {
      res.render("courses/edit", {
        pageTitle: "Modifier le cours",
        course: course
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération pour édition :", error);
      next(error);
    });
};

// Mettre à jour un cours
exports.update = (req, res, next) => {
  const courseId = req.params.id;

  let courseParams = {
    title: req.body.title,
    description: req.body.description,
    maxStudents: req.body.maxStudents,
    cost: req.body.cost
  };

  Course.findByIdAndUpdate(courseId, courseParams, { new: true, runValidators: true })
    .then(course => {
      req.session.notification = {
        type: "success",
        message: "Cours mis à jour avec succès."
      };
      res.locals.redirect = `/courses/${courseId}`;
      next();
    })
    .catch(error => {
      console.error("Erreur lors de la mise à jour :", error);
      req.session.notification = {
        type: "error",
        message: "Erreur lors de la mise à jour du cours."
      };
      res.locals.redirect = `/courses/${courseId}/edit`;
      next();
    });
};

// Supprimer un cours
exports.delete = (req, res, next) => {
  const courseId = req.params.id;

  Course.findByIdAndDelete(courseId)
    .then(() => {
      req.session.notification = {
        type: "success",
        message: "Cours supprimé avec succès."
      };
      res.locals.redirect = "/courses";
      next();
    })
    .catch(error => {
      console.error("Erreur lors de la suppression du cours :", error);
      next(error);
    });
};

// Rediriger vers la page appropriée après action
exports.redirectView = (req, res) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath) {
    res.redirect(redirectPath);
  } else {
    res.redirect("/courses");
  }
};
