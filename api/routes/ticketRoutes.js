var express = require("express");
var common = require("./../utils/common");
var ticket = require("./../modules/ticket/ticketController");
var router = new express.Router();

router.post("/getTicketTypes", common.verifyRequest, ticket.getTicketTypes);
router.post("/addUpdateTicket", common.verifyRequest, ticket.addUpdateTicket);
router.post("/getTickets", common.verifyRequest, ticket.getTickets);

module.exports = router;