import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosParaMovilizacionComponent } from './datos-para-movilizacion.component';

describe('DatosParaMovilizacionComponent', () => {
  let component: DatosParaMovilizacionComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosParaMovilizacionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create formularioPago FormGroup on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioMovilizacion).toBeDefined();
  });
});
