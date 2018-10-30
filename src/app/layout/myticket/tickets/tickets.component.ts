import { Component, OnInit } from '@angular/core';
import {MainService} from './../../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets:any = [];
  users:any = [];
  ticketId:any = "";
  userId:any;
  ticketStatus:any;
  tid:any;

  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService) { 
    this.getUsers();
  }

  ngOnInit() {
    this.getTickets();
  }

  getUsers() {
    this.mainServiceObj.postRequest("getUsers").subscribe(Response => {
      if(Response.Status == "200") {
        if(typeof Response.Data != "undefined") {
          this.users = Response.Data;
        }
        else {
          this.mainServiceObj.ShowAlert('error', "Failed to get users.");
        }
      }
      else if(Response.Status == "501"){
        this.mainServiceObj.ShowAlert('error', Response.Message);
        this.mainServiceObj.navigateToComponent("/serverdesk/login");
      }
      else {
        this.mainServiceObj.ShowAlert('error', Response.Message);
      }
    }, error => {
      this.mainServiceObj.HandleErrorMessages(error);
    });
  }

  getTickets() {
    this.spinner.show();
    this.mainServiceObj.postRequest("getTickets").subscribe(Response => {
      if(Response.Status == "200") {
        if(typeof Response.Data != "undefined") {
          this.tickets = Response.Data;
        }
        else {
          this.mainServiceObj.ShowAlert('error', "Failed to get tickets.");
        }
      }
      else if(Response.Status == "501"){
        this.mainServiceObj.ShowAlert('error', Response.Message);
        this.mainServiceObj.navigateToComponent("/serverdesk/login");
      }
      else {
        this.mainServiceObj.ShowAlert('error', Response.Message);
      }
      this.spinner.hide();
    }, error => {
      this.mainServiceObj.HandleErrorMessages(error);
      this.spinner.hide();
    });
  }

  updateTicket(data) {
    var id = btoa(data.id);
    var tid = btoa(data.ticket_id);
    this.mainServiceObj.navigateToComponent("/serverdesk/manageticket/"+id+"/"+tid);
  }

  deleteTicket(data) {
    var requestBody = {
      "id": data.id,
      "ticket_id": data.ticket_id
    }
    this.spinner.show();
    this.mainServiceObj.postRequest("deleteTicket", requestBody).subscribe(Response => {
      if(Response.Status == "200") {
        if(typeof Response.Data != "undefined") {
          this.mainServiceObj.ShowAlert('success', Response.Message);
          this.getTickets();
        }
        else if(Response.Status == "501"){
          this.mainServiceObj.ShowAlert('error', Response.Message);
          this.mainServiceObj.navigateToComponent("/serverdesk/login");
        }
        else {
          this.mainServiceObj.ShowAlert('error', "Failed to get tickets.");
        }
      }
      else {
        this.mainServiceObj.ShowAlert('error', Response.Message);
      }
      this.spinner.hide();
    }, error => {
      this.mainServiceObj.HandleErrorMessages(error);
      this.spinner.hide();
    });
  }

  showModal(data) {
    this.ticketId = data.ticket_id;
    this.tid = data.id;
    this.ticketStatus = data.status;
    this.userId = data.assignee != 0 ? data.assignee : "";
    $("#exampleModal").modal('show');
  }

  resetUser() {
    this.userId = "";
  }

  updateStatus(TicketFormRef) {
    if(TicketFormRef.valid) {
      var requestBody = {
        "status": this.ticketStatus,
        "user_id": this.userId,
        "id": this.tid
      }
      this.spinner.show();
      this.mainServiceObj.postRequest("updateTicketStatus", requestBody).subscribe(Response => {
        if(Response.Status == "200") {
            $("#exampleModal").modal('hide');
            this.mainServiceObj.ShowAlert('success', Response.Message);
            this.getTickets();
        }
        else if(Response.Status == "501"){
          this.mainServiceObj.ShowAlert('error', Response.Message);
          this.mainServiceObj.navigateToComponent("/serverdesk/login");
        }
        else {
          this.mainServiceObj.ShowAlert('error', Response.Message);
        }
        this.spinner.hide();
      }, error => {
        this.mainServiceObj.HandleErrorMessages(error);
        this.spinner.hide();
      });
    }
  }
}
