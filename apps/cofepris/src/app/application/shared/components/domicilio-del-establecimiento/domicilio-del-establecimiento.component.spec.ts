import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';
import { DatosService } from '../../../shared/services/datos.service';
import { DomicilioStore } from '../../estados/stores/domicilio.store';
import { DomicilioQuery } from '../../../shared/estados/queries/domicilio.query';
import { PreOperativo, ScianData } from '../../models/datos-modificacion.model';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DomicilioDelEstablecimientoComponent', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let mockDatosService: jest.Mocked<DatosService>;
  let mockTramiteStore: jest.Mocked<DomicilioStore>;
  let mockTramiteQuery: jest.Mocked<DomicilioQuery>;

  beforeEach(async () => {
    mockDatosService = {
      obtenerEstadoData: jest.fn(),
      obternerDatosData: jest.fn(),
      obtenerDatosProducto: jest.fn(),
      obtenerClaveScian: jest.fn(),
      obtenerDescripcionScian: jest.fn(),
      obtenerPreOperativo: jest.fn(),
      obtenerClasificationProductos: jest.fn(),
    } as unknown as jest.Mocked<DatosService>;

    mockTramiteStore = {
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
    } as unknown as jest.Mocked<DomicilioStore>;

    mockTramiteQuery = {
      selectSolicitud$: of({
        codigoPostal: '12345',
        estado: 'Estado1',
        municipio: 'Municipio1',
        localidad: 'Localidad1',
        colonia: 'Colonia1',
        calle: 'Calle1',
        lada: '123',
        telefono: '1234567890',
        scian: 'SCIAN1',
        aviso: 'Aviso1',
        noLicenciaSanitaria: 'Licencia1',
        regimenDestinado: 'Regimen1',
        aduana: 'Aduana1',
        datosProducto: [],
        autorizacionIVAIEPS: 'Autorizacion1',
      }),
    } as unknown as jest.Mocked<DomicilioQuery>;

    await TestBed.configureTestingModule({
      imports: [
        DomicilioDelEstablecimientoComponent, 
        ReactiveFormsModule, 
      ],
      providers: [
        { provide: DatosService, useValue: mockDatosService },
        { provide: DomicilioStore, useValue: mockTramiteStore },
        { provide: DomicilioQuery, useValue: mockTramiteQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioDelEstablecimientoComponent);
    component = fixture.componentInstance;

    mockDatosService.obtenerEstadoData.mockReturnValue(of([]));
    mockDatosService.obternerDatosData.mockReturnValue(of([]));
    mockDatosService.obtenerDatosProducto.mockReturnValue(of([]));
    mockDatosService.obtenerClaveScian.mockReturnValue(of([]));
    mockDatosService.obtenerDescripcionScian.mockReturnValue(of([]));
    mockDatosService.obtenerPreOperativo.mockReturnValue(of([]));
    mockDatosService.obtenerClasificationProductos.mockReturnValue(of([]));

    fixture.detectChanges();
  });

  afterEach(() => {
    if (component && component.ngOnDestroy) {
      component.ngOnDestroy();
    }
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.domicilioForm).toBeDefined();
    expect(component.claveScianForm).toBeDefined();
    expect(component.DatosMercanciaForm).toBeDefined();
  });

  it('should toggle colapsable state', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should toggle noLicenciaSanitaria field', () => {
    const event = { target: { checked: true } } as any;
    component.toggleNoLicenciaSanitaria(event);
    expect(component.domicilioForm.get('noLicenciaSanitaria')?.disabled).toBe(true);

    event.target.checked = false;
    component.toggleNoLicenciaSanitaria(event);
    expect(component.domicilioForm.get('noLicenciaSanitaria')?.disabled).toBe(false);
  });

  it('should call cargarEstadoData and set estadoData', () => {
    const mockData = [{ id: 1, descripcion: 'Estado1' }];
    mockDatosService.obtenerEstadoData.mockReturnValue(of(mockData));
    component.cargarEstadoData();
    expect(component.estadoData).toEqual(mockData);
  });

  it('should call obtenerDatosDescripcion and set descripcionScian', () => {
    const mockData: Catalogo[] = [
      { id: 1, descripcion: 'Descripcion1' },
      { id: 2, descripcion: 'Descripcion2' },
    ];
  
  
    mockDatosService.obtenerDescripcionScian.mockReturnValue(of(mockData));
  
    
    component.obtenerDatosDescripcion();
  
    expect(component.descripcionScian).toEqual(mockData);
  });

  it('should call cargarDatosTabla and set datosData', () => {
   
    const mockData: ScianData[] = [
      { clave: '1', descripcion: 'Dato1' },
      { clave: '2', descripcion: 'Dato2' },
    ];
  
    mockDatosService.obternerDatosData.mockReturnValue(of(mockData));
  
    component.cargarDatosTabla();
  
    expect(component.datosData).toEqual(mockData);
  });

  it('should call obtenerDatosClave and set claveScian', () => {
    const mockData: Catalogo[] = [
      { id: 1, descripcion: 'Clave1' },
      { id: 2, descripcion: 'Clave2' },
    ];
  
    
    mockDatosService.obtenerClaveScian.mockReturnValue(of(mockData));
  

    component.obtenerDatosClave();
  
   
    expect(component.claveScian).toEqual(mockData);
  });

  it('should call obtenerDatosPreOperativo and set radioOptions', () => {
    
    const mockData: PreOperativo[] = [
      { label: 'PreOperativo1', value: '1' },
      { label: 'PreOperativo2', value: '2' },
    ];
  
    
    mockDatosService.obtenerPreOperativo.mockReturnValue(of(mockData));
  
    component.obtenerDatosPreOperativo();
  
 
    expect(component.radioOptions).toEqual(mockData);
  });

  it('should call obtenerclassificacionProductos and set clasificacionProducto', () => {
    const mockData = [{ id: 1, descripcion: 'Clasificacion1' }];
    mockDatosService.obtenerClasificationProductos.mockReturnValue(of(mockData));
    component.obtenerclassificacionProductos();
    expect(component.clasificacionProducto).toEqual(mockData);
  });

  it('should show modal when mostrarModeloClave is called', () => {
    component.mostrarModeloClave();
    expect(component.modal).toBe('show');
  });

  it('should show modal when datosDelProducto is called', () => {
    component.datosDelProducto();
    expect(component.modal).toBe('show');
  });
});