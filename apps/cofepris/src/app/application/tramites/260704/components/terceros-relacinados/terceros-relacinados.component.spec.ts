import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacinadosComponent } from './terceros-relacinados.component';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('TercerosRelacinadosComponent', () => {
  let component: TercerosRelacinadosComponent;
  let fixture: ComponentFixture<TercerosRelacinadosComponent>;
  let consultaServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerTablaTerceros: jest.fn().mockReturnValue(of([{ nombre: 'Dest1' }])),
    };

    storeMock = {
      removeDestinatarioDato: jest.fn(),
      setTipoPersona: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        destinatario: 'dest',
        fabricante: 'fab',
        tipoPersona: 'fisica',
        nombre: 'nombre',
        primerApellido: 'apellido1',
        segundoApellido: 'apellido2',
        denominacion: 'denom',
        pais: 'pais',
        estados: 'estados',
        codigoDeZip: 'zip',
        camino: 'camino',
        numeroExterior: 'ext',
        numeroInterior: 'int',
        ladaDeTerceros: 'lada',
        fon: 'fon',
        email: 'mail'
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TercerosRelacinadosComponent],
      providers: [
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: storeMock },
        { provide: Tramite260704Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacinadosComponent);
    component = fixture.componentInstance;
    component.solicitudState = {
      destinatario: 'dest',
      fabricante: 'fab',
      tipoPersona: 'fisica',
      nombre: 'nombre',
      primerApellido: 'apellido1',
      segundoApellido: 'apellido2',
      denominacion: 'denom',
      pais: 'pais',
      estados: 'estados',
      codigoDeZip: 'zip',
      camino: 'camino',
      numeroExterior: 'ext',
      numeroInterior: 'int',
      ladaDeTerceros: 'lada',
      fon: 'fon',
      email: 'mail'
    } as any;
    component.soloLectura = false;
    component.donanteDomicilio();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tercerosForm with correct values', () => {
    expect(component.tercerosForm.value.destinatario).toBe('dest');
    expect(component.tercerosForm.value.fabricante).toBe('fab');
    expect(component.tercerosForm.value.tipoPersona).toBe('fisica');
    expect(component.tercerosForm.value.nombre).toBe('nombre');
    expect(component.tercerosForm.value.primerApellido).toBe('apellido1');
    expect(component.tercerosForm.value.segundoApellido).toBe('apellido2');
    expect(component.tercerosForm.value.denominacion).toBe('denom');
    expect(component.tercerosForm.value.pais).toBe('pais');
    expect(component.tercerosForm.value.estados).toBe('estados');
    expect(component.tercerosForm.value.codigoDeZip).toBe('zip');
    expect(component.tercerosForm.value.camino).toBe('camino');
    expect(component.tercerosForm.value.numeroExterior).toBe('ext');
    expect(component.tercerosForm.value.numeroInterior).toBe('int');
    expect(component.tercerosForm.value.ladaDeTerceros).toBe('lada');
    expect(component.tercerosForm.value.fon).toBe('fon');
    expect(component.tercerosForm.value.email).toBe('mail');
  });

  it('should call obtenerTablaTerceros and set destinatarioDatos', () => {
    component.obtenerTablaTerceros();
    expect(consultaServiceMock.obtenerTablaTerceros).toHaveBeenCalled();
    expect(component.destinatarioDatos.length).toBeGreaterThan(0);
  });

  it('should set tipoPersonaSeleccionada in setTipoPersona', () => {
    component.setTipoPersona('moral');
    expect(component.tipoPersonaSeleccionada).toBe('moral');
  });

  it('should set selectedDestinatario in obtenerDatosDestinatario', () => {
    component.obtenerDatosDestinatario([{ nombre: 'fab1' } as any]);
    expect(component.selectedDestinatario.length).toBe(1);
  });

  it('should call store.removeDestinatarioDato in eliminarMercancias', () => {
    component.selectedDestinatario = [{ rfc: 'RFC1' } as any];
    component.eliminarMercancias();
    expect(storeMock.removeDestinatarioDato).toHaveBeenCalledWith({ rfc: 'RFC1' });
  });

  it('should not call store.removeDestinatarioDato if selectedDestinatario is empty', () => {
    component.selectedDestinatario = [];
    component.eliminarMercancias();
    expect(storeMock.removeDestinatarioDato).not.toHaveBeenCalled();
  });

it('should open modal in abrirModificarProductos', () => {
  const modalDiv = document.createElement('div');
  component.modalElement = { nativeElement: modalDiv } as any;
  component.abrirModificarProductos();
  const { Modal } = require('bootstrap');
  expect(Modal).toHaveBeenCalledWith(modalDiv);
});

  it('should call validacionesService.isValid in isValid', () => {
    const form = component.tercerosForm;
    expect(component.isValid(form, 'destinatario')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'destinatario');
  });

  it('should call store method in setValoresStore', () => {
    component.setValoresStore(component.tercerosForm, 'tipoPersona', 'setTipoPersona');
    expect(storeMock.setTipoPersona).toHaveBeenCalledWith('fisica');
  });

  it('should disable form in guardarDatosFormulario if soloLectura', () => {
    component.soloLectura = true;
    component.guardarDatosFormulario();
    expect(component.tercerosForm.disabled).toBe(true);
  });

  it('should enable form in guardarDatosFormulario if not soloLectura', () => {
    component.soloLectura = false;
    component.guardarDatosFormulario();
    expect(component.tercerosForm.enabled).toBe(true);
  });

  it('should call donanteDomicilio in inicializarEstadoFormulario if not soloLectura', () => {
    const spy = jest.spyOn(component, 'donanteDomicilio');
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario in inicializarEstadoFormulario if soloLectura', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});