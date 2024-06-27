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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      this.report = data;
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
  generatePDF(element: any): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Dibujar el rectángulo de la cabecera
    doc.setFillColor(95, 75, 179); // Color de fondo (en RGB)
    doc.rect(0, 0, pageWidth, 40, 'F');
  
  

  // Agregar el texto "Bodega Rosita"
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255); // Color del texto (blanco)
  const bodegaText = '- - BODEGA ROSITA - -';
  const bodegaTextWidth = doc.getTextWidth(bodegaText);
  const bodegaTextX = (pageWidth - bodegaTextWidth) / 2;
  doc.text(bodegaText, bodegaTextX, 15);



    // Agregar el texto de la cabecera
    const headerText = 'REPORTE DE VENTA';
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // Color del texto (blanco)
    const headerTextWidth = doc.getTextWidth(headerText);
    const headerTextX = (pageWidth - headerTextWidth) / 2;
    doc.text(headerText, headerTextX, 25);
  
    // Cambiar el color del texto a negro para el contenido
    doc.setTextColor(0, 0, 0);
  
    // Ajustar la posición de inicio del contenido
    let startY = 55;
  
    const rows = [
      { title: 'Cliente', value: element.nombrecompleto },
      { title: 'Fecha', value: new Date(element.fecha).toLocaleDateString() },
      { title: 'Productos', value: this.getProductosDetalle(element.compra.detallesCompra) },
      { title: 'Total (PRE INTERESES)', value: `S/.${element.subtotal}` },
      { title: 'Tasa Escogida', value: element.tasa_text },
      { title: 'Porcentaje de tasa', value: element.tasa_num + '%' },
      { title: 'Cuotas', value: element.cuotas },
    ];
  
    // Check if the tasa is Nominal or Efectiva
    if (element.tasa_text === 'Nominal') {
      rows.push(
        { title: 'Capitalización', value: element.capitalizacion },
        { title: 'Renta', value: `S/.${element.renta?.toFixed(2) || '0.00'}` },
      );
    }
  
    rows.push(
      { title: 'Total a Pagar (POST INTERESES)', value: `S/.${element.valorFuturo?.toFixed(2)}` },
      { title: 'Intereses Ganados', value: `S/.${element.interes?.toFixed(2)}` },
      { title: 'Estado Pago', value: element.estadopago },
    );
  
    let pageHeight = doc.internal.pageSize.height;
  
    // Establecer la fuente a Times New Roman o una similar y reducir el tamaño
    doc.setFont("times");
    doc.setFontSize(15); // Tamaño de fuente más pequeño
  
    const lineSpacing = 12; // Espaciado de línea reducido
  
    rows.forEach(row => {
      const splitTitle = doc.splitTextToSize(`${row.title}: `, 50);
      const splitValue = doc.splitTextToSize(`${row.value}`, 100);
  
      // Check if there is enough space for the current row
      if (startY + splitTitle.length * lineSpacing > pageHeight - 10 || startY + splitValue.length * lineSpacing > pageHeight - 10) {
        doc.addPage();
        startY = 20;
      }
  
      // Poner título en negrita
      doc.setFont("times", "bold");
      doc.text(splitTitle, 14, startY);
      
      // Poner valor en normal
      doc.setFont("times", "normal");
      doc.text(splitValue, 70, startY);
  
      // Move to the next line
      startY += Math.max(splitTitle.length, splitValue.length) * lineSpacing + 2; // Adjust line spacing as needed
    });
  
    doc.save('reporte_venta.pdf');
  }
  
/*   generatePDF(element: any): void {
    const doc = new jsPDF();
    doc.text('Reporte de Venta', 14, 20);
  
    const rows = [
      { title: 'Cliente', value: element.nombrecompleto },
      { title: 'Fecha', value: new Date(element.fecha).toLocaleDateString() },
      { title: 'Productos', value: this.getProductosDetalle(element.compra.detallesCompra) },
      { title: 'Total (PRE INTERESES)', value: `S/.${element.subtotal}` },
      { title: 'Tasa Escogida', value: element.tasa_text },
      { title: 'Porcentaje de tasa', value: element.tasa_num },
      { title: 'Cuotas', value: element.cuotas },
      { title: 'Capitalización', value: element.capitalizacion },
      { title: 'Renta', value: `S/.${element.renta?.toFixed(2) || '0.00'}` },
      { title: 'Total a Pagar (POST INTERESES)', value: `S/.${element.valorFuturo?.toFixed(2)}` },
      { title: 'Días a Trasladar', value: element.diasTrasladar },
      { title: 'Intereses', value: `S/.${element.interes?.toFixed(2)}` },
      { title: 'Estado Pago', value: element.estadopago },
    ];
  
    let startY = 30;
    let pageHeight = doc.internal.pageSize.height;
  
    rows.forEach(row => {
      const splitTitle = doc.splitTextToSize(`${row.title}: `, 80);
      const splitValue = doc.splitTextToSize(`${row.value}`, 110);
  
      // Check if there is enough space for the current row
      if (startY + splitValue.length * 10 > pageHeight - 10) {
        doc.addPage();
        startY = 20;
      }
  
      doc.text(splitTitle, 14, startY);
      doc.text(splitValue, 80, startY);
  
      // Move to the next line
      startY += splitValue.length * 5 + 10; // Adjust line spacing as needed
    });
  
    doc.save('reporte_venta.pdf');
  } */
  
  getProductosDetalle(detallesCompra: any[]): string {
    let productosDetalle = '';
  
    detallesCompra.forEach(detalle => {
      productosDetalle += `${detalle.producto?.descripcion}, Cantidad: ${detalle.cantidad}, Precio Por Unidad: S/.${detalle.producto.precioventa}\n`;
    });
  
    return productosDetalle.trim();
  }
  
  
  
}
