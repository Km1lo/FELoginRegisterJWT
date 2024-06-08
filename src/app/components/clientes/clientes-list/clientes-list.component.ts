import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { UserService } from 'src/app/services/user.service';
import { DialogAddClienteComponent } from '../dialog-add-cliente/dialog-add-cliente.component';
import { DialogEditClienteComponent } from '../dialog-edit-cliente/dialog-edit-cliente.component';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent {
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'telefono','direccion', 'limite_credito', 'fecha_pago_mensual', 'actions'];

  dataSource=new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  constructor(public userService: UserService, private router: Router, private snackBar: MatSnackBar, public dialog:MatDialog) {}

  ngOnInit(): void {
    this.getCliente()
  }
  getCliente(){
    this.userService.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })

  }
  opedEditDialog(cliente: any): void {
    const dialogRef = this.dialog.open(DialogEditClienteComponent, {
      width: '600px',
      data: { ...cliente } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {  

        delete result.user.authorities;
        console.log(result);
        this.edit(result);
      }
    });
  }

  add(cliente:any) {
    this.userService.add(cliente).subscribe({
      next: (data) => {
        console.log("ingresando registro...")
        this.snackBar.open('Cliente creado correctamento', '', {
          duration: 3000
        })
        this.getCliente();

      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  edit(cliente: Cliente): void {

      this.userService.edit(cliente).subscribe({
      next: (data) => {
        this.snackBar.open('Cliente editado correctamente', '', {
          duration: 3000
        });

        this.getCliente();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(idCliente: any) {
    this.userService.delete(idCliente).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + idCliente)
      this.snackBar.open('Material eliminado correctamente', '', {
        duration: 3000
      })
      this.getCliente()
      this.router.navigate(['/materiallist'])
    },
    error: (err) => {
      console.log(err)
    },
  })
  }
}
