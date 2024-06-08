import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogAddClienteComponent } from '../dialog-add-cliente/dialog-add-cliente.component';

@Component({
  selector: 'app-dialog-edit-cliente',
  templateUrl: './dialog-edit-cliente.component.html',
  styleUrls: ['./dialog-edit-cliente.component.css']
})
export class DialogEditClienteComponent {
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
