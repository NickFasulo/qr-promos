const express = require("express");
const router = express.Router();

const qrController = require("./controllers/qrController");

/* GET home page. */
router.get("/", (req, res, next) => {
  qrController
    .generateQR("hackingpmp.com")
    .then(qr => {
      res.render("index", { qr: qr });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;