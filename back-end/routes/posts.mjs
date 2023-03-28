import express from "express";

const router = express.Router();
// api/users/
router.put("/", function (req, res) {
  res.send("hello user!");
});

export default router;
