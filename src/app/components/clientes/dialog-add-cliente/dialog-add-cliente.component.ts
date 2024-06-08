import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-dialog-add-cliente',
  templateUrl: './dialog-add-cliente.component.html',
  styleUrls: ['./dialog-add-cliente.component.css']
})
export class DialogAddClienteComponent implements OnInit {
  usuarios: User[] = [];
  clientes: Cliente[] = [];

  constructor(
    public dialogo: MatDialogRef<DialogAddClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) {}

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  confirmado(): void {
    this.dialogo.close(this.data);
  }

  ngOnInit() {
    this.getClientes();
    this.getUsuarios();
  }

  getClientes() {
    this.userService.list().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.filtrarUsuarios();
      },
      error => {
        console.error('Error al obtener la lista de clientes', error);
      }
    );
  }

  getUsuarios() {
    this.userService.listUser().subscribe(
      (usuarios: User[]) => {
        this.usuarios = usuarios;
        this.filtrarUsuarios();
      },
      error => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }

  filtrarUsuarios() {
    if (this.clientes.length > 0 && this.usuarios.length > 0) {
      const clienteUserIds = this.clientes.map(cliente => cliente.user?.id);
      this.usuarios = this.usuarios.filter(usuario => !clienteUserIds.includes(usuario.id));
    }
  }
}
