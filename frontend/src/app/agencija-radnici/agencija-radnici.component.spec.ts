import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaRadniciComponent } from './agencija-radnici.component';

describe('AgencijaRadniciComponent', () => {
  let component: AgencijaRadniciComponent;
  let fixture: ComponentFixture<AgencijaRadniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaRadniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaRadniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
