import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addupdateticket',
  templateUrl: './addupdateticket.component.html',
  styleUrls: ['./addupdateticket.component.scss']
})
export class AddupdateticketComponent implements OnInit {

  ticketType: any = "";
  title: any;
  description: any;
  email: any;
  phone: any;
  contactType: any;
  ticketPriority: any;

  constructor() { }

  ngOnInit() {
  }

}
