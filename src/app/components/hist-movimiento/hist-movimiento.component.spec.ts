import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistMovimientoComponent } from './hist-movimiento.component';

describe('HistMovimientoComponent', () => {
  let component: HistMovimientoComponent;
  let fixture: ComponentFixture<HistMovimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistMovimientoComponent]
    });
    fixture = TestBed.createComponent(HistMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
