import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeObjektaComponent } from './dodavanje-objekta.component';

describe('DodavanjeObjektaComponent', () => {
  let component: DodavanjeObjektaComponent;
  let fixture: ComponentFixture<DodavanjeObjektaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodavanjeObjektaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodavanjeObjektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
