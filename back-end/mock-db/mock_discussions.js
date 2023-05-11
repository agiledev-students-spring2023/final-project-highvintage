const dummyUsers = require("./mock.js");

// mocks the mongoDB collection we would need to fetch discussions with out
// having to go through a user first!

const dummyDiscussions = [];
dummyUsers.forEach((user) =>
user.discussion.forEach((discussion) => {
dummyDiscussions.push(discussion);
})
);

module.exports = dummyDiscussions;