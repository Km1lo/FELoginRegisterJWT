import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwt-request';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService , private router: Router, private snackBar: MatSnackBar, private userService:UserService) { }
  username: string = ""
  password: string = ""
  role:string=""

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.authService.loginAuth(request).subscribe((data: any) => {

      sessionStorage.setItem("token", data.token);
      this.snackBar.open("Se ha iniciado sesion correctamente uwu!!", "Aviso",{duration:2000});
      
      this.role=this.authService.showRole();
      console.log(this.role);
      //this.router.navigate(['/home'])
      
    }, error => {
      this.snackBar.open("Credenciales incorrectas!!!", "Aviso",{duration:2000});
    });
  }
}
