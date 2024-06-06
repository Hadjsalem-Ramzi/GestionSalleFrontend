import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SallesComponent} from "./salles/salles.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {UsersComponent} from "./users/users.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"salle" ,component:SallesComponent ,canActivate: [AuthGuard] },
  {path:"reservation" ,component:ReservationComponent,canActivate: [AuthGuard]},
  {path:"user" ,component:UsersComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
