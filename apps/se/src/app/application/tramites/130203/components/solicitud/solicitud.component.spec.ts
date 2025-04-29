import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let MOCK_STORE: jest.Mocked<Tramite130203Store>;
  let MOCK_QUERY: jest.Mocked<Tramite130203Query>;
  let MOCK_SERVICE: jest.Mocked<ExportacionDeDiamantesEnBrutoService>;

  beforeEach(async () => {
    MOCK_STORE = {
      actualizarEstado: jest.fn(),
      setMostrarTabla: jest.fn(),
      storeTableValues: jest.fn(),
    } as any;

    MOCK_QUERY = {
      mostrarTabla$: of(false),
      selectSolicitud$: of({
        solicitud: 'Test',
        regimen: 'Regimen Test',
        clasificacion: 'Clasificación Test',
        producto: 'Producto Test',
        descripcion: 'Descripción Test',
        fraccion: 'Fracción Test',
        cantidad: '10',
        valorFacturaUSD: '1000',
        unidadMedida: 'Unidad Test',
        bloque: 'Bloque Test',
        usoEspecifico: 'Uso Test',
        justificacionImportacionExportacion: 'Justificación Test',
        observaciones: 'Observaciones Test',
        entidad: 'Entidad Test',
        representacion: 'Representación Test',
        cantidadPartidasDeLaMercancia: '5',
        descripcionPartidasDeLaMercancia: 'Descripción Partida Test',
        valorPartidaUSDPartidasDeLaMercancia: '500',
      }),
    } as any;

    MOCK_SERVICE = {
      getSolicitudeOptions: jest.fn().mockReturnValue(of({ options: [], defaultSelect: 'Inicial' })),
      getProductoOptions: jest.fn().mockReturnValue(of({ options: [] })),
      getListaDePaisesDisponibles: jest.fn().mockReturnValue(of([])),
      getPaisesPorBloque: jest.fn().mockReturnValue(of([])),
      getEntidadFederativa: jest.fn().mockReturnValue(of([])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([])),
      getTablaDatos: jest.fn().mockReturnValue(of([{ cantidad: 10, totalUSD: 1000 }])),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      providers: [
        { provide: Tramite130203Store, useValue: MOCK_STORE },
        { provide: Tramite130203Query, useValue: MOCK_QUERY },
        { provide: ExportacionDeDiamantesEnBrutoService, useValue: MOCK_SERVICE },
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;

    component.formDelTramite = new FormGroup({
      solicitud: new FormControl('', Validators.required),
      regimen: new FormControl('', Validators.required),
      clasificacion: new FormControl('', Validators.required),
    });

    component.mercanciaForm = new FormGroup({
      producto: new FormControl('Nuevo'),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
      fraccion: new FormControl('', Validators.required),
      cantidad: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1),
      ]),
      valorFacturaUSD: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        Validators.min(0.01),
      ]),
      unidadMedida: new FormControl('', Validators.required),
    });

    component.partidasDelaMercanciaForm = new FormGroup({
      cantidadPartidasDeLaMercancia: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(18),
      ]),
      descripcionPartidasDeLaMercancia: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      valorPartidaUSDPartidasDeLaMercancia: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        Validators.maxLength(20),
      ]),
    });

    component.paisForm = new FormGroup({
      bloque: new FormControl(''),
      usoEspecifico: new FormControl('', Validators.required),
      justificacionImportacionExportacion: new FormControl('', Validators.required),
      observaciones: new FormControl(''),
    });

    component.frmRepresentacionForm = new FormGroup({
      entidad: new FormControl('', Validators.required),
      representacion: new FormControl('', Validators.required),
    });

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería inicializar los formularios y suscripciones', () => {
      jest.spyOn(component, 'inicializarFormularios');
      jest.spyOn(component, 'opcionesDeBusqueda');
      jest.spyOn(component, 'configuracionFormularioSuscripciones');
      jest.spyOn(component, 'formularioTotalCount');
      jest.spyOn(component, 'obtenerTablaDatos');
      jest.spyOn(component, 'fetchEntidadFederativa');
      jest.spyOn(component, 'fetchRepresentacionFederal');
      jest.spyOn(component, 'listaDePaisesDisponibles');

      component.ngOnInit();

      expect(component.inicializarFormularios).toHaveBeenCalled();
      expect(component.opcionesDeBusqueda).toHaveBeenCalled();
      expect(component.configuracionFormularioSuscripciones).toHaveBeenCalled();
      expect(component.formularioTotalCount).toHaveBeenCalled();
      expect(component.obtenerTablaDatos).toHaveBeenCalled();
      expect(component.fetchEntidadFederativa).toHaveBeenCalled();
      expect(component.fetchRepresentacionFederal).toHaveBeenCalled();
      expect(component.listaDePaisesDisponibles).toHaveBeenCalled();
    });
  });

  describe('validarYEnviarFormulario', () => {
    it('debería marcar el formulario como tocado si es inválido', () => {
      jest.spyOn(component.partidasDelaMercanciaForm, 'markAllAsTouched');

      component.partidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')?.setValue('');
      component.validarYEnviarFormulario();

      expect(component.partidasDelaMercanciaForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('debería establecer mostrarTabla en true si el formulario es válido', () => {
      component.partidasDelaMercanciaForm.get('cantidadPartidasDeLaMercancia')?.setValue('10');
      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
      expect(MOCK_STORE.setMostrarTabla).toHaveBeenCalledWith(true);
    });
  });

  describe('manejarlaFilaSeleccionada', () => {
    it('debería actualizar las filas seleccionadas en el store', () => {
      const MOCK_ROWS = [{ id: 1, descripcion: 'Test' }] as any;

      component.manejarlaFilaSeleccionada(MOCK_ROWS);

      expect(component.filaSeleccionada).toEqual(MOCK_ROWS);
      expect(MOCK_STORE.storeTableValues).toHaveBeenCalledWith(MOCK_ROWS);
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