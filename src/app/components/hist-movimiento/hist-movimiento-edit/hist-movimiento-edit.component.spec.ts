import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistMovimientoEditComponent } from './hist-movimiento-edit.component';

describe('HistMovimientoEditComponent', () => {
  let component: HistMovimientoEditComponent;
  let fixture: ComponentFixture<HistMovimientoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistMovimientoEditComponent]
    });
    fixture = TestBed.createComponent(HistMovimientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
