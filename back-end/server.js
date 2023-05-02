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
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

// LOGIN
// passport.use('local-login', new passportLocal({passReqToCallback: true},
//   async function(req, username, password, done) {
//     // check user's credentials
//       // put username input to lowercase then use await.UserfindOne to find by username
//       // compare hashed passwords

//       // if all ok return done(null, userdocument)
//       // any issues reutrn done(null, false)
//       try {
//         const cleanUsername = req.body.username.toLowerCase();
//         const findUser = await User.findOne({username: cleanUsername});
//         console.log(req.body.password)
//         console.log(password)
//         if (!findUser) return done(null, false);
//         const passCompare = await bcrypt.compare(findUser.password, req.body.password);
//         console.log(findUser.password)
//         if (passCompare) {
//           return done(null, findUser);
//         }
//         else {
//           console.log("pass dont match")
//           return done(null, false);
//         }
//       } catch(e) {
//         return done(e)
//       }
//   }
//  ))
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false);
        // if passwords match return user
        console.log("Returning user" + user);
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    }
  )
);

app.post("/", passport.authenticate("local-login"), async (req, res) => {
  try {
    if (req.user) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
  // do what u need to in order to get user onto the following page - they r logged in

  // else
  // display error message
});

// REGISTER
// passport.use('local-signup', new passportLocal({passReqToCallback: true},
//  async function(req, username, password, done) {
//   try {
//     const cleanUsername = req.body.username.toLowerCase();
//     const findUser = await User.findOne({username: cleanUsername});
//     if (findUser) return done(null, false);
//     if (!findUser) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       const newUser = User({
//         username: cleanUsername,
//         password: hashedPassword,
//         bio: "",
//         favThrift: "",
//         style: ""
//       });
//       newUser.save();
//       return done(null, newUser)
//     }
//   } catch(e) {
//     return done(e)
//   }

//  }

// ))
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
    try {
      if(req.user) {
        res.json("notexist")
      }else {
        res.json("exist")
      }
    }
    catch(e) {
      res.json("exist")
    }
    
  }
);

app.get("/api/allUsers", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

app.get("/api/allDiscussions", async (req, res) => {
  const allDiscussions = await Discussion.find({}).populate();
  res.json(allDiscussions);
});

app.get("/api/dummyUsers", (req, res) => {
  res.json(mockUsers);
});
app.use("/api/users", UsersRoute);
app.use("/api/posts", PostsRoute);
app.use("/api/discussions", DiscussionsRoute);
app.use("/api/comments", CommentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
