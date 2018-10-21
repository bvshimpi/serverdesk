import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './public/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RegsiterComponent } from './public/regsiter/regsiter.component';
import { ForgotpasswordComponent } from './public/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { TicketsComponent } from './layout/myticket/tickets/tickets.component';
import { AddupdateticketComponent } from './layout/myticket/addupdateticket/addupdateticket.component';
import { RticketsComponent } from './layout/resolveticket/rtickets/rtickets.component';

const routes: Routes = [
    {
        path:"", redirectTo: "serverdesk", pathMatch: "full"
    },
    {
        path:"serverdesk", component: LayoutComponent, children: [
            {
                path:"", component: HomeComponent
            },
            {
                path:"login", component: LoginComponent
            },
            {
                path:"register", component: RegsiterComponent
            },
            {
                path:"forgot", component: ForgotpasswordComponent
            },
            {
                path:"dashboard", component: DashboardComponent
            },
            {
                path:"myTickets", component: TicketsComponent
            },
            {
                path:"manageticket", component: AddupdateticketComponent
            },
            {
                path:"resolveTicket", component: RticketsComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

