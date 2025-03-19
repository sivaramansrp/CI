import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FraccionComponent } from './fraccion.component'; // Replace with the actual path of your component
import { Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';

describe('FraccionComponent', () => {
  let component: FraccionComponent;
  let fixture: ComponentFixture<FraccionComponent>;
  let tramite130106StoreMock: jest.Mocked<Tramite130106Store>;
  let tramite130106QueryMock: jest.Mocked<Tramite130106Query>;

  // Define the mock data directly here
  const mockState: Solicitud130106State = {
    fraccion: '001',
    cantidad: '10',
    factura: '12345',
    umt: 'kg',
    mercanciaCantidad: '10',
    mercanciaFactura: '12345',
    descripcion: 'Sample description',
    especifico: 'Specific info',
    justificacion: 'Justification text',
    Observaciones: 'Observations text',
    entidad: 'Entity 1',
    representacion: 'Rep 1',
    bloque: 'Block 1',
    régimen: '',
    clasificación: '',
    solitudDescripcion: ''
  };

  beforeEach(async () => {
    // Cast to unknown first, then cast to the correct type
    tramite130106StoreMock = {
      setFraccion: jest.fn(),
      setCantidad: jest.fn(),
      setFactura: jest.fn(),
      setUmt: jest.fn(),
      setMercanciaCantidad: jest.fn(),
      setMercanciaFactura: jest.fn(),
      setDescripcion: jest.fn(),
      setEspecifico: jest.fn(),
      setJustificacion: jest.fn(),
      setObservaciones: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setBloque: jest.fn(),
      destroy: jest.fn(),
      setLoading: jest.fn(),
      setHasCache: jest.fn(),
      getValue: jest.fn(),
      setError: jest.fn(),
    } as unknown as jest.Mocked<Tramite130106Store>;

    // Full mock for Tramite130106Query
    tramite130106QueryMock = {
      selectSolicitud$: of(mockState), // Mock the observable with mock data
      select: jest.fn(),
      selectLoading: jest.fn(),
      selectError: jest.fn(),
      __store__: { getValue: jest.fn(), setError: jest.fn() } as any,  // Provide the store object
      selectHasCache: jest.fn(),
      getHasCache: jest.fn(),
      config: {} as any, // Mock config if needed
    } as unknown as jest.Mocked<Tramite130106Query>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,FraccionComponent
        // Other necessary imports
      ],
      declarations: [],
      providers: [
        { provide: Tramite130106Store, useValue: tramite130106StoreMock },
        { provide: Tramite130106Query, useValue: tramite130106QueryMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add test cases for your component logic
  it('should initialize the form with mock state data', () => {
    expect(component.FraccionForm.value.fraccion).toBe(mockState.fraccion);
    expect(component.FraccionForm.value.cantidad).toBe(mockState.cantidad);
    expect(component.FraccionForm.value.factura).toBe(mockState.factura);
    expect(component.FraccionForm.value.umt).toBe(mockState.umt);
    expect(component.FraccionForm.value.mercanciaCantidad).toBe(mockState.mercanciaCantidad);
  });
  it('should set values in store when setValoresStore() is called', () => {
    const mockForm = { fraccion: '001', cantidad: '10' };
    const setValuesSpy = jest.spyOn(component.tramite130106Store, 'setFraccion');
    
    component.setValoresStore(component.FraccionForm, 'fraccion', 'setFraccion');
    
    expect(setValuesSpy).toHaveBeenCalledWith('001');
  });

  it('should initialize formulario correctly on ngOnInit()', () => {
    // Make sure the form is initialized correctly
    expect(component.FraccionForm).toBeDefined();
    expect(component.FraccionForm.controls['fraccion']).toBeTruthy();
    expect(component.FraccionForm.controls['cantidad']).toBeTruthy();
  });

  it('should handle form invalid when required fields are missing', () => {
    component.FraccionForm.controls['fraccion'].setValue('');
    component.FraccionForm.controls['cantidad'].setValue('');

    expect(component.FraccionForm.valid).toBeFalsy();
  });

  it('should handle form valid when all fields are filled correctly', () => {
    component.FraccionForm.controls['fraccion'].setValue('001');
    component.FraccionForm.controls['cantidad'].setValue('10');
    component.FraccionForm.controls['factura'].setValue('12345');
    component.FraccionForm.controls['umt'].setValue('kg');

    expect(component.FraccionForm.valid).toBeTruthy();
  });

  it('should call the destroyNotifier when ngOnDestroy is called', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });



  
});
