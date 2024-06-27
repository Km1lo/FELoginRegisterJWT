import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompraService } from 'src/app/services/compra.service';
import { HistmovimientoDTO } from 'src/app/models/histmovimientoDTO';
import { MatPaginator } from '@angular/material/paginator';
import { HistMovimientoService } from 'src/app/services/hist-movimiento.service';
import { ReporteVentasEditComponent } from '../reporte-ventas-edit/reporte-ventas-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  report: HistmovimientoDTO[] = [];
  dataSource: MatTableDataSource<HistmovimientoDTO> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = ['nombrecompleto', 'fecha', 'descripcion', 'subtotal', 'tasa_text', 'tasa_num', 'cuotas', 'capitalizacion', 'renta', 'totalAPagar', 'diasTrasladar', 'valorFuturo', 'interes', 'estadopago', 'actions'];

  constructor(private cS: CompraService, private snackBar: MatSnackBar, private hS: HistMovimientoService, public dialog: MatDialog, private hm: HistMovimientoService) {}

  ngOnInit(): void {
    this.hS.listHistorial().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  getReporteCompra(): void {
    this.hS.listHistorial()
      .subscribe((data: HistmovimientoDTO[]) => {
        this.report = data;
    });
  }

  opedEditDialog(cliente: any): void {
    console.log("cliente id " + cliente.cliente.id);
    console.log("compra id " + cliente.compra.id);

    const dialogRef = this.dialog.open(ReporteVentasEditComponent, {
      width: '600px',
      data: {
        ...cliente,
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
    this.hm.edit(histmov).subscribe({
      next: (data) => {
        this.snackBar.open('Cliente editado correctamente', '', {
          duration: 3000,
        });
        window.location.reload();
        this.getReporteCompra();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getEstadopagoStyles(estadopago: string) {
    if (estadopago === 'Pendiente') {
      return { 'color': 'orange', 'font-weight': 'bold' };
    } else if (estadopago === 'Pagado') {
      return { 'color': 'green', 'font-weight': 'bold' };
    } else if (estadopago === 'Lista Negra') {
      return { 'color': 'red', 'font-weight': 'bold' };
    } else if (estadopago === 'Procesando') {
      return { 'color': 'blue', 'font-weight': 'bold' };
    }
    return {};
  }

  formatNumber(value: any): string {
    return isNaN(value) ? '0' : value;
  }
}
