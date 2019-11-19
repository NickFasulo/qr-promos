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

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "login",
    failureFlash: true
  })
);



// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logOut();
  res.render("logout");
});



// register-as
router.get("/register-as", (req, res) => {
  res.render("register-as");
});

router.post("/register-as", (req, res) => {
  res.redirect("login");
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

  res.render("/register-business", { error_msg: null });
});

router.post("/register-business", signupValidation, userController.signup);

module.exports = router;