import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte-ventas-edit',
  templateUrl: './reporte-ventas-edit.component.html',
  styleUrls: ['./reporte-ventas-edit.component.css']
})
export class ReporteVentasEditComponent implements OnInit {
  editForm: FormGroup;
  estadosPago: string[] = ['Pendiente', 'Pagado', 'Lista Negra', 'Procesando'];
  compraId: number;
  clienteId: number;

  constructor(
    public dialogRef: MatDialogRef<ReporteVentasEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.compraId = data.compra_id;
    this.clienteId = data.cliente_id;

    this.editForm = this.fb.group({
      id: [data.id],
      nombrecompleto: [data.nombrecompleto],
      fecha: [data.fecha],
      descripcion: [data.descripcion],
      subtotal: [data.subtotal],
      tasa_text: [data.tasa_text],
      tasa_num: [data.tasa_num],
      cuotas: [data.cuotas],
      capitalizacion: [data.capitalizacion],
      renta: [data.renta],
      interes: [data.interes],
      totalAPagar: [data.totalAPagar],
      diasTrasladar: [data.diasTrasladar],
      valorFuturo: [data.valorFuturo],
      intereses: [data.intereses],
      estado: [data.estado],
      estadopago: [data.estadopago, Validators.required]
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  cerrarDialogo(): void {
    this.dialogRef.close(false);
  }

  confirmado(): void {
    this.dialogRef.close(this.data);
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      formValue.cliente = { id: this.clienteId };
      formValue.compra = { id: this.compraId };
      this.dialogRef.close(formValue);
    }
  }
}
