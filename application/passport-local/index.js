const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/MyDatabase");

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});
const UserDetails = mongoose.model("userInfo", UserDetail, "userInfo");

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/success", (req, res) =>
  res.send("Welcome " + req.query.username + "!!")
);
app.get("/error", (req, res) => res.send("error logging in"));

/* The first one will be invoked on authentication, and its job is to serialize the user instance with the information we pass to it(the user ID in this case) and store it in the session via a cookie.The second one will be invoked every subsequent request to deserialize the instance, providing it the unique cookie identifier as a “credential”.  */
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

app.get("/", (req, res) => res.sendFile("auth.html", { root: __dirname }));

passport.use(
  new LocalStrategy(function(username, password, done) {
    UserDetails.findOne(
      {
        username: username
      },
      function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      }
    );
  })
);

app.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/error" }),
  function(req, res) {
    res.redirect("/success?username=" + req.user.username);
  }
);

const port = process.env.PORT || 9999;
app.listen(port, () => console.log("App listening on port " + port));

/* use MyDatabase;

db.userInfo.insert({ 'username': 'admin', 'password': 'admin' }); */
