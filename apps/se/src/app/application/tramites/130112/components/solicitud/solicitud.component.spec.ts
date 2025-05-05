import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { Tramite130112Store } from '../../estados/tramites/tramites130112.store';
import { Tramite130112Query } from '../../estados/queries/tramite130112.query';
import { ImportacionMaterialDeInvestigacionCientificaService } from '../../services/importacion-material-de-investigacion-cientifica.service';
import { of, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';


@Component({ selector: 'app-datos-del-tramite', template: '' })
class DatosDelTramiteStubComponent {}

@Component({ selector: 'app-datos-de-la-mercancia', template: '' })
class DatosDeLaMercanciaStubComponent {}

@Component({ selector: 'app-pais-procendencia', template: '' })
class PaisProcendenciaStubComponent {
  @Input() fechas: any[] = [];
  @Input() fechasSeleccionadas: any[] = [];
}

@Component({ selector: 'app-partidas-de-la-mercancia', template: '' })
class PartidasDeLaMercanciaStubComponent {}

@Component({ selector: 'app-representacion', template: '' })
class RepresentacionStubComponent {}

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mockStore: jest.Mocked<Tramite130112Store>;
  let mockQuery: jest.Mocked<Tramite130112Query>;
  let mockService: jest.Mocked<ImportacionMaterialDeInvestigacionCientificaService>;

  beforeEach(async () => {
    mockStore = {
      actualizarEstado: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
    } as any;

    mockQuery = {
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

    mockService = {
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
      declarations: [
        RepresentacionStubComponent,
        PartidasDeLaMercanciaStubComponent,
        DatosDeLaMercanciaStubComponent,
        PaisProcendenciaStubComponent,
        RepresentacionStubComponent,
      ],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        { provide: Tramite130112Store, useValue: mockStore },
        { provide: Tramite130112Query, useValue: mockQuery },
        { provide: ImportacionMaterialDeInvestigacionCientificaService, useValue: mockService },
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

  describe('ngOnInit', () => {
    it('debería inicializar los formularios y suscripciones', () => {
      jest.spyOn(component, 'inicializarFormularios');
      jest.spyOn(component, 'configuracionFormularioSuscripciones');
      jest.spyOn(component, 'opcionesDeBusqueda');
      jest.spyOn(component, 'formularioTotalCount');
      jest.spyOn(component, 'obtenerTablaDatos');
      jest.spyOn(component, 'fetchEntidadFederativa');
      jest.spyOn(component, 'fetchRepresentacionFederal');
      jest.spyOn(component, 'listaDePaisesDisponibles');
      jest.spyOn(component, 'listaDeFraccionDescripcion');

      component.ngOnInit();

      expect(component.inicializarFormularios).toHaveBeenCalled();
      expect(component.configuracionFormularioSuscripciones).toHaveBeenCalled();
      expect(component.opcionesDeBusqueda).toHaveBeenCalled();
      expect(component.formularioTotalCount).toHaveBeenCalled();
      expect(component.obtenerTablaDatos).toHaveBeenCalled();
      expect(component.fetchEntidadFederativa).toHaveBeenCalled();
      expect(component.fetchRepresentacionFederal).toHaveBeenCalled();
      expect(component.listaDePaisesDisponibles).toHaveBeenCalled();
      expect(component.listaDeFraccionDescripcion).toHaveBeenCalled();
    });
  });

  describe('setValoresStore', () => {
    it('debería actualizar el store con el valor proporcionado', () => {
      const MOCK_FORM = TestBed.inject(FormBuilder).group({
        fraccion: ['1234'],
      });

      component.setValoresStore({ form: MOCK_FORM, campo: 'fraccion' });

      expect(mockStore.actualizarEstado).toHaveBeenCalledWith({ fraccion: '1234' });
      expect(mockStore.actualizarEstado).toHaveBeenCalledWith({ unidadMedida: '1' });
    });
  });

  describe('validarYEnviarFormulario', () => {
    it('debería marcar el formulario como tocado si es inválido', () => {
      component.partidasDelaMercanciaForm = TestBed.inject(FormBuilder).group({
        cantidadPartidasDeLaMercancia: ['', Validators.required],
      });

      jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');

      component.validarYEnviarFormulario();

      expect(component.partidasDelaMercanciaForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('debería establecer mostrarTabla en true si el formulario es válido', () => {
      component.partidasDelaMercanciaForm = TestBed.inject(FormBuilder).group({
        cantidadPartidasDeLaMercancia: ['10', Validators.required],
      });

      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
      expect(mockStore.setMostrarTabla).toHaveBeenCalledWith(true);
    });
  });

  describe('manejarlaFilaSeleccionada', () => {
    it('debería actualizar las filas seleccionadas en el store', () => {
      const MOCK_ROWS = [{ id: 1, descripcion: 'Test' }] as any;

      component.manejarlaFilaSeleccionada(MOCK_ROWS);

      expect(component.filaSeleccionada).toEqual(MOCK_ROWS);
      expect(mockStore.storeTableValues).toHaveBeenCalledWith(MOCK_ROWS);
    });
  });

  describe('disabledModificar', () => {
    it('debería devolver true si no hay filas seleccionadas', () => {
      component.filaSeleccionada = [];
      expect(component.disabledModificar()).toBe(true);
    });

    it('debería devolver false si hay filas seleccionadas', () => {
      component.filaSeleccionada = [{ id: 1, descripcion: 'Test' }] as any;
      expect(component.disabledModificar()).toBe(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('debería completar el subject destroyed$', () => {
      jest.spyOn(component['destroyed$'], 'next');
      jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroyed$'].next).toHaveBeenCalled();
      expect(component['destroyed$'].complete).toHaveBeenCalled();
    });
  });
});