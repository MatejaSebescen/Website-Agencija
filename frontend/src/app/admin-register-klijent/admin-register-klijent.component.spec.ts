import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterKlijentComponent } from './admin-register-klijent.component';

describe('AdminRegisterKlijentComponent', () => {
  let component: AdminRegisterKlijentComponent;
  let fixture: ComponentFixture<AdminRegisterKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisterKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegisterKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
