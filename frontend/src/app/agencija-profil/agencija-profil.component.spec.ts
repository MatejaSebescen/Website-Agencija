import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaProfilComponent } from './agencija-profil.component';

describe('AgencijaProfilComponent', () => {
  let component: AgencijaProfilComponent;
  let fixture: ComponentFixture<AgencijaProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
