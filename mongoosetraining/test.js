const mongoose = require("mongoose");
const { Schema } = mongoose;

//mongoose.connect("mongodb://localhost:27017/training");
//support multi-connection
var connection = mongoose.createConnection(
  "mongodb://localhost:27017/training"
);

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected!");
});

// 1. Create Schema
var schema = new Schema({
  name: "string",
  size: { type: String },
  age: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: "i"
  }
});

// 2. Compile Schema
var ModelTank = connection.model("Tank", schema);

// 3. Create Document
var DocumentBig = new ModelTank({
  name: "big",
  size: "big",
  age: 20.002
});

DocumentBig.save(function(err) {
  if (err) return handleError(err);
  console.log("saved"); // saved!
});

// 4. Querying
//we want to display all the tank we've seen.
ModelTank.find({ age: 20 }, function(err, tanks) {
  if (err) return console.error(err);
  console.log(tanks);
});

