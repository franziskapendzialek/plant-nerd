const express = require('express');
const router = express.Router();
const {redirectLoggedIn} = require('./guards/guards');

const Plant = require('../models/plant.model');
const User = require('../models/user.model');

/* GET HOME PAGE */
router.get('/', (req, res, next) => {
  Plant.find()
    .sort({foundOnDate: -1})
    .limit(2)
    .then((result) => {
      res.render('main', {
        plants: result,
      });
    });
});

/* GET EXPLORE PAGE */

router.get('/explore', redirectLoggedIn, (req, res, next) => {
  Plant.find()
    .sort({foundOnDate: -1})
    .populate('author')
    .then((plants) => {
      res.render('insidePlants/plantsMain', {
        userInSession: req.session.currentUser,
        plants: plants,
      });
    });
});

module.exports = router;
