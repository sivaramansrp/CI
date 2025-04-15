import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermisoDeHidrocarburosService } from '../../services/permiso-de-hidrocarburos.service';
import { Tramite130121Store } from '../../estados/tramites/tramites130121.store';
import { Tramite130121Query } from '../../estados/queries/tramite130121.query';
import { of } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let permisoService: PermisoDeHidrocarburosService;
  let tramiteStore: Tramite130121Store;
  let tramiteQuery: Tramite130121Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        PermisoDeHidrocarburosService,
        Tramite130121Store,
        Tramite130121Query
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    permisoService = TestBed.inject(PermisoDeHidrocarburosService);
    tramiteStore = TestBed.inject(Tramite130121Store);
    tramiteQuery = TestBed.inject(Tramite130121Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the forms correctly', () => {
    component.inicializarFormularios();
    expect(component.formDelTramite).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
    expect(component.partidasDelaMercanciaForm).toBeDefined();
    expect(component.paisForm).toBeDefined();
    expect(component.frmRepresentacionForm).toBeDefined();
  });

  it('should subscribe to mostrarTabla$ and update mostrarTabla', () => {
    const mostrarTabla$ = of(true);
    jest.spyOn(tramiteQuery as any, 'mostrarTabla$', 'get').mockReturnValue(mostrarTabla$);
    component.ngOnInit();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should subscribe to selectSolicitud$ and update form values', () => {
    const mockSolicitudData = {
      solicitud: 'Test Solicitud',
      regimen: 'Test Regimen',
      clasificacion: 'Test Clasificacion',
      plazo: 'Largo plazo (5 años)',
      descripcion: 'Test Descripcion',
      fraccion: 'Test Fraccion',
      cantidad: 100,
      valorPartidaUSD: 50,
      unidadMedida: 'Test Unidad',
    };

    const selectSolicitud$ = of(mockSolicitudData);
    jest.spyOn<any, any>(tramiteQuery, 'selectSolicitud$').mockReturnValue(selectSolicitud$);

    component.ngOnInit();
    expect(component.formDelTramite.value.solicitud).toBe('Test Solicitud');
    expect(component.mercanciaForm.value.descripcion).toBe('Test Descripcion');
  });

  it('should handle changes to the form and update the store', () => {
    const mockValue = {
      solicitud: 'New Solicitud',
      regimen: 'New Regimen',
      clasificacion: 'New Clasificacion',
    };
    component.formDelTramite.patchValue(mockValue);
    jest.spyOn(tramiteStore, 'updateState');
    component.formDelTramite.valueChanges.subscribe();
    expect(tramiteStore.updateState).toHaveBeenCalledWith({
      solicitud: 'New Solicitud',
      regimen: 'New Regimen',
      clasificacion: 'New Clasificacion',
    });
  });

  it('should validate and show the table when the form is valid', () => {
    component.partidasDelaMercanciaForm.patchValue({
      cantidadPartidasDeLaMercancia: 10,
      unidadMedida: 'Test Unidad',
      fraccion: 'Test Fraccion',
      descripcionPartidasDeLaMercancia: 'Test Descripcion',
      valorPartidaUSDPartidasDeLaMercancia: 50,
    });
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should hide the table when the form is invalid', () => {
    component.partidasDelaMercanciaForm.patchValue({
      cantidadPartidasDeLaMercancia: '',
    });
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(false);
  });

  it('should update the store with the correct value for fraccion', () => {
    const mockFraccion = 'Test Fraccion';
    component.partidasDelaMercanciaForm.patchValue({ fraccion: mockFraccion });
    jest.spyOn(tramiteStore, 'setFraccion');
    component.setValoresStore({
      form: component.partidasDelaMercanciaForm,
      campo: 'fraccion',
      metodoNombre: 'setFraccion',
    });
    expect(tramiteStore.setFraccion).toHaveBeenCalledWith(mockFraccion);
  });

  it('should fetch the list of countries and update the countries array', () => {
    const mockCountries: Catalogo[] = [{ id: 1, descripcion: 'Country 1' }, { id: 2, descripcion: 'Country 2' }];
    jest.spyOn(permisoService, 'getListaDePaisesDisponibles').mockReturnValue(of(mockCountries));
    component.listaDePaisesDisponibles();
    expect(component.elementosDeBloque).toEqual(mockCountries);
  });

  it('should call the service to fetch the federal entities', () => {
    const mockEntities: Catalogo[] = [{ id: 1, descripcion: 'Entity 1' }, { id: 2, descripcion: 'Entity 2' }];
    jest.spyOn(permisoService, 'getEstado').mockReturnValue(of(mockEntities));
    component.fetchEntidadFederativa();
    expect(component.estado).toEqual(mockEntities);
  });

  it('should disable the "Modify" button when no row is selected', () => {
    component.filaSeleccionada = [];
    expect(component.disabledModificar()).toBe(true);
  });

  it('should enable the "Modify" button when a row is selected', () => {
    component.filaSeleccionada = [{
      descripcion: 'Test Row',
      cantidad: '1',
      unidadDeMedida: 'Test Unidad',
      fraccionFrancelaria: 'Test Fraccion',
      precioUnitarioUSD: '100',
      totalUSD: '100'
    }];
    expect(component.disabledModificar()).toBe(false);
  });

  it('should fetch representation federal data correctly', () => {
    const mockRepresentation: Catalogo[] = [{ id: 1, descripcion: 'Representation 1' }];
    jest.spyOn(permisoService, 'getRepresentacionFederal').mockReturnValue(of(mockRepresentation));
    component.fetchRepresentacionFederal();
    expect(component.representacionFederal).toEqual(mockRepresentation);
  });

  it('should navigate to modify the row when selected row exists', () => {
    const mockRow = [{
      descripcion: 'Test Row',
      cantidad: '1',
      unidadDeMedida: 'Test Unidad',
      fraccionFrancelaria: 'Test Fraccion',
      precioUnitarioUSD: '100',
      totalUSD: '100'
    }];
    component.filaSeleccionada = mockRow;
    jest.spyOn(tramiteStore, 'storeTableValues');
    component.navegarParaModificarPartida();
    expect(tramiteStore.storeTableValues).toHaveBeenCalledWith(mockRow);
  });

  it('should fetch PaisesPorBloque data correctly', () => {
    const mockCountries: Catalogo[] = [{ id: 1, descripcion: 'Country 1' }];
    jest.spyOn(permisoService, 'getPaisesPorBloque').mockReturnValue(of(mockCountries));
    component.fetchPaisesPorBloque(1);
    expect(component.paisesPorBloque).toEqual(mockCountries);
  });

  it('should call enCambioDeBloque method correctly', () => {
    const mockCountries: Catalogo[] = [{ id: 1, descripcion: 'Country 1' }];
    jest.spyOn(permisoService, 'getPaisesPorBloque').mockReturnValue(of(mockCountries));
    component.enCambioDeBloque(1);
    expect(component.paisesPorBloque).toEqual(mockCountries);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
