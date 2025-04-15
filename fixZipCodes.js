const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/ai_academy");

mongoose.connection.once("open", async () => {
  const updated = await Subscriber.updateMany(
    { zipCode: { $type: "int" } },
    [
      {
        $set: {
          zipCode: {
            $toString: "$zipCode"
          }
        }
      }
    ]
  );

  console.log("Abonnés mis à jour :", updated.modifiedCount);
  mongoose.connection.close();
});
