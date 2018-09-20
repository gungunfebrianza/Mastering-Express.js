const mongoose = require("mongoose");
const { Schema } = mongoose;

//mongoose.connect("mongodb://localhost:27017/training");
//support multi-connection
var mongooseConnection = mongoose.createConnection(
  "mongodb://localhost:27017/training"
);

const db = mongooseConnection;
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
var ModelMan = mongooseConnection.model("Man", schema);

// 3. Querying
//Deletes the first document that matches conditions from the collection. Behaves like remove(), but deletes at most one document regardless of the single option.
ModelMan.deleteOne({ name: "WildanBanqong a" }, function(err, man) {
  if (err) return console.error(err);
  console.log(man);
});
