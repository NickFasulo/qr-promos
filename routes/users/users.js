const express = require("express");
const passport = require("passport");
const router = express.Router();

const userController = require("./controllers/userController");
const signupValidation = require("./utils/signupValidation");

const User = require("./models/User");


// login
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");

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



// logout
router.get("/logout", (req, res) => {
  req.logOut();

  res.render("logout");
});



// register
router.get("/register", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/");

  res.render("register", { error_msg: null });
});

router.post("/register", signupValidation, userController.signup);

module.exports = router;