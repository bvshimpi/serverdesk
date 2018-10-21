var path = require("path");
var config = require("../../config");
var db = require("../dbConnector");
var errorMsg = require("../../utils/errorMessages");
var responseGenerator = require("../../utils/responseGenerator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var emailHandler = require("../../utils/emailHandler");

exports.addUpdateTicket = function(req, res) {
    var result = res.locals.result;
    if(result) {
        res.send(responseGenerator.getResponse(200, "Ticket processed successfully", result))
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to process your ticket", []))
    }
}