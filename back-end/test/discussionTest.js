const chai =require ("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const { createDiscussion } = require ("../routes/discussions.js");
// import { requestURL } from "../front-end/requestURL.js";
const { expect } = chai;
chai.use(chaiHttp);

const appURL = "http://localhost:5000/api/discussions";

describe("Root", () => {
  let server;

  before((done) => {
    server = app.listen(5001, () => {
      console.log("Test server listening on port 5000");
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log("Test server closed");
      done();
    });
  });

  describe("Discussion", () => {
    describe("createDiscussion", () => {
      it("should create a new discussion with given inputs", () => {
        const title = "Test Discussion";
        const content = "This is a test discussion";
        const date = new Date();
        const comments = [];

        const discussion = createDiscussion(title, content, date, comments);

        expect(discussion).to.be.an("object");
        expect(discussion).to.have.property("id");
        expect(discussion.title).to.equal(title);
        expect(discussion.content).to.equal(content);
        expect(discussion.date).to.equal(date);
        expect(discussion.comments).to.equal(comments);
      });
    });

    describe("POST /create", () => {
      it("should create a new discussion and return status 201", async () => {
        const res = await chai.request(appURL).post("/create").send({
          date: new Date(),
          title: "Test Discussion",
          content: "This is a test discussion",
          comments: "[]",
        });

        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("newDiscussion");
        expect(res.body.newDiscussion).to.have.property("id");
        expect(res.body.newDiscussion.title).to.equal("Test Discussion");
        expect(res.body.newDiscussion.content).to.equal(
          "This is a test discussion"
        );
      });
    });

    describe("GET /view/:id", () => {
      it("should retrieve a specific discussion by ID", (done) => {
        const discussionId = 1;
        chai
          .request(appURL)
          .get("/view/1")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body.found.id).to.equal(discussionId);
            done();
          });
      });

      it("should return status 404 for a non-existent discussion ID", async () => {
        const nonExistentId = "non-existent-id";

        const res = await chai.request(appURL).get(`/view/${nonExistentId}`);

        expect(res).to.have.status(404);
      });
    });
  });
});
