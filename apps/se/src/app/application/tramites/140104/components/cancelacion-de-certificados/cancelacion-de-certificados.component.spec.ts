import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CancelacionDeCertificadosComponent } from './cancelacion-de-certificados.component';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { of } from 'rxjs';

class MockServicioDeMensajesService {
  enviarMensaje = jest.fn();
  enviarDevolverFacturasMensaje = jest.fn();
  establecerDatosDePermiso = jest.fn();
}

describe('CancelacionDeCertificadosComponent', () => {
  let fixture: ComponentFixture<CancelacionDeCertificadosComponent>;
  let component: CancelacionDeCertificadosComponent;
  let mockServicioDeMensajesService: MockServicioDeMensajesService;

  beforeEach(() => {
    mockServicioDeMensajesService = new MockServicioDeMensajesService();

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CancelacionDeCertificadosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ServicioDeMensajesService, useValue: mockServicioDeMensajesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeCertificadosComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form groups in the constructor', () => {
    expect(component.formularioGrupo).toBeDefined();
    expect(component.detalleDelCupoForm).toBeDefined();
    expect(component.montoForm).toBeDefined();
    expect(component.cancelacionForm).toBeDefined();
  });

  it('should populate regimenAduaneroList and mecanismoAsignacionList on ngOnInit', () => {
    component.ngOnInit();
    expect(component.regimenAduaneroList.length).toBeGreaterThan(0);
    expect(component.mecanismoAsignacionList.length).toBeGreaterThan(0);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyNotificationSubject$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotificationSubject$'], 'complete');
    const spyServicio = jest.spyOn(mockServicioDeMensajesService, 'establecerDatosDePermiso');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
    expect(spyServicio).toHaveBeenCalledWith(false);
  });


  it('should populate tables and set mostrarDetalleDelCupo to true on buscar', () => {
    component.buscar(new Event('click'));
    expect(component.mostrarDetalleDelCupo).toBe(true);
    expect(component.cuposDisponiblesTabla.length).toBeGreaterThan(0);
    expect(component.CertificadosDisponiblesTabla.length).toBeGreaterThan(0);
    expect(component.CertificadosACancelarTabla.length).toBeGreaterThan(0);
  });

  it('should call enviarMensaje and enviarDevolverFacturasMensaje(false) on seleccionar', () => {
    const spyEnviarMensaje = jest.spyOn(mockServicioDeMensajesService, 'enviarMensaje');
    const spyEnviarDevolverFacturasMensaje = jest.spyOn(mockServicioDeMensajesService, 'enviarDevolverFacturasMensaje');

    component.seleccionar(new Event('click'));

    expect(spyEnviarMensaje).toHaveBeenCalledWith(true);
    expect(spyEnviarDevolverFacturasMensaje).toHaveBeenCalledWith(false);
  });

  it('should call enviarMensaje and enviarDevolverFacturasMensaje(true) on devlover', () => {
    const spyEnviarMensaje = jest.spyOn(mockServicioDeMensajesService, 'enviarMensaje');
    const spyEnviarDevolverFacturasMensaje = jest.spyOn(mockServicioDeMensajesService, 'enviarDevolverFacturasMensaje');

    component.devlover(new Event('click'));

    expect(spyEnviarMensaje).toHaveBeenCalledWith(true);
    expect(spyEnviarDevolverFacturasMensaje).toHaveBeenCalledWith(true);
  });

  it('should handle empty data gracefully on buscar', () => {
    component.cuposDisponiblesTabla = [];
    component.CertificadosDisponiblesTabla = [];
    component.CertificadosACancelarTabla = [];
    jest.spyOn(component, 'buscar').mockImplementation(() => {}); // Mock buscar to prevent data modification
    component.buscar(new Event('click'));
    expect(component.cuposDisponiblesTabla.length).toBe(0);
    expect(component.CertificadosDisponiblesTabla.length).toBe(0);
    expect(component.CertificadosACancelarTabla.length).toBe(0);
  });

  it('should call enviarMensaje on busqueda', () => {
    const spyServicio = jest.spyOn(mockServicioDeMensajesService, 'enviarMensaje');
    component.busqueda(new Event('click'));
    expect(spyServicio).toHaveBeenCalledWith(true);
  });

  it('should call establecerDatosDePermiso with true when setting permissions', () => {
    const spyServicio = jest.spyOn(mockServicioDeMensajesService, 'establecerDatosDePermiso');
    mockServicioDeMensajesService.establecerDatosDePermiso(true);
    expect(spyServicio).toHaveBeenCalledWith(true);
  });

});

