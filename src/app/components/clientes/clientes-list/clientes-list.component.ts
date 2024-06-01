import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent {
  displayedColumns: string[] = ['idMaterial','nombreMaterial','detalleMaterial','actions'];

  dataSource=new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  constructor(public userService: UserService, private router: Router, private snackBar: MatSnackBar, public dialog:MatDialog) {}

  ngOnInit(): void {
    this.getMaterial()
  }
  getMaterial(){
    this.userService.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })

  }

  delete(idMaterial: any) {
    this.userService.deleteMaterial(idMaterial).subscribe({
    next: (data) => {
      console.log("eliminando registro..." + idMaterial)
      this.snackBar.open('Material eliminado correctamente', '', {
        duration: 3000
      })
      this.getMaterial()
      this.router.navigate(['/materiallist'])
    },
    error: (err) => {
      console.log(err)
    },
  })
  }
}
