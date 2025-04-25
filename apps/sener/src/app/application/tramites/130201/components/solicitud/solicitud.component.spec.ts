import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudComponent } from './solicitud.component';
import { ExportacionPetroliferosService } from '../../services/exportacion-petroliferos.service';
import { Tramite130201Store } from '../../estados/tramites/tramites130201.store';
import { Tramite130201Query } from '../../estados/queries/tramite130201.query';
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
  let exportacionServiceMock: Partial<ExportacionPetroliferosService>;
  let tramiteStoreMock: Partial<Tramite130201Store>;
  let tramiteQueryMock: Partial<Tramite130201Query>;

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
      declarations: [SolicitudComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        PaisDeOrigenComponent,
        DatosDeLaMercanciaComponent,
        DatosDelTramiteComponent,
        PartidasDeLaMercanciaComponent,
        RepresentacionComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: ExportacionPetroliferosService, useValue: exportacionServiceMock },
        { provide: Tramite130201Store, useValue: tramiteStoreMock },
        { provide: Tramite130201Query, useValue: tramiteQueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los formularios en ngOnInit', () => {
    const SPYINITFORMS = jest.spyOn(component, 'inicializarFormularios');
    component.ngOnInit();
    expect(SPYINITFORMS).toHaveBeenCalled();
  });

  it('debería llamar a opcionesDeBusqueda en ngOnInit', () => {
    const SPYOPCIONES = jest.spyOn(component, 'opcionesDeBusqueda');
    component.ngOnInit();
    expect(SPYOPCIONES).toHaveBeenCalled();
  });

  it('debería obtener los datos de la tabla y actualizar formForTotalCount', () => {
    component.obtenerTablaDatos();
    expect(exportacionServiceMock.getTablaDatos).toHaveBeenCalled();
    expect(component.tableBodyData).toEqual([{ cantidad: 10, totalUSD: 100 }]);
    expect(component.formForTotalCount.value).toEqual({
      cantidadTotal: 10,
      valorTotalUSD: 100,
    });
  });

  it('debería manejar las actualizaciones del store para setFraccion', () => {
    const form = new FormBuilder().group({
      fraccion: [1],
      umt: [''],
      acotacion: ['']
    });

    component.mercanciaCatalogoArray = [[
      { id: 1, descripcion: 'Sample', relacionadaUmtId: 2, relacionadaAcotacionId: 99 }
    ]];
    component.acotacionCatalogo = [
      { id: 99, descripcion: 'Mi Acotación' }
    ];

    const SPYSET = jest.spyOn(component, 'setValoresStore');

    component.handleStoreUpdate({
      form,
      campo: 'fraccion',
      metodoNombre: 'setFraccion'
    });

    expect(SPYSET).toHaveBeenCalledWith(form, 'fraccion');
    expect(form.value.umt).toBe(2);
    expect(SPYSET).toHaveBeenCalledWith(form, 'umt');
    expect(form.value.acotacion).toBe('Mi Acotación');
    expect(SPYSET).toHaveBeenCalledWith(form, 'acotacion');
  });

  it('debería manejar las actualizaciones del store para setNico', () => {
    const FORM = new FormBuilder().group({
      fraccion: [1],
      descripcionNico: ['']
    });

    component.mercanciaCatalogoArray = [[
      { id: 1, descripcion: 'Descripción de prueba' }
    ]];

    const SPYSET = jest.spyOn(component, 'setValoresStore');
    component.handleStoreUpdate({
      form: FORM,
      campo: 'nico',
      metodoNombre: 'setNico'
    });

    expect(SPYSET).toHaveBeenCalledWith(FORM, 'nico');
    expect(FORM.value.descripcionNico).toBe('Descripción de prueba');
  });

  it('debería validar y mostrar/ocultar la tabla según la validez del formulario', () => {
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

  it('debería obtener los países por bloque y actualizar selectRangoDias', () => {
    const MOCKDATA = [{ descripcion: 'País 1' }, { descripcion: 'País 2' }];
    (exportacionServiceMock.getPaisesPorBloque as jest.Mock).mockReturnValue(of(MOCKDATA));

    component.fetchPaisesPorBloque(1);
    expect(exportacionServiceMock.getPaisesPorBloque).toHaveBeenCalledWith(1);
    expect(component.paisesPorBloque).toEqual(MOCKDATA);
    expect(component.selectRangoDias).toEqual(['País 1', 'País 2']);
  });

  it('debería establecer valores en el store', () => {
    const FORM = new FormBuilder().group({ campo: ['valor'] });
    component.setValoresStore(FORM, 'campo');
    expect(tramiteStoreMock.establecerDatos).toHaveBeenCalledWith({ campo: 'valor' });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const SPYNEXT = jest.spyOn(component['destroyed$'], 'next');
    const SPYCOMPLETE = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(SPYNEXT).toHaveBeenCalled();
    expect(SPYCOMPLETE).toHaveBeenCalled();
  });
});
