import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DomicilloComponent } from './domicillo.component';

describe('DomicilloComponent', () => {
  let component: DomicilloComponent;
  let fixture: ComponentFixture<DomicilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilloComponent, HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the domicilio form with default values', () => {
    expect(component.domicilio).toBeDefined();
    expect(component.domicilio.get('codigoPostal')?.value).toBe(component.solicitudState?.codigoPostal);
    expect(component.domicilio.get('estado')?.value).toBe(component.solicitudState?.estado);
    expect(component.domicilio.get('telefono')?.value).toBe(component.solicitudState?.telefono);
  });

  it('should toggle colapsable state', () => {
    const initialState = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initialState);
  });

  it('should disable licenciaSanitaria control when checkbox is checked', () => {
    const checkboxEvent = { target: { checked: true } } as unknown as Event;
    component.onAvisoCheckboxChange(checkboxEvent, component.domicilio, 'avisoCheckbox', 'mockMethod' as any);
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('should enable licenciaSanitaria control when checkbox is unchecked', () => {
    const checkboxEvent = { target: { checked: false } } as unknown as Event;
    component.onAvisoCheckboxChange(checkboxEvent, component.domicilio, 'avisoCheckbox', 'mockMethod' as any);
    expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
  });

  it('should set values in the store when setValoresStore is called', () => {
    const mockStoreMethod = jest.fn();
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'testValue' }),
    } as unknown as typeof component.domicilio;

    component['tramite260906Store'] = { mockMethod: mockStoreMethod } as any;
    component.setValoresStore(mockForm, 'mockField', 'mockMethod' as any);

    expect(mockForm.get).toHaveBeenCalledWith('mockField');
    expect(mockStoreMethod).toHaveBeenCalledWith('testValue');
  });

  it('should destroy subscriptions on component destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize formAgente with default values', () => {
    expect(component.formAgente).toBeDefined();
    expect(component.formAgente.get('claveScianModal')?.value).toBe(component.solicitudState?.claveScianModal);
    expect(component.formAgente.get('claveDescripcionModal')?.value).toBe(component.solicitudState?.claveDescripcionModal);
  });

  it('should initialize formMercancias with default values', () => {
    expect(component.formMercancias).toBeDefined();
    expect(component.formMercancias.get('clasificacion')?.value).toBe(component.solicitudState?.clasificacion);
  });

  it('should call obtenerEstadoList on initialization', () => {
    const obtenerEstadoListSpy = jest.spyOn(component, 'obtenerEstadoList');
    component.ngOnInit();
    expect(obtenerEstadoListSpy).toHaveBeenCalled();
  });

  it('should call obtenerTablaDatos on initialization', () => {
    const obtenerTablaDatosSpy = jest.spyOn(component, 'obtenerTablaDatos');
    component.ngOnInit();
    expect(obtenerTablaDatosSpy).toHaveBeenCalled();
  });

  it('should call obtenerMercanciasDatos on initialization', () => {
    const obtenerMercanciasDatosSpy = jest.spyOn(component, 'obtenerMercanciasDatos');
    component.ngOnInit();
    expect(obtenerMercanciasDatosSpy).toHaveBeenCalled();
  });

  it('should toggle colapsableDuos state', () => {
    const fixture = TestBed.createComponent(DomicilloComponent);
    const component = fixture.componentInstance;
    const initialState = component.colapsableDos;
    component.mostrar_colapsableDos();
    expect(component.colapsableDos).toBe(!initialState);
  });

  it('should toggle colapsableTres state', () => {
    const initialState = component.colapsableTres;
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(!initialState);
  });
  it('should fetch and set nicoTablaDatos when obtenerTablaDatos is called', () => {
    const mockResponse = {
      code: 200,
      data: [{ id: 1, name: 'Test Data' }],
      message: 'Success',
    };
    const httpSpy = jest.spyOn(component['httpServicios'], 'get').mockReturnValue({
      subscribe: (callback: (data: any) => void) => callback(mockResponse),
    } as any);

    component.obtenerTablaDatos();

    expect(httpSpy).toHaveBeenCalledWith('../../../../../assets/json/260906/tablaDatos.json');
    expect(component.nicoTablaDatos).toEqual(mockResponse.data);
  });

  it('should handle empty response when obtenerTablaDatos is called', () => {
    const mockResponse = { code: 200, data: null, message: 'No Data' };
    jest.spyOn(component['httpServicios'], 'get').mockReturnValue({
      subscribe: (callback: (data: any) => void) => callback(mockResponse),
    } as any);

    component.obtenerTablaDatos();

    expect(component.nicoTablaDatos).toEqual([]);
  });

  it('should handle error when obtenerTablaDatos is called', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(component['httpServicios'], 'get').mockReturnValue({
      subscribe: (_: any, errorCallback: (error: any) => void) => errorCallback('Error occurred'),
    } as any);

    component.obtenerTablaDatos();

    expect(consoleSpy).toHaveBeenCalledWith('Error occurred');
    expect(component.nicoTablaDatos).toEqual([]);
  });
});

it('should call eliminarMercancias and show selection alert', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
  expect(alertSpy).toHaveBeenCalledWith('Selecciona un registro.');
});

it('should update fechaCaducidad in formMercancias when cambioFechaFinal is called', () => {
  const mockDate = '2023-12-31';
  const fixture = TestBed.createComponent(DomicilloComponent);
  const component = fixture.componentInstance;
  component.cambioFechaFinal(mockDate);
  expect(component.formMercancias.get('fechaCaducidad')?.value).toBe(mockDate);
  expect(component.formMercancias.get('fechaCaducidad')?.untouched).toBe(true);
});

it('should fetch and set formaFarmaceutica when obtenerFormaFarmaceuticaList is called', () => {
  const mockResponse = { data: [{ id: 1, name: 'Test Forma' }] };
  const fixture = TestBed.createComponent(DomicilloComponent);
  const component = fixture.componentInstance;

  jest.spyOn(component['service'], 'obtenerFormaFarmaceuticaList').mockReturnValue({
    pipe: jest.fn().mockReturnValue({
      subscribe: (callback: (data: any) => void) => callback(mockResponse),
    }),
  } as any);

  component.obtenerFormaFarmaceuticaList();

  expect(component.formaFarmaceutica).toEqual(mockResponse.data);
});

it('should fetch and set estado when obtenerEstadoList is called', () => {
  const mockResponse = { data: [{ id: 1, name: 'Test Estado' }] };
  const fixture = TestBed.createComponent(DomicilloComponent);
  const component = fixture.componentInstance;
  jest.spyOn(component['service'], 'obtenerEstadoList').mockReturnValue({
    pipe: jest.fn().mockReturnValue({
      subscribe: (callback: (data: any) => void) => callback(mockResponse),
    }),
  } as any);

  component.obtenerEstadoList();

  expect(component.estado).toEqual(mockResponse.data);
});

it('should fetch and set mercanciasTablaDatos when obtenerMercanciasDatos is called', () => {
  const mockResponse = { datos: [{ id: 1, name: 'Test Mercancia' }] };
  const fixture = TestBed.createComponent(DomicilloComponent);
  const component = fixture.componentInstance;
  jest.spyOn(component['service'], 'obtenerMercanciasDatos').mockReturnValue({
    pipe: jest.fn().mockReturnValue({
      subscribe: (callback: (data: any) => void) => callback(mockResponse),
    }),
  } as any);

  component.obtenerMercanciasDatos();

  expect(component.mercanciasTablaDatos).toEqual(mockResponse.datos);
});

it('should toggle colapsable state when mostrar_colapsable is called', () => {
  const fixture = TestBed.createComponent(DomicilloComponent);
  const component = fixture.componentInstance;
  const initialState = component.colapsable;
  component.mostrar_colapsable();
  expect(component.colapsable).toBe(!initialState);
});
