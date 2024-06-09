import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-dialog-add-producto',
  templateUrl: './dialog-add-producto.component.html',
  styleUrls: ['./dialog-add-producto.component.css']
})
export class DialogAddProductoComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    public dialogo: MatDialogRef<DialogAddProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    public productoService: ProductoService
  ) {}

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  confirmado(): void {
    console.log(this.data);
    this.dialogo.close(this.data);
  }
  
  ngOnInit() {
    console.log(this.getProductos());
    this.getProductos();
  }

  getProductos() {
    this.productoService.list().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log(this.productos);
      },
      error => {
        console.error('Error al obtener la lista de los productos', error);
      }
    );
  }
}
