//npm modules
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

const { sessionConfig } = require("./session/sessionConfig");

const { localStrategy } = require("./passport/strategy");
const userTransform = require("./passport/userTransform");
const { authenticator } = require("./passport/authenticator");

const { originPolicy } = require("./cors/corsPolicy");

const ctrlUsers = require('./controllers/users');

const { BACKEND_HOSTNAME, BACKEND_PORT } = require('./config');

const CORS_OPTIONS = {
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  origin: originPolicy,
  credentials: true
};

// configure passport.js to use the local strategy
passport.use(localStrategy);
passport.serializeUser(userTransform.serializer);
passport.deserializeUser(userTransform.deserializer);

// create the server
const app = express();

// add & configure middleware
app.use(cors(CORS_OPTIONS));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static(__dirname + "/public"));

const isAuthenticated = (req, res, next) => {
  return req.isAuthenticated ? 
    next() :
    res.status(403).send({error: 'You must be authenticated to access this location'});
}

// create the homepage route at '/'
app.get("/", (req, res) => {
  res.send({
    isAuthenticated: req.isAuthenticated()
  });
});

// create the login get and post routes
app.get("/login", (req, res) => {
  res.send({
    isAuthenticated: req.isAuthenticated()
  });
});

app.post("/login", authenticator);

app.get("/users/me", isAuthenticated, ctrlUsers.currentUser);
app.get("/users", isAuthenticated, ctrlUsers.allUsers);
app.get("/users/:id", isAuthenticated, ctrlUsers.getOne);

// tell the server what port to listen on
app.listen(BACKEND_PORT, () => {
  console.log(`Listening on ${BACKEND_HOSTNAME}:${BACKEND_PORT}`);
});
