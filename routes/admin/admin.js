const express = require('express');
const router = express.Router();

router.get('/add-promo', (req, res) => {
  res.render('promos/addpromo');
});