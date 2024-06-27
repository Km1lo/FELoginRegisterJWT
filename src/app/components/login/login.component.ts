import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { JwtRequest } from 'src/app/models/jwt-request';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private clienteService: ClienteService // Inyecta el servicio compartido
  ) { }

  username: string = "";
  password: string = "";
  role: string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.username = username;
      }
    });
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.authService.loginAuth(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.token);
      this.snackBar.open("Se ha iniciado sesión correctamente!", "Aviso", { duration: 2000 });


      this.navigateToRoleBasedPage(); // Navega a la página basada en el rol
    }, error => {
      this.snackBar.open("Credenciales incorrectas!!!", "Aviso", { duration: 2000 });
    });
  }

  navigateToRoleBasedPage() {
    this.role = this.authService.showRole();
    
    if (this.role == "USER") {
      this.userService.getByUsername(this.username).subscribe((cliente: Cliente) => {
        console.log(cliente+"aca cliente");
        sessionStorage.setItem("id", cliente.id.toString());
        if (cliente.limite_credito !== undefined) {
          sessionStorage.setItem("credito", cliente.limite_credito.toString());
        }
      });
      this.router.navigate(['/user']);
    } else if (this.role == "ADMIN") {
      this.router.navigate(['/clientes']);
    }
  }
}
