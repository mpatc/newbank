'use strict';

var express = require('express');
var router = express.Router();

var moment = require('moment');
var Bank = require('../models/bank');

//  GET /
router.get('/', (req, res) => {
  Bank.get((err, banks) => {
    if(err) {
      res.render('error', {error: err})
    } else {

      banks = banks.map(bank => {
        bank.date = moment(bank.date, 'X').format('l');
        return bank;
      })

      res.render('home', {banks: banks});
    }
  })
})

module.exports = router;
