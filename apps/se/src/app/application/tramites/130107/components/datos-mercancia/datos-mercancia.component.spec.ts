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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar datosDelMercancia con DATOS_DE_LA_MERCANCIA', () => {
    expect(component.datosDelMercancia).toBeDefined();
    expect(Array.isArray(component.datosDelMercancia)).toBe(true);
  });

  it('debe llamar a datosFraccion y datosUMT en ngOnInit', () => {
    const fraccionSpy = jest.spyOn(component, 'datosFraccion');
    const umtSpy = jest.spyOn(component, 'datosUMT');
    component.ngOnInit();
    expect(fraccionSpy).toHaveBeenCalled();
    expect(umtSpy).toHaveBeenCalled();
  });

  it('debe establecer solicitudDeRegistroState en la suscripción de ngOnInit', () => {
    const mockState = { test: 'valor' };
    component['importacionesAgropecuariasQuery'].selectSolicitudDeRegistroTpl$ = of(mockState);
    component.ngOnInit();
    expect(component.solicitudDeRegistroState).toEqual(mockState);
  });

  describe('establecerCambioDeValor', () => {
    it('debe actualizar el store y el valor del formulario con un primitivo', () => {
      const event = { campo: 'campo1', valor: 'valor1' };
      component.establecerCambioDeValor(event);
      expect(importacionesAgropecuariasStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo1', 'valor1');
      expect(servicioDeFormularioServiceMock.setFormValue).toHaveBeenCalledWith('datosMercanciaForm', { campo1: 'valor1' });
    });

    it('debe convertir a string los valores objeto', () => {
      const event = { campo: 'campo2', valor: { a: 1 } };
      component.establecerCambioDeValor(event);
      expect(importacionesAgropecuariasStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo2', JSON.stringify({ a: 1 }));
      expect(servicioDeFormularioServiceMock.setFormValue).toHaveBeenCalledWith('datosMercanciaForm', { campo2: { a: 1 } });
    });

    it('no debe hacer nada si el evento es undefined', () => {
      component.establecerCambioDeValor(undefined as any);
      expect(importacionesAgropecuariasStoreMock.setDynamicFieldValue).not.toHaveBeenCalled();
      expect(servicioDeFormularioServiceMock.setFormValue).not.toHaveBeenCalled();
    });
  });

  describe('datosFraccion', () => {
    it('debe actualizar opciones para fraccion_arancelaria si no está definido', () => {
      const mockFraccion = [{ id: 1, descripcion: 'desc1' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ fraccion: mockFraccion }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'fraccion_arancelaria');
      if (field) field.opciones = undefined;
      component.datosFraccion();
      expect(field && field.opciones).toEqual([{ id: 1, descripcion: 'desc1' }]);
    });

    it('no debe actualizar opciones si el campo ya tiene opciones', () => {
      const mockFraccion = [{ id: 1, descripcion: 'desc1' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ fraccion: mockFraccion }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'fraccion_arancelaria');
      if (field) field.opciones = [{ label: 'ya existe', value: '99' }];
      component.datosFraccion();
      expect(field && field.opciones).toEqual([{ label: 'ya existe', value: '99' }]);
    });

    it('no debe actualizar opciones si no se encuentra el campo', () => {
      const index = component.datosDelMercancia.findIndex((d: any) => d.campo === 'fraccion_arancelaria');
      const backup = component.datosDelMercancia[index];
      (component.datosDelMercancia as any).splice(index, 1);
      expect(() => component.datosFraccion()).not.toThrow();
      (component.datosDelMercancia as any).splice(index, 0, backup);
    });
  });

  describe('datosUMT', () => {
    it('debe actualizar opciones para umt si no está definido', () => {
      const mockUMT = [{ id: 2, descripcion: 'desc2' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ UMT: mockUMT }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'umt');
      if (field) field.opciones = undefined;
      component.datosUMT();
      expect(field && field.opciones).toEqual([{ id: 2, descripcion: 'desc2' }]);
    });

    it('no debe actualizar opciones si el campo ya tiene opciones', () => {
      const mockUMT = [{ id: 2, descripcion: 'desc2' }];
      importacionesAgropecuariasServiceMock.datosDeLaSolicitud.mockReturnValueOnce(of({ UMT: mockUMT }));
      const field = component.datosDelMercancia.find((d: any) => d.campo === 'umt');
      if (field) field.opciones = [{ label: 'ya existe', value: '99' }];
      component.datosUMT();
      expect(field && field.opciones).toEqual([{ label: 'ya existe', value: '99' }]);
    });

    it('no debe actualizar opciones si no se encuentra el campo', () => {
      const index = component.datosDelMercancia.findIndex((d: any) => d.campo === 'umt');
      const backup = component.datosDelMercancia[index];
      (component.datosDelMercancia as any).splice(index, 1);
      expect(() => component.datosUMT()).not.toThrow();
      (component.datosDelMercancia as any).splice(index, 0, backup);
    });
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
