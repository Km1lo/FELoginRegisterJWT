import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditClienteComponent } from './dialog-edit-cliente.component';

describe('DialogEditClienteComponent', () => {
  let component: DialogEditClienteComponent;
  let fixture: ComponentFixture<DialogEditClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditClienteComponent]
    });
    fixture = TestBed.createComponent(DialogEditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
