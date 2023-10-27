import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaRegistracijaRadnikaComponent } from './agencija-registracija-radnika.component';

describe('AgencijaRegistracijaRadnikaComponent', () => {
  let component: AgencijaRegistracijaRadnikaComponent;
  let fixture: ComponentFixture<AgencijaRegistracijaRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaRegistracijaRadnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaRegistracijaRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
