import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaMercanciaComponent } from './datos-mercancia.component';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;
  let importacionesAgropecuariasServiceMock: any;
  let importacionesAgropecuariasStoreMock: any;
  let importacionesAgropecuariasQueryMock: any;
  let servicioDeFormularioServiceMock: any;

  beforeEach(async () => {
    importacionesAgropecuariasServiceMock = {
      datosDeLaSolicitud: jest.fn().mockReturnValue(of({ fraccion: [], UMT: [] }))
    };
    importacionesAgropecuariasStoreMock = {
      setDynamicFieldValue: jest.fn()
    };
    importacionesAgropecuariasQueryMock = {
      selectSolicitudDeRegistroTpl$: of({})
    };
    servicioDeFormularioServiceMock = {
      setFormValue: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaMercanciaComponent],
      providers: [
        { provide: ImportacionesAgropecuariasService, useValue: importacionesAgropecuariasServiceMock },
        { provide: ImportacionesAgropecuariasStore, useValue: importacionesAgropecuariasStoreMock },
        { provide: ImportacionesAgropecuariasQuery, useValue: importacionesAgropecuariasQueryMock },
        { provide: ServicioDeFormularioService, useValue: servicioDeFormularioServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    component.consultaState = { readonly: false } as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosDelMercancia with DATOS_DE_LA_MERCANCIA', () => {
    expect(component.datosDelMercancia).toBeDefined();
    expect(Array.isArray(component.datosDelMercancia)).toBe(true);
  });

  it('should call datosFraccion and datosUMT on ngOnInit', () => {
    const fraccionSpy = jest.spyOn(component, 'datosFraccion');
    const umtSpy = jest.spyOn(component, 'datosUMT');
    component.ngOnInit();
    expect(fraccionSpy).toHaveBeenCalled();
    expect(umtSpy).toHaveBeenCalled();
  });

  it('should set solicitudDeRegistroState on ngOnInit subscription', () => {
    const mockState = { test: 'value' };
    component['importacionesAgropecuariasQuery'].selectSolicitudDeRegistroTpl$ = of(mockState);
    component.ngOnInit();
    expect(component.solicitudDeRegistroState).toEqual(mockState);
  });

  describe('establecerCambioDeValor', () => {
    it('should update store and form value with primitive', () => {
      const event = { campo: 'campo1', valor: 'valor1' };
      component.establecerCambioDeValor(event);
      expect(importacionesAgropecuariasStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo1', 'valor1');
      expect(servicioDeFormularioServiceMock.setFormValue).toHaveBeenCalledWith('datosMercanciaForm', { campo1: 'valor1' });
    });

    it('should stringify object values', () => {
      const event = { campo: 'campo2', valor: { a: 1 } };
      component.establecerCambioDeValor(event);
      expect(importacionesAgropecuariasStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo2', JSON.stringify({ a: 1 }));
      expect(servicioDeFormularioServiceMock.setFormValue).toHaveBeenCalledWith('datosMercanciaForm', { campo2: { a: 1 } });
    });

    it('should do nothing if event is undefined', () => {
      component.establecerCambioDeValor(undefined as any);
      expect(importacionesAgropecuariasStoreMock.setDynamicFieldValue).not.toHaveBeenCalled();
      expect(servicioDeFormularioServiceMock.setFormValue).not.toHaveBeenCalled();
    });
  });

  describe('datosFraccion', () => {
    it('should update opciones for fraccion_arancelaria if not set', () => {
      const mockFraccion = [{ id: 1, descripcion: 'desc1' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ fraccion: mockFraccion }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'fraccion_arancelaria');
      if (field) field.opciones = undefined;
      component.datosFraccion();
      expect(field && field.opciones).toEqual([{ id: 1, descripcion: 'desc1' }]);
    });

    it('should not update opciones if field already has opciones', () => {
      const mockFraccion = [{ id: 1, descripcion: 'desc1' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ fraccion: mockFraccion }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'fraccion_arancelaria');
      if (field) field.opciones = [{ label: 'ya existe', value: '99' }];
      component.datosFraccion();
      expect(field && field.opciones).toEqual([{ label: 'ya existe', value: '99' }]);
    });

    it('should not update opciones if field is not found', () => {
      // Remove the field
      const index = component.datosDelMercancia.findIndex((d: any) => d.campo === 'fraccion_arancelaria');
      const backup = component.datosDelMercancia[index];
      (component.datosDelMercancia as any).splice(index, 1);
      expect(() => component.datosFraccion()).not.toThrow();
      // Restore for other tests
      (component.datosDelMercancia as any).splice(index, 0, backup);
    });
  });

  describe('datosUMT', () => {
    it('should update opciones for umt if not set', () => {
      const mockUMT = [{ id: 2, descripcion: 'desc2' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ UMT: mockUMT }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'umt');
      if (field) field.opciones = undefined;
      component.datosUMT();
      expect(field && field.opciones).toEqual([{ id: 2, descripcion: 'desc2' }]);
    });

    it('should not update opciones if field already has opciones', () => {
      const mockUMT = [{ id: 2, descripcion: 'desc2' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ UMT: mockUMT }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'umt');
      if (field) field.opciones = [{ label: 'ya existe', value: '99' }];
      component.datosUMT();
      expect(field && field.opciones).toEqual([{ label: 'ya existe', value: '99' }]);
    });

    it('should not update opciones if field is not found', () => {
      // Remove the field
      const index = component.datosDelMercancia.findIndex((d: any) => d.campo === 'umt');
      const backup = component.datosDelMercancia[index];
      (component.datosDelMercancia as any).splice(index, 1);
      expect(() => component.datosUMT()).not.toThrow();
      // Restore for other tests
      (component.datosDelMercancia as any).splice(index, 0, backup);
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
