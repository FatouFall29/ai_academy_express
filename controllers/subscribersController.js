

// exports.new = (req, res) => {
//   res.render("subscribers/new", {
//     pageTitle: "Formulaire d'inscription",
//     subscriber: {},
//     errors: {},
//     data: {}
//   });
// };

// exports.create = async (req, res) => {
//   try {
//     const { name, email, zipCode } = req.body;

//     const errors = {};
//     if (!name || name.trim() === "") errors.name = "Le nom est requis.";
//     if (!email || email.trim() === "") errors.email = "L'email est requis.";
//     if (!zipCode || isNaN(zipCode)) errors.zipCode = "Code postal invalide.";

//     if (Object.keys(errors).length > 0) {
//       return res.render("subscribers/new", {
//         pageTitle: "Formulaire d’inscription",
//         errors,
//         data: req.body,
//         subscriber: {}
//       });
//     }

//     await Subscriber.create({ name, email, zipCode });
//     res.redirect("/subscribers/thanks");
//   } catch (error) {
//     console.error("Erreur lors de l’inscription :", error);
//     res.status(500).send("Erreur serveur");
//   }
// };







const Subscriber = require("../models/subscriber");

exports.new = (req, res) => {
  res.render("subscribers/new", {
    pageTitle: "Nouveau Abonné",
    errors: null,
    subscriber: {}
  });
};

exports.create = async (req, res) => {
  try {
    const subscriber = new Subscriber({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    });

    await subscriber.save();

    res.redirect("/thanks");
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(400).render("subscribers/new", {
        pageTitle: "Nouveau Abonné",
        errors,
        subscriber: req.body
      });
    } else {
      res.status(500).send("Erreur du serveur.");
    }
  }
};








exports.index = async (req, res) => {
  const subscribers = await Subscriber.find({});
  res.render("subscribers/index", {
    pageTitle: "Liste des abonnés",
    subscribers,
    notification: null
  });
};

exports.delete = async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.redirect("/subscribers");
};

// exports.edit = async (req, res) => {
//   const subscriber = await Subscriber.findById(req.params.id);
//   res.render("subscribers/edit", {
//     pageTitle: "Modifier l’abonné",
//     subscriber
//   });
// };

// exports.update = async (req, res) => {
//   await Subscriber.findByIdAndUpdate(req.params.id, req.body);
//   res.redirect("/subscribers");
// };
















// Affiche le formulaire de modification
exports.edit = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).send("Abonné non trouvé.");
    }

    res.render("subscribers/edit", {
      pageTitle: "Modifier l’abonné",
      subscriber,
      errors: null
    });
  } catch (error) {
    res.status(500).send("Erreur du serveur.");
  }
};

// Enregistre les modifications
exports.update = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).send("Abonné non trouvé.");
    }

    subscriber.name = req.body.name;
    subscriber.email = req.body.email;
    subscriber.zipCode = req.body.zipCode;

    await subscriber.save();
    res.redirect("/subscribers?notification=Informations modifiées avec succès !");
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(400).render("subscribers/edit", {
        pageTitle: "Modifier l’abonné",
        errors,
        subscriber: { ...req.body, _id: req.params.id }
      });
    } else {
      res.status(500).send("Erreur du serveur.");
    }
  }
};


// exports.search = async (req, res) => {
//   const term = req.query.term || ""; // <-- corrigé ici
//   const zipCodeNumber = parseInt(term, 10);
//   const searchConditions = [
//     { name: new RegExp(term, "i") }
//   ];

//   if (!isNaN(zipCodeNumber)) {
//     searchConditions.push({ zipCode: zipCodeNumber });
//   }

//   const subscribers = await Subscriber.find({ $or: searchConditions });

//   res.render("subscribers/index", {
//     pageTitle: `Résultats de la recherche : "${term}"`,
//     subscribers,
//     notification: subscribers.length === 0
//       ? "Aucun abonné trouvé."
//       : `${subscribers.length} résultat(s) trouvé(s)`
//   });
// };











// exports.search = async (req, res) => {
//   const term = req.query.term || "";
//   const searchConditions = [];

//   // Recherche par nom (insensible à la casse)
//   searchConditions.push({ name: new RegExp(term, "i") });

//   // Si le terme est un nombre (ex: code postal), on l'ajoute aussi
//   const zipCode = parseInt(term, 10);
//   if (!isNaN(zipCode)) {
//     searchConditions.push({ zipCode }); // NE PAS mettre de RegExp ici
//   }

//   const subscribers = await Subscriber.find({ $or: searchConditions });

//   res.render("subscribers/index", {
//     pageTitle: `Résultats de la recherche : "${term}"`,
//     subscribers,
//     notification: subscribers.length === 0
//       ? "Aucun abonné trouvé."
//       : `${subscribers.length} résultat(s) trouvé(s)`
//   });
// };









exports.search = async (req, res) => {
  const term = req.query.term || "";
  const searchConditions = [
    { name: new RegExp(term, "i") },
    { zipCode: new RegExp(term, "i") }
  ];

  const subscribers = await Subscriber.find({ $or: searchConditions });

  res.render("subscribers/index", {
    pageTitle: `Résultats de la recherche : "${term}"`,
    subscribers,
    notification: subscribers.length === 0
      ? "Aucun abonné trouvé."
      : `${subscribers.length} résultat(s) trouvé(s)`
  });
};


exports.show = async (req, res) => {
  const subscriber = await Subscriber.findById(req.params.id);
  res.render("subscribers/show", {
    pageTitle: subscriber.name,
    subscriber
  });
};
