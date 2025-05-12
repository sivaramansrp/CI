import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDeReporteComponent } from './solicitud-de-reporte.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { REPORTE_ANUAL_PASOS } from '../../enums/reporte-anual.enum';

describe('SolicitudDeReporteComponent', () => {
  let component: SolicitudDeReporteComponent;
  let fixture: ComponentFixture<SolicitudDeReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudDeReporteComponent, WizardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudDeReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have correct initial datosPasos', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: REPORTE_ANUAL_PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and call siguiente on wizardComponent when accion is cont', () => {
    const wizardComponentSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardComponentSpy).toHaveBeenCalled();
  });

  it('should update indice and call atras on wizardComponent when accion is not cont', () => {
    const wizardComponentSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardComponentSpy).toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range', () => {
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
  });
});
