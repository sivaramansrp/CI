import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlPermisosPreviosExportacionComponent } from './control-permisos-previos-exportacion.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/control-permisos-previos-exportacion.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { CommonModule } from '@angular/common';

describe('ControlPermisosPreviosExportacionComponent', () => {
  let component: ControlPermisosPreviosExportacionComponent;
  // let fixture: ComponentFixture<ControlPermisosPreviosExportacionComponent>;

  beforeEach(async () => {
    component = new ControlPermisosPreviosExportacionComponent();

    // Mock the ViewChild wizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

  });

  
  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pasosSolicitar.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call siguiente when accion is "cont"', () => {
    const event = { accion: 'cont', valor: 2 };
    component.getValorIndice(event);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras when accion is not "cont"', () => {
    const event = { accion: 'prev', valor: 2 };
    component.getValorIndice(event);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call methods if valor is out of range', () => {
    const event = { accion: 'cont', valor: 0 };
    component.getValorIndice(event);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call methods if valor is greater than 4', () => {
    const event = { accion: 'cont', valor: 5 };
    component.getValorIndice(event);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});
