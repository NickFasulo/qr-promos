const express = require("express");
const passport = require("passport");
const router = express.Router();

const userController = require("./controllers/userController");
const signupValidation = require("./utils/signupValidation");

const User = require("./models/User");

// auth login
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/");

  res.render("login");
});

router.post("/login", (req, res) => {
  "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: true
    });
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logOut();
  res.render("logout");
});

// register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  res.render("register");
});

// auth register user
router.get("/register-user", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");

  res.render("register-user", { error_msg: null });
});

router.post("/register-user", signupValidation, userController.signup);

// auth register business
router.get("/register-business", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");

  res.render("register-business", { error_msg: null });
});

router.post("/register-business", signupValidation, userController.signup);

module.exports = router;