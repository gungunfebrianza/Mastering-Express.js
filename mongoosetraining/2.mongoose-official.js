const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/training");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected!");
});

const kittySchema = new mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function() {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

var Kitten = mongoose.model("Kitten", kittySchema);

var miaw = new Kitten({ name: "qrista qhuluk" });
console.log(miaw.name); // 'qrista qhuluk'

var fluffy = new Kitten({ name: "fluffy" });
fluffy.speak(); // "Meow name is fluffy"

//Each document can be saved to the database by calling its save method.
fluffy.save(function(err, fluffy) {
  if (err) return console.error(err);
  console.log("Data Saved!");
});

//we want to display all the kittens we've seen.
Kitten.find(function(err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});
