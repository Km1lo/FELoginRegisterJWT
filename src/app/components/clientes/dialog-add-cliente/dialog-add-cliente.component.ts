import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-cliente',
  templateUrl: './dialog-add-cliente.component.html',
  styleUrls: ['./dialog-add-cliente.component.css']
})
export class DialogAddClienteComponent implements OnInit {
  constructor (
    public dialogo: MatDialogRef<DialogAddClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
    }
    cerrarDialogo(): void {
      this.dialogo.close(false)
    }
    confirmado(): void {
      this.dialogo.close(this.data);
    }
    ngOnInit() {}
}
