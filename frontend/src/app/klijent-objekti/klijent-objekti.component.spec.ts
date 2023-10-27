import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentObjektiComponent } from './klijent-objekti.component';

describe('KlijentObjektiComponent', () => {
  let component: KlijentObjektiComponent;
  let fixture: ComponentFixture<KlijentObjektiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentObjektiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentObjektiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
