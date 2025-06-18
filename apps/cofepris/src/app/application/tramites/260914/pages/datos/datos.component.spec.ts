import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { EstablecimientoService } from '../../../../shared/services/establecimiento.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let establecimientoServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    establecimientoServiceMock = {
      obtenerSolicitudDatos: jest.fn().mockReturnValue(of({ test: 'data' })),
      actualizarEstadoFormulario: jest.fn()
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: EstablecimientoService, useValue: establecimientoServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false on ngOnInit', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormulario if consultaState.update is true on ngOnInit', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: true });
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true and call actualizarEstadoFormulario in guardarDatosFormulario', () => {
    establecimientoServiceMock.obtenerSolicitudDatos.mockReturnValueOnce(of({ test: 'data' }));
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(establecimientoServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
  });

  it('should not call actualizarEstadoFormulario if resp is falsy in guardarDatosFormulario', () => {
    establecimientoServiceMock.obtenerSolicitudDatos.mockReturnValueOnce(of(undefined));
    component.guardarDatosFormulario();
    expect(establecimientoServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('should set indice in seleccionaTab', () => {
    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should collect all form values in obtenerValoresFormulario', () => {
    // Mock solicitante
    component.solicitante = { form: { value: { nombre: 'Juan' } } } as any;
    // Mock datosSolicitudComponents
    component.datosSolicitudComponents = {
      length: 1,
      toArray: () => [
        {
          datosSolicitudform: { value: { campo: 'valor1' } },
          manifiestosRepresentanteForm: { value: { campo: 'valor2' } },
          scianForm: { value: { campo: 'valor3' } }
        }
      ]
    } as any;
    // Mock pagoDeDerechosComponents
    component.pagoDeDerechosComponents = {
      length: 1,
      toArray: () => [
        { pagoDerechos: { value: { pago: 123 } } }
      ]
    } as any;
    // Mock tramitesAsociadosComponents
    component.tramitesAsociadosComponents = {
      length: 1,
      toArray: () => [
        { acuseTablaDatos: [{ tramite: 'A' }, { tramite: 'B' }] }
      ]
    } as any;

    const result = component.obtenerValoresFormulario();
    expect(result.solicitante).toEqual({ nombre: 'Juan' });
    expect(result.datosSolicitud?.[0].datosSolicitudform).toEqual({ campo: 'valor1' });
    expect(result.datosSolicitud?.[0].manifiestosRepresentanteForm).toEqual({ campo: 'valor2' });
    expect(result.datosSolicitud?.[0].scianForm).toEqual({ campo: 'valor3' });
    expect(result.pagoDeDerechos?.[0]).toEqual({ pago: 123 });
    expect(result.tramitesAsociados?.length).toBe(2);
    expect(result.tramitesAsociados?.[0]).toEqual({ tramite: 'A' });
    expect(result.tramitesAsociados?.[1]).toEqual({ tramite: 'B' });
  });

  it('should return empty arrays if no children in obtenerValoresFormulario', () => {
    component.solicitante = undefined as any;
    component.datosSolicitudComponents = { length: 0, toArray: () => [] } as any;
    component.pagoDeDerechosComponents = { length: 0, toArray: () => [] } as any;
    component.tramitesAsociadosComponents = { length: 0, toArray: () => [] } as any;
    const result = component.obtenerValoresFormulario();
    expect(result.solicitante).toBeUndefined();
    expect(result.datosSolicitud).toEqual([]);
    expect(result.pagoDeDerechos).toEqual([]);
    expect(result.tramitesAsociados).toEqual([]);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
