import { TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../../services/shared2603/certificados-licencias-permisos.service';
import { Tramite2603Store } from '../../../estados/stores/2603/tramite2603.store';
import { Tramite2603Query } from '../../../estados/queries/2603/tramite2603.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: any;
  let certificadosLicenciasSvcMock: any;
  let tramite2603StoreMock: any;
  let tramite2603QueryMock: any;

  const consultaStateMock = {
    readonly: false,
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite: '',
    tipoTramite: '',
    tipoModalidad: '',
    tipoSolicitud: '',
    tipoPersona: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    create: false,
    update: false,
    consultaioSolicitante: {
      folioDelTramite: '',
      fechaDeInicio: '',
      estadoDelTramite: '',
      tipoDeTramite: ''
    },
    action_id: '',
    current_user: '',
    id_solicitud: '',
    nombre_pagina: ''
  };

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getBancoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Banco Test' }] }))
    };
    tramite2603StoreMock = {
      setFechaDePago: jest.fn(),
      setClaveDeReferencia: jest.fn()
    };
    tramite2603QueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '123',
        cadenaDaLaDependencia: 'cadena',
        banco: 'BANAMEX',
        laveDePago: 'clave',
        fechaDePago: '2024-01-01',
        importeDePago: 100
      })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDeDerechosComponent],
      providers: [
        FormBuilder,
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: Tramite2603Store, useValue: tramite2603StoreMock },
        { provide: Tramite2603Query, useValue: tramite2603QueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    component.consultaState = { ...consultaStateMock };
    // Remove detectChanges to avoid disabled attribute issues
    // fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores del estado', () => {
    component.cerrarPagoDerechosForm();
    expect(component.pagoDerechosForm.value.claveDeReferencia).toBe('123');
    expect(component.pagoDerechosForm.value.banco).toBe('BANAMEX');
  });

  it('debe obtener el catálogo de bancos', () => {
    component.getBancoCatalogDatos();
    expect(certificadosLicenciasSvcMock.getBancoDatos).toHaveBeenCalled();
    expect(component.bancoCatalogo).toEqual([{ id: 1, nombre: 'Banco Test' }]);
  });

  it('debe actualizar la fecha de pago y llamar al store', () => {
    component.cerrarPagoDerechosForm();
    component.cambioFechaFinal('2024-06-27');
    expect(component.pagoDerechosForm.get('fechaDePago')?.value).toBe('2024-06-27');
    expect(tramite2603StoreMock.setFechaDePago).toHaveBeenCalledWith('2024-06-27');
  });

  it('debe deshabilitar el formulario si consultaState.readonly es true', () => {
    component.cerrarPagoDerechosForm();
    component.consultaState = { ...consultaStateMock, readonly: true };
    component.deshabilitarFormularios();
    expect(component.pagoDerechosForm.disabled).toBe(true);
  });

  it('debe habilitar el formulario si consultaState.readonly es false', () => {
    component.cerrarPagoDerechosForm();
    component.consultaState = { ...consultaStateMock, readonly: false };
    component.deshabilitarFormularios();
    expect(component.pagoDerechosForm.enabled).toBe(true);
  });

  it('debe llamar al método correcto del store en setValoresStore', () => {
    component.cerrarPagoDerechosForm();
    component.pagoDerechosForm.get('claveDeReferencia')?.setValue('ABC123');
    component.setValoresStore(component.pagoDerechosForm, 'claveDeReferencia', 'setClaveDeReferencia');
    expect(tramite2603StoreMock.setClaveDeReferencia).toHaveBeenCalledWith('ABC123');
  });

  it('debe limpiar destroyNotifier$ en ngOnDestroy', () => {
    (component as any).destroyNotifier$ = { next: jest.fn(), complete: jest.fn() };
    component.ngOnDestroy();
    expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
    expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('debe establecer error si la fecha es futura en cambioFechaFinal', () => {
    component.cerrarPagoDerechosForm();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateStr = futureDate.toISOString().split('T')[0];
    component.cambioFechaFinal(futureDateStr);
    expect(component.pagoDerechosForm.get('fechaDePago')?.errors).toEqual({ futureDate: true });
    expect(component.fechaFuturaSeleccionada).toBe(true);
  });

  it('debe limpiar error si la fecha no es futura en cambioFechaFinal', () => {
    component.cerrarPagoDerechosForm();
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    const todayDateStr = `${day}/${month}/${year}`;
    component.cambioFechaFinal(todayDateStr);
    expect(component.pagoDerechosForm.get('fechaDePago')?.errors).toBeNull();
    expect(component.fechaFuturaSeleccionada).toBe(false);
  });

  it('debe parsear fecha con formato DD/MM/YYYY en cambioFechaFinal', () => {
    component.cerrarPagoDerechosForm();
    component.cambioFechaFinal('27/06/2024');
    expect(component.pagoDerechosForm.get('fechaDePago')?.value).toBe('27/06/2024');
  });

  it('debe resetear el formulario en borrarDatosDelPago', () => {
    component.cerrarPagoDerechosForm();
    component.pagoDerechosForm.get('claveDeReferencia')?.setValue('test');
    component.borrarDatosDelPago();
    expect(component.pagoDerechosForm.get('claveDeReferencia')?.value).toBeNull();
  });

  it('debe convertir a mayúsculas en onLaveDePagoInput', () => {
    component.cerrarPagoDerechosForm();
    component.pagoDerechosForm.get('laveDePago')?.setValue('abc123');
    component.onLaveDePagoInput();
    expect(component.pagoDerechosForm.get('laveDePago')?.value).toBe('ABC123');
  });

  it('debe manejar respuesta de banco sin data en getBancoCatalogDatos', () => {
    certificadosLicenciasSvcMock.getBancoDatos.mockReturnValueOnce(of({}));
    component.getBancoCatalogDatos();
    expect(component.bancoCatalogo).toBeUndefined();
  });
});