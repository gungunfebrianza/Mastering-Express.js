const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile("auth.html", { root: __dirname }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));
