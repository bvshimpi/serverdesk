var express = require("express");
var api = require('../modules/user/userController');
var common = require('./../utils/common');
var router = new express.Router();

router.post("/login", api.login);
router.post("/signup", api.signup);
router.post("/activateAccount", common.verifyRequest, api.activateAccount);
router.all("/testMail", api.testMail);

module.exports = router;