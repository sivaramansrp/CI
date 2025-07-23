import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { BtnContinuarComponent, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let mockRegistroService: any;
  let mockConsultaQuery: any;

  beforeEach(() => {
   mockRegistroService = {
    getRegistroTomaMuestrasMercanciasData: jest.fn(),
    actualizarEstadoFormulario: jest.fn(),
    solicitudService: {
      obtenerDatos: jest.fn(),
      actualizarEstado: jest.fn()
    }
  };
    mockConsultaQuery = {
      selectConsultaioState$: of({ update: true }),
    };
    component = new PasoUnoComponent(
      mockRegistroService,
      mockConsultaQuery
    );
    component.consultaQuery = mockConsultaQuery;
    // If PasoUnoComponent expects solicitudService as a separate dependency, mock and inject accordingly.
  });

  it('debe inicializar indice en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe actualizar indice cuando seleccionaTab es llamado', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe asignar consultaState y llamar guardarDatosFormulario si update es true en ngOnInit', () => {
  const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario').mockImplementation(() => {});
  component.consultaQuery = {
    selectConsultaioState$: of({ update: true }),
  } as any;
  component.ngOnInit();
  expect(component.consultaState).toEqual({ update: true });
  expect(guardarSpy).toHaveBeenCalled();
});

  it('debe asignar consultaState y establecer esDatosRespuesta en true si update es false en ngOnInit', () => {
    component.consultaQuery = {
      selectConsultaioState$: of({ update: false }),
    } as any;
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: false });
    expect(component.esDatosRespuesta).toBe(true);
  });

it('guardarDatosFormulario debe establecer esDatosRespuesta en true y llamar actualizarEstado si resp existe', (done) => {
  const respMock = { data: 'mock' };
  
  // Mock the solicitudService methods
  mockRegistroService.solicitudService.obtenerDatos.mockReturnValue(of(respMock));
  mockRegistroService.solicitudService.actualizarEstado = jest.fn();
  
  // Ensure solicitudService is properly available on the component
  component.solicitudService = mockRegistroService.solicitudService;
  
  expect(component.esDatosRespuesta).toBe(false);
  
  component.guardarDatosFormulario();
  
  // Use setTimeout to allow the observable to complete
  setTimeout(() => {
    expect(mockRegistroService.solicitudService.actualizarEstado).toHaveBeenCalledWith(respMock);
    expect(component.esDatosRespuesta).toBe(true);
    done();
  }, 0);
});
  it('guardarDatosFormulario debe establecer esDatosRespuesta en false si resp no existe', () => {
    mockRegistroService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    expect(component.esDatosRespuesta).toBe(false);
    expect(mockRegistroService.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });
});
