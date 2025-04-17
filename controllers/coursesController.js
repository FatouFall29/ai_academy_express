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
