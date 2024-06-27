import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      nombres: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.snackBar.open("Rellene todos los campos correctamente", "Error", { duration: 2000 });
      return;
    }

    const dni = this.myForm.get('dni')!.value;

    this.authService.checkDniExists(dni).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.snackBar.open("El DNI ya existe", "Error", { duration: 2000 });
        } else {
          const request: User = {
            id: 0,
            username: this.myForm.get('username')!.value,
            password: this.myForm.get('password')!.value,
            nombres: this.myForm.get('nombres')!.value,
            apellidos: this.myForm.get('apellidos')!.value,
            dni: this.myForm.get('dni')!.value,
            direccion: this.myForm.get('direccion')!.value,
            telefono: this.myForm.get('telefono')!.value
          };

          this.authService.registerAuth(request).subscribe(
            (data: any) => {
              this.router.navigate(['/login'], { queryParams: { username: request.username } });
              this.snackBar.open("Se registró correctamente", "Success", { duration: 2000 });
            },
            (error) => {
              console.error(error);
              this.snackBar.open("El usuario ya existe", "Error", { duration: 2000 });
            }
          );
        }
      },
      (error) => {
        console.error(error);
        this.snackBar.open("Hubo un problema al verificar el DNI", "Error", { duration: 2000 });
      }
    );
  }

  cerrar() {
    this.router.navigate(['/login']);
  }
}
