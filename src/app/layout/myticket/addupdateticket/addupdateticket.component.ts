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
  screenshot:any;
  fileUpload:any = [];
  filename:any;
  full_path:any;
  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTicketTypes();
    this.route.params.subscribe(params => {
      // if(params.length > 0) {
        this.id = atob(params["id"]);
        this.ticket_id = atob(params["tid"]);
      // }
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

  fileSelect(obj) {
    this.fileUpload = <Array<File>>obj.target.files;
    this.filename = obj.target.files[0]['name'];

    const reader = new FileReader();
    reader.onload = e => this.full_path = reader.result;
    reader.readAsDataURL(obj.target.files[0]);
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
            this.filename = data.screenshot;
            if(data.screenshot != "")
              this.full_path = this.mainServiceObj.BASE_URL + "/uploads/tickets/"+data.screenshot;
          }
          else {
            this.mainServiceObj.ShowAlert('error', "Failed to get ticket data.");
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
        "phone": this.phone,
        "screenshot": Date.now() + "_" + this.filename,
        "name": localStorage.getItem("name"),
        "token": this.mainServiceObj.getToken()
      };

      var formData:FormData = new FormData();
      formData.append("ticket", JSON.stringify(requestBody));
      if(this.fileUpload.length > 0) {
        const file: File = this.fileUpload[0];
        formData.append("file", file, file.name);
      }
      console.log(formData);
      this.mainServiceObj.postTicket("addUpdateTicket", formData).subscribe(Response => {
        if(Response.Status == "200") {
          this.mainServiceObj.ShowAlert('success', Response.Message);
          this.mainServiceObj.navigateToComponent("/serverdesk/myTickets");
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
