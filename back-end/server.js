const express = require('express');
// const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require('cors');
const UsersRoute = require('./routes/users.js');
const PostsRoute = require('./routes/posts.js');
const DiscussionsRoute = require('./routes/discussions.js');
const CommentsRoute = require('./routes/comments.js');
const mockUsers = require('./mock-db/mock.js');
const PORT = process.env.PORT || 5000;
const db = require('./db.js');
const User = require('./schemas/users.js');
const Discussion = require('./schemas/discussions.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcryptjs = require('bcryptjs');
const session = require('express-session')
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;


const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
// TODO add to process.env
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser("secret"));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});




// LOGIN 
passport.use('local-login', new passportLocal({passReqToCallback: true}, 
  async function(req, username, password, done) {
    // check user's credentials 
      // put username input to lowercase then use await.UserfindOne to find by username
      // compare hashed passwords

      // if all ok return done(null, userdocument)
      // any issues reutrn done(null, false)
      try {
        const cleanUsername = req.body.username.toLowerCase(); 
        const findUser = await User.findOne({username: cleanUsername});
        if (!findUser) return done(null, false); 
        const passCompare = await bcryptjs.compare(password, req.body.password)
        if (findUser && passCompare) {
          return done(null, findUser);
        } 
        else {
          return done(null, false);
        }
      } catch(e) {
        return done(e)
      }
  }
 )) 

 app.post('/', passport.authenticate('local-login'), async (req, res) => {
  console.log(req.user)
  if (req.user) {
    // do what u need to in order to get user onto the following page - they r logged in 
  }

  // else
  // display error message

});

// REGISTER
passport.use('local-register', new passportLocal({passReqToCallback: true}, 
 async function(req, username, password, done) {
  try {
    const cleanUsername = req.body.username.toLowerCase(); 
    const findUser = await User.findOne({username: cleanUsername});
    if (findUser) return done(null, false); 
    if (!findUser) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      const newUser = User({
        username: cleanUsername,
        password: hashedPassword,
        bio: "",
        favThrift: "",
        style: ""
      });
      newUser.save();
      return done(null, newUser)
    }
  } catch(e) {
    return done(e)
  }

 }

)) 
app.post('/register', passport.authenticate('local-register'), async (req, res) => {
  console.log(req.user)
  if (req.user) {
    // do what u need to in order to get user onto the following page - they r logged in 
    
  }
  else {
    return res.sendStatus(404);

  }
  // else
  // display error message

});

app.get('/api/allUsers', async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

app.get('/api/allDiscussions', async (req, res) => {
  const allDiscussions = await Discussion.find({}).populate();
  res.json(allDiscussions);
});

app.get('/api/dummyUsers', (req, res) => {
  res.json(mockUsers);
});
app.use('/api/users', UsersRoute);
app.use('/api/posts', PostsRoute);
app.use('/api/discussions', DiscussionsRoute);
app.use('/api/comments', CommentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
