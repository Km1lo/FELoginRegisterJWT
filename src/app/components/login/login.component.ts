import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { JwtRequest } from 'src/app/models/jwt-request';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
    private route: ActivatedRoute
  ) { }

  username: string = "";
  password: string = "";
  role: string = "";

  ngOnInit(): void {
    // Obtener el parámetro de consulta `username` y establecerlo en el campo de nombre de usuario
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
      this.snackBar.open("Se ha iniciado sesion correctamente uwu!!", "Aviso", { duration: 2000 });

      let idUserCliente: number = 0;
      this.userService.getByUsername(request.username).subscribe((cliente: Cliente) => {
        console.log(cliente.id);
        console.log(cliente.id.toString());
        sessionStorage.setItem("id", cliente.id.toString());
      });

      this.role = this.authService.showRole();
      
      //No mostrar el role por consola de producción
      //console.log(this.role);
      if(this.role == "USER"){
        this.router.navigate(['/user'])
      } else if(this.role == "ADMIN"){
        this.router.navigate(['/clientes'])
      }

    }, error => {
      this.snackBar.open("Credenciales incorrectas!!!", "Aviso", { duration: 2000 });
    });
  }
}
