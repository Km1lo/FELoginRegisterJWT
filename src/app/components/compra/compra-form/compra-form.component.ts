import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { Compra } from 'src/app/models/compra';
import { DetalleCompra } from 'src/app/models/detallacompra';
import { Producto } from 'src/app/models/producto';
import { TipoCredito } from 'src/app/models/tipocredito';
import { CompraService } from 'src/app/services/compra.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-compra-form',
  templateUrl: './compra-form.component.html',
  styleUrls: ['./compra-form.component.css']
})
export class CompraFormComponent implements OnInit {
  purchaseForm: FormGroup;
  products: Producto[] = [];
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['producto', 'cantidad', 'precioUnitario', 'subtotal', 'acciones'];
  detallesCompra: DetalleCompra[] = [];
  dataSource = new MatTableDataSource<DetalleCompra>(this.detallesCompra);
  cuotas: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  capitalizaciones = [
    { value: 1, viewValue: 'Diario' },
    { value: 15, viewValue: 'Quincenal' },
    { value: 30, viewValue: 'Mensual' },
    { value: 90, viewValue: 'Trimestral' },
    { value: 180, viewValue: 'Semestral' },
    { value: 365, viewValue: 'Anual' },
    { value: 0, viewValue: null},

  ];

  constructor(
    private fb: FormBuilder,
    private compraService: CompraService,
    private productService: ProductoService,
    private clienteService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.purchaseForm = this.fb.group({
      cliente: [null, Validators.required],
      tipoCredito: this.fb.group({
        tasaNum: [null, Validators.required],
        tasaText: [null, Validators.required],
        cuotas: [null, Validators.required],
        capitalizacion: [{ value: null, disabled: true }, Validators.required]
      }),
      productos: this.fb.array([this.createProductGroup()])
    });
  }

  ngOnInit(): void {
    this.productService.list().subscribe(products => {
      this.products = products;
    });
    this.clienteService.list().subscribe(clientes => {
      this.clientes = clientes;
    });

    // Listen for changes in the tasaText field
    this.purchaseForm.get('tipoCredito.tasaText')?.valueChanges.subscribe(value => {
      const capitalizacionControl = this.purchaseForm.get('tipoCredito.capitalizacion')!;
      if (value === 'Efectiva') {
        capitalizacionControl.disable();

      } else {
        capitalizacionControl.enable();
      }
    });
  }

  createProductGroup(): FormGroup {
    return this.fb.group({
      producto: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get productos(): FormArray {
    return this.purchaseForm.get('productos') as FormArray;
  }

  addProduct(): void {
    const productControl = this.productos.at(0);
    const productId = productControl.get('producto')?.value;
    const cantidad = productControl.get('cantidad')?.value;

    const producto: Producto | undefined = this.products.find(p => p.id === productId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const existingProduct = this.detallesCompra.find(detalle => detalle.producto.id === productId);
    if (existingProduct) {
      existingProduct.cantidad += cantidad;
      existingProduct.subtotal = existingProduct.cantidad * existingProduct.precioUnitario;
    } else {
      const detalleCompra = new DetalleCompra(0, {} as Compra, producto, cantidad, producto.precioventa, cantidad * producto.precioventa);
      this.detallesCompra.push(detalleCompra);
    }
    this.dataSource.data = this.detallesCompra; // Actualizar el dataSource
    
    // Reset product form controls for the next product
    productControl.reset({ producto: null, cantidad: 1 });
  }

  incrementQuantity(index: number): void {
    const detalle = this.detallesCompra[index];
    detalle.cantidad++;
    detalle.subtotal = detalle.cantidad * detalle.precioUnitario;
    this.dataSource.data = this.detallesCompra; // Actualizar el dataSource
  }

  decrementQuantity(index: number): void {
    const detalle = this.detallesCompra[index];
    if (detalle.cantidad > 1) {
      detalle.cantidad--;
      detalle.subtotal = detalle.cantidad * detalle.precioUnitario;
    } else {
      this.removeProduct(index);
    }
    this.dataSource.data = this.detallesCompra; // Actualizar el dataSource
  }

  removeProduct(index: number): void {
    this.detallesCompra.splice(index, 1);
    this.dataSource.data = this.detallesCompra; // Actualizar el dataSource
  }

  registerCompra(): void {
    const clienteId = this.purchaseForm.get('cliente')?.value;
    const tipoCreditoValue = this.purchaseForm.get('tipoCredito')?.value;

    const tipoCredito = new TipoCredito(
      0,
      tipoCreditoValue.tasaNum,
      tipoCreditoValue.tasaText,
      tipoCreditoValue.cuotas,
      tipoCreditoValue.capitalizacion
    );

    if (tipoCredito.tasaText === 'Efectiva') {
      tipoCredito.capitalizacion = 0;
    }
    // Crear el objeto Compra pero con los datos necesarios
    const compra = {
      clienteId: clienteId,
      tipoCredito: tipoCredito,
      detallesCompra: this.detallesCompra.map(detalle => ({
        productoId: detalle.producto.id,
        cantidad: detalle.cantidad
      }))
    };
    
    this.compraService.registrarCompra(compra).subscribe(response => {
      console.log('Compra registrada con éxito', response);
      this.snackBar.open('Compra registrada con éxito', '', {
        duration: 3000
      });
      this.purchaseForm.reset();
      this.detallesCompra = [];
      this.dataSource.data = this.detallesCompra; // Actualizar el dataSource
    }, error => {
      console.error('Error al registrar la compra', error);
      console.log(compra);
    });
  }
}
