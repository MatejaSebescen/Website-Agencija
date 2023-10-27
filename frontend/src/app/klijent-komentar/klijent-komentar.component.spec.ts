import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentKomentarComponent } from './klijent-komentar.component';

describe('KlijentKomentarComponent', () => {
  let component: KlijentKomentarComponent;
  let fixture: ComponentFixture<KlijentKomentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentKomentarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentKomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
