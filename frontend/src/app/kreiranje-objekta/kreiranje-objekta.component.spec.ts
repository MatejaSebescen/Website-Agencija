import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreiranjeObjektaComponent } from './kreiranje-objekta.component';

describe('KreiranjeObjektaComponent', () => {
  let component: KreiranjeObjektaComponent;
  let fixture: ComponentFixture<KreiranjeObjektaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreiranjeObjektaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KreiranjeObjektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
