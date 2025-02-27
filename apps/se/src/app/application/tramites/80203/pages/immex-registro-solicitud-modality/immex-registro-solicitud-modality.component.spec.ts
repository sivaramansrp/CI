import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImmexRegistroSolicitudModalityComponent } from './immex-registro-solicitud-modality.component';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ImmexRegistroSolicitudModalityComponent', () => {
  let component: ImmexRegistroSolicitudModalityComponent;
  let fixture: ComponentFixture<ImmexRegistroSolicitudModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImmexRegistroSolicitudModalityComponent, WizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ImmexRegistroSolicitudModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Guardar');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should navigate to the next step', () => {
    spyOn(component.componenteWizard, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(component.componenteWizard.siguiente).toHaveBeenCalled();
  });

  it('should navigate to the previous step', () => {
    spyOn(component.componenteWizard, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(component.componenteWizard.atras).toHaveBeenCalled();
  });

  it('should not navigate if the value is out of range', () => {
    spyOn(component.componenteWizard, 'siguiente');
    spyOn(component.componenteWizard, 'atras');
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1);
    expect(component.componenteWizard.siguiente).not.toHaveBeenCalled();
    expect(component.componenteWizard.atras).not.toHaveBeenCalled();
  });

  it('should throw an error when calling obtenerNombreDelTítulo', () => {
    expect(() => component.obtenerNombreDelTítulo(1)).toThrowError('Método no implementado.');
  });
});
