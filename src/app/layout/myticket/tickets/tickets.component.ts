import { Component, OnInit } from '@angular/core';
import {MainService} from './../../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets:any = [];

  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTickets();
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
          this.tickets = Response.Data;
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

  updateStatus(data) {
    console.log(data);
  }
}
