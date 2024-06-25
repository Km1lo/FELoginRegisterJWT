import { Component, OnInit, ViewChild } from '@angular/core';
import { HistmovimientoDTO } from '../../models/histmovimientoDTO';
import { CompraService } from 'src/app/services/compra.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hist-movimiento',
  templateUrl: './hist-movimiento.component.html',
  styleUrls: ['./hist-movimiento.component.css']
})
export class HistMovimientoComponent implements OnInit {
  report: HistmovimientoDTO[] = [];
  dataSource: MatTableDataSource<HistmovimientoDTO> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombrecompleto', 'fecha', 'descripcion', 'subtotal', 'tasa_text', 'tasa_num', 'cuotas', 'capitalizacion', 'renta', 'totalAPagar', 'diasTrasladar', 'valorFuturo', 'interes'];

  constructor(private cS: CompraService) { }

  ngOnInit(): void {
    let idPRUEBA = sessionStorage.getItem("id");
    console.log(idPRUEBA);
    if (idPRUEBA !== null) {
      this.getReporteCompraPorCliente(Number(idPRUEBA)); // Reemplaza 5 con el ID del cliente que deseas consultar
    }
  }

  getReporteCompraPorCliente(clienteId: number): void {
    this.cS.consultaReporteCompraPorCliente(clienteId).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}

