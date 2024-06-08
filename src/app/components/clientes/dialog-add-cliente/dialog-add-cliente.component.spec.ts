import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddClienteComponent } from './dialog-add-cliente.component';

describe('DialogAddClienteComponent', () => {
  let component: DialogAddClienteComponent;
  let fixture: ComponentFixture<DialogAddClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddClienteComponent]
    });
    fixture = TestBed.createComponent(DialogAddClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
