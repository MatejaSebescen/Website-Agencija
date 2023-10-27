import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentProfilComponent } from './klijent-profil.component';

describe('KlijentProfilComponent', () => {
  let component: KlijentProfilComponent;
  let fixture: ComponentFixture<KlijentProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
