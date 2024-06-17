import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserscreenComponent } from './components/userscreen/userscreen.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { HistMovimientoComponent } from './components/hist-movimiento/hist-movimiento.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { CompraFormComponent } from './components/compra/compra-form/compra-form.component';
import { ReporteVentasComponent } from './components/ventas/reporte-ventas/reporte-ventas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: UserscreenComponent},
  { path: 'clientes', component: ClientesListComponent},
  { path: '', component: LandingComponent },
  { path: 'historial-movimiento', component: HistMovimientoComponent },
  { path: 'productos', component: ProductosListComponent},
  { path: 'compra-form', component: CompraFormComponent},
  { path: 'reporte-ventas', component: ReporteVentasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
