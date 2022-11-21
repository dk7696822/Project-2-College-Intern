const { Router } = require("express");
const express = require("express");
const route = express.Router();
module.exports = route;

const collegeController = require('../controller/collegeController')


route.post('/functionup/colleges', collegeController.createCollege)








