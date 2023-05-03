const express = require("express");
// const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const UsersRoute = require("./routes/users.js");
const PostsRoute = require("./routes/posts.js");
const DiscussionsRoute = require("./routes/discussions.js");
const CommentsRoute = require("./routes/comments.js");
const mockUsers = require("./mock-db/mock.js");
const PORT = process.env.PORT || 5000;
const db = require("./db.js");
const User = require("./schemas/users.js");
const Discussion = require("./schemas/discussions.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const {ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;

const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }))
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// TODO add to process.env
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secret"));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.userId);
      if (user) {
        const copy = user;
        copy.password = "[redacted]";
        return done(null, copy);
      }
      return done(null, false);
    } catch (err) {
      console.error(err);
    }
  })
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log(username)
      try {
        const user = await User.findOne({ username: username });
        if (!user) return done("user does not exist", false);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false);
        // if passwords match return user
        // console.log("Returning user" + user);
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    }
  )
);

app.post("/", passport.authenticate("local-login"), async (req, res) => {

  console.log('jwt', req.user)
  try {

    const token = jwt.sign({ userId: req.user._id }, "SECRET", {
      expiresIn: "1h",
    });
    
    return res.json('exist');
  } catch (e) {
    res.json("notexist");
  }
  // do what u need to in order to get user onto the following page - they r logged in

  // else
  // display error message
});



passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // check if user exists
        const userExists = await User.findOne({ username: username });
        const cleanUsername = username.toLowerCase();
        if (!userExists) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = User({
            username: cleanUsername,
            password: hashedPassword,
            bio: "",
            favThrift: "",
            style: "",
          });
          newUser.save();
          return done(null, newUser);
        }else{
          return done("User already exists", null)
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
app.post(
  "/register",
  passport.authenticate("local-signup"),
  async (req, res) => {

    const token = jwt.sign({ userId: req.user._id }, "SECRET", {
      expiresIn: "1h",
    });

    return res.json({data: "exist", token})
    
  }
);

app.get("/api/allUsers", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

app.get("/api/allDiscussions", async (req, res) => {
  try {
    const allDiscussions = await Discussion.find({}).populate('author');
    res.json(allDiscussions);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving all discussions' });
  }
});

app.get("/api/dummyUsers", (req, res) => {
  res.json(mockUsers);
});

app.use("/api/users", UsersRoute);
app.use("/api/posts", PostsRoute);
app.use("/api/discussions", DiscussionsRoute);
app.use("/api/comments", CommentsRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
