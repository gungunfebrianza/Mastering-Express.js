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
var schema = new Schema({ name: "string", size: "string" });

// 2. Compile Schema
var Tank = connection1.model("Tank", schema);

// 3. Querying
// Retrieving only certain fields
Tank.find({ name: "medium" }, "size", function(err, tanks) {
  if (err) return console.error(err);
  console.log(tanks);
});
