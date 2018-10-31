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
        var qry = "SELECT * FROM ticket_types where is_active='1'";
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
        var id = req.body.id != null ? parseInt(req.body.id) : 0;
        var uid = result.id;
        var title = typeof req.body.title != "undefined" ? req.body.title : "";
        var description = typeof req.body.description != "undefined" ? req.body.description : "";
        var ticket_type = typeof req.body.ticket_type != "undefined" ? req.body.ticket_type : "";
        var priority = typeof req.body.priority != "undefined" ? req.body.priority : "";
        var contact_type = typeof req.body.contact_type != "undefined" ? req.body.contact_type : "";
        var email = typeof req.body.email != "undefined" ? req.body.email : "";
        var phone = typeof req.body.phone != "undefined" ? req.body.phone : "";
        var ticket_id = typeof req.body.ticket_id != "undefined" ? req.body.ticket_id : null;
        
        if((phone != "" || email != "") && priority != "" && ticket_type != "" && title != "" && description != "" && contact_type != "") {
            var screenshot = "";
            if(ticket_id == null || id == null) {
                var random_no = Math.floor(Math.random() * 90 + 10);
                ticket_id = "T"+random_no+Date.now();
            }
            
            var values = [id,uid,title,description,ticket_type,priority,email,phone,screenshot,ticket_id,contact_type];
            db.query("CALL add_update_ticket(?,?,?,?,?,?,?,?,?,?,?);", values, function(errQuery, resQuery) {
                if(errQuery)
                    res.send(responseGenerator.getResponse(500, "Failed to process ticket", []));
                else  {
                    var msg = "Ticket posted succesfully.";
                    msg = id != null ? "Ticket updated succesfully.": msg;
                    res.send(responseGenerator.getResponse(200, msg, resQuery));
                }
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
        var qry = "SELECT t.id, ticket_id,title,UCASE(status) as status,UCASE(priority) as priority,assignee,tt.name FROM ticket t INNER JOIN ticket_types tt ON t.ticket_type = tt.id WHERE t.user_id = ? ORDER BY t.id DESC";
        db.query(qry, result.id, function(errQuery, resQuery) {
            if(errQuery)
                res.send(responseGenerator.getResponse(500, "Failed to get ticket details", []));
            else {
                if(resQuery.length > 0)
                    res.send(responseGenerator.getResponse(200, "Ticket found.", resQuery));
                else
                    res.send(responseGenerator.getResponse(500, "Ticket not found.", resQuery));
            }
        });
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to get ticket details", []))
    }
}

exports.getTicket = function(req, res) {
    var result = res.locals.result;
    if(result) {
        var uid = result.id;
        var id = typeof req.body.id != "undefined" ? req.body.id : null;
        if(id != null) {
            var qry = "SELECT t.*,tc.contact_type,tc.email,tc.phone FROM ticket t INNER JOIN ticket_contact tc ON t.ticket_id = tc.tid WHERE t.id = ? AND t.user_id = ?";
            var values = [id, uid];
            db.query(qry, values, function(errQuery, resQuery) {
                if(errQuery)
                    res.send(responseGenerator.getResponse(500, "Failed to get tickets", []));
                else {
                    if(resQuery.length > 0)
                        res.send(responseGenerator.getResponse(200, "Ticket found.", resQuery[0]));
                    else
                        res.send(responseGenerator.getResponse(500, "Ticket not found.", resQuery));
                }
            });
        }
        else {
            res.send(responseGenerator.getResponse(500, errorMsg.fieldMissing, []))
        }
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to get ticket", []))
    }
}

exports.deleteTicket = function(req, res) {
    var result = res.locals.result;
    if(result) {
        var uid = result.id;
        var id = typeof req.body.id != "undefined" ? req.body.id : null;
        var ticket_id = typeof req.body.ticket_id != "undefined" ? req.body.ticket_id : null;
        if(id != null && ticket_id != null) {
            var qry = "DELETE FROM ticket WHERE id = ?;DELETE FROM ticket_contact WHERE tid = ?";
            var values = [id, ticket_id];
            db.query(qry, values, function(errQuery, resQuery) {
                if(errQuery)
                    res.send(responseGenerator.getResponse(500, "Failed to delete tickets", []));
                else {
                    res.send(responseGenerator.getResponse(200, "Ticket deleted successfully.", resQuery[0]));
                }
            });
        }
        else {
            res.send(responseGenerator.getResponse(500, errorMsg.fieldMissing, []))
        }
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to delete ticket", []))
    }
}

exports.updateTicketStatus = function(req, res) {
    var result = res.locals.result;
    if(result) {
        var id = typeof req.body.id != "undefined" ? req.body.id : null;
        var status = typeof req.body.status != "undefined" ? req.body.status : "";
        var user_id = typeof req.body.user_id != "undefined" && req.body.user_id != "" ? req.body.user_id : 0;

        var status = typeof req.body.status != "undefined" ? req.body.status : null;
        if(id != null && status != "") {
            var qry = "UPDATE ticket SET status = ?, assignee = ? WHERE id = ?";
            var values = [status, user_id, id];
            db.query(qry, values, function(errQuery, resQuery) {
                if(errQuery)
                    res.send(responseGenerator.getResponse(500, "Failed to update ticket status", []));
                else {
                    res.send(responseGenerator.getResponse(200, "Ticket status updated successfully.", resQuery[0]));
                }
            });
        }
        else {
            res.send(responseGenerator.getResponse(500, errorMsg.fieldMissing, []))
        }
    }
    else {
        res.send(responseGenerator.getResponse(500, "Failed to update ticket status", []))
    }
}