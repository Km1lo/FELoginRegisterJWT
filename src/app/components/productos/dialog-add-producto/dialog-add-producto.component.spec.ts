import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProductoComponent } from './dialog-add-producto.component';

describe('DialogAddProductoComponent', () => {
  let component: DialogAddProductoComponent;
  let fixture: ComponentFixture<DialogAddProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddProductoComponent]
    });
    fixture = TestBed.createComponent(DialogAddProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
