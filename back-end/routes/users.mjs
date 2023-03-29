import express from "express";

const router = express.Router();
// api/users/
router.get("/", function (req, res) {
  res.send("hello user!");
});

router.get("/me", function (req, res) {
  if (!req.user) {
    // unauthenticated
    res.statusCode(401);
  } else {
    res.status(200).json(req.user);
  }
});

export default router;
