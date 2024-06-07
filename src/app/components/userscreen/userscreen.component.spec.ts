import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscreenComponent } from './userscreen.component';

describe('UserscreenComponent', () => {
  let component: UserscreenComponent;
  let fixture: ComponentFixture<UserscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserscreenComponent]
    });
    fixture = TestBed.createComponent(UserscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
