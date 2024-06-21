import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompraService } from 'src/app/services/compra.service';
import { HistmovimientoDTO } from 'src/app/models/histmovimientoDTO';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit{
  report: HistmovimientoDTO[] = [];
  dataSource: MatTableDataSource<HistmovimientoDTO> = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator
  displayedColumns: string[] = ['nombrecompleto', 'fecha', 'descripcion', 'subtotal', 'tasa_text', 'tasa_num', 'cuotas', 'capitalizacion'];
  constructor(private cS: CompraService) { }


  ngOnInit(): void {
      this.cS.consultaReporteCompra().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
  }

  getReporteCompra(): void {
    this.cS.consultaReporteCompra()
      .subscribe((data: HistmovimientoDTO[]) => {
        this.report = data;
    });
  }


}
