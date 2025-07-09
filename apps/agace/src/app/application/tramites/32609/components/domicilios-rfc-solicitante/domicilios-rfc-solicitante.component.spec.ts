import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NumeroEmpleadosBimestreComponent } from './numero-empleados-bimestre.component';
import { createInitialState, Tramite32609Store } from '../../estados/tramites32609.store';
import { Tramite32609Query } from '../../estados/tramites32609.query';
import { of } from 'rxjs';
import { Modal } from 'bootstrap';
import { TipoNotificacionEnum, CategoriaMensaje } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { NumeroEmpleadosTabla } from '../../modelos/oea-textil-registro.model';

describe('NumeroEmpleadosBimestreComponent', () => {
  let fixture: ComponentFixture<NumeroEmpleadosBimestreComponent>;
  let component: NumeroEmpleadosBimestreComponent;
  let tramite32609StoreMock: Partial<Tramite32609Store>;
  let tramite32609QueryMock: Partial<Tramite32609Query>;

  beforeEach(() => {
    tramite32609StoreMock = {
       establecerDatos: jest.fn(),
    };

    tramite32609QueryMock = {
      selectTramite32609$: of({
        ...createInitialState(),
        vehiculosTablaDatos: [],
      }),
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        NumeroEmpleadosBimestreComponent,
        TablaDinamicaComponent,
        TituloComponent,
        NotificacionesComponent,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite32609Store, useValue: tramite32609StoreMock },
        { provide: Tramite32609Query, useValue: tramite32609QueryMock },
      ],
    });

    fixture = TestBed.createComponent(NumeroEmpleadosBimestreComponent);
    component = fixture.componentInstance;
    component.registroDeNumeroEmpleadosElemento = {
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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar formularios y suscribirse a la tienda en ngOnInit', () => {
    expect(component.registroNumeroEmpleadosForm).toBeDefined();
    expect(component.formularioArchivo).toBeDefined();
    expect(component.vehiculosInfoList).toEqual([]);
    expect(component.seccionState).toBeDefined();
  });

  it('Debe inicializar registroNumeroEmpleadosForm con controles y validadores correctos', () => {
    const form = component.registroNumeroEmpleadosForm;
    expect(form.get('id')).toBeDefined();
    expect(form.get('marca')).toBeDefined();
    expect(form.get('modelo')).toBeDefined();
    expect(form.get('vin')).toBeDefined();
    expect(form.valid).toBeFalsy();
  });

  it('Debe inicializar formularioArchivo con los controles y validadores correctos', () => {
    const form = component.formularioArchivo;
    expect(form.get('archivo')).toBeDefined();
    expect(form.valid).toBeFalsy();
  });

  it('Debería reiniciar registroNumeroEmpleadosForm cuando se llama a limpiarFormulario', () => {
    component.registroNumeroEmpleadosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    component.limpiarFormulario();
    expect(component.registroNumeroEmpleadosForm.value).toEqual({
      id: null,
      marca: null,
      modelo: null,
      vin: null,
    });
  });

  it('debería abrir modalArchivo cuando se llame a cargaArchivo', () => {
    const modalShowSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.cargaArchivo();
    expect(modalShowSpy).toHaveBeenCalled();
  });

  it('Debería abrir el modal registroDeNumeroEmpleados cuando se llama a agregarDialogoDatos', () => {
    const modalShowSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.agregarDialogoDatos();
    expect(modalShowSpy).toHaveBeenCalled();
  });

  it('Debería cerrar el modal de registroDeNumeroEmpleados cuando se llama a cambiarEstadoModal', () => {
    const modalHideSpy = jest.spyOn(Modal.prototype, 'hide').mockImplementation(() => {});
    jest.spyOn(Modal, 'getInstance').mockReturnValue({
      hide: modalHideSpy,
    } as any);
    component.cambiarEstadoModal();
    expect(modalHideSpy).toHaveBeenCalled();
  });

  it('Debe marcar todos los controles de formulario como tocados si registroNumeroEmpleadosForm no es válido en enviarDialogData', () => {
    component.enviarDialogData();
    expect(component.registroNumeroEmpleadosForm.get('marca')?.touched).toBe(true);
    expect(component.registroNumeroEmpleadosForm.get('modelo')?.touched).toBe(true);
    expect(component.registroNumeroEmpleadosForm.get('vin')?.touched).toBe(true);
  });

  it('Debe agregar un nuevo vehículo y mostrar la confirmación cuando se llama a enviarDialogData con un formato válido', () => {
    component.registroNumeroEmpleadosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    const cambiarEstadoModalSpy = jest.spyOn(component, 'cambiarEstadoModal');
    component.enviarDialogData();
    expect(component.vehiculosInfoList).toEqual([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ]);
   expect(tramite32609StoreMock.establecerDatos).toHaveBeenCalledWith({
  vehiculosTablaDatos: [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
  ],
});

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
    expect(component.registroNumeroEmpleadosForm.pristine).toBe(true);
  });

  it('Debe actualizar el vehículo existente cuando se llama a vehiculosInfoDatos con la fila seleccionada', () => {
    component.filaSeleccionadaNumeroEmpleados = { id: 1, marca: 'Old', modelo: 'Old', vin: 'OLD123' };
    component.vehiculosInfoList = [{ id: 1, marca: 'Old', modelo: 'Old', vin: 'OLD123' }];
    component.registroNumeroEmpleadosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    component.vehiculosInfoDatos();
    expect(component.vehiculosInfoList).toEqual([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ]);
  expect(tramite32609StoreMock.establecerDatos).toHaveBeenCalledWith({
  vehiculosTablaDatos: [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
  ],
});
    expect(component.filaSeleccionadaNumeroEmpleados).toEqual({});
  });

  it('debe cerrar el modal de confirmación cuando se llama a cerrarModal', () => {
    component.esHabilitarElDialogo = true;
    component.cerrarModal();
    expect(component.esHabilitarElDialogo).toBe(false);
  });

  it('deberia actualizar filaSeleccionadaVehículos en actualizarFilaSeleccionada', () => {
    component.vehiculosInfoList = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ];
    component.filaSeleccionadaNumeroEmpleados = { id: 1, marca: 'Old', modelo: 'Old', vin: 'OLD123' };
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionadaNumeroEmpleados).toEqual({
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
  });

  it('Debería eliminar los vehículos seleccionados en eliminarNumeroEmpleadosItem', () => {
    component.vehiculosInfoList = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
      { id: 2, marca: 'Honda', modelo: 'Civic', vin: '987654321ZYXWVUT' },
    ];
    component.listaFilaSeleccionadaNumeroEmpleados = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ];
    const cerrarSpy = jest.spyOn(component, 'cerrarEliminarConfirmationPopup');
    component.eliminarNumeroEmpleadosItem();
    expect(component.vehiculosInfoList).toEqual([
      { id: 2, marca: 'Honda', modelo: 'Civic', vin: '987654321ZYXWVUT' },
    ]);
    expect(component.listaFilaSeleccionadaNumeroEmpleados).toEqual([]);
  

    expect(cerrarSpy).toHaveBeenCalled();
  });

  it('Debería cerrar la ventana emergente de confirmación de eliminación en cerrarEliminarConfirmationPopup', () => {
    component.confirmEliminarPopupAbierto = true;
    component.cerrarEliminarConfirmationPopup();
    expect(component.confirmEliminarPopupAbierto).toBe(false);
  });


  it('Debería manejar modificarItemNumeroEmpleados correctamente según listaFilaSeleccionadaNumeroEmpleados', () => {
    const actualizarFilaSeleccionadaSpy = jest.spyOn(component, 'actualizarFilaSeleccionada').mockImplementation(() => {});
    const agregarDialogoDatosSpy = jest.spyOn(component, 'agregarDialogoDatos').mockImplementation(() => {});
    const patchModifiedDataSpy = jest.spyOn(component, 'patchModifyiedData').mockImplementation(() => {});
    component.listaFilaSeleccionadaNumeroEmpleados = [];
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
    component.modificarItemNumeroEmpleados();

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

    component.listaFilaSeleccionadaNumeroEmpleados = [
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
    component.modificarItemNumeroEmpleados();

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
    component.listaFilaSeleccionadaNumeroEmpleados = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', vin: '123456789ABCDEFG' },
    ];

    component.multipleSeleccionPopupAbierto = false;
    component.modificarItemNumeroEmpleados();

  });
  it('Debe parchear el formulario con los datos del vehículo seleccionado en patchModifiedData', () => {
    component.filaSeleccionadaNumeroEmpleados = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    };
    component.patchModifyiedData();
    expect(component.registroNumeroEmpleadosForm.value).toEqual({
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
  });

  it('Debería mostrarse una notificación si no se ha seleccionado nada al confirmarEliminarNumeroEmpleadosItem', () => {
    component.listaFilaSeleccionadaNumeroEmpleados = [];
    component.confirmEliminarNumeroEmpleadosItem();
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

  it('Debería abrir la ventana emergente de confirmación de eliminación en abrirEliminarConfirmationPopup', () => {
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

  it('Debería cerrar la ventana emergente de selección múltiple en cerrarMultipleSeleccionPopup', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
  });

  it('Debe devolver verdadero para controles no válidos y tocados en esInvalido', () => {
    component.registroNumeroEmpleadosForm.get('marca')?.setErrors({ required: true });
    component.registroNumeroEmpleadosForm.get('marca')?.markAsTouched();
    expect(component.esInvalido('marca')).toBe(true);
    expect(component.esInvalido('modelo')).toBe(false);
  });
});