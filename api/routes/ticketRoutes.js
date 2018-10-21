var express = require("express");
var common = require("./../utils/common");
var ticket = require("./../modules/ticket/ticketController");
var router = new express.Router();

router.post("/addUpdateTicket", common.verifyRequest, ticket.addUpdateTicket);

module.exports = router;