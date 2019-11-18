const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

users = [];

// auth login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

// auth register
router.get("/register", (req, res) => {
  // handle with passport
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch {}
  req.body.email;
});

// auth register user
router.get("/register-user", (req, res) => {
  res.render("register-user");
});

router.post("/register-user", (req, res) => {
  res.render("register-user");
});

// auth register business
router.get("/register-business", (req, res) => {
  res.render("register-business");
});

router.post("/register-business", (req, res) => {
  res.render("register-business");
});

module.exports = router;