const dummyUsers = require("./mock.js");

// mocks the mongoDB collection we would need to fetch posts with out
// having to go through a user first!

const dummyPosts = [];
dummyUsers.forEach((user) =>
  user.posts.forEach((post) => {
    dummyPosts.push(post);
  })
);

module.exports = dummyPosts;
