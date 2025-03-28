import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DomicilioComponent } from './domicilio-establecimiento.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalService } from '../../services/datos-domicilio-legal.service';
import { of, Subject } from 'rxjs';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let mockStore: jest.Mocked<DatosDomicilioLegalStore>;
  let mockQuery: jest.Mocked<DatosDomicilioLegalQuery>;
  let mockService: jest.Mocked<DatosDomicilioLegalService>;

  beforeEach(async () => {
    mockStore = {
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    } as unknown as jest.Mocked<DatosDomicilioLegalStore>;

    mockQuery = {
      selectSolicitud$: of({
        codigoPostal: '12345',
        estado: 'Estado',
        muncipio: 'Municipio',
        localidad: 'Localidad',
        colonia: 'Colonia',
        calle: 'Calle',
        lada: '123',
        telefono: '1234567890',
        avisoCheckbox: true,
        licenciaSanitaria: 'Licencia',
        regimen: 'Regimen',
        aduanasEntradas: 'Aduanas',
        numeroPermiso: '123456',
      }),
    } as unknown as jest.Mocked<DatosDomicilioLegalQuery>;

    mockService = {
      getObtenerEstadoList: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Estado 1' }] })),
      getObtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Dato 1' }] })),
      getObtenerMercanciasDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Mercancia 1' }] })),
    } as unknown as jest.Mocked<DatosDomicilioLegalService>;

    await TestBed.configureTestingModule({
      declarations: [DomicilioComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
        { provide: DatosDomicilioLegalService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and solicitudState on ngOnInit', () => {
    component.ngOnInit();

    expect(component.solicitudState).toEqual({
      codigoPostal: '12345',
      estado: 'Estado',
      muncipio: 'Municipio',
      localidad: 'Localidad',
      colonia: 'Colonia',
      calle: 'Calle',
      lada: '123',
      telefono: '1234567890',
      avisoCheckbox: true,
      licenciaSanitaria: 'Licencia',
      regimen: 'Regimen',
      aduanasEntradas: 'Aduanas',
      numeroPermiso: '123456',
    });

    expect(component.domicilio.value).toEqual({
      codigoPostal: '12345',
      estado: 'Estado',
      muncipio: 'Municipio',
      localidad: 'Localidad',
      colonia: 'Colonia',
      calle: 'Calle',
      lada: '123',
      telefono: '1234567890',
      avisoCheckbox: true,
      licenciaSanitaria: 'Licencia',
      regimen: 'Regimen',
      aduanasEntradas: 'Aduanas',
      numeroPermiso: '123456',
    });
  });

  it('should call service methods to fetch data on ngOnInit', () => {
    component.ngOnInit();

    expect(mockService.getObtenerEstadoList).toHaveBeenCalled();
    expect(mockService.getObtenerTablaDatos).toHaveBeenCalled();
    expect(mockService.getObtenerMercanciasDatos).toHaveBeenCalled();
  });

  it('should toggle colapsable state when mostrar_colapsable is called', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });

  it('should toggle colapsableDuos state when mostrar_colapsableDuos is called', () => {
    expect(component.colapsableDuos).toBe(false);
    component.mostrar_colapsableDuos();
    expect(component.colapsableDuos).toBe(true);
    component.mostrar_colapsableDuos();
    expect(component.colapsableDuos).toBe(false);
  });

  it('should toggle colapsableTres state when mostrar_colapsableTres is called', () => {
    expect(component.colapsableTres).toBe(false);
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(true);
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(false);
  });

  it('should disable licenciaSanitaria when avisoCheckbox is checked', () => {
    const event = { target: { checked: true } } as unknown as Event;
    component.onAvisoCheckboxChange(event);
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('should enable licenciaSanitaria when avisoCheckbox is unchecked', () => {
    const event = { target: { checked: false } } as unknown as Event;
    component.onAvisoCheckboxChange(event);
    expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
  });

  it('should call the appropriate store method when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore(component.domicilio, 'codigoPostal', 'setRfcDel');
    expect(mockStore.setRfcDel).toHaveBeenCalledWith('12345');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
