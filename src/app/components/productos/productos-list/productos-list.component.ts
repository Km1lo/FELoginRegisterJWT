import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { DialogEditProductoComponent } from '../dialog-edit-producto/dialog-edit-producto.component';
import { DialogAddProductoComponent } from '../dialog-add-producto/dialog-add-producto.component';

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
  opedEditDialog(producto: any): void {
    const dialogRef = this.dialog.open(DialogEditProductoComponent, {
      width: '600px',
      data: { ...producto } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {  

        delete result.user.authorities; //ERROR DEL AUTHORITIES
        console.log(result);
        this.edit(result);
      }
    });
  }
  opedAddDialog(producto: any): void {
    const dialogRef = this.dialog.open(DialogAddProductoComponent, {
      width: '600px',
      data: { ...producto } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        delete result.user.authorities; //ERROR DEL AUTHORITIES
        console.log(result);
        this.add(result);
      }
    });
  }
  add(producto:any) {
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
