const chai = require ("chai");
const chaiHttp = require ("chai-http");
const app  = require ("../server.js");
const dummyUsers =  require( "../mock-db/mock.js");

chai.use(chaiHttp);
const { expect } = chai;

// test following another user
describe("PUT /api/users/:username/follow", () => {
  it("should allow the logged in user to follow another user", (done) => {
    const loggedInUser = {
      username: "user1",
    };

    const userToFollow = {
      username: "krunker",
    };

    const userToFollowId = dummyUsers.find(
      (user) => user.username === userToFollow.username
    ).id;

    chai
      .request(app)
      .put(`/api/users/${userToFollow.username}/follow`)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User followed successfully");
        expect(res.body.user).to.be.an("object");
        expect(res.body.user.id).to.equal(userToFollowId);
        expect(res.body.user.followers).to.include(
          dummyUsers.find((user) => user.username === loggedInUser.username).id
        );
        done();
      });
  });
});

//// test unfollowing another user
describe("PUT /api/users/:username/follow", () => {
  it("should allow the logged in user to unfollow another user", (done) => {
    const loggedInUser = {
      username: "user1",
    };

    const userToUnfollow = {
      username: "krunker",
    };

    const userToUnfollowId = dummyUsers.find(
      (user) => user.username === userToUnfollow.username
    ).id;

    chai
      .request(app)
      .put(`/api/users/${userToUnfollow.username}/follow`)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User followed successfully");
        expect(res.body.user).to.be.an("object");
        expect(res.body.user.id).to.equal(userToUnfollowId);
        expect(res.body.user.followers).to.include(
          dummyUsers.find((user) => user.username === loggedInUser.username).id
        );
        done();
      });
  });
});

// testing retrieving a user's followers list
describe("GET /api/users/:username/followers", () => {
  it("should return the list of followers for the current user", (done) => {
    const currentUser = "user1";
    const followers = [
      {
        username: "kate7725",
        photo:
          "https://images.unsplash.com/photo-1622842182823-28bfbfba47e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
      },
      {
        username: "big_dinner",
        photo:
          "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1317&q=80",
      },
      {
        username: "user2309",
        photo:
          "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      },
    ];

    chai
      .request(app)
      .get(`/api/users/${currentUser}/followers`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.followers).to.deep.equal(followers);
        done();
      });
  });
});

// testing retrieving a user's following list
describe("GET /api/users/:username/following", () => {
    it("should return the list of following for the current user", (done) => {
      const currentUser = "user1";
      const following = [
        {
          username: "thriftlover",
          photo:
          "https://images.unsplash.com/photo-1630208232589-e42b29428b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1538&q=80",
        },
        {
          username: "kate7725",
          photo:
          "https://images.unsplash.com/photo-1622842182823-28bfbfba47e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
        },
        {
          username: "user30943",
          photo:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60",
        },
      ];
  
      chai
        .request(app)
        .get(`/api/users/${currentUser}/following`)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.following).to.deep.equal(following);
          done();
        });
    });
  });
  