import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrService, provideToastr } from 'ngx-toastr';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        FormBuilder,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #formularioControl', async () => {
    component.formCertificado = component.formCertificado || {};
    component.formCertificado.get = jest.fn();
    const formularioControl = component.formularioControl;
    expect(component.formCertificado.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.formCertificado = component.formCertificado || {};
    component.formCertificadoEvent = component.formCertificadoEvent || {};
    component.formCertificadoEvent.emit = jest.fn();
    component.ngOnInit();
  });

  it('should run #tipoEstadoSeleccion()', async () => {
    component.tipoEstadoSeleccionEvent = component.tipoEstadoSeleccionEvent || {};
    component.tipoEstadoSeleccionEvent.emit = jest.fn();
    component.tipoEstadoSeleccion({ id: 1, descripcion: 'someValue' });
    expect(component.tipoEstadoSeleccionEvent.emit).toHaveBeenCalled();
  });

  it('should run #tipoSeleccion()', async () => {
    component.paisBloquEvent = component.paisBloquEvent || {};
    component.paisBloquEvent.emit = jest.fn();
    component.tipoSeleccion({ id: 1, descripcion: 'someValue' });
    expect(component.paisBloquEvent.emit).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should run #buscarMercancia()', async () => {
    component.setbuscarMercanciaEvent = component.setbuscarMercanciaEvent || {};
    component.setbuscarMercanciaEvent.emit = jest.fn();
    component.buscarMercancia();
    expect(component.setbuscarMercanciaEvent.emit).toHaveBeenCalled();
  });

  it('should run #abrirModificarModal()', async () => {
    component.filaClics = component.filaClics || {};
    component.filaClics.emit = jest.fn();
    component.abrirModificarModal({
      id: '1',
      fraccionArancelaria: 'someValue',
      numeroDeRegistrodeProductos: 'someValue',
      fechaExpedicion: '2024-02-02',
      fechaVencimiento: '2024-02-02',
      umc: 'someValue',
      cantidad: 'someValue',
      tipoFactura: 'someValue',
      valorMercancia: 'someValue',
      fechaFinalInput: '2024-02-02',
      numeroFactura: 'someValue',
      normaOrigen: 'someValue',
      nombreTecnico: 'someValue',
      nombreComercial: 'someValue',
    });
  });
});


