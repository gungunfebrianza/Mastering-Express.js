const mongoose = require("mongoose");
const { Schema } = mongoose;

//mongoose.connect("mongodb://localhost:27017/training");
//support multi-connection
var connection1 = mongoose.createConnection(
  "mongodb://localhost:27017/training"
);

const db = connection1;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected!");
});

// 1. Create Schema
var schema = new Schema({
  name: "string",
  age: {
    type: Number,
    min: [5, "Too young"],
    max: 99
  },
  wallet: { type: Number, required: [true, "Add Me Money!"] }
});

// 2. Compile Schema
var ModelMan = connection1.model("Man", schema);

// 3. Querying
// Retrieving only certain fields
ModelMan.find({ name: "Qrista" }, "size", function(err, tanks) {
  if (err) return console.error(err);
  console.log(tanks);
});

// 3. Querying
//we want to display all specific the tank we've seen.
ModelMan.find({ name: "Qrista" }, function(err, man) {
  if (err) return console.error(err);
  console.log(typeof man);
  console.log(man[0]);
  console.log(man[0].name);
});
