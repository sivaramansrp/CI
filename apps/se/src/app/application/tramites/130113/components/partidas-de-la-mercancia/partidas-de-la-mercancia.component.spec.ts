import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PartidasDeLaMercanciaComponent } from './partidas-de-la-mercancia.component';
import { SolicitudComponent } from '../solicitud/solicitud.component';
import { Tramite130113Query } from '../../../130113/estados/queries/tramite130113.query';
import { Tramite130113Store } from '../../estados/tramites/tramites130113.store';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImportacionEquipoAnticontaminanteService } from '../../services/importacion-equipo-anticontaminante.service';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let store: jest.Mocked<Tramite130113Store>;
  let query: jest.Mocked<Tramite130113Query>;
  let service: jest.Mocked<ImportacionEquipoAnticontaminanteService>;

  beforeEach(async () => {
    store = {
      actualizarEstado: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
    } as any;

    query = {
      mostrarTabla$: of(false),
      selectSolicitud$: of({
        solicitud: '',
        regimen: '',
        clasificacion: '',
        producto: '',
        descripcion: '',
        fraccion: '',
        cantidad: '',
        valorFacturaUSD: '',
        unidadMedida: '',
        bloque: '',
        usoEspecifico: '',
        justificacionImportacionExportacion: '',
        observaciones: '',
        entidad: '',
        representacion: '',
      }),
    } as any;

    service = {
      getSolicitudeOptions: jest.fn().mockReturnValue(of({ options: [], defaultSelect: 'Inicial' })),
      getProductoOptions: jest.fn().mockReturnValue(of({ options: [] })),
      getTablaDatos: jest.fn().mockReturnValue(of([{ cantidad: 10, totalUSD: 1000 }])),
      getEntidadFederativa: jest.fn().mockReturnValue(of([])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([])),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of([])),
      getFraccionDescripcionPartidasDeLaMercancia: jest.fn().mockReturnValue(of([])),
      getPaisesPorBloque: jest.fn().mockReturnValue(of([])),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: Tramite130113Store, useValue: store },
        { provide: Tramite130113Query, useValue: query },
        { provide: ImportacionEquipoAnticontaminanteService, useValue: service },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a configuracionFormularioSuscripciones en ngOnInit', () => {
    const SPY = jest.spyOn(component, 'configuracionFormularioSuscripciones');
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('debería inicializar mercanciaForm con valores predeterminados', () => {
    expect(component.mercanciaForm.get('descripcion')?.value).toBe('');
  });

  it('debería validar los campos de mercanciaForm', () => {
    const DESCRIPTION_CONTROL = component.mercanciaForm.get('descripcion');
    DESCRIPTION_CONTROL?.setValue('');
    expect(DESCRIPTION_CONTROL?.valid).toBe(false);

    DESCRIPTION_CONTROL?.setValue('Descripción válida');
    expect(DESCRIPTION_CONTROL?.valid).toBe(true);
  });

  it('debería manejar manejarlaFilaSeleccionada correctamente', () => {
    const FILA = [
      {
        cantidad: 'Test',
        unidadDeMedida: 'kg',
        fraccionFrancelaria: '1234.56.78',
        descripcion: 'Descripción de prueba',
        precioUnitarioUSD: '100',
        totalUSD: '1000',
      },
    ];

    component.manejarlaFilaSeleccionada(FILA);
    expect(component.filaSeleccionada).toEqual(FILA);

    component.manejarlaFilaSeleccionada([]);
    expect(component.filaSeleccionada).toEqual([]);
  });

  it('debería validar y mostrar la tabla en validarYEnviarFormulario', () => {
    component.partidasDelaMercanciaForm.patchValue({
      cantidadPartidasDeLaMercancia: '10',
      fraccionTigiePartidasDeLaMercancia: '123',
      descripcionPartidasDeLaMercancia: 'Test',
      valorPartidaUSDPartidasDeLaMercancia: '100',
    });
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('debería obtener la entidad federativa', () => {
    const MOCKDATA = [{ id: 1, descripcion: 'Entidad 1' }];
    service.getEntidadFederativa.mockReturnValue(of(MOCKDATA));
    component.fetchEntidadFederativa();
    expect(component.entidadFederativa).toEqual(MOCKDATA);
  });

  it('debería obtener la representación federal', () => {
    const MOCKDATA = [{ id: 1, descripcion: 'Representación 1' }];
    service.getRepresentacionFederal.mockReturnValue(of(MOCKDATA));
    component.fetchRepresentacionFederal();
    expect(component.representacionFederal).toEqual(MOCKDATA);
  });

  it('debería obtener la lista de países disponibles', () => {
    const MOCKDATA = [{ id: 1, descripcion: 'País 1' }];
    service.getListaDePaisesDisponibles.mockReturnValue(of(MOCKDATA));
    component.listaDePaisesDisponibles();
    expect(component.elementosDeBloque).toEqual(MOCKDATA);
  });

  it('debería obtener la descripción de fracciones', () => {
    const MOCKDATA = [{ id: 1, descripcion: 'Fracción 1' }];
    service.getFraccionDescripcionPartidasDeLaMercancia.mockReturnValue(of(MOCKDATA));
    component.listaDeFraccionDescripcion();
    expect(component.fraccionDescription).toEqual(MOCKDATA);
  });

  it('debería actualizar los valores del store en setValoresStore', () => {
    component.setValoresStore({
      form: component.formDelTramite,
      campo: 'solicitud',
    });
    expect(store.actualizarEstado).toHaveBeenCalledWith({ solicitud: '' });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const SPY = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(SPY).toHaveBeenCalled();
  });
});