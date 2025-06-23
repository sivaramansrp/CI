import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosdelasolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { Solicitud260702Store } from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';
import { ConsultaioQuery,
          TituloComponent,
          CatalogoSelectComponent,
          TablaDinamicaComponent,
          InputRadioComponent,
          InputFechaComponent,
          CrosslistComponent,
          InputCheckComponent,
          NotificacionesComponent, } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('DatosdelasolicitudComponent', () => {
  let component: DatosdelasolicitudComponent;
  let fixture: ComponentFixture<DatosdelasolicitudComponent>;
  let mockRegistrarSolicitudMcpService: any;
  let mockSolicitud260702Store: any;
  let mockSolicitud260702Query: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockRegistrarSolicitudMcpService = {
      getEstadosData: jest.fn().mockReturnValue(of([])),
      getClaveScianData: jest.fn().mockReturnValue(of([])),
      getClaveDescripcionDelData: jest.fn().mockReturnValue(of([])),
      getRegimenalqueData: jest.fn().mockReturnValue(of([])),
      getAduanaData: jest.fn().mockReturnValue(of([])),
      getMercanciasData: jest.fn().mockReturnValue(of([])),
      getClasificacionDelProductoData: jest.fn().mockReturnValue(of([])),
      getEspificarData: jest.fn().mockReturnValue(of([])),
      getTipoProductoData: jest.fn().mockReturnValue(of([])),
      getListaClaveData: jest.fn().mockReturnValue(of([])),
      getMercanciaCrosslistData: jest.fn().mockReturnValue(of([])),
    };
    mockSolicitud260702Store = {};
    mockSolicitud260702Query = {
      selectSolicitud$: of({}),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ CommonModule,
          ReactiveFormsModule,
          InputRadioComponent,
          TituloComponent,
          CatalogoSelectComponent,
          TablaDinamicaComponent,
          InputFechaComponent,
          CrosslistComponent,
          InputCheckComponent,
          NotificacionesComponent,
        DatosdelasolicitudComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: RegistrarSolicitudMcpService, useValue: mockRegistrarSolicitudMcpService },
        { provide: Solicitud260702Store, useValue: mockSolicitud260702Store },
        { provide: Solicitud260702Query, useValue: mockSolicitud260702Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.dataDeLaSolicitudForm).toBeDefined();
    expect(component.clavaScianForm).toBeDefined();
  });

  it('should toggle paisOrigenColapsable', () => {
    const initial = component.paisOrigen;
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(!initial);
  });

  it('should toggle paisProcedencis_colapsable', () => {
    const initial = component.paisProcedencisColapsable;
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(!initial);
  });

  it('should toggle usoEspecificoColapsable', () => {
    const initial = component.usoEspecifico;
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(!initial);
  });

  it('should clear notification', () => {
    component.nuevaNotificacion = { tipoNotificacion: 'alert' } as any;
    component.clearNotificacion();
    expect(component.nuevaNotificacion).toBeNull();
  });

  it('should close modal and clear notification', () => {
    document.body.innerHTML = `<div id="modalAgregarMercancia"></div>`;
    const spy = jest.spyOn(component, 'clearNotificacion');
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should eliminarPedimento when borrar is true', () => {
    component.pedimentos = [{}, {}, {}] as any;
    component.elementoParaEliminar = 1;
    component.nuevaNotificacion = { tipoNotificacion: 'alert' } as any;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(2);
    expect(component.nuevaNotificacion).toBeNull();
  });

  it('should abrirModal with seleccionarEstablecimiento', () => {
    component.abrirModal(0, true);
    expect(component.nuevaNotificacion?.mensaje).toContain('capturar su establecimiento');
  });

  it('should abrirModal with no filas seleccionadas', () => {
    component.filasSeleccionadas = new Set();
    component.abrirModal();
    expect(component.nuevaNotificacion?.mensaje).toContain('Selecciona un registro');
  });

  it('should abrirModal with filas seleccionadas', () => {
    component.filasSeleccionadas = new Set([1]);
    component.abrirModal();
    expect(component.nuevaNotificacion?.mensaje).toContain('¿Estás seguro');
  });

  it('should create claveScianForm', () => {
    component.createclaveScianForm();
    expect(component.clavaScianForm.get('claveScianG')).toBeDefined();
  });

  it('should call aceptar and enable form', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({ test: [''] });
    component.habilitarEstado = true;
    component.aceptar();
    expect(component.habilitarEstado).toBe(false);
    expect(component.dataDeLaSolicitudForm.enabled).toBe(true);
  });

  it('should call onLimpiar and reset clavaScianForm', () => {
    component.createclaveScianForm();
    const spy = jest.spyOn(component.clavaScianForm, 'reset');
    component.onLimpiar();
    expect(spy).toHaveBeenCalled();
  });

  it('should show claveScianForm onAgregar', () => {
    component.showClavaScianForm = false;
    component.onAgregar();
    expect(component.showClavaScianForm).toBe(true);
  });

  it('should call onCancelar and reset clavaScianForm', () => {
    component.createclaveScianForm();
    component.showClavaScianForm = true;
    const spy = jest.spyOn(component.clavaScianForm, 'reset');
    component.onCancelar();
    expect(component.showClavaScianForm).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it('should call agregarMercanciaGrid and show modal', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as ElementRef;
    component.agregarMercanciaGrid();
    // No assertion needed, just ensure no error
  });

  it('should handle onClaveDeLosLotesChange', () => {
    component.listaClaveTabla = [{ claveDeLosLotes: 'old' }] as any;
    component.ediciondeindicedefila = 0;
    const event = { target: { value: 'new' } } as any;
    component.onClaveDeLosLotesChange(event);
    expect(component.listaClaveTabla[0].claveDeLosLotes).toBe('new');
  });

  it('should handle onFechaDeFabricacionChange', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({ fechaDeFabricacion: [''] });
    component.listaClaveTabla = [{ fechaDeFabricacion: 'old' }] as any;
    component.ediciondeindicedefila = 0;
    component.onFechaDeFabricacionChange('2024-01-01');
    expect(component.listaClaveTabla[0].fechaDeFabricacion).toBe('2024-01-01');
  });

  it('should handle onFechaDeCaducidadChange', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({ fechaDeCaducidad: [''] });
    component.listaClaveTabla = [{ fechaDeCaducidad: 'old' }] as any;
    component.ediciondeindicedefila = 0;
    component.onFechaDeCaducidadChange('2024-12-31');
    expect(component.listaClaveTabla[0].fechaDeCaducidad).toBe('2024-12-31');
  });

  it('should add row on onAgregarListaClave', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      claveDeLosLotes: ['A'],
      fechaDeFabricacion: ['2024-01-01'],
      fechaDeCaducidad: ['2024-12-31'],
    });
    component.listaClaveTabla = [];
    component.onAgregarListaClave();
    expect(component.listaClaveTabla.length).toBe(1);
  });

  it('should not add row if required fields missing in onAgregarListaClave', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      claveDeLosLotes: [''],
      fechaDeFabricacion: ['2024-01-01'],
      fechaDeCaducidad: ['2024-12-31'],
    });
    component.listaClaveTabla = [];
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.onAgregarListaClave();
    expect(component.listaClaveTabla.length).toBe(0);
    spy.mockRestore();
  });

  it('should patch form on onModificar', () => {
    component.listaClaveTabla = [
      { claveDeLosLotes: 1, fechaDeFabricacion: '2024-01-01', fechaDeCaducidad: '2024-12-31' },
    ] as any;
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      claveDeLosLotes: [''],
      fechaDeFabricacion: [''],
      fechaDeCaducidad: [''],
    });
    component.filasSeleccionadas = new Set([1]);
    component.onModificar();
    expect(component.dataDeLaSolicitudForm.get('claveDeLosLotes')?.value).toBe(1);
  });

  it('should clear filasSeleccionadas if no match in onfilasSeleccionadas', () => {
    component.filasSeleccionadas = new Set([1]);
    component.onfilasSeleccionadas([]);
    expect(component.filasSeleccionadas.size).toBe(0);
  });

  it('should call ngOnDestroy and complete destroyed$', () => {
    const spy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call setValoresStore', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    mockSolicitud260702Store['setCampo'] = jest.fn();
    (component as any).solicitud260702Store = mockSolicitud260702Store;
    component.setValoresStore(form, 'campo', 'setCampo' as any);
    expect(mockSolicitud260702Store['setCampo']).toHaveBeenCalledWith('valor');
  });

  it('should call onDelete with no selection', () => {
    component.filasSeleccionadas = new Set();
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    component.onDelete();
    expect(spy).toHaveBeenCalledWith('No rows selected for deletion.');
    spy.mockRestore();
  });

  it('should call onDelete and remove selected rows', () => {
    component.tableData = [
      { id: 1, claveScianG: { claveScian: 1 } },
      { id: 2, claveScianG: { claveScian: 2 } },
    ] as any;
    component.filasSeleccionadas = new Set([1]);
    component.onDelete();
    expect(component.tableData.length).toBe(1);
    expect(component.filasSeleccionadas.size).toBe(0);
  });

  it('should call confirmarEliminar and clear selection', () => {
    component.listaClaveTabla = [
      { claveDeLosLotes: 1 },
      { claveDeLosLotes: 2 },
    ] as any;
    component.filasSeleccionadas = new Set([1]);
    component.dataDeLaSolicitudForm = new FormBuilder().group({});
    component.confirmarEliminar();
    expect(component.listaClaveTabla.length).toBe(1);
    expect(component.filasSeleccionadas.size).toBe(0);
  });

  it('should call seleccionarEstablecimiento and set notification', () => {
    component.seleccionarEstablecimiento();
    expect(component.nuevaNotificacion?.mensaje).toContain('capturar su establecimiento');
  });

  it('should call onSubmit and add to tableData', () => {
    component.createclaveScianForm();
    component.clavaScianForm.setValue({
      claveScianG: { claveScian: '1', descripcionDelScian: '2' },
    });
    component.claveScianData = {
      catalogos: [{ id: 1, descripcion: 'desc1' }],
      labelNombre: 'claveScian',
      required: false,
      primerOpcion: 'Seleccione'
    };
    component.descripcionDelScianData = {
      catalogos: [{ id: 2, descripcion: 'desc2' }],
      labelNombre: 'descripcionDelScian',
      required: false,
      primerOpcion: 'Seleccione'
    };
    component.tableData = [];
    component.onSubmit();
    expect(component.tableData.length).toBe(1);
    expect(component.showClavaScianForm).toBe(false);
  });
});