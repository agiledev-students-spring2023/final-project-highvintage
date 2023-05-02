const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Post = require('../schemas/posts.js');
const User = require('../schemas/users.js');
const Style = require('../schemas/styles.js');
const db = require('../db.js');
const { ObjectId } = require('mongodb');
const passport = require("passport");
const router = express.Router();

router.use('/static', express.static('public'));
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

router.get('/styles', async (req, res) => {
  try {
    const fetchedStyles = await new Style({
      styles: [
        'All',
        'Sporty & Athleisure',
        'Streetwear',
        'Classic',
        'Funk',
        'Minimal',
        'Other'
      ]
    }).save();
    const styles = fetchedStyles.styles;
    res.status(201).json({ styles });
  } catch (err) {
    res.sendStatus(500);
  }
});

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});
const upload = multer({ storage });

// TODO: file validation

// api/posts/ (outfit posts)
router.post(
  '/create',
  upload.fields([{ name: 'my_files', maxCount: 5 }]),
  async (req, res, next) => {
    const user = req.user;
    const { location, content, style } = req.body;

    const photos = req.files.my_files.map((file) => ({
      data: fs.readFileSync(path.join(uploadDir + '/' + file.filename)),
      contentType: file.mimetype
    }));

    try {
      // create new Post and save
      const newPost = await new Post({
        author: user._id,
        style,
        caption: content,
        photos,
        location
      }).save();

      if (newPost) {
        db.collection('Posts').insertOne(newPost);
      } else {
        res.sendStatus(500);
      }

      // Populate the author field in the newPost object
      const populatedPost = await Post.populate(newPost, {
        path: 'author',
        model: 'User'
      });
      user.posts.push(populatedPost._id);

      try {
        await user.save();
        // Populate posts field in User
        await User.findById(user._id).populate('posts');

        // JUST TO MAKE EASIER TO DELETE.. IF NEEDED
        // await Post.deleteMany({});
        // remove post ids from user.posts array
        // await User.updateMany({}, { $set: { posts: [] } });
      } catch (err) {
        res.sendStatus(500);
      }

      res.status(201).json({ newPost: populatedPost });
    } catch (err) {
      res.sendStatus(500);
      next(err);
    }
  }
);

// get like status
router.get('/:id/like', async (req, res) => {
  const userID = req.query.userID;
  const postID = req.params.id;

  try {
    const post = await Post.findById(postID);

    const numLikes = post.likes.length;
    // determine if it is liked
    const isLiked = post.likes.some((like) => like.equals(userID));

    res.json({ numLikes, isLiked });
  } catch (err) {
    res.sendStatus(500);
  }
});

// api/posts/
router.post('/:postID/like', async (req, res) => {
  const { postID, liked, postLikes } = req.body;
  const user = req.user;

  let numLikes = postLikes;
  let isLiked = liked;

  // isLiked true = not liked, since passed in !isLiked
  if (isLiked) {
    // adds user objectID to like array
    try {
      await Post.findByIdAndUpdate(postID, {
        $push: { likes: new ObjectId(user._id) }
      })
        .populate()
        .then((post) => {
          console.log('+ Likes', post.likes.length);
        });
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    // deletes user from like array
    try {
      await Post.findByIdAndUpdate(postID, {
        $pull: { likes: new ObjectId(user._id) }
      }).then((post) => {
        console.log('- Likes', post.likes.length);
      });
    } catch (err) {
      res.sendStatus(500);
    }
  }

  // getting likes data
  try {
    await Post.findById(postID)
      .populate()
      .then((post) => {
        numLikes = post.likes.length;
        // Check if the current user has already liked the discussion
        isLiked = post.likes.some((like) => like.equals(user._id));
      });
    // Return the updated number of likes and like state in the response
    res.json({ numLikes, isLiked });
  } catch (err) {
    res.sendStatus(500);
  }
});

// api/posts/
router.get('/collection', async (req, res) => {
  const user = req.user;
  try {
    await User.find()
      .then(async (fetchedUsers) => {
        const populatedUsers = await User.findById(user._id).populate('posts');
        const allPosts = [];
        [populatedUsers].forEach((user) => {
          user.posts.forEach((p) => {
            allPosts.push(p);
          });
        });
        console.log('* allPosts', allPosts);
        res.json({ populatedUsers, allPosts });
      })
      .catch((err) => console.log('* Cannot fetch all users', err));
  } catch (err) {
    res.sendStatus(500);
  }
});

// api/posts/
router.get('/view', async (req, res) => {
  const user = req.user;
  const postID = req.query.id;

  try {
    const foundPost = await Post.findOne({ _id: postID });
    if (foundPost) {
      const post = {
        ...foundPost.toObject(),
        authorPhoto: user.photo,
        authorUsername: user.username,
        postLoc: foundPost.location || ' ',
        date: foundPost.posted,
        postText: foundPost.caption
      };
      return res.json({ post });
    } else {
      // 404 Not Found
      return res.sendStatus(404);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

// api/posts/
router.get('/feed', async function (req, res) {

  if (!req.user) {
    return res.sendStatus(403);
  }

  try {
    await req.user.populate('following');
  } catch (e) {
    return res.sendStatus(500);
  }

  const postsToDisplay = [];

  req.user.following.forEach((user) =>
    user.posts.forEach((post) => postsToDisplay.push(post))
  );

  const feed = [];

  try {
    for (const post of postsToDisplay) {
      const putInFeed = await Post.findById(post).populate('author');
      feed.push(putInFeed);
    }
  } catch (e) {
    return res.sendStatus(500);
  }

  try {
    await req.user.populate('posts');
  } catch (e) {
    return res.sendStatus(500);
  }

  for (const myPost of req.user.posts) {
    try {
      const addMyPostToFeed = await Post.findById(myPost._id).populate(
        'author'
      );
      feed.push(addMyPostToFeed);
    } catch (e) {
      return res.sendStatus(500);
    }
  }

  const sorted = feed.sort(function (a, b) {
    return new Date(b.posted) - new Date(a.posted);
  });

  res.json({ feed: sorted });
});

module.exports = router;
