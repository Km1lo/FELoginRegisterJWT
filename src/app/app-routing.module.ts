import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminscreenComponent } from './components/adminscreen/adminscreen.component';
import { UserscreenComponent } from './components/userscreen/userscreen.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminscreenComponent},
  { path: 'user', component: UserscreenComponent},
  { path: 'clientes', component: ClientesListComponent},
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
