import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginasComponent } from './paginas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WizardService } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { AccionBoton } from '@ng-mf/data-access-user';

describe('PaginasComponent', () => {
  let component: PaginasComponent;
  let fixture: ComponentFixture<PaginasComponent>;
  let wizardServiceMock: jest.Mocked<WizardService>;

  beforeEach(async () => {
    wizardServiceMock = {
      cambio_indice: jest.fn(),
    } as unknown as jest.Mocked<WizardService>;

    await TestBed.configureTestingModule({
      declarations: [PaginasComponent],
      providers: [{ provide: WizardService, useValue: wizardServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginasComponent);
    component = fixture.componentInstance;

    // Mock consultaState
    component['consultaState'] = { readonly: false } as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos and datosPasos correctly', () => {
    expect(component.pantallasPasos).toEqual(PANTA_PASOS);
    expect(component.datosPasos).toEqual({
      nroPasos: PANTA_PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should advance when getValorIndice is called with "cont" and form is valid', () => {
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(true);

    const siguienteSpy = jest.fn();
    const atrasSpy = jest.fn();

    Object.defineProperty(component, 'wizardComponent', {
      get: () => ({
        siguiente: siguienteSpy,
        atras: atrasSpy,
      }),
    });

    const accion: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accion);

    expect(component.indice).toBe(3);
    expect(component.datosPasos.indice).toBe(3);
    expect(wizardServiceMock.cambio_indice).toHaveBeenCalledWith(3);
    expect(siguienteSpy).toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should go back when getValorIndice is called with "ant" and form is valid', () => {
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(true);

    const siguienteSpy = jest.fn();
    const atrasSpy = jest.fn();

    Object.defineProperty(component, 'wizardComponent', {
      get: () => ({
        siguiente: siguienteSpy,
        atras: atrasSpy,
      }),
    });

    const accion: AccionBoton = { valor: 2, accion: 'ant' };
    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(atrasSpy).toHaveBeenCalled();
    expect(siguienteSpy).not.toHaveBeenCalled();
  });

  it('should not navigate if form is invalid', () => {
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(false);

    const siguienteSpy = jest.fn();
    const atrasSpy = jest.fn();

    Object.defineProperty(component, 'wizardComponent', {
      get: () => ({
        siguiente: siguienteSpy,
        atras: atrasSpy,
      }),
    });

    const accion: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should navigate even if form is invalid when readonly is true', () => {
    component['consultaState'] = { readonly: true } as any;

    const siguienteSpy = jest.fn();
    const atrasSpy = jest.fn();

    Object.defineProperty(component, 'wizardComponent', {
      get: () => ({
        siguiente: siguienteSpy,
        atras: atrasSpy,
      }),
    });

    const accion: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accion);

    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(siguienteSpy).toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should not update index if valor is out of range', () => {
    jest.spyOn(component, 'verificarLaValidezDelFormulario').mockReturnValue(true);

    const siguienteSpy = jest.fn();
    const atrasSpy = jest.fn();

    Object.defineProperty(component, 'wizardComponent', {
      get: () => ({
        siguiente: siguienteSpy,
        atras: atrasSpy,
      }),
    });

    const accion: AccionBoton = { valor: 0, accion: 'cont' }; // Invalid index
    component.getValorIndice(accion);

    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should return true only if all forms are valid in verificarLaValidezDelFormulario', () => {
    const servicioMock = {
      isFormValid: jest.fn().mockReturnValue(true),
    };
    component.servicioDeFormularioService = servicioMock as any;

    expect(component.verificarLaValidezDelFormulario()).toBe(true);
    expect(servicioMock.isFormValid).toHaveBeenCalledTimes(5);
  });

  it('should return false if any form is invalid in verificarLaValidezDelFormulario', () => {
    const servicioMock = {
      isFormValid: jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false), // Second call returns false
    };
    component.servicioDeFormularioService = servicioMock as any;

    expect(component.verificarLaValidezDelFormulario()).toBe(false);
  });
});
