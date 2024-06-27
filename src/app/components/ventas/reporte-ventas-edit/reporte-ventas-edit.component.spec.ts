import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVentasEditComponent } from './reporte-ventas-edit.component';

describe('ReporteVentasEditComponent', () => {
  let component: ReporteVentasEditComponent;
  let fixture: ComponentFixture<ReporteVentasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteVentasEditComponent]
    });
    fixture = TestBed.createComponent(ReporteVentasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
