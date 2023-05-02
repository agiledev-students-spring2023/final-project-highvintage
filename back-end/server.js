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


// async function hashPass (password) {
//   const res = await bcryptjs.hash(password, 10);
//   return res;
// }

// async function compare (userPass, hashPass) {
//   const res = await bcryptjs.compare(userPass, hashPass);
//   return res;
// }


// app.get('/', (req, res) => {
//   // if (req.cookies.jwt) {
//   //   const verify = jwt.verify(
//   //     req.cookies.jwt,
//   //     'qwertyuiopasdfghjklzxcvbnmqwertyuzzzzz'
//   //   );
//   //   res.render('home', { name: verify.username });
//   // } else {
//   //   res.render('/');
//   // }
//   // // res.render("/signin")
// });


// LOGIN 
app.post('/', (req, res, next) => {

  // try {
  //   const check = await db
  //     .collection('Auth')
  //     .findOne({ email: req.body.username });
  //   const passCheck = await compare(req.body.password, check.password);

  //   if (check && passCheck) {
      
  //     req.session.username = req.body.username; 
      
  //     return res.json('exist')
  //   } else {
  //     return res.json('notexist');
  //   }
  // } catch (e) {
  //   return res.json('notexist');
  // }
  passport.authenticate("local", (err,user,info) => {
    if (err) throw err;
    if (!user) {
      console.log(user)
      res.send("No User Exists");
    }
    else{
      req.logIn(user, err => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      })
    }
  })(req,res,next);
});

// REGISTER
app.post('/register', async (req, res) => {
  // const { username, password } = req.body;
  
  // try {
  //   const check = await db.collection('Auth').findOne({ username });

  //   if (check) {
  //     res.json('exist');
  //   } else {
  //     const token = jwt.sign(
  //       { username: req.body.username },
  //       'qwertyuiopasdfghjklzxcvbnmqwertyuzzzzz'
  //     );

  //     res.cookie('jwt', token, {
  //       maxAge: 600000,
  //       httpOnly: true
  //     });

  //     const data = {
  //       username,
  //       password: await hashPass(password),
  //       token
  //       // bio: "",
  //       // favThrift: "",
  //       // style: ""
  //     };

  //     // localStorage.setItem('jwt', token);

  //     res.json('notexist');
  //     await db.collection('Auth').insertMany([data]);
  //     // req.user = await db.collection('Users').findOne({username})
  //   }
  // } catch (e) {
  //   res.json('notexist');
  // }
  User.findOne({username: req.body.username}).then(async function(err,doc){
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      const newUser = User({
        username: req.body.username,
        password: hashedPassword,
        bio: "",
        favThrift: "",
        style: ""
      });
      newUser.save("User Created");
    }

  })
  

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
