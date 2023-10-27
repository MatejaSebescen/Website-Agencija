import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZahteviRadnikaComponent } from './admin-zahtevi-radnika.component';

describe('AdminZahteviRadnikaComponent', () => {
  let component: AdminZahteviRadnikaComponent;
  let fixture: ComponentFixture<AdminZahteviRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZahteviRadnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZahteviRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
