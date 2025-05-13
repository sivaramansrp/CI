import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { VehiculosComponent } from './vehiculos.component';
import { createInitialState, Tramite30401Store } from '../../estados/tramites30401.store';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { of } from 'rxjs';
import { Modal } from 'bootstrap';

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
      }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, VehiculosComponent],
      providers: [
        FormBuilder,
        { provide: Tramite30401Store, useValue: tramite30401StoreMock },
        { provide: Tramite30401Query, useValue: tramite30401QueryMock },
      ],
    });

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;

    // Mock the modal element
    component.registroDeVehiculosElemento = {
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

  it('should initialize the form on creation', () => {
    expect(component.registroVehiculosForm).toBeDefined();
    expect(component.registroVehiculosForm.valid).toBeFalsy();
  });

  it('should reset the form when limpiarFormulario is called', () => {
    component.registroVehiculosForm.patchValue({
      marca: 'Toyota',
    });
    component.limpiarFormulario();
    expect(component.registroVehiculosForm.value.marca).toBeNull();
  });

  it('should close the modal when cambiarEstadoModal is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'hide').mockImplementation(() => {});
    jest.spyOn(Modal, 'getInstance').mockReturnValue({
      hide: modalSpy,
    } as any);

    component.cambiarEstadoModal();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should add a new vehicle to vehiculosInfoList when vehiculosInfoDatos is called', () => {
    component.registroVehiculosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    component.vehiculosInfoDatos();
    expect(component.vehiculosInfoList.length).toBe(1);
    expect(component.vehiculosInfoList[0].marca).toBe('Toyota');
    expect(tramite30401StoreMock.setVehiculosTablaDatos).toHaveBeenCalled();
  });

  it('should update an existing vehicle when vehiculosInfoDatos is called with a selected row', () => {
    component.filaSeleccionadaVehiculos = { id: 1 } as any;
    component.vehiculosInfoList = [{ id: 1, marca: 'Old' } as any];
    component.registroVehiculosForm.patchValue({
      marca: 'Updated',
    });
    component.vehiculosInfoDatos();
    expect(component.vehiculosInfoList[0].marca).toBe('Updated');
  });

  it('should open the modal when agregarDialogoDatos is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.agregarDialogoDatos();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should mark all form controls as touched if form is invalid on enviarDialogData', () => {
    component.enviarDialogData();
    expect(component.registroVehiculosForm.get('marca')?.touched).toBe(true);
    expect(component.registroVehiculosForm.get('modelo')?.touched).toBe(true);
    expect(component.registroVehiculosForm.get('vin')?.touched).toBe(true);
  });

  it('should add a new vehicle and reset the form when enviarDialogData is called with valid form', () => {
    component.registroVehiculosForm.patchValue({
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    });
    component.enviarDialogData();
    expect(component.vehiculosInfoList.length).toBe(1);
    expect(component.vehiculosInfoList[0].marca).toBe('Toyota');
  });

  it('should delete selected vehicles when eliminarVehiculosItem is called', () => {
    component.vehiculosInfoList = [
      { id: 1, marca: 'Toyota' } as any,
      { id: 2, marca: 'Honda' } as any,
    ];
    component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any];
    component.eliminarVehiculosItem();
    expect(component.vehiculosInfoList.length).toBe(1);
    expect(component.vehiculosInfoList[0].id).toBe(2);
  });

  it('should patch form data when patchModifyiedData is called', () => {
    component.filaSeleccionadaVehiculos = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      vin: '123456789ABCDEFG',
    } as any;
    component.patchModifyiedData();
    expect(component.registroVehiculosForm.value.marca).toBe('Toyota');
  });

  it('should handle invalid form controls with esInvalido', () => {
    const controlName = 'marca';
    component.registroVehiculosForm.get(controlName)?.setErrors({ required: true });
    component.registroVehiculosForm.get(controlName)?.markAsTouched();
    expect(component.esInvalido(controlName)).toBe(true);
  });

  it('should disable buttons and return early when manejarFilaSeleccionada is called with an empty array', () => {
    component.manejarFilaSeleccionada([]);
    expect(component.enableModficarBoton).toBe(false);
    expect(component.enableEliminarBoton).toBe(false);
  });

  it('should enable buttons and set selected rows when manejarFilaSeleccionada is called with rows', () => {
    const mockRows = [
      { id: 1, marca: 'Toyota' } as any,
      { id: 2, marca: 'Honda' } as any,
    ];
    component.manejarFilaSeleccionada(mockRows);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
    expect(component.listaFilaSeleccionadaVehiculos).toEqual(mockRows);
  });

  it('should open the confirmation popup when confirmEliminarVehiculosItem is called with selected rows', () => {
    component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup');
    component.confirmEliminarVehiculosItem();
    expect(abrirElimninarConfirmationopupSpy).toHaveBeenCalled();
  });

  it('should not open the confirmation popup when confirmEliminarVehiculosItem is called with no selected rows', () => {
    component.listaFilaSeleccionadaVehiculos = [];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup');
    component.confirmEliminarVehiculosItem();
    expect(abrirElimninarConfirmationopupSpy).not.toHaveBeenCalled();
  });

  it('should close the multiple selection popup when cerrarMultipleSeleccionPopup is called', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
  });

  it('should call actualizarFilaSeleccionada, agregarDialogoDatos, and patchModifyiedData when listaFilaSeleccionadaVehiculos has exactly one item', () => {
  component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any];

  const actualizarFilaSeleccionadaSpy = jest.spyOn(component, 'actualizarFilaSeleccionada').mockImplementation(() => {});
  const agregarDialogoDatosSpy = jest.spyOn(component, 'agregarDialogoDatos').mockImplementation(() => {});
  const patchModifyiedDataSpy = jest.spyOn(component, 'patchModifyiedData').mockImplementation(() => {});

  component.modificarItemVehiculos();

  expect(actualizarFilaSeleccionadaSpy).toHaveBeenCalled();
  expect(agregarDialogoDatosSpy).toHaveBeenCalled();
  expect(patchModifyiedDataSpy).toHaveBeenCalled();
});

it('should call abrirMultipleSeleccionPopup when listaFilaSeleccionadaVehiculos is empty or has more than one item', () => {
  component.listaFilaSeleccionadaVehiculos = [];
  const abrirMultipleSeleccionPopupSpy = jest.spyOn(component, 'abrirMultipleSeleccionPopup').mockImplementation(() => {});
  component.modificarItemVehiculos();
  expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalled();

  component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any, { id: 2 } as any];
  component.modificarItemVehiculos();
  expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalledTimes(2);
});

it('should call actualizarFilaSeleccionada, agregarDialogoDatos, and patchModifyiedData when listaFilaSeleccionadaVehiculos has exactly one item', () => {
  component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any];

  const actualizarFilaSeleccionadaSpy = jest.spyOn(component, 'actualizarFilaSeleccionada').mockImplementation(() => {});
  const agregarDialogoDatosSpy = jest.spyOn(component, 'agregarDialogoDatos').mockImplementation(() => {});
  const patchModifyiedDataSpy = jest.spyOn(component, 'patchModifyiedData').mockImplementation(() => {});

  component.modificarItemVehiculos();

  expect(actualizarFilaSeleccionadaSpy).toHaveBeenCalled();
  expect(agregarDialogoDatosSpy).toHaveBeenCalled();
  expect(patchModifyiedDataSpy).toHaveBeenCalled();
});

it('should call abrirMultipleSeleccionPopup when listaFilaSeleccionadaVehiculos is empty or has more than one item', () => {
  component.listaFilaSeleccionadaVehiculos = [];
  const abrirMultipleSeleccionPopupSpy = jest.spyOn(component, 'abrirMultipleSeleccionPopup').mockImplementation(() => {});
  component.modificarItemVehiculos();
  expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalled();

  component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any, { id: 2 } as any];
  component.modificarItemVehiculos();
  expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalledTimes(2);
});

});