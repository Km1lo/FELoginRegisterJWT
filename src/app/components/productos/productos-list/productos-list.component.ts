import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogAddProductoComponent } from '../dialog-add-producto/dialog-add-producto.component';
import { DialogAddClienteComponent } from '../../clientes/dialog-add-cliente/dialog-add-cliente.component';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent {
  displayedColumns: string[] = ['id', 'descripcion', 'precioventa', 'preciocosto','stock', 'actions'];

  dataSource=new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  constructor(public productoService: ProductoService, private router: Router, private snackBar: MatSnackBar, public dialog:MatDialog) {}

  ngOnInit(): void {
    this.getProducto()
  }
  getProducto(){
    this.productoService.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })

  }


  openEditAddDialog(producto: any): void {
    const isEdit = producto !== null;
    const dialogRef = this.dialog.open(DialogAddProductoComponent, {
      width: '600px',
      data: { ...producto, isEdit } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isEdit) {
          console.log('Cambios guardados:', result);
          this.edit(result);
        } else {
          console.log('Agregado:', result);
          this.add(result);
        }
      }
    });
  }
  





  add(producto:any) {
    console.log(producto);
    console.log('aca');

    this.productoService.add(producto).subscribe({
      next: (data) => {
        console.log("ingresando registro...")
        this.snackBar.open('Producto creado correctamente', '', {
          duration: 3000
        })
        this.getProducto();

      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  edit(producto: Producto): void {

    this.productoService.edit(producto).subscribe({
    next: (data) => {
      this.snackBar.open('Producto editado correctamente', '', {
        duration: 3000
      });

      this.getProducto();
    },
    error: (err) => {
      console.log(err);
    },
  });
}

delete(idProducto: any) {
  this.productoService.delete(idProducto).subscribe({
  next: (data) => {
    console.log("eliminando registro..." + idProducto)
    this.snackBar.open('Producto eliminado correctamente', '', {
      duration: 3000
    })
    this.getProducto();
    //this.router.navigate(['/producto'])
  },
  error: (err) => {
    console.log(err)
  },
})
}

}
