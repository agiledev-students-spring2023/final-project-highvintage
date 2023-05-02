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

// adding post author to all mock users
for (const user of mockUsers) {
  user.savedPosts = [];
  user.bio = 'This is my bio made from the server.js file!';
  user.style = 'Server.js';
  user.favoriteThrift = 'nodemon server.js';
  if (!user.followers) {
    user.followers = [];
    user.following = [];
  }
  for (const post of user.posts) {
    post.author = user.id;
    if (!post.postLoc) {
      post.postLoc = '';
    }
  }
  // store user.id as discussion author
  for (const discussion of user.discussion) {
    discussion.author = user.id;
  }
}

const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// TODO add to process.env
app.use(session({ secret: 'high-vintage', username: undefined, cookie: { maxAge: 60000 }}))

const publicPath = path.join(__dirname, '../front-end/src/pages');

// app.set('view engine', 'hbs')
// app.set('views', templatePath)

app.use(express.static(publicPath));

async function hashPass (password) {
  const res = await bcryptjs.hash(password, 10);
  return res;
}

async function compare (userPass, hashPass) {
  const res = await bcryptjs.compare(userPass, hashPass);
  return res;
}

const oneUser = [];
const set = async function (oneUser) {
  try {
    const user = await User.findOne({ username: 'krunker' });

    if (user) {
      oneUser.push(user);
      // console.log("user found:", user);
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
set(oneUser);

// middleware to access/manipulate the logged in user!
// in any route, user req.user to get the "logged in " user
const persistUser = async function (req, res, next) {
  console.log(req.session)
  next(); 
};

app.use(persistUser);

app.get('/', (req, res) => {
  if (req.cookies.jwt) {
    const verify = jwt.verify(
      req.cookies.jwt,
      'qwertyuiopasdfghjklzxcvbnmqwertyuzzzzz'
    );
    res.render('home', { name: verify.username });
  } else {
    res.render('/');
  }
  // res.render("/signin")
});

// app.post("/", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const check = await db.collection("Auth").findOne({ email: email });

//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("notexist");
//     }
//   } catch (e) {
//     res.json("notexist");
//   }
// });

// LOGIN 
app.post('/', async (req, res) => {

  try {
    const check = await db
      .collection('Auth')
      .findOne({ email: req.body.username });
    const passCheck = await compare(req.body.password, check.password);

    if (check && passCheck) {
      
      req.session.username = req.body.username; 
      
      return res.json('exist')
    } else {
      return res.json('notexist');
    }
  } catch (e) {
    return res.json('notexist');
  }
});

// REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const check = await db.collection('Auth').findOne({ username });

    if (check) {
      res.json('exist');
    } else {
      const token = jwt.sign(
        { username: req.body.username },
        'qwertyuiopasdfghjklzxcvbnmqwertyuzzzzz'
      );

      res.cookie('jwt', token, {
        maxAge: 600000,
        httpOnly: true
      });

      const data = {
        username,
        password: await hashPass(password),
        token
        // bio: "",
        // favThrift: "",
        // style: ""
      };

      // localStorage.setItem('jwt', token);

      res.json('notexist');
      await db.collection('Auth').insertMany([data]);
      // req.user = await db.collection('Users').findOne({username})
    }
  } catch (e) {
    res.json('notexist');
  }
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
