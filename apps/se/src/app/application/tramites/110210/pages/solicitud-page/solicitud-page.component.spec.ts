import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;

    // Mock del WizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    component.pasoUnoComponent = {
      validarFormularios: jest.fn().mockReturnValue(true),
      esDatosRespuesta: false,
      consultaState: undefined,
      solicitante: undefined,
      tipoPersona: undefined,
      domicilio: undefined,
      datosGenerales: undefined,
      datosAdicionales: undefined,
      datosContacto: undefined,
      datosRepresentante: undefined,
      datosApoderado: undefined,
      datosMandatario: undefined,
      datosSocios: undefined,
      datosDocumentos: undefined,
      datosRelacionados: undefined,
      datosNotificaciones: undefined,
      datosDomicilio: undefined,
      datosDomicilioFiscal: undefined,
      datosDomicilioNotificaciones: undefined,
      datosDomicilioExtranjero: undefined,
      datosDomicilioFiscalExtranjero: undefined,
      datosDomicilioNotificacionesExtranjero: undefined,
    } as unknown as any;

    fixture.detectChanges();
  });

  beforeEach(() => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    component.pasoUnoComponent = {
      validarFormularios: jest.fn().mockReturnValue(true),
      esDatosRespuesta: false,
      consultaState: undefined,
      solicitante: undefined,
      tipoPersona: undefined,
      domicilio: undefined,
      datosGenerales: undefined,
      datosAdicionales: undefined,
      datosContacto: undefined,
      datosRepresentante: undefined,
      datosApoderado: undefined,
      datosMandatario: undefined,
      datosSocios: undefined,
      datosDocumentos: undefined,
      datosRelacionados: undefined,
      datosNotificaciones: undefined,
      datosDomicilio: undefined,
      datosDomicilioFiscal: undefined,
      datosDomicilioNotificaciones: undefined,
      datosDomicilioExtranjero: undefined,
      datosDomicilioFiscalExtranjero: undefined,
      datosDomicilioNotificacionesExtranjero: undefined,
    } as unknown as any;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar pasos con PASOS', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('debe inicializar datosPasos con los valores correctos', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('debe actualizar el indice cuando se llama seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debe llamar wizardComponent.siguiente cuando getValorIndice se llama con accion "cont"', () => {
    component.indice = 1;
    const accionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('no debe actualizar indice ni llamar métodos de wizardComponent si valor está fuera de rango', () => {
    const accionBoton = { accion: 'cont', valor: 6 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1); // Valor por defecto
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});