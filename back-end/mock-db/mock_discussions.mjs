import dummyUsers from "./mock.mjs";

// mocks the mongoDB collection we would need to fetch discussions  with out
// having to go through a user first!

const dummyDiscussions = [];
dummyUsers.forEach((user) =>
  user.discussion.forEach((discussion) => {
    dummyDiscussions.push(discussion);
  })
);

export default dummyDiscussions;
