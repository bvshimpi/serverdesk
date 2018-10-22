var path = require("path");
var config = require("../../config");
var db = require("../dbConnector");
var errorMsg = require("../../utils/errorMessages");
var responseGenerator = require("../../utils/responseGenerator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var emailHandler = require("../../utils/emailHandler");

exports.getTicketTypes = function(req, res) {
    var result = res.locals.result;
    if(result) {
        var qry = "SELECT * FROM ticket_type where is_active='1'";
        db.query(qry, function(errQuery, resQuery) {
            if(errQuery)
                res.send(responseGenerator.getResponse(500, "Failed to process your ticket", []));
            else 
                res.send(responseGenerator.getResponse(200, "Ticket types found.", resQuery));
        });
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to get ticket types", []))
    }
}

exports.addUpdateTicket = function(req, res) {
    var result = res.locals.result;
    if(result) {
        var id = typeof req.body.id != "undefined" ? req.body.id : null;
        var uid = result.id;
        var title = typeof req.body.title != "undefined" ? req.body.title : "";
        var description = typeof req.body.description != "undefined" ? req.body.description : "";
        var ticket_type = typeof req.body.ticket_type != "undefined" ? req.body.ticket_type : null;
        var priority = typeof req.body.priority != "undefined" ? req.body.priority : null;
        var status = typeof req.body.status != "undefined" ? req.body.status : null;
        var email = typeof req.body.email != "undefined" ? req.body.email : null;
        var phone = typeof req.body.phone != "undefined" ? req.body.phone : null;

        if(phone != "" && email != "" && status != "" && priority != "" && ticket_type != "" && title != "" && description != "") {
            var values = [id,uid,title,description,ticket_type,priority,status,email,phone];
            db.query("call add_update_ticket()", values, function(errQuery, resQuery) {
                if(errQuery)
                    res.send(responseGenerator.getResponse(500, "Failed to process ticket", []));
                else 
                    res.send(responseGenerator.getResponse(200, "Ticket processed successfully.", resQuery));
            });
        }
        else 
            res.send(responseGenerator.getResponse(500, errorMsg.fieldMissing, []))
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to process your ticket", []))
    }
}

exports.getTickets = function(req, res) {
    var result = res.locals.result;
    if(result) {
        var uid = result.id;
        var qry = "SELECT id, ticket_id,title,status,priority,tt.name FROM ticket t INNER JOIN ticket_type tt ON t.ticket_type = tt.id WHERE t.user_id = ?";
        db.query(qry, result.id, function(errQuery, resQuery) {
            if(errQuery)
                res.send(responseGenerator.getResponse(500, "Failed to get tickets", []));
            else 
                res.send(responseGenerator.getResponse(200, "Tickets found.", resQuery));
        });
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to get tickets", []))
    }
}