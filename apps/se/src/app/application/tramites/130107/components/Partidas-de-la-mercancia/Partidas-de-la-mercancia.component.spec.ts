import { TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of, Subject } from 'rxjs';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let importacionesStoreMock: jest.Mocked<ImportacionesAgropecuariasStore>;
  let importacionesQueryMock: jest.Mocked<ImportacionesAgropecuariasQuery>;
  let formularioServiceMock: jest.Mocked<ServicioDeFormularioService>;

  beforeEach(() => {
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
        PartidasDeLaMercanciaComponent,
        { provide: ImportacionesAgropecuariasStore, useValue: importacionesStoreMock },
        { provide: ImportacionesAgropecuariasQuery, useValue: importacionesQueryMock },
        { provide: ServicioDeFormularioService, useValue: formularioServiceMock },
      ],
    });

    component = TestBed.inject(PartidasDeLaMercanciaComponent);
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

  it('should call establecerCambioDeValor and update store and form', () => {
    const mockEvent = { campo: 'campo1', valor: 'valor1' };

    component.establecerCambioDeValor(mockEvent);

    expect(importacionesStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo1', 'valor1');
    expect(formularioServiceMock.setFormValue).toHaveBeenCalledWith('partidasForm', { campo1: 'valor1' });
  });

  it('should add a new partida on agregarPartida', () => {
    const mockFormGroup = {
      valid: true,
      get: jest.fn().mockImplementation((field) => ({
        value: field === 'cantidad' ? 10 : field === 'descripcion' ? 'Test' : 100,
      })),
      setValue: jest.fn(),
      reset: jest.fn(),
    };
    Object.defineProperty(component, 'ninoFormGroup', { value: mockFormGroup, writable: true });

    component.agregarPartida();

    expect(component.datospartidas.length).toBe(1);
    expect(component.datospartidas[0]).toEqual({
      cantidad: 10,
      unidad_de_medida: 'Kilogramo',
      fraccion_arancelaria_tigie: '9099',
      descripcion: 'Test',
      precio_unitario: 1.0,
      total_usd: 100,
    });
    expect(mockFormGroup.reset).toHaveBeenCalled();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
