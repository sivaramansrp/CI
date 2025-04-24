import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteContenedoraComponent } from './datos-del-tramite-contenedora.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Tramite240407Query } from '../../estados/tramite240407Query.query';
import { Tramite240407Store } from '../../estados/tramite240407Store.store';
import { of } from 'rxjs';
import { DatosDelTramiteFormState, JustificacionTramiteFormState, MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';

describe('DatosDelTramiteContenedoraComponent', () => {
  let component: DatosDelTramiteContenedoraComponent;
  let fixture: ComponentFixture<DatosDelTramiteContenedoraComponent>;
  let mockTramiteQuery: jest.Mocked<Tramite240407Query>;
  let mockTramiteStore: jest.Mocked<Tramite240407Store>;

  beforeEach(async () => {
    // Mock Tramite240407Query
    mockTramiteQuery = {
      selectTramiteState$: of({
        tabSeleccionado: 1,
        destinatarioFinalTablaDatos: [],
        proveedorTablaDatos: [],
        merccancialTablaDatos: [],
        datosDelTramite: {
          permisoGeneral: '',
          usoFinal: '',
          aduanasSeleccionadas: [],
          paisDestino: '',
        },
        justificacionTramiteFormState: {
          justificacion: '',
        },
      }),
      getTabSeleccionado$: of(1),
      getDatosDelTramite$: of({
        permisoGeneral: 'Importación',
        usoFinal: 'Consumo',
        aduanasSeleccionadas: ['Aduana 1', 'Aduana 2'],
        paisDestino: 'México',
        anoEnCurso: true,
        fechaPago: '2025-04-01',
      }),
      getJustificacionTramite$: of({
        justificacion: 'Razón válida para el trámite',
      }),
      getProveedorTablaDatos$: of([]),
      getDestinatarioFinalTablaDatos$: of([]),
      getMercanciaTablaDatos$: of([]),
    } as unknown as jest.Mocked<Tramite240407Query>;

    // Mock Tramite240407Store
    mockTramiteStore = {
      updateDatosDelTramiteFormState: jest.fn(),
      updateJustificacionFormulario: jest.fn(),
      updateDestinatarioFinalTablaDatos: jest.fn(),
      updateProveedorTablaDatos: jest.fn(),
      updateMercanciaTablaDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite240407Store>;

    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteContenedoraComponent],
      providers: [
        { provide: Tramite240407Query, useValue: mockTramiteQuery },
        { provide: Tramite240407Store, useValue: mockTramiteStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteContenedoraComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar idProcedimiento correctamente', () => {
    expect(component.idProcedimiento).toBe(240407);
  });

  it('debería suscribirse a getMercanciaTablaDatos$ y actualizar datosMercanciaTabla', () => {
    const mockMercanciaDatos: MercanciaDetalle[] = [
      {
        fraccionArancelaria: '0101.21.00',
        descripcionFraccion: 'Caballos pura sangre',
        unidadMedidaTarifa: 'Kilogramos',
        umc: 'Kilogramos',
        cantidadUMT: 100,
        valorComercial: 5000,
        tipoMoneda: 'USD',
        descripcion: 'Caballos para carreras',
        paisOrigen: 'México',
      },
    ];
    (mockTramiteQuery.getMercanciaTablaDatos$ as unknown as jest.Mock).mockReturnValue(of(mockMercanciaDatos));

    component.ngOnInit();
    expect(component.datosMercanciaTabla).toEqual(mockMercanciaDatos);
  });

  it('debería suscribirse a getDatosDelTramite$ y actualizar datosDelTramiteFormState', () => {
    const mockDatosDelTramite: DatosDelTramiteFormState = {
      permisoGeneral: 'Importación',
      usoFinal: 'Consumo',
      aduanasSeleccionadas: ['Aduana 1', 'Aduana 2'],
      paisDestino: 'México',
      anoEnCurso: true,
      fechaPago: '2025-04-01',
    };

    (mockTramiteQuery.getDatosDelTramite$ as unknown as jest.Mock).mockReturnValue(of(mockDatosDelTramite));

    component.ngOnInit();
    expect(component.datosDelTramiteFormState).toEqual(mockDatosDelTramite);
  });

  it('debería suscribirse a getJustificacionTramite$ y actualizar justificacionTramiteFormState', () => {
    const mockJustificacionTramite: JustificacionTramiteFormState = {
      justificacion: 'Razón válida para el trámite',
    };

    (mockTramiteQuery.getJustificacionTramite$ as unknown as jest.Mock).mockReturnValue(of(mockJustificacionTramite));

    component.ngOnInit();
    expect(component.justificacionTramiteFormState).toEqual(mockJustificacionTramite);
  });

  it('debería llamar a updateDatosDelTramiteFormState en updateDatosDelTramiteFormulario', () => {
    const mockEvent: DatosDelTramiteFormState = {
      permisoGeneral: 'Exportación',
      usoFinal: 'Venta',
      aduanasSeleccionadas: ['Aduana 3'],
      paisDestino: 'Estados Unidos',
    };

    component.updateDatosDelTramiteFormulario(mockEvent);
    expect(mockTramiteStore.updateDatosDelTramiteFormState).toHaveBeenCalledWith(mockEvent);
  });

  it('debería llamar a updateJustificacionFormulario en updateJustificacionFormulario', () => {
    const mockEvent: JustificacionTramiteFormState = {
      justificacion: 'Nueva justificación',
    };

    component.updateJustificacionFormulario(mockEvent);
    expect(mockTramiteStore.updateJustificacionFormulario).toHaveBeenCalledWith(mockEvent);
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});