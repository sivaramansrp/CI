import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { TercerosRelacionadoComponent } from './tercerosRelacionado.component';
import { ExportacionService } from '../../services/exportacion.service';
import { Tramites260604Store } from '../../../shared/estados/stores/tramites260604.store';
import { Tramites260604Query } from '../../../shared/estados/queries/tramites260604.query';
import { PermisoModel } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

describe('TercerosRelacionadoComponent', () => {
  let component: TercerosRelacionadoComponent;
  let fixture: ComponentFixture<TercerosRelacionadoComponent>;
  let mockExportacionService: jest.Mocked<ExportacionService>;
  let mockTramitesStore: jest.Mocked<Tramites260604Store>;
  let mockTramitesQuery: jest.Mocked<Tramites260604Query>;

  beforeEach(async () => {
    mockExportacionService = {
      getTable: jest.fn(),
      getLocalidaddata: jest.fn(),
    } as unknown as jest.Mocked<ExportacionService>;

    mockTramitesStore = {
      setNombre: jest.fn(),
    } as unknown as jest.Mocked<Tramites260604Store>;

    mockTramitesQuery = {
      selectSolicitud$: of({
        nombre: 'Test Name',
        apellidoPrimer: 'Apellido1',
        apellidoSegundo: 'Apellido2',
        denominacionRazonSocial: 'Denominacion',
        estadoLocalidad: 'Estado',
        codPostal1: '12345',
        coloniaEquiv: 'Colonia',
        calle: 'Calle',
        numExterior: '123',
        numInterior: '456',
        lada: '123',
        telefono: '1234567890',
        correoElectronico: 'test@example.com',
      }),
    } as unknown as jest.Mocked<Tramites260604Query>;

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadoComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ExportacionService, useValue: mockExportacionService },
        { provide: Tramites260604Store, useValue: mockTramitesStore },
        { provide: Tramites260604Query, useValue: mockTramitesQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosRelacionadoComponent);
    component = fixture.componentInstance;

    // Initialize the destroyed$ subject
    component['destroyed$'] = new Subject<void>();

    mockExportacionService.getTable.mockReturnValue(of([]));
    mockExportacionService.getLocalidaddata.mockReturnValue(of([]));

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
    expect(component.facturatorForm).toBeDefined();
  });

  it('should load mercancias on loadMercancias', () => {
    const mockData: PermisoModel[] = [
      { Nombre: 'Test', RFC: 'RFC123', CURP: 'CURP123', Teléfono: 1234567890, CorreoElectrónico: 'test@example.com', calle: 'Calle1', numeroExterior: 1, numeroInterior: 2, pais: 'Pais1', colonia: 'Colonia1', municipio: 'Municipio1', localidad: 'Localidad1', entidadFederativa: 'Entidad1', estadoLocalidad: 'Estado1', codigoPostal: 12345 },
    ];

    mockExportacionService.getTable.mockReturnValue(of(mockData));
    component.loadMercancias();
    expect(component.tercerosProd).toEqual(mockData);
  });

  it('should load localidad data on loadLocalidad', () => {
    const mockData = [{ id: 1, nombre: 'Localidad1' }];
    mockExportacionService.getLocalidaddata.mockReturnValue(of(mockData));
    component.loadLocalidad();
    expect(component.localidadList).toEqual(mockData);
  });

  it('should open modal and call getFacturator', () => {
    const getFacturatorSpy = jest.spyOn(component, 'getFacturator');
    component.abrirModalfacurator();
    expect(component.modal).toBe('show');
    expect(getFacturatorSpy).toHaveBeenCalled();
  });

  it('should initialize facturatorForm with default values', () => {
    component.getFacturator();
    expect(component.facturatorForm.get('nombre')?.value).toBe('Test Name');
    expect(component.facturatorForm.get('apellidoPrimer')?.value).toBe('Apellido1');
    expect(component.facturatorForm.get('correoElectronico')?.value).toBe('test@example.com');
  });

  it('should update validators based on tipoPersona value', () => {
    component.getFacturator();
    const tipoPersonaControl = component.facturatorForm.get('tipoPersona');
    tipoPersonaControl?.setValue('fisica');
    expect(component.facturatorForm.get('nombre')?.validator).toBeDefined();
    tipoPersonaControl?.setValue('moral');
    expect(component.facturatorForm.get('nombre')?.validator).toBeNull();
  });

  it('should validate form fields using isValid', () => {
    component.getFacturator();
    const isValid = TercerosRelacionadoComponent.isValid(component.facturatorForm, 'nombre');
    expect(isValid).toBe(false);
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroy$Spy = jest.spyOn(component['destroyed$'], 'next');
    const destroyCompleteSpy = jest.spyOn(component['destroyed$'], 'complete');
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroy$Spy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
