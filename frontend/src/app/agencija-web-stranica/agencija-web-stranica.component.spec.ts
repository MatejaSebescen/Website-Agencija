import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaWebStranicaComponent } from './agencija-web-stranica.component';

describe('AgencijaWebStranicaComponent', () => {
  let component: AgencijaWebStranicaComponent;
  let fixture: ComponentFixture<AgencijaWebStranicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaWebStranicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaWebStranicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
