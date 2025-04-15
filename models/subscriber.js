// const mongoose = require("mongoose");

// const subscriberSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Le nom est requis."]
//   },
//   email: {
//     type: String,
//     required: [true, "L’email est requis."],
//     match: [/.+@.+\..+/, "L’email doit être valide."]
//   },
//   zipCode: {
//     type: Number,
//     required: [true, "Le code postal est requis."],
//     min: [1000, "Le code postal doit être au moins 1000."],
//     max: [99999, "Le code postal doit être au plus 99999."]
//   }
// });

// module.exports = mongoose.model("Subscriber", subscriberSchema);












const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, "Le nom est requis."]
  // },



  name: {
    type: String,
    required: [true, "Le nom est requis."],
    validate: {
      validator: function (v) {
        return /\w+\s+\w+/.test(v); // Au moins deux mots séparés par un espace
      },
      message: "Veuillez entrer le prénom et le nom."
    }
  },
  
  // email: {
  //   type: String,
  //   required: [true, "L’email est requis."],
  //   match: [/.+@.+\..+/, "L’email doit être valide."]
  // },

  email: {
    type: String,
    required: [true, "L’email est requis."],
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Expression régulière plus stricte
      "L’email doit être valide."
    ]
  },
zipCode: {
  type: String,
  required: [true, "Le code postal est requis."],
  match: [/^\d{4,5}$/, "Le code postal doit comporter 4 à 5 chiffres."]
}
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
module.exports = Subscriber;
