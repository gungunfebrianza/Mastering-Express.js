const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = "secret";

/* options is an object literal
containing options to control how the token is extracted from the request or verified. */
const opts = {};
/* jwtFromRequest Function that accepts a request as the only parameter and returns either the JWT as a string or null.See Extracting the JWT from the request for more details. */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
/* secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided. */
opts.secretOrKey = keys;

module.exports = passport => {
  passport.use(
    /* 
    jwt_payload is an object literal containing the decoded JWT payload.
    done is a passport error first callback accepting arguments done(error, user, info) 
    */
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
