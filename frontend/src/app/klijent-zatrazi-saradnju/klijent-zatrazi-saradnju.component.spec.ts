import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentZatraziSaradnjuComponent } from './klijent-zatrazi-saradnju.component';

describe('KlijentZatraziSaradnjuComponent', () => {
  let component: KlijentZatraziSaradnjuComponent;
  let fixture: ComponentFixture<KlijentZatraziSaradnjuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentZatraziSaradnjuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentZatraziSaradnjuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
