import { Component, OnInit } from '@angular/core';
import {MainService} from './../../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-addupdateticket',
  templateUrl: './addupdateticket.component.html',
  styleUrls: ['./addupdateticket.component.scss']
})
export class AddupdateticketComponent implements OnInit {

  ticketType: any = "";
  ticketTypes: any = [];
  title: any;
  description: any;
  email: any;
  phone: any;
  contactType: any = "";
  contactTypes: any = ["email","phone","both"];
  ticketPriority: any;
  id: any = null;
  ticket_id:any = null;

  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTicketTypes();
    this.route.params.subscribe(params => {
      this.id = atob(params["id"]);
      this.ticket_id = atob(params["tid"]);
    });

    this.getTicket();
  }

  getTicketTypes() {
    this.spinner.show();
    this.mainServiceObj.postRequest("getTicketTypes").subscribe(Response => {
      if(Response.Status == "200") {
        if(typeof Response.Data != "undefined") {
          this.ticketTypes = Response.Data;
        }
        else {
          this.mainServiceObj.ShowAlert('error', "Failed to get ticket types.");
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

  getTicket() {
    if(this.id != null && this.ticket_id != null) {
      var requestBody = {
        "id": this.id,
        "ticket_id": this.ticket_id
      };

      this.spinner.show();
      this.mainServiceObj.postRequest("getTicket", requestBody).subscribe(Response => {
        if(Response.Status == "200") {
          if(typeof Response.Data != "undefined") {
            var data = Response.Data;
            this.title = data.title;
            this.description = data.description;
            this.ticketType = data.ticket_type;
            this.ticketPriority = data.priority;
            this.contactType = data.contact_type,
            this.email = data.email;
            this.phone = data.phone;
          }
          else {
            this.mainServiceObj.ShowAlert('error', "Failed to get ticket data.");
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
  }

  addUpdateTicket(TicketFormRef) {
    if(TicketFormRef.valid) {
      this.spinner.show();
      var requestBody = {
        "id": this.id,
        "ticket_id": this.ticket_id,
        "title": this.title,
        "description": this.description,
        "contact_type": this.contactType,
        "ticket_type": this.ticketType,
        "priority": this.ticketPriority,
        "email": this.email,
        "phone": this.phone
      };

      this.mainServiceObj.postRequest("addUpdateTicket", requestBody).subscribe(Response => {
        if(Response.Status == "200") {
          this.mainServiceObj.ShowAlert('success', Response.Message);
          this.mainServiceObj.navigateToComponent("/serverdesk/myTickets");
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
