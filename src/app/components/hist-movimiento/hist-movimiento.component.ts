import { Component, OnInit, ViewChild } from '@angular/core';
import { HistmovimientoDTO } from '../../models/histmovimientoDTO';
import { CompraService } from 'src/app/services/compra.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HistMovimientoService } from 'src/app/services/hist-movimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { HistMovimientoEditComponent } from './hist-movimiento-edit/hist-movimiento-edit.component';

@Component({
  selector: 'app-hist-movimiento',
  templateUrl: './hist-movimiento.component.html',
  styleUrls: ['./hist-movimiento.component.css']
})
export class HistMovimientoComponent implements OnInit {
  report: HistmovimientoDTO[] = [];
  dataSource: MatTableDataSource<HistmovimientoDTO> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombrecompleto', 'fecha', 'descripcion', 'subtotal', 'tasa_text', 'tasa_num', 'cuotas', 'capitalizacion', 'renta', 'totalAPagar', 'diasTrasladar', 'valorFuturo', 'interes', 'estadopago', 'actions'];

  constructor(private cS: HistMovimientoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let idPRUEBA = sessionStorage.getItem("id");
    console.log(idPRUEBA);
    if (idPRUEBA !== null) {
      this.getReporteCompraPorCliente(Number(idPRUEBA)); // Reemplaza 5 con el ID del cliente que deseas consultar
    }
  }

  getReporteCompraPorCliente(clienteId: number): void {
    this.cS.getHistorialById(clienteId).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  getEstadopagoStyles(estadopago: string) {
    if (estadopago === 'Pendiente') {
      return { 'color': 'orange', 'font-weight': 'bold' };
    } else if (estadopago === 'Pagado') {
      return { 'color': 'green', 'font-weight': 'bold' };
    } else if (estadopago === 'Procesando') {
      return { 'color': 'blue', 'font-weight': 'bold' };
    } else if (estadopago === 'Lista Negra') {
      return { 'color': 'red', 'font-weight': 'bold' };
    }
    return {};
  }

  opedEditDialog(cliente: any): void {
    const dialogRef = this.dialog.open(HistMovimientoEditComponent, {
      width: '600px',
      data: { ...cliente,
        cliente_id: cliente.cliente.id,
        compra_id: cliente.compra.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.edit(result);
      }
    });
  }

  edit(histmov: HistmovimientoDTO): void {
    this.cS.edit(histmov).subscribe({
      next: (data) => {
        window.location.reload();

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

