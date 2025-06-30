import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { of } from 'rxjs';
import { EstablecimientoService } from '../../../../shared/services/establecimiento.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({selector: 'solicitante', template: ''})
class MockSolicitanteComponent {}

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let mockEstablecimientoService: any;
  let mockConsultaQuery: any;

  beforeEach(async () => {
    mockEstablecimientoService = {
      obtenerSolicitudDatos: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    };

    mockConsultaQuery = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent, MockSolicitanteComponent],
      providers: [
        { provide: EstablecimientoService, useValue: mockEstablecimientoService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar y suscribirse a selectConsultaioState$ con update=false', () => {
    component.consultaState = undefined as any;
    component.esDatosRespuesta = false;
    mockConsultaQuery.selectConsultaioState$ = of({ update: false });
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: false });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debería llamar a guardarDatosFormulario si update=true', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    mockConsultaQuery.selectConsultaioState$ = of({ update: true });
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: true });
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('guardarDatosFormulario debe actualizar estado si hay respuesta', () => {
    const mockResp = { test: 'valor' };
    mockEstablecimientoService.obtenerSolicitudDatos.mockReturnValue(of(mockResp));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockEstablecimientoService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResp);
  });

  it('guardarDatosFormulario no debe actualizar estado si no hay respuesta', () => {
    mockEstablecimientoService.obtenerSolicitudDatos.mockReturnValue(of(null));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(false);
    expect(mockEstablecimientoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('debería cambiar el índice con seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('debería limpiar destroyNotifier$ en ngOnDestroy', () => {
    const spyNext = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  // Cobertura para obtenerValoresFormulario
  it('debería obtener valores del solicitante si existe el form', () => {
    component.solicitante = { form: { value: { nombre: 'Juan' } } } as any;
    const resultado = component.obtenerValoresFormulario();
    expect(resultado.solicitante).toEqual({ nombre: 'Juan' });
  });

  it('debería obtener valores de datosSolicitud si hay componentes', () => {
    const mockDatosSolicitudComponent = {
      datosSolicitudform: { value: { campo: 1 } },
      manifiestosRepresentanteForm: { value: { campo: 2 } },
      scianForm: { value: { campo: 3 } }
    };
    component.datosSolicitudComponents = {
      length: 1,
      toArray: () => [mockDatosSolicitudComponent]
    } as any;
    const resultado = component.obtenerValoresFormulario();
    expect(resultado.datosSolicitud?.length).toBe(1);
    expect(resultado.datosSolicitud?.[0].datosSolicitudform).toEqual({ campo: 1 });
    expect(resultado.datosSolicitud?.[0].manifiestosRepresentanteForm).toEqual({ campo: 2 });
    expect(resultado.datosSolicitud?.[0].scianForm).toEqual({ campo: 3 });
  });

  it('debería obtener valores de pagoDeDerechos si hay componentes', () => {
    const mockPagoComponent = { pagoDerechos: { value: { pago: 123 } } };
    component.pagoDeDerechosComponents = {
      length: 1,
      toArray: () => [mockPagoComponent]
    } as any;
    const resultado = component.obtenerValoresFormulario();
    expect(resultado.pagoDeDerechos?.length).toBe(1);
    expect(resultado.pagoDeDerechos?.[0]).toEqual({ pago: 123 });
  });

  it('debería obtener valores de tramitesAsociados si hay componentes', () => {
    const mockTramiteComponent = { acuseTablaDatos: [{ tramite: 1 }, { tramite: 2 }] };
    component.tramitesAsociadosComponents = {
      length: 1,
      toArray: () => [mockTramiteComponent]
    } as any;
    const resultado = component.obtenerValoresFormulario();
    expect(resultado.tramitesAsociados?.length).toBe(2);
    expect(resultado.tramitesAsociados?.[0]).toEqual({ tramite: 1 });
    expect(resultado.tramitesAsociados?.[1]).toEqual({ tramite: 2 });
  });

  it('debería retornar objeto vacío si no hay nada en obtenerValoresFormulario', () => {
    component.solicitante = undefined as any;
    component.datosSolicitudComponents = { length: 0, toArray: () => [] } as any;
    component.pagoDeDerechosComponents = { length: 0, toArray: () => [] } as any;
    component.tramitesAsociadosComponents = { length: 0, toArray: () => [] } as any;
    const resultado = component.obtenerValoresFormulario();
    expect(resultado.solicitante).toBeUndefined();
    expect(resultado.datosSolicitud).toEqual([]);
    expect(resultado.pagoDeDerechos).toEqual([]);
    expect(resultado.tramitesAsociados).toEqual([]);
  });
});