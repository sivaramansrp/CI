import { SolicitudDatosComponent } from './SolicitudDatos.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let mockService: Partial<SolicitudPantallasService>;

  beforeEach(() => {
    // Mock service response
    mockService = {
      getData: jest.fn().mockReturnValue(
        of({
          hHistorialinspeccion: ['header1'],
          dHistorialInspecciones: [{ id: 1 }],
          dCarrosDeFerrocarril: [{ id: 2 }],
          hCarroFerrocarril: ['carroHeader'],
          hSolicitud: ['solicitudHeader'],
          dSolicitud: [{ id: 3 }],
          hMerchandise: ['mercanciaHeader'],
          dMercancia: [{ id: 4 }],
          medioDeTransporte: { id: 5, nombre: 'camion' }
        })
      )
    };

    component = new SolicitudDatosComponent(new FormBuilder(), mockService as SolicitudPantallasService);

    // Mock child component methods
    component.datosDelTramiteARealizar = {
      validarFormularios: jest.fn(() => true)
    } as any;

    component.responsableInspeccionEnPunto = {
      validarFormularios: jest.fn(() => true)
    } as any;

    component.medioTransporte = {
      validarFormularios: jest.fn(() => true)
    } as any;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.form).toBeTruthy();
    expect(component.hMercanciaTabla).toEqual([]);
    expect(component.dMercanciaBody).toEqual([]);
    expect(component.hSolicitud).toEqual([]);
    expect(component.dSolicitud).toEqual([]);
    expect(component.hCarroFerrocarril).toEqual([]);
    expect(component.dCarrosDeFerrocarril).toEqual([]);
    expect(component.hHistorialinspeccion).toEqual([]);
    expect(component.dHistorialInspecciones).toEqual([]);
    expect(component.tableData).toEqual({ tableBody: [], tableHeader: [] });
  });

  it('should call validarFormularios and return true if all children return true', () => {
    const result = component.validarFormularios();
    expect(result).toBe(true);
    expect(component.datosDelTramiteARealizar.validarFormularios).toHaveBeenCalled();
    expect(component.responsableInspeccionEnPunto.validarFormularios).toHaveBeenCalled();
    expect(component.medioTransporte.validarFormularios).toHaveBeenCalled();
  });

  it('should return false if any child validation fails', () => {
    component.medioTransporte.validarFormularios = jest.fn(() => false);
    const result = component.validarFormularios();
    expect(result).toBe(false);
  });

  it('should load initial data on ngOnInit', () => {
    component.ngOnInit();

    expect(component.hHistorialinspeccion.length).toBeGreaterThan(0);
    expect(component.dHistorialInspecciones.length).toBeGreaterThan(0);
    expect(component.dCarrosDeFerrocarril.length).toBeGreaterThan(0);
    expect(component.hCarroFerrocarril.length).toBeGreaterThan(0);
    expect(component.hSolicitud.length).toBeGreaterThan(0);
    expect(component.dSolicitud.length).toBeGreaterThan(0);
    expect(component.hMercanciaTabla.length).toBeGreaterThan(0);
    expect(component.dMercanciaBody.length).toBeGreaterThan(0);
    expect(component.mediodetransporte).toBeDefined();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
