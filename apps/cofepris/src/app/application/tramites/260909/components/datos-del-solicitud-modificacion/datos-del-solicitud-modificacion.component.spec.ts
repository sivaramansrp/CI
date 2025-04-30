import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { DatosDelSolicitudModificacionComponent } from './datos-del-solicitud-modificacion.component';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { EstablecimientoService } from '../../service/establecimiento.service';
import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../estados/datos-del-solicitute-seccion.store';
import { DatosDelSolicituteSeccionQuery } from '../../estados/datos-del-solicitute-seccion.query';

describe('DatosDelSolicitudModificacionComponent', () => {
  let component: DatosDelSolicitudModificacionComponent;
  let fixture: ComponentFixture<DatosDelSolicitudModificacionComponent>;
  let mockEstablecimientoService: jest.Mocked<EstablecimientoService>;
  let mockStateStore: jest.Mocked<DatosDelSolicituteSeccionStateStore>;
  let mockQuery: jest.Mocked<DatosDelSolicituteSeccionQuery>;

  beforeEach(async () => {
    mockEstablecimientoService = {
      getSciandata: jest.fn(),
      getEstadodata: jest.fn(),
      getJustificationData: jest.fn(),
    } as unknown as jest.Mocked<EstablecimientoService>;

    mockStateStore = {
      update: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionStateStore>;

    mockQuery = {
      select: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionQuery>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule,DatosDelSolicitudModificacionComponent],
      declarations: [],
      providers: [
        { provide: EstablecimientoService, useValue: mockEstablecimientoService },
        { provide: DatosDelSolicituteSeccionStateStore, useValue: mockStateStore },
        { provide: DatosDelSolicituteSeccionQuery, useValue: mockQuery },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelSolicitudModificacionComponent);
    component = fixture.componentInstance;
  
    // Mock the destroy$ Subject to avoid errors during ngOnDestroy
    component['destroy$'] = new Subject<void>();
  
    // Provide default values for mercanciasTablaDatos and other dependencies
    component.mercanciasTablaDatos = [];
  
    // Provide a proper mock state
    const mockState: Partial<DatosDelSolicituteSeccionState> = {
      ideGenerica1: 'Test Value',
    };
  
    // Mock observables
    jest.spyOn(mockQuery, 'select').mockReturnValue(of(mockState as DatosDelSolicituteSeccionState));
    mockEstablecimientoService.getSciandata.mockReturnValue(of([]));
    mockEstablecimientoService.getEstadodata.mockReturnValue(of([]));
  
    // Mock any additional observables used in ngOnInit or ngAfterViewInit
    jest.spyOn(mockEstablecimientoService, 'getJustificationData').mockReturnValue(of([]));
  
    fixture.detectChanges();
  });
  afterEach(() => {
    // Ensure the destroy$ Subject is completed to avoid memory leaks
    component['destroy$'].next();
    component['destroy$'].complete();

    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize forms on ngOnInit', () => {
    const mockState: DatosDelSolicituteSeccionState = {
  
      establecimientoCorreoElectronico: 'test@example.com',
      establecimientoDomicilioCodigoPostal: '12345',
      ideGenerica1: 'Test Value',
      observaciones: 'Test Observations',
      establecimientoRFCResponsableSanitario: 'RFC456',
      establecimientoRazonSocial: 'Test Establishment',
      establecimientoEstados: 'Test State',
      descripcionMunicipio: 'Test Municipality',
      localidad: 'Test Locality',
      colonias: 'Test Colony',
      calle: 'Test Street',
      lada: '123',
      telefono: '4567890',
      scian: 'Test SCIAN',
      descripcionScian: 'Test SCIAN Description', // Added this property
      establishomentoColonias: 'Test Colony',
      noLicenciaSanitaria: '12345',
      avisoCheckbox: 'true',
      licenciaSanitaria: 'Test License',
      regimen: 'Test Regimen',
      aduanasEntradas: 'Test Customs',
    };
    jest.spyOn(mockQuery, 'select').mockReturnValue(of(mockState));
    component.ngOnInit();

    expect(component.domicilioEstablecimiento).toBeDefined();
    expect(component.scianForm).toBeDefined();
    expect(component.solicitudEstablecimientoForm).toBeDefined();
    expect(component.domicilioEstablecimiento.get('ideGenerica1')?.value).toBe('Test Value');
  });

  it('should load SCIAN data', () => {
    const mockScianData: Catalogo[] = [{ id: 1, descripcion: 'SCIAN 1' }];
    mockEstablecimientoService.getSciandata.mockReturnValue(of(mockScianData));

    component.loadScian();

    expect(component.scianJson).toEqual(mockScianData);
  });

  it('should load estado data', () => {
    const mockEstadoData: Catalogo[] = [{ id: 1, descripcion: 'Estado 1' }];
    mockEstablecimientoService.getEstadodata.mockReturnValue(of(mockEstadoData));

    component.loadEstadoData();

    expect(component.estado).toEqual(mockEstadoData);
  });

  it('should toggle colapsable state', () => {
    expect(component.colapsable).toBe(false);

    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);

    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });
});