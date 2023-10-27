import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterAgencijaComponent } from './admin-register-agencija.component';

describe('AdminRegisterAgencijaComponent', () => {
  let component: AdminRegisterAgencijaComponent;
  let fixture: ComponentFixture<AdminRegisterAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisterAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegisterAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
