import { Component, OnInit } from '@angular/core';
import {MainService} from './../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalTickets: any = 0;
  postedTickets: any = 0;
  reactedTickets: any = 0;
  statusSummary: any = [];
  prioritySummary: any = [];

  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData() {
    this.spinner.show();
    this.mainServiceObj.postRequest("getDashboardData").subscribe(Response => {
      if(Response.Status == "200") {
        if(typeof Response.Data != "undefined") {
          this.totalTickets = Response.Data.tickets_summary.total_tickets;
          this.postedTickets = Response.Data.tickets_summary.posted_tickets;
          this.reactedTickets = Response.Data.tickets_summary.reacted_tickets;
          this.statusSummary = Response.Data.status_summary;
          this.prioritySummary = Response.Data.priority_summary;
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
  customizeLabel(arg) {
    return arg.valueText + " (" + arg.percentText + ")";
  }
}
