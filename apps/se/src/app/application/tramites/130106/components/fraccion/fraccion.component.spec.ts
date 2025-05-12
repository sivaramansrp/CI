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
    observaciones: 'Observations text',
    entidad: 'Entity 1',
    representacion: 'Rep 1',
    bloque: 'Block 1',
    regimen: '',
    clasificacion: '',
    solicitudDescripcion: '',
    disponible: '',
    seleccionado: '',
    solicitud: '',
    producto: '',
    selectRangoDias: []
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
      selectRangoDias:jest.fn(),
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
    expect(component.fraccionForm.value.fraccion).toBe(mockState.fraccion);
    expect(component.fraccionForm.value.cantidad).toBe(mockState.cantidad);
    expect(component.fraccionForm.value.factura).toBe(mockState.factura);
    expect(component.fraccionForm.value.umt).toBe(mockState.umt);
    expect(component.fraccionForm.value.mercanciaCantidad).toBe(mockState.mercanciaCantidad);
  });
  it('should set values in store when setValoresStore() is called', () => {
    const mockForm = { fraccion: '001', cantidad: '10' };
    const setValuesSpy = jest.spyOn(component.tramite130106Store, 'setFraccion');
    
    component.setValoresStore(component.fraccionForm, 'fraccion', 'setFraccion');
    
    expect(setValuesSpy).toHaveBeenCalledWith('001');
  });

  it('should initialize formulario correctly on ngOnInit()', () => {
    // Make sure the form is initialized correctly
    expect(component.fraccionForm).toBeDefined();
    expect(component.fraccionForm.controls['fraccion']).toBeTruthy();
    expect(component.fraccionForm.controls['cantidad']).toBeTruthy();
  });

  it('should handle form invalid when required fields are missing', () => {
    component.fraccionForm.controls['fraccion'].setValue('');
    component.fraccionForm.controls['cantidad'].setValue('');

    expect(component.fraccionForm.valid).toBeFalsy();
  });

  it('should handle form valid when all fields are filled correctly', () => {
    component.fraccionForm.controls['fraccion'].setValue('001');
    component.fraccionForm.controls['cantidad'].setValue('10');
    component.fraccionForm.controls['factura'].setValue('12345');
    component.fraccionForm.controls['umt'].setValue('kg');

    expect(component.fraccionForm.valid).toBeTruthy();
  });

  it('should call the destroyNotifier when ngOnDestroy is called', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });



  
});
