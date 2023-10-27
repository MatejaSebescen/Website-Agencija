import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentAgencijeComponent } from './klijent-agencije.component';

describe('KlijentAgencijeComponent', () => {
  let component: KlijentAgencijeComponent;
  let fixture: ComponentFixture<KlijentAgencijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentAgencijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentAgencijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
