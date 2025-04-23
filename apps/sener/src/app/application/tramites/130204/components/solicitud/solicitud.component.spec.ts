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
  let exportacionServiceMock: Partial<ExportacionHidrocarburosService>;
  let tramiteStoreMock: Partial<Tramite130204Store>;
  let tramiteQueryMock: Partial<Tramite130204Query>;

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
      selectSolicitud$: of({
        plazo: '30 días',
        descripcion: 'Descripción de prueba',
        fraccion: '1234.56.78',
        nico: 'NICO123',
        cantidad: '100',
        valorPartidaUSD: 500,
        umt: 'kg',
        solicitud: 'Solicitud123',
        regimen: 'Regimen Especial',
        clasificacion: 'Clasificación A',
        filaSeleccionada: [],
        cantidadModificar: '10',
        valorPartidaUSDPartidasDeLaMercancia: 1000,
        descripcionModificar: 'Descripción de modificación',
        valorFacturaUSD: '5000',
        bloque: 'Bloque A',
        usoEspecifico: 'Uso específico',
        justificacionImportacionExportacion: 'Justificación',
        observaciones: 'Sin observaciones',
        entidad: 'Entidad A',
        representacion: 'Representación A',
        mostrarTabla: false,
        acotacion: 'Acotación',
        descripcionNico: 'Descripción NICO',
      }),
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
    const SPYINITFORMS = jest.spyOn(component, 'inicializarFormularios');
    component.ngOnInit();
    expect(SPYINITFORMS).toHaveBeenCalled();
  });

  it('should call opcionesDeBusqueda on ngOnInit', () => {
    const SPYOPCIONES = jest.spyOn(component, 'opcionesDeBusqueda');
    component.ngOnInit();
    expect(SPYOPCIONES).toHaveBeenCalled();
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
        // 1) Construir un formulario simple con los controles que tu método parcheará
    const FORM = new FormBuilder().group({
      fraccion: [1],
      umt: [''],
      acotacion: ['']
    });

        // 2) Simular los catálogos para que .find() devuelva una coincidencia
    component.mercanciaCatalogoArray = [[
      { id: 1, descripcion: 'Sample', relacionadaUmtId: 2, relacionadaAcotacionId: 99 }
    ]];
    component.acotacionCatalogo = [
      { id: 99, descripcion: 'My Acotación' }
    ];

        // 3) Espiar setValoresStore para verificar que se llame por cada campo
    const SPYSET = jest.spyOn(component, 'setValoresStore');

        // 4) Invocar el manejador
    component.handleStoreUpdate({
      form: FORM,
      campo: 'fraccion',
      metodoNombre: 'setFraccion'
    });

        // 5) Aserciones
    expect(SPYSET).toHaveBeenCalledWith(FORM, 'fraccion');
    expect(FORM.value.umt).toBe(2);
    expect(SPYSET).toHaveBeenCalledWith(FORM, 'umt');
    expect(FORM.value.acotacion).toBe('My Acotación');
    expect(SPYSET).toHaveBeenCalledWith(FORM, 'acotacion');
  });

  it('should handle store updates for setNico', () => {
    const FORM = new FormBuilder().group({
      fraccion: [1],
      descripcionNico: ['']
    });

    component.mercanciaCatalogoArray = [[
      { id: 1, descripcion: 'Test Descripción' }
    ]];

    const SPYSET = jest.spyOn(component, 'setValoresStore');
    component.handleStoreUpdate({
      form: FORM,
      campo: 'nico',
      metodoNombre: 'setNico'
    });

    expect(SPYSET).toHaveBeenCalledWith(FORM, 'nico');
    expect(FORM.value.descripcionNico).toBe('Test Descripción');
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
    const MOCKDATA = [{ descripcion: 'Country 1' }, { descripcion: 'Country 2' }];
    (exportacionServiceMock.getPaisesPorBloque as jest.Mock).mockReturnValue(of(MOCKDATA));

    component.fetchPaisesPorBloque(1);
    expect(exportacionServiceMock.getPaisesPorBloque).toHaveBeenCalledWith(1);
    expect(component.paisesPorBloque).toEqual(MOCKDATA);
    expect(component.selectRangoDias).toEqual(['Country 1', 'Country 2']);
  });

  it('should set values in the store', () => {
    const FORM = new FormBuilder().group({ campo: ['value'] });
    component.setValoresStore(FORM, 'campo');
    expect(tramiteStoreMock.establecerDatos).toHaveBeenCalledWith({ campo: 'value' });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const SPYNEXT = jest.spyOn(component['destroyed$'], 'next');
    const SPYCOMPLETE = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(SPYNEXT).toHaveBeenCalled();
    expect(SPYCOMPLETE).toHaveBeenCalled();
  });
});
