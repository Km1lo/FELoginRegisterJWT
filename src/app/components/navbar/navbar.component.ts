import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    console.log(this.authService.verificar());
  }
  userHasRole(){
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
