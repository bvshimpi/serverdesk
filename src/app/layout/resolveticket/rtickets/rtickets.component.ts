import { Component, OnInit } from '@angular/core';
import {MainService} from './../../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-rtickets',
  templateUrl: './rtickets.component.html',
  styleUrls: ['./rtickets.component.scss']
})
export class RticketsComponent implements OnInit {

  tickets:any = [];
  email:any;
  phone:any;
  screenshot:any;
  title:any;
  description:any;
  name:any;
  ticketId:any;
  type:any;

  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.spinner.show();
    this.mainServiceObj.postRequest("getRTickets").subscribe(Response => {
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

  viewTicket(data) {
    console.log(data);
    this.screenshot = data.screenshot != "" ? this.mainServiceObj.BASE_URL + "/uploads/tickets/"+data.screenshot : this.mainServiceObj.BASE_URL + "/images/no-preview.jpg";
    this.title = data.title;
    this.description = data.description;
    this.type = data.name;
    this.name = data.contact_name;
    this.ticketId= data.ticket_id;
    this.email = data.email != "" ? data.email : "Not Available";
    this.phone = data.phone != "" ? data.phone : "Not Available";

    $("#ticketModal").modal('show');
  }
}
