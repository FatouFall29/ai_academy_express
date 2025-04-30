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
    res.redirect("/subscribers/thanks");


    // res.redirect("/thanks");
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
