'use strict';

var express = require('express');
var router = express.Router();

router.use('/banks', require('./banks'));

module.exports = router;
