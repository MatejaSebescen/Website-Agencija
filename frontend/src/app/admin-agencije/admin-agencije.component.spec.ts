import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgencijeComponent } from './admin-agencije.component';

describe('AdminAgencijeComponent', () => {
  let component: AdminAgencijeComponent;
  let fixture: ComponentFixture<AdminAgencijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAgencijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgencijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
