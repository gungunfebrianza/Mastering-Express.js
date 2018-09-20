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

/*Mantra
Model.find()
Parameters
    conditions «Object»
    [projection] «Object|String» optional fields to return, see Query.prototype.select()
    [options] «Object» optional see Query.prototype.setOptions()
    [callback] «Function»
Returns:
    «Query»
See More at : https://mongoosejs.com/docs/api.html#model_Model.find
*/

// 3. Querying Condition
ModelMan.find({ name: "Qrista" }, function(err, man) {
  if (err) return console.error(err);
  console.log(typeof man);
  console.log(man[0]);
  console.log(man[0].name);
});

// 4. Querying Condition With Comparison Operator
//$gte selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.)
ModelMan.find({ name: "YumaTOLOL", age: { $gte: 30 } }, function(err, man) {
  if (err) return console.error(err);
  console.log(man);
});

// 5. Querying Condition With Logical Operator
//Using the $or operator, you can specify a compound query that joins each clause with a logical OR conjunction so that the query selects the documents in the collection that match at least one condition.
ModelMan.find(
  {
    $or: [{ name: "YumaTOLOL" }, { name: "YumaTOL" }]
  },
  function(err, man) {
    if (err) return console.error(err);
    console.log(man);
  }
);

// 6. Querying with Projection
// Retrieving only certain fields
ModelMan.find({ name: "Qrista" }, "age", function(err, man) {
  if (err) return console.error(err);
  console.log(man);
});

// 7. Querying with Option
// Retrieving only certain fields
ModelMan.find({ name: "YumaTOLOL" }, null, { skip: 1 }, function(err, man) {
  if (err) return console.error(err);
  console.log(man);
});
