import { ComponentFixture } from '@angular/core/testing';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { INSPECCIONFISIOPASOS } from '../../../../core/enums/220502/solicitud-pantallas.enum';
import { InspeccionFisicaComponent } from './inspeccion-fisica.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

describe('InspeccionFisicaComponent', () => {
  let component: InspeccionFisicaComponent;
  let fixture: ComponentFixture<InspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspeccionFisicaComponent, WizardComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with INSPECCIONFISIOPASOS', () => {
    expect(component.pasos).toEqual(INSPECCIONFISIOPASOS);
  });

  it('should initialize datosPasos correctly', () => {
    const expectedDatosPasos: DatosPasos = {
      nroPasos: INSPECCIONFISIOPASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    };
    expect(component.datosPasos).toEqual(expectedDatosPasos);
  });
});