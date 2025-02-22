const express = require("express");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.get("/profile/:userId", getUser);

module.exports = router;
