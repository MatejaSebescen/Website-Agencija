import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaPosloviComponent } from './agencija-poslovi.component';

describe('AgencijaPosloviComponent', () => {
  let component: AgencijaPosloviComponent;
  let fixture: ComponentFixture<AgencijaPosloviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaPosloviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaPosloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
