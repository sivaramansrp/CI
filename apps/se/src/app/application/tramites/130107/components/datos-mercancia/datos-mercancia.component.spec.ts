import { TestBed } from '@angular/core/testing';
import { DatosDeLaMercanciaComponent } from './datos-mercancia.component';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of, Subject, throwError } from 'rxjs';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let importacionesServiceMock: jest.Mocked<ImportacionesAgropecuariasService>;
  let importacionesStoreMock: jest.Mocked<ImportacionesAgropecuariasStore>;
  let importacionesQueryMock: jest.Mocked<ImportacionesAgropecuariasQuery>;
  let formularioServiceMock: jest.Mocked<ServicioDeFormularioService>;

  
  beforeEach(() => {
    importacionesServiceMock = {
      datosDeLaSolicitud: jest.fn(),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasService>;

    importacionesStoreMock = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasStore>;

    importacionesQueryMock = {
      selectSolicitudDeRegistroTpl$: of({}),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasQuery>;

    formularioServiceMock = {
      setFormValue: jest.fn(),
    } as unknown as jest.Mocked<ServicioDeFormularioService>;

    TestBed.configureTestingModule({
      providers: [
        DatosDeLaMercanciaComponent,
        { provide: ImportacionesAgropecuariasService, useValue: importacionesServiceMock },
        { provide: ImportacionesAgropecuariasStore, useValue: importacionesStoreMock },
        { provide: ImportacionesAgropecuariasQuery, useValue: importacionesQueryMock },
        { provide: ServicioDeFormularioService, useValue: formularioServiceMock },
      ],
    });

    component = TestBed.inject(DatosDeLaMercanciaComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudDeRegistroState on ngOnInit', () => {
    const mockState = { key: 'value' };
    importacionesQueryMock.selectSolicitudDeRegistroTpl$ = of(mockState);

    component.ngOnInit();

    expect(component.solicitudDeRegistroState).toEqual(mockState);
  });

  it('should call datosFraccion and update FRACCION_FIELD options', () => {
    const mockFraccionData = [
      { id: 1, descripcion: 'Fracción 1' },
      { id: 2, descripcion: 'Fracción 2' },
    ];
 
    component.datosFraccion();

    expect(importacionesServiceMock.datosDeLaSolicitud).toHaveBeenCalled();
    const FRACCION_FIELD = component.datosDelMercancia.find((datos) => datos.campo === 'fraccion_arancelaria');
    expect(FRACCION_FIELD?.opciones).toEqual([
      { descripcion: 'Fracción 1', id: 1 },
      { descripcion: 'Fracción 2', id: 2 },
    ]);
  });

  it('should handle errors in datosFraccion', () => {
    importacionesServiceMock.datosDeLaSolicitud.mockReturnValue(throwError(() => new Error('Error fetching data')));

    component.datosFraccion();

    const FRACCION_FIELD = component.datosDelMercancia.find((datos) => datos.campo === 'fraccion_arancelaria');
    expect(FRACCION_FIELD?.opciones).toBeUndefined();
  });

  it('should call datosUMT and update UMT_FIELD options', () => {
    const mockUMTData = [
      { id: 1, descripcion: 'UMT 1' },
      { id: 2, descripcion: 'UMT 2' },
    ];
   
    component.datosUMT();

    expect(importacionesServiceMock.datosDeLaSolicitud).toHaveBeenCalled();
    const UMT_FIELD = component.datosDelMercancia.find((datos) => datos.campo === 'umt');
    expect(UMT_FIELD?.opciones).toEqual([
      { descripcion: 'UMT 1', id: 1 },
      { descripcion: 'UMT 2', id: 2 },
    ]);
  });

  it('should handle errors in datosUMT', () => {
    importacionesServiceMock.datosDeLaSolicitud.mockReturnValue(throwError(() => new Error('Error fetching data')));

    component.datosUMT();

    const UMT_FIELD = component.datosDelMercancia.find((datos) => datos.campo === 'umt');
    expect(UMT_FIELD?.opciones).toBeUndefined();
  });

  it('should call establecerCambioDeValor and update store and form', () => {
    const mockEvent = { campo: 'campo1', valor: 'valor1' };

    component.establecerCambioDeValor(mockEvent);

    expect(importacionesStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo1', 'valor1');
    expect(formularioServiceMock.setFormValue).toHaveBeenCalledWith('datosMercanciaForm', { campo1: 'valor1' });
  });

  it('should handle null or undefined values in establecerCambioDeValor', () => {
    component.establecerCambioDeValor({ campo: '', valor: '' });
    expect(importacionesStoreMock.setDynamicFieldValue).not.toHaveBeenCalled();
    expect(formularioServiceMock.setFormValue).not.toHaveBeenCalled();

    component.establecerCambioDeValor({ campo: '', valor: '' });
    expect(importacionesStoreMock.setDynamicFieldValue).not.toHaveBeenCalled();
    expect(formularioServiceMock.setFormValue).not.toHaveBeenCalled();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should handle multiple calls to ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();
    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalledTimes(2);
    expect(completeSpy).toHaveBeenCalledTimes(2);
  });
});
