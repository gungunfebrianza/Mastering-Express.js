const mongoose = require("mongoose");
const { connection, Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/training").catch(console.error);

//Define a schema:
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number
});

//Compile the schema into a model:
const ModelUser = mongoose.model("User", UserSchema);

/*Once connected to the database, add a new document to the collection of users.
Then, using chaining syntax, query for the recently created user.
Additionally, use the select method to restrict which fields are retrieved
from the document:*/
connection.once("connected", async () => {
  try {
    const user = await new ModelUser({
      firstName: "Krista",
      lastName: "Snow",
      age: 30
    }).save();

    const findUser = await ModelUser.findOne()
      .where("firstName")
      .equals("Krista")
      .where("age")
      .lte(31)
      .select("lastName age");

    console.log(JSON.stringify(findUser, null, 4));

    await ModelUser.remove();
  } catch (error) {
    console.dir(error.message, { colors: true });
  } finally {
    await connection.close();
  }
});
