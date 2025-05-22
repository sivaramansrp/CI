import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { VehiculosComponent } from './vehiculos.component';
import { createInitialState, Tramite30401Store } from '../../estados/tramites30401.store';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { of } from 'rxjs';
import { Modal } from 'bootstrap';
import { TipoNotificacionEnum, CategoriaMensaje } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { VehiculosTabla } from '../../modelos/registro-empresas-transporte.model';

describe('VehiculosComponent', () => {
  let fixture: ComponentFixture<VehiculosComponent>;
  let component: VehiculosComponent;
  let tramite30401StoreMock: Partial<Tramite30401Store>;
  let tramite30401QueryMock: Partial<Tramite30401Query>;

  beforeEach(() => {
    tramite30401StoreMock = {
      setVehiculosTablaDatos: jest.fn(),
    };

    tramite30401QueryMock = {
      selectTramite30401$: of({
        ...createInitialState(),
        vehiculosTablaDatos: [],
      }),
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        VehiculosComponent,
        TablaDinamicaComponent,
        TituloComponent,
        NotificacionesComponent,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite30401Store, useValue: tramite30401StoreMock },
        { provide: Tramite30401Query, useValue: tramite30401QueryMock },
      ],
    });

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    component.registroDeVehiculosElemento = {
      nativeElement: document.createElement('div'),
    } as any;
    component.modalArchivo = {
      nativeElement: document.createElement('div'),
    } as any;
    component.confirmacionElemento = {
      nativeElement: document.createElement('div'),
    } as any;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and subscribe to store on ngOnInit', () => {
    expect(component.registroVehiculosForm).toBeDefined();
    expect(component.formularioArchivo).toBeDefined();
    expect(component.vehiculosInfoList).toEqual([]);
    expect(component.seccionState).toBeDefined();
  });

  it('should initialize registroVehiculosForm with correct controls and validators', () => {
    const form = component.registroVehiculosForm;
    expect(form.get('id')).toBeDefined();
    expect(form.get('marca')).toBeDefined();
    expect(form.get('modelo')).toBeDefined();
    expect(form.get('vin')).toBeDefined();
    expect(form.valid).toBeFalsy();
  });

  it('should initialize formularioArchivo with correct controls and validators', () => {
    const form = component.formularioArchivo;
    expect(form.get('archivo')).toBeDefined();
    expect(form.valid).toBeFalsy();
  });

  it('should reset registroVehiculosForm when limpiarFormulario is called', () => {
    component.registroVehiculosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    component.limpiarFormulario();
    expect(component.registroVehiculosForm.value).toEqual({
      id: null,
      marca: null,
      modelo: null,
      vin: null,
    });
  });

  it('should open modalArchivo when cargaArchivo is called', () => {
    const modalShowSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.cargaArchivo();
    expect(modalShowSpy).toHaveBeenCalled();
  });

  it('should open registroDeVehiculos modal when agregarDialogoDatos is called', () => {
    const modalShowSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.agregarDialogoDatos();
    expect(modalShowSpy).toHaveBeenCalled();
  });

  it('should close registroDeVehiculos modal when cambiarEstadoModal is called', () => {
    const modalHideSpy = jest.spyOn(Modal.prototype, 'hide').mockImplementation(() => {});
    jest.spyOn(Modal, 'getInstance').mockReturnValue({
      hide: modalHideSpy,
    } as any);
    component.cambiarEstadoModal();
    expect(modalHideSpy).toHaveBeenCalled();
  });

  it('should mark all form controls as touched if registroVehiculosForm is invalid on enviarDialogData', () => {
    component.enviarDialogData();
    expect(component.registroVehiculosForm.get('marca')?.touched).toBe(true);
    expect(component.registroVehiculosForm.get('modelo')?.touched).toBe(true);
    expect(component.registroVehiculosForm.get('vin')?.touched).toBe(true);
  });

  it('should add new vehicle and show confirmation when enviarDialogData is called with valid form', () => {
    component.registroVehiculosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    const cambiarEstadoModalSpy = jest.spyOn(component, 'cambiarEstadoModal');
    component.enviarDialogData();
    expect(component.vehiculosInfoList).toEqual([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ]);
    expect(tramite30401StoreMock.setVehiculosTablaDatos).toHaveBeenCalledWith([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ]);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: component.CONFIRMACION_VEHICULO,
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    });
    expect(component.esHabilitarElDialogo).toBe(true);
    expect(cambiarEstadoModalSpy).toHaveBeenCalled();
    expect(component.registroVehiculosForm.pristine).toBe(true);
  });

  it('should update existing vehicle when vehiculosInfoDatos is called with selected row', () => {
    component.filaSeleccionadaVehiculos = { id: 1, marca: 'Old', modelo: 'Old', vin: 'OLD123' };
    component.vehiculosInfoList = [{ id: 1, marca: 'Old', modelo: 'Old', vin: 'OLD123' }];
    component.registroVehiculosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    component.vehiculosInfoDatos();
    expect(component.vehiculosInfoList).toEqual([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ]);
    expect(tramite30401StoreMock.setVehiculosTablaDatos).toHaveBeenCalledWith([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ]);
    expect(component.filaSeleccionadaVehiculos).toEqual({});
  });

  it('should close confirmation modal when cerrarModal is called', () => {
    component.esHabilitarElDialogo = true;
    component.cerrarModal();
    expect(component.esHabilitarElDialogo).toBe(false);
  });

  it('should update filaSeleccionadaVehiculos in actualizarFilaSeleccionada', () => {
    component.vehiculosInfoList = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ];
    component.filaSeleccionadaVehiculos = { id: 1, marca: 'Old', modelo: 'Old', vin: 'OLD123' };
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionadaVehiculos).toEqual({
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
  });

  it('should delete selected vehicles in eliminarVehiculosItem', () => {
    component.vehiculosInfoList = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
      { id: 2, marca: 'Honda', modelo: 'Civic', vin: '987654321ZYXWVUT' },
    ];
    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ];
    const cerrarSpy = jest.spyOn(component, 'cerrarEliminarConfirmationPopup');
    component.eliminarVehiculosItem();
    expect(component.vehiculosInfoList).toEqual([
      { id: 2, marca: 'Honda', modelo: 'Civic', vin: '987654321ZYXWVUT' },
    ]);
    expect(component.listaFilaSeleccionadaVehiculos).toEqual([]);
    expect(tramite30401StoreMock.setVehiculosTablaDatos).toHaveBeenCalledWith([
      { id: 2, marca: 'Honda', modelo: 'Civic', vin: '987654321ZYXWVUT' },
    ]);
    expect(cerrarSpy).toHaveBeenCalled();
  });

  it('should close eliminar confirmation popup in cerrarEliminarConfirmationPopup', () => {
    component.confirmEliminarPopupAbierto = true;
    component.cerrarEliminarConfirmationPopup();
    expect(component.confirmEliminarPopupAbierto).toBe(false);
  });


  it('should handle modificarItemVehiculos correctly based on listaFilaSeleccionadaVehiculos', () => {
    const actualizarFilaSeleccionadaSpy = jest.spyOn(component, 'actualizarFilaSeleccionada').mockImplementation(() => {});
    const agregarDialogoDatosSpy = jest.spyOn(component, 'agregarDialogoDatos').mockImplementation(() => {});
    const patchModifiedDataSpy = jest.spyOn(component, 'patchModifyiedData').mockImplementation(() => {});
    component.listaFilaSeleccionadaVehiculos = [];
    component.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: '',
      cerrar: false,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
    };
    component.multipleSeleccionPopupAbierto = false;
    component.modificarItemVehiculos();

    expect(component.multipleSeleccionPopupAbierto).toBe(true);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: 'Selecciona un registro',
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    });
    expect(actualizarFilaSeleccionadaSpy).not.toHaveBeenCalled();
    expect(agregarDialogoDatosSpy).not.toHaveBeenCalled();
    expect(patchModifiedDataSpy).not.toHaveBeenCalled();
    actualizarFilaSeleccionadaSpy.mockReset();
    agregarDialogoDatosSpy.mockReset();
    patchModifiedDataSpy.mockReset();
    component.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: '',
      cerrar: false,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
    };
    component.multipleSeleccionPopupAbierto = false;

    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
      { id: 2, marca: 'Honda', modelo: 'Civic', vin: '987654321ZYXWVUT' },
    ];
    component.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: '',
      cerrar: false,
      txtBtnAceptar: '',
      txtBtnCancelar: '',
    };
    component.multipleSeleccionPopupAbierto = false;
    component.modificarItemVehiculos();

    expect(component.multipleSeleccionPopupAbierto).toBe(true);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: 'Selecciona sólo un registro para modificar.',
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    });
    expect(actualizarFilaSeleccionadaSpy).not.toHaveBeenCalled();
    expect(agregarDialogoDatosSpy).not.toHaveBeenCalled();
    expect(patchModifiedDataSpy).not.toHaveBeenCalled();
    actualizarFilaSeleccionadaSpy.mockReset();
    agregarDialogoDatosSpy.mockReset();
    patchModifiedDataSpy.mockReset();
    
    component.multipleSeleccionPopupAbierto = false;
    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ];

    component.multipleSeleccionPopupAbierto = false;
    component.modificarItemVehiculos();

  });
  it('should patch form with selected vehicle data in patchModifiedData', () => {
    component.filaSeleccionadaVehiculos = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    };
    component.patchModifyiedData();
    expect(component.registroVehiculosForm.value).toEqual({
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
  });

  it('should show notification for no selection in confirmEliminarVehiculosItem', () => {
    component.listaFilaSeleccionadaVehiculos = [];
    component.confirmEliminarVehiculosItem();
    expect(component.multipleSeleccionPopupAbierto).toBe(true);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: 'Debes seleccionar al menos un registro para eliminar.',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    });
  });

  it('should open eliminar confirmation popup in abrirEliminarConfirmationPopup', () => {
    component.abrirElimninarConfirmationopup();
    expect(component.confirmEliminarPopupAbierto).toBe(true);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ERROR,
      modo: 'modal',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    });
  });

  it('should close multiple selection popup in cerrarMultipleSeleccionPopup', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
  });

  it('should return true for invalid and touched controls in esInvalido', () => {
    component.registroVehiculosForm.get('marca')?.setErrors({ required: true });
    component.registroVehiculosForm.get('marca')?.markAsTouched();
    expect(component.esInvalido('marca')).toBe(true);
    expect(component.esInvalido('modelo')).toBe(false);
  });
});