import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditProductoComponent } from './dialog-edit-producto.component';

describe('DialogEditProductoComponent', () => {
  let component: DialogEditProductoComponent;
  let fixture: ComponentFixture<DialogEditProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditProductoComponent]
    });
    fixture = TestBed.createComponent(DialogEditProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
