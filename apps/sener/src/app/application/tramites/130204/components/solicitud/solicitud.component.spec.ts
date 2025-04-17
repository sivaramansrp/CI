import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudComponent } from './solicitud.component';
import { ExportacionHidrocarburosService } from '../../services/exportacion-hidrocarburos.service';
import { Tramite130204Store } from '../../estados/tramites/tramites130204.store';
import { Tramite130204Query } from '../../estados/queries/tramite130204.query';
import { PaisDeOrigenComponent } from '../../../../shared/components/pais-de-origen/pais-de-origen.component';
import { DatosDeLaMercanciaComponent } from '../../../../shared/components/datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { PartidasDeLaMercanciaComponent } from '../../../../shared/components/partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepresentacionComponent } from '../../../../shared/components/representacion/representacion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let exportacionServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(async () => {
    exportacionServiceMock = {
      getSolicitudeOptions: jest.fn().mockReturnValue(of({ options: [] })),
      getProductoOptions: jest.fn().mockReturnValue(of({ options: [] })),
      getTablaDatos: jest.fn().mockReturnValue(of([{ cantidad: 10, totalUSD: 100 }])),
      getEstado: jest.fn().mockReturnValue(of([])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([])),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of([])),
      obtenerListaDeCiudades: jest.fn().mockReturnValue(of([])),
      getPaisesPorBloque: jest.fn().mockReturnValue(of([])),
    };

    tramiteStoreMock = {
      establecerDatos: jest.fn(),
      storeTableValues: jest.fn(),
      setMostrarTabla: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({}),
      mostrarTabla$: of(false),
    };

    await TestBed.configureTestingModule({
      declarations: [ SolicitudComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        PaisDeOrigenComponent,
        DatosDeLaMercanciaComponent,
        DatosDelTramiteComponent,
        PartidasDeLaMercanciaComponent,
        RepresentacionComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ExportacionHidrocarburosService, useValue: exportacionServiceMock },
        { provide: Tramite130204Store, useValue: tramiteStoreMock },
        { provide: Tramite130204Query, useValue: tramiteQueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    const spyInitForms = jest.spyOn(component, 'inicializarFormularios');
    component.ngOnInit();
    expect(spyInitForms).toHaveBeenCalled();
  });

  it('should call opcionesDeBusqueda on ngOnInit', () => {
    const spyOpciones = jest.spyOn(component, 'opcionesDeBusqueda');
    component.ngOnInit();
    expect(spyOpciones).toHaveBeenCalled();
  });

  it('should fetch table data and update formForTotalCount', () => {
    component.obtenerTablaDatos();
    expect(exportacionServiceMock.getTablaDatos).toHaveBeenCalled();
    expect(component.tableBodyData).toEqual([{ cantidad: 10, totalUSD: 100 }]);
    expect(component.formForTotalCount.value).toEqual({
      cantidadTotal: 10,
      valorTotalUSD: 100,
    });
  });

  it('should handle store updates for setFraccion', () => {
    // 1) build a simple form with the controls your method will patch
    const form = new FormBuilder().group({
      fraccion: [1],
      umt: [''],
      acotacion: ['']
    });

    // 2) stub the catalog arrays so .find() returns a match
    component.mercanciaCatalogoArray = [[
      { id: 1, descripcion: 'Sample', relacionadaUmtId: 2, relacionadaAcotacionId: 99 }
    ]];
    component.acotacionCatalogo = [
      { id: 99, descripcion: 'My Acotación' }
    ];

    // 3) spy on setValoresStore to verify it's called for each field
    const spySet = jest.spyOn(component, 'setValoresStore');

    // 4) invoke the handler
    component.handleStoreUpdate({
      form,
      campo: 'fraccion',
      metodoNombre: 'setFraccion'
    });

    // 5) assertions
    expect(spySet).toHaveBeenCalledWith(form, 'fraccion');
    expect(form.value.umt).toBe(2);
    expect(spySet).toHaveBeenCalledWith(form, 'umt');
    expect(form.value.acotacion).toBe('My Acotación');
    expect(spySet).toHaveBeenCalledWith(form, 'acotacion');
  });

  it('should handle store updates for setNico', () => {
    const form = new FormBuilder().group({
      fraccion: [1],
      descripcionNico: ['']
    });

    component.mercanciaCatalogoArray = [[
      { id: 1, descripcion: 'Test Descripción' }
    ]];

    const spySet = jest.spyOn(component, 'setValoresStore');
    component.handleStoreUpdate({
      form,
      campo: 'nico',
      metodoNombre: 'setNico'
    });

    expect(spySet).toHaveBeenCalledWith(form, 'nico');
    expect(form.value.descripcionNico).toBe('Test Descripción');
  });

  it('should validate and show/hide table based on form validity', () => {
    component['fb'] = new FormBuilder();
    component.partidasDelaMercanciaForm = component['fb'].group({
      cantidadModificar: ['', Validators.required]
    });

    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(false);

    component.partidasDelaMercanciaForm.patchValue({ cantidadModificar: '10' });
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should fetch countries by block and update selectRangoDias', () => {
    const mockData = [{ descripcion: 'Country 1' }, { descripcion: 'Country 2' }];
    exportacionServiceMock.getPaisesPorBloque.mockReturnValue(of(mockData));

    component.fetchPaisesPorBloque(1);
    expect(exportacionServiceMock.getPaisesPorBloque).toHaveBeenCalledWith(1);
    expect(component.paisesPorBloque).toEqual(mockData);
    expect(component.selectRangoDias).toEqual(['Country 1', 'Country 2']);
  });

  it('should set values in the store', () => {
    const form = new FormBuilder().group({ campo: ['value'] });
    component.setValoresStore(form, 'campo');
    expect(tramiteStoreMock.establecerDatos).toHaveBeenCalledWith({ campo: 'value' });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
