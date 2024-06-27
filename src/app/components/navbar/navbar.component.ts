import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cliente: Cliente | null = null;
  limiteCredito: number | null = null!;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private clienteService: ClienteService // Inyecta el servicio compartido
  ) { }

  ngOnInit(): void {
    console.log(this.authService.verificar());
    console.log("Paso por aqui console.log(this.authService.verificar());");
    let idPRUEBA = sessionStorage.getItem("credito");
    console.log(idPRUEBA);
    this.limiteCredito = Number(sessionStorage.getItem("credito"));
  }

  userHasRole() {
    return this.authService.verificar();
  }

  userRole(role: string): boolean {
    const userRole = this.authService.showRole();
    return userRole === role;
  }

  cerrar() {
    sessionStorage.clear();
  }

  isHomePage(): boolean {
    return this.router.url !== '/clientes' && this.router.url !== '/user' && this.router.url !== '/historial-movimiento' && this.router.url !== '/login' && this.router.url !== '/register' && this.router.url !== '/productos' && this.router.url !== '/compra-form' && this.router.url !== '/reporte-ventas';
  }

  isHomePageUser(): boolean {
    return this.router.url !== '/';
  }

  isHomePagePanelControlAdmin(): boolean {
    return this.router.url !== '/clientes' && this.router.url !== '/productos' && this.router.url !== '/ventas' && this.router.url !== '/compra-form' && this.router.url !== '/reporte-ventas';
  }

  /*NAVBAR*/
  scrollToSection(id: string) {
    this.viewportScroller.scrollToAnchor(id);
  }
}
