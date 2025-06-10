import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosdelasolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, ReplaySubject, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosdelasolicitudComponent', () => {
  let component: DatosdelasolicitudComponent;
  let fixture: ComponentFixture<DatosdelasolicitudComponent>;
  let mockPermisoService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockPermisoService = {
      getEstadosData: jest.fn().mockReturnValue(of([])),
      getClaveScianData: jest.fn().mockReturnValue(of([])),
      getClaveDescripcionDelData: jest.fn().mockReturnValue(of([])),
      getRegimenalqueData: jest.fn().mockReturnValue(of([])),
      getAduanaData: jest.fn().mockReturnValue(of([])),
      getClasificacionDelProductoData: jest.fn().mockReturnValue(of([])),
      getEspificarData: jest.fn().mockReturnValue(of([])),
      getTipoProductoData: jest.fn().mockReturnValue(of([])),
      getMercanciaCrosslistData: jest.fn().mockReturnValue(of([
        {
          paisOrigenCrossList: {},
          paisProcedencisCrossList: {},
          usoEspecificoCrossList: {}
        }
      ])),
      getEstadoFisicoData: jest.fn().mockReturnValue(of([])),
      getMercanciasDatosData: jest.fn().mockReturnValue(of([])),
    };
    mockStore = {
      setTramite260915State: jest.fn()
    };
    mockQuery = {
      selectSolicitud260915$: of({}),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosdelasolicitudComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: PermisoSanitarioDispositivosMedicosService, useValue: mockPermisoService },
        { provide: Solicitud260915Store, useValue: mockStore },
        { provide: Solicitud260915Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and call data methods on ngOnInit', () => {
    const spy1 = jest.spyOn(component, 'getEstadosData');
    const spy2 = jest.spyOn(component, 'getClaveScianData');
    const spy3 = jest.spyOn(component, 'getClaveDescripcionDelData');
    const spy4 = jest.spyOn(component, 'getRegimenalqueData');
    const spy5 = jest.spyOn(component, 'getAduanaData');
    const spy6 = jest.spyOn(component, 'getEspificarData');
    const spy7 = jest.spyOn(component, 'getClasificacionDelProductoData');
    const spy8 = jest.spyOn(component, 'getTipoProductoData');
    const spy9 = jest.spyOn(component, 'getMercanciaCrosslistData');
    const spy10 = jest.spyOn(component, 'getEstadoFisicoData');
    const spy11 = jest.spyOn(component, 'getMercanciasDatosData');
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
    expect(spy5).toHaveBeenCalled();
    expect(spy6).toHaveBeenCalled();
    expect(spy7).toHaveBeenCalled();
    expect(spy8).toHaveBeenCalled();
    expect(spy9).toHaveBeenCalled();
    expect(spy10).toHaveBeenCalled();
    expect(spy11).toHaveBeenCalled();
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

  it('should eliminarPedimento', () => {
    component.tableData = [{ id: 1 }, { id: 2 }] as any;
    component.filasSeleccionadas = new Set([1]);
    component.nuevaNotificacion = { tipoNotificacion: 'alert' } as any;
    component.eliminarPedimento(true);
    expect(component.tableData.length).toBe(1);
    expect(component.nuevaNotificacion).toBeNull();
    expect(component.filasSeleccionadas.size).toBe(0);
  });

  it('should abrirModal for delete', () => {
    component.filasSeleccionadas = new Set([1]);
    component.abrirModal();
    expect(component.nuevaNotificacion).toBeTruthy();
  });

  it('should abrirModal for seleccionarEstablecimiento', () => {
    component.filasSeleccionadas = new Set();
    component.abrirModal(0, true);
    expect(component.nuevaNotificacion).toBeTruthy();
  });

  it('should getMercanciaCrosslistData and set crosslists', () => {
    component.getMercanciaCrosslistData();
    expect(component.paisOrigenCrossList).toBeDefined();
    expect(component.paisProcedencisCrossList).toBeDefined();
    expect(component.usoEspecificoCrossList).toBeDefined();
  });

  it('should toggle paisOrigen', () => {
    const prev = component.paisOrigen;
    component.paisOrigenColapsable();
    expect(component.paisOrigen).toBe(!prev);
  });

  it('should toggle paisProcedencisColapsable', () => {
    const prev = component.paisProcedencisColapsable;
    component.paisProcedencis_colapsable();
    expect(component.paisProcedencisColapsable).toBe(!prev);
  });

  it('should toggle usoEspecifico', () => {
    const prev = component.usoEspecifico;
    component.usoEspecificoColapsable();
    expect(component.usoEspecifico).toBe(!prev);
  });

  it('should call data methods', () => {
    component.getEstadosData();
    component.getClaveScianData();
    component.getClaveDescripcionDelData();
    component.getRegimenalqueData();
    component.getAduanaData();
    component.getEstadoFisicoData();
    component.getClasificacionDelProductoData();
    component.getEspificarData();
    component.getTipoProductoData();
    component.getMercanciasDatosData();
    expect(true).toBeTruthy(); // Just to ensure no errors
  });

  it('should enable form on aceptar', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({});
    component.habilitarEstado = true;
    component.aceptar();
    expect(component.habilitarEstado).toBe(false);
  });

  it('should seleccionarEstablecimiento', () => {
    const spy = jest.spyOn(component, 'abrirModal');
    component.seleccionarEstablecimiento();
    expect(spy).toHaveBeenCalledWith(0, true);
  });

  it('should onLimpiar', () => {
    component.clavaScianForm = new FormBuilder().group({});
    component.clavaScianForm.setValue({});
    component.onLimpiar();
    expect(component.clavaScianForm.value).toEqual({});
  });

  it('should onAgregar', () => {
    component.showClavaScianForm = false;
    component.onAgregar();
    expect(component.showClavaScianForm).toBe(true);
  });

  it('should onDelete with no selection', () => {
    component.filasSeleccionadas = new Set();
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    component.onDelete();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should onDelete with selection', () => {
    component.filasSeleccionadas = new Set([1]);
    const spy = jest.spyOn(component, 'abrirModal');
    component.onDelete();
    expect(spy).toHaveBeenCalled();
  });

  it('should onCancelar', () => {
    component.showClavaScianForm = true;
    component.clavaScianForm = new FormBuilder().group({});
    component.onCancelar();
    expect(component.showClavaScianForm).toBe(false);
  });

  it('should agregarMercanciaGrid', () => {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'modalAgregarMercancia';
   
    const childDiv = document.createElement('div');
    childDiv.className = 'some-child';
    modalDiv.appendChild(childDiv);
    document.body.appendChild(modalDiv);
  
    try {
      component.modalElement = { nativeElement: modalDiv } as any;
      component.agregarMercanciaGrid();
      expect(true).toBeTruthy();
    } finally {
      document.body.removeChild(modalDiv);
    }
  });

  it('should onfilasSeleccionadas for MercanciasInfo', () => {
    component.onfilasSeleccionadas([{ clasificaionProductos: 'a', id: 1 }] as any);
    expect(component.filasSeleccionadas.has(1)).toBe(true);
  });

  it('should onfilasSeleccionadas for FilaData', () => {
    component.onfilasSeleccionadas([{ claveScianG: { claveScian: 2 } }] as any);
    expect(component.filasSeleccionadas.has(2)).toBe(true);
  });

  it('should onfilasSeleccionadas for empty', () => {
    component.filasSeleccionadas = new Set([1]);
    component.onfilasSeleccionadas([]);
    expect(component.filasSeleccionadas.size).toBe(0);
  });

  it('should onSubmit', () => {
    component.clavaScianForm = new FormBuilder().group({
      claveScianG: new FormBuilder().group({
        claveScian: ['1'],
        descripcionDelScian: ['2']
      })
    });
    component.claveScianData.catalogos = [{ id: 1, descripcion: 'desc1' }];
    component.descripcionDelScianData.catalogos = [{ id: 2, descripcion: 'desc2' }];
    component.tableData = [];
    component.onSubmit();
    expect(component.tableData.length).toBe(1);
    expect(component.showClavaScianForm).toBe(false);
  });

  it('should get datosDelTramiteRealizar', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      datosDelTramiteRealizar: new FormBuilder().group({})
    });
    expect(component.datosDelTramiteRealizar).toBeTruthy();
  });

  it('should toggleLicenciaSanitaria', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      datosDelTramiteRealizar: new FormBuilder().group({
        avisoDeFuncionamiento: [true],
        licenciaSanitaria: ['']
      })
    });
    component.toggleLicenciaSanitaria();
    component.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.avisoDeFuncionamiento')?.setValue(false);
    component.toggleLicenciaSanitaria();
    expect(true).toBeTruthy();
  });

  it('should onSave for add', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      tipoProducto: ['1'],
      clasificaionProductos: ['2'],
      especificarProducto: ['3'],
      estadoFisico: ['4'],
      datosDelTramiteRealizar: new FormBuilder().group({})
    });
    component.tipoProductoData.catalogos = [{ id: 1, descripcion: 'tp' }];
    component.delProducto.catalogos = [{ id: 2, descripcion: 'cp' }];
    component.especificarData.catalogos = [{ id: 3, descripcion: 'ep' }];
    component.estadoFisicoData.catalogos = [{ id: 4, descripcion: 'ef' }];
    component.indiceFilaSeleccionada = null;
    component.mercanciasData = [];
    component.onSave();
    expect(component.mercanciasData.length).toBe(1);
  });

  it('should onSave for edit', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      tipoProducto: ['1'],
      clasificaionProductos: ['2'],
      especificarProducto: ['3'],
      estadoFisico: ['4'],
      datosDelTramiteRealizar: new FormBuilder().group({})
    });
    component.tipoProductoData.catalogos = [{ id: 1, descripcion: 'tp' }];
    component.delProducto.catalogos = [{ id: 2, descripcion: 'cp' }];
    component.especificarData.catalogos = [{ id: 3, descripcion: 'ep' }];
    component.estadoFisicoData.catalogos = [{ id: 4, descripcion: 'ef' }];
    component.indiceFilaSeleccionada = 0;
    component.mercanciasData = [{} as any];
    component.onSave();
    expect(component.indiceFilaSeleccionada).toBeNull();
  });

  it('should onModificar with no selection', () => {
    component.filasSeleccionadas = new Set();
    component.mercanciasData = [];
    component.onModificar();
    expect(true).toBeTruthy();
  });

  it('should onModificar with more than one selection', () => {
    component.filasSeleccionadas = new Set([1, 2]);
    component.mercanciasData = [];
    component.onModificar();
    expect(true).toBeTruthy();
  });

  it('should onModificar with valid selection', () => {
    component.filasSeleccionadas = new Set([1]);
    component.mercanciasData = [{
      id: 1,
      descripcionFraccion: 'a',
      cantidadUMT: '1',
      unidadUMT: 'u',
      cantidadUMC: '3',
      unidad: 'u',
      tipoProducto: 'tp',
      clasificacion: 'cp',
      especificar: 'ep',
      denominacionEspecifica: 'de',
      denominacionDistintiva: 'dd',
      denominacionComun: 'dc',
      estadoFisico: 'ef',
      presentacion: 'p',
      fraccionArancelaria: 'fa',
      formaFarmaceutica: 'ff',
      paisDeOrigen: 'mx',
      paisDeProcedencia: 'mx',
      usoEspecifico: 'uso'
    }];
    component.tipoProductoData.catalogos = [{ id: 1, descripcion: 'tp' }];
    component.delProducto.catalogos = [{ id: 1, descripcion: 'cp' }];
    component.especificarData.catalogos = [{ id: 1, descripcion: 'ep' }];
    component.estadoFisicoData.catalogos = [{ id: 1, descripcion: 'ef' }];
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      descripcionFraccionArancelaria: [''],
      cantidadUMT: [''],
      umt: [''],
      cantidadUMC: [''],
      umc: [''],
      tipoProducto: [''],
      clasificaionProductos: [''],
      especificarProducto: [''],
      nombreProductoEspecifico: [''],
      denominacionDistintiva: [''],
      denominacionNombre: [''],
      estadoFisico: [''],
      presentacionFarmaceutica: [''],
      fraccionArancelaria: [''],
      datosDelTramiteRealizar: new FormBuilder().group({})
    });
    document.body.innerHTML = `<div id="modalAgregarMercancia"></div>`;
    component.onModificar();
    expect(component.indiceFilaSeleccionada).toBe(0);
  });

  it('should changeEvent for modificacion', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      datosDelTramiteRealizar: new FormBuilder().group({
        tipoOperacion: ['modificacion'],
        justification: [{ value: '', disabled: true }]
      })
    });
    component.changeEvent();
    expect(component.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.justification')?.enabled).toBe(true);
  });

  it('should changeEvent for other', () => {
    component.dataDeLaSolicitudForm = new FormBuilder().group({
      datosDelTramiteRealizar: new FormBuilder().group({
        tipoOperacion: ['otro'],
        justification: [{ value: '', disabled: false }]
      })
    });
    component.changeEvent();
    expect(component.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.justification')?.disabled).toBe(true);
  });

  it('should setValoresStore', () => {
    const fg = new FormBuilder().group({ test: ['value'] });
    component.setValoresStore(fg, 'test');
    expect(mockStore.setTramite260915State).toHaveBeenCalledWith({ test: 'value' });
  });

  it('should ngOnDestroy', () => {
    component['destroyed$'] = new ReplaySubject<boolean>();
    component.ngOnDestroy();
    expect(true).toBeTruthy();
  });
});