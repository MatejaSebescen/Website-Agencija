import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPosloviComponent } from './klijent-poslovi.component';

describe('KlijentPosloviComponent', () => {
  let component: KlijentPosloviComponent;
  let fixture: ComponentFixture<KlijentPosloviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentPosloviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentPosloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
