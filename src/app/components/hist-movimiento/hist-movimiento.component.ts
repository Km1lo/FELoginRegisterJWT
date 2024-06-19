import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HistMovimientoService } from '../../services/hist-movimiento.service'; // Ajusta la ruta según tu estructura
import { HistmovimientoDTO } from '../../models/histmovimientoDTO';

@Component({
  selector: 'app-hist-movimiento',
  templateUrl: './hist-movimiento.component.html',
  styleUrls: ['./hist-movimiento.component.css']
})
export class HistMovimientoComponent implements OnInit {
  displayedColumns: string[] = ['nombrecompleto', 'fecha', 'descripcion', 'subtotal', 'tasa_text', 'tasa_num', 'cuotas', 'capitalizacion'];
  dataSource: MatTableDataSource<HistmovimientoDTO> = new MatTableDataSource<HistmovimientoDTO>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private histMovimientoService: HistMovimientoService) { }

  ngOnInit(): void {
    this.listarHistMovimientos();
  }

  listarHistMovimientos(): void {
    this.histMovimientoService.getAllHistMovimientos()
      .subscribe((data: HistmovimientoDTO[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
}

