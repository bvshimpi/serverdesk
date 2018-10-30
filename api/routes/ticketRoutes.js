var express = require("express");
var common = require("./../utils/common");
var ticket = require("./../modules/ticket/ticketController");
var router = new express.Router();

router.post("/getTicketTypes", common.verifyRequest, ticket.getTicketTypes);
router.post("/addUpdateTicket", common.verifyRequest, ticket.addUpdateTicket);
router.post("/getTickets", common.verifyRequest, ticket.getTickets);
router.post("/getTicket", common.verifyRequest, ticket.getTicket);
router.post("/deleteTicket", common.verifyRequest, ticket.deleteTicket);
router.post("/updateTicketStatus", common.verifyRequest, ticket.updateTicketStatus);

module.exports = router;