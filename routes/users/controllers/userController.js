const User = require("../models/User");
const bcrypt = require("bcryptjs");
const hasher = require("../utils/hasher");

module.exports = {
  signup: (req, res, next) => {
    if (req.validationErrors()) {
      res.render("/register-user");

      return;
    }

    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          req.flash("errors", "User already exists");

          return res.redirect(301, "/register-user");
        } else {
          const newUser = new User();

          newUser.email = req.body.email;
          newUser.profile.name = req.body.name;

          hasher
            .create(req.body.password)
            .then(hash => {
              newUser.password = hash;

              newUser
                .save()
                .then(user => {
                  req.login(user, err => {
                    if (err) {
                      res.status(400).json({
                        confirmation: false,
                        message: err
                      });
                    } else {
                      next();
                    }
                  });
                })
                .catch(err => {
                  throw err;
                });
            })
            .catch(err => {
              throw err;
            });
        }
      })
      .catch(err => {
        throw err;
      });
  },
  // We do not use it. Instead we use passport.authenticate().
  signin: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          if (user) {
            bcrypt
              .compare(params.password, user.password)
              .then(result => {
                if (!result) {
                  let errors = {};
                  errors.message = "Password or email does not match";
                  errors.status = 400;

                  reject(errors);
                } else {
                  resolve(user);
                }
              })
              .catch(err => reject(err));
          } else {
            let errors = {};
            errors.message = "There is no such user";
            errors.status = 400;

            reject(errors);
          }
        })
        .catch(err => reject(err));
    });
  }
};