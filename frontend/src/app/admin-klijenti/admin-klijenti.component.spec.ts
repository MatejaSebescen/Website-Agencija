import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKlijentiComponent } from './admin-klijenti.component';

describe('AdminKlijentiComponent', () => {
  let component: AdminKlijentiComponent;
  let fixture: ComponentFixture<AdminKlijentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKlijentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKlijentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
