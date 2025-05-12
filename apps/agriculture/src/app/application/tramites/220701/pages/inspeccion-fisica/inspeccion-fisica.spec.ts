import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionFisicaComponent } from './inspeccion-fisica.component';

describe('InspeccionFisicaComponent', () => {
  let component: InspeccionFisicaComponent;
  let fixture: ComponentFixture<InspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspeccionFisicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspeccionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
