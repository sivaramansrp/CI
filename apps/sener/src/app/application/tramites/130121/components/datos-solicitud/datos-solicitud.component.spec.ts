import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite130121Store } from '../../estados/tramites/tramites130121.store';
import { Tramite130121Query } from '../../estados/queries/tramite130121.query';
import { PermisoDeHidrocarburosService } from '../../services/permiso-de-hidrocarburos.service';
import { of, Subject, throwError } from 'rxjs';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import PartidasdelaTable from '@libs/shared/theme/assets/json/130121/partidas-de-la.json';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let tramite130121Store: Tramite130121Store;
  let tramite130121Query: Tramite130121Query;
  let permisodehidrocarburosService: PermisoDeHidrocarburosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        Tramite130121Store,
        Tramite130121Query,
        PermisoDeHidrocarburosService,
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown components
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    tramite130121Store = TestBed.inject(Tramite130121Store);
    tramite130121Query = TestBed.inject(Tramite130121Query);
    permisodehidrocarburosService = TestBed.inject(PermisoDeHidrocarburosService);

    // Mocking Observables
    jest.spyOn(tramite130121Query, 'selectSolicitud$', 'get').mockReturnValue(of());
    jest.spyOn(tramite130121Query, 'mostrarTabla$', 'get').mockReturnValue(of(true));
    jest.spyOn(tramite130121Query, 'solicitud$', 'get').mockReturnValue(of('TestSolicitud'));
    jest.spyOn(tramite130121Query, 'regimen$', 'get').mockReturnValue(of('TestRegimen'));
    jest.spyOn(tramite130121Query, 'clasificacion$', 'get').mockReturnValue(of('TestClasificacion'));
    jest.spyOn(tramite130121Query, 'mercanciaState$', 'get').mockReturnValue(of({
      plazo: 'Nuevo',
      descripcion: 'DescripcionTest',
      fraccion: 'FraccionTest',
      umt: 'UMTTest',
      nico: 'NicoTest',
      cantidad: 100, // Change from '100' (string) to 100 (number)
      valorPartidaUSD: 5000,
      unidadMedida: 'UnidadMedidaTest',
      defaultPlazo: 'DefaultPlazoTest',
    }));


    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly', () => {
    component.inicializarFormularios();
    expect(component.formDelTramite).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
    expect(component.partidasDelaMercanciaForm).toBeDefined();
    expect(component.paisForm).toBeDefined();
    expect(component.frmRepresentacionForm).toBeDefined();
  });

  it('should load table configuration correctly', () => {
    component.getEstablecimiento();
    expect(component.tableHeaderData.length).toBeGreaterThan(0);
    expect(component.tableBodyData.length).toBeGreaterThan(0);
  });

  it('should calculate totals correctly', () => {
    component.tableBodyData = PartidasdelaTable.tableBody;
    component.calcularTotales();
    expect(component.formForTotalCount.get('cantidadTotal')?.value).toBeDefined();
    expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBeDefined();
  });

  it('should update state when form values change', () => {
    const storeSpy = jest.spyOn(tramite130121Store, 'updateState');
    component.inicializarFormularios();
    component.formDelTramite.patchValue({
      solicitud: 'Test',
      regimen: 'RegimenTest',
      clasificacion: 'ClasificacionTest',
    });
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should handle error from servicio properly', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(permisodehidrocarburosService, 'getSolicitudeOptions').mockReturnValue(throwError(() => 'Error'));

    component.opcionesDeBusqueda();

    expect(consoleSpy).toHaveBeenCalledWith('Error loading solicitude options:', 'Error');
  });

  it('should properly handle subscriptions on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });

  it('should update the table selection correctly', () => {
    const storeSpy = jest.spyOn(tramite130121Store, 'storeTableValues');
    const selectedRow = [{ tbodyData: ['Test'] }];
    component.manejarlaFilaSeleccionada(selectedRow);
    expect(component.filaSeleccionada).toEqual(selectedRow[0]);
    expect(storeSpy).toHaveBeenCalledWith(selectedRow[0]);
  });

  it('should validate and submit the form correctly', () => {
    component.inicializarFormularios();
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should patch form values from store correctly', () => {
    const mockValue = {
      solicitud: 'solicitudTest',
      regimen: 'regimenTest',
      clasificacion: 'clasificacionTest',
    };
    jest.spyOn(tramite130121Query, 'solicitud$', 'get').mockReturnValue(of(mockValue.solicitud));
    jest.spyOn(tramite130121Query, 'regimen$', 'get').mockReturnValue(of(mockValue.regimen));
    jest.spyOn(tramite130121Query, 'clasificacion$', 'get').mockReturnValue(of(mockValue.clasificacion));

    component.configuracionFormularioSuscripciones();

    expect(component.formDelTramite.get('solicitud')?.value).toBe('solicitudTest');
    expect(component.formDelTramite.get('regimen')?.value).toBe('regimenTest');
    expect(component.formDelTramite.get('clasificacion')?.value).toBe('clasificacionTest');
  });
});
