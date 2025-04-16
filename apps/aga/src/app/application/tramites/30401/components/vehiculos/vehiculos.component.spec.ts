import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform,
  Injectable,
  ElementRef,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehiculosComponent } from './vehiculos.component';
import { Tramite30401Store } from '../../estados/tramites30401.store';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { of } from 'rxjs';
import { TipoNotificacionEnum, CategoriaMensaje } from '@libs/shared/data-access-user/src';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    hide: jest.fn(),
    show: jest.fn(),
  })),
  getInstance: jest.fn().mockImplementation(() => ({
    hide: jest.fn(),
    show: jest.fn(),
  })),
}));

@Injectable()
class MockTramite30401Store {
  establecerDatos = jest.fn();
  setUnidadesdeArrastre = jest.fn();
  setVehiculosTablaDatos = jest.fn();
}

@Injectable()
class MockTramite30401Query {
  selectTramite30401$ = of({ vehiculosTablaDatos: [] }); // Mock observable
  getvehiculos$ = of([]);
  getUnidadesdeArrastre$ = of([]);
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

describe('VehiculosComponent', () => {
  let fixture: ComponentFixture<VehiculosComponent>;
  let component: VehiculosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslatePipe],
      imports: [ReactiveFormsModule, VehiculosComponent],
      providers: [
        FormBuilder,
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
        { provide: Tramite30401Store, useClass: MockTramite30401Store },
        { provide: Tramite30401Query, useClass: MockTramite30401Query },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;

    // Mock the `registroDeVehiculosElemento`
    component.registroDeVehiculosElemento = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with default values', () => {
    component.crearFormulario();
    expect(component.registroVehiculosForm).toBeDefined();
    expect(component.registroVehiculosForm.get('marca')?.value).toBe('');
    expect(component.registroVehiculosForm.get('modelo')?.value).toBe('');
    expect(component.registroVehiculosForm.get('Vin')?.value).toBe('');
  });

  it('should mark all form controls as touched if form is invalid on enviarDialogData', () => {
    component.crearFormulario();
    component.enviarDialogData();
    expect(component.registroVehiculosForm.get('marca')?.touched).toBe(true);
    expect(component.registroVehiculosForm.get('modelo')?.touched).toBe(true);
    expect(component.registroVehiculosForm.get('Vin')?.touched).toBe(true);
  });

  it('should add valid form data to vehiculosInfoList and reset the form on enviarDialogData', () => {
    component.crearFormulario();
    component.registroVehiculosForm.setValue({
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      Vin: '123456789ABCDEFG',
    });
    component.enviarDialogData();
    expect(component.vehiculosInfoList.length).toBe(1);
    expect(component.vehiculosInfoList[0]).toEqual({
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      Vin: '123456789ABCDEFG',
    });
  });

  it('should open the confirmation popup on abrirElimninarConfirmationopup', () => {
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

  it('should disable buttons when no rows are selected in manejarFilaSeleccionada', () => {
    component.manejarFilaSeleccionada([]);
    expect(component.enableModficarBoton).toBe(false);
    expect(component.enableEliminarBoton).toBe(false);
    expect(component.listaFilaSeleccionadaVehiculos).toEqual([]);
  });
  
  it('should enable buttons and set selected rows when rows are selected in manejarFilaSeleccionada', () => {
    const mockRows = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', Vin: '123456789ABCDEFG' },
      { id: 2, marca: 'Honda', modelo: 'Civic', Vin: 'ABCDEFG1234567890' },
    ];
    component.manejarFilaSeleccionada(mockRows);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
    expect(component.listaFilaSeleccionadaVehiculos).toEqual(mockRows);
    expect(component.filaSeleccionadaVehiculos).toEqual(mockRows[mockRows.length - 1]);
  });

  it('should call actualizarFilaSeleccionada, agregarDialogoDatos, and patchModifyiedData when one row is selected', () => {
    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', Vin: '123456789ABCDEFG' },
    ];
    const actualizarFilaSeleccionadaSpy = jest.spyOn(component, 'actualizarFilaSeleccionada');
    const agregarDialogoDatosSpy = jest.spyOn(component, 'agregarDialogoDatos');
    const patchModifyiedDataSpy = jest.spyOn(component, 'patchModifyiedData');
    component.modificarItemVehiculos();

    // Assert
    expect(actualizarFilaSeleccionadaSpy).toHaveBeenCalled();
    expect(agregarDialogoDatosSpy).toHaveBeenCalled();
    expect(patchModifyiedDataSpy).toHaveBeenCalled();
  });
  
  it('should call abrirMultipleSeleccionPopup when more than one row is selected', () => {
    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', Vin: '123456789ABCDEFG' },
      { id: 2, marca: 'Honda', modelo: 'Civic', Vin: 'ABCDEFG1234567890' },
    ];
    const abrirMultipleSeleccionPopupSpy = jest.spyOn(component, 'abrirMultipleSeleccionPopup');
    component.modificarItemVehiculos();
    expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalled();
  });

  it('should delete selected rows from vehiculosInfoList and reset the selection', () => {
    component.vehiculosInfoList = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', Vin: '123456789ABCDEFG' },
      { id: 2, marca: 'Honda', modelo: 'Civic', Vin: 'ABCDEFG1234567890' },
      { id: 3, marca: 'Ford', modelo: 'Focus', Vin: 'FOCUS1234567890' },
    ];
    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', Vin: '123456789ABCDEFG' },
      { id: 3, marca: 'Ford', modelo: 'Focus', Vin: 'FOCUS1234567890' },
    ];
    const cerrarEliminarConfirmationPopupSpy = jest.spyOn(component, 'cerrarEliminarConfirmationPopup');
    const setVehiculosTablaDatosSpy = jest.spyOn(component['tramite30401Store'], 'setVehiculosTablaDatos');
    component.eliminarVehiculosItem();
    expect(component.vehiculosInfoList).toEqual([
      { id: 2, marca: 'Honda', modelo: 'Civic', Vin: 'ABCDEFG1234567890' },
    ]);
    expect(component.listaFilaSeleccionadaVehiculos).toEqual([]);
    expect(setVehiculosTablaDatosSpy).toHaveBeenCalledWith([
      { id: 2, marca: 'Honda', modelo: 'Civic', Vin: 'ABCDEFG1234567890' },
    ]);
    expect(cerrarEliminarConfirmationPopupSpy).toHaveBeenCalled();
  });

  it('should not open the confirmation popup if no rows are selected', () => {
    component.listaFilaSeleccionadaVehiculos = [];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup');
    component.confirmEliminarVehiculosItem();
    expect(abrirElimninarConfirmationopupSpy).not.toHaveBeenCalled();
  });
  
  it('should open the confirmation popup if rows are selected', () => {
    component.listaFilaSeleccionadaVehiculos = [
      { id: 1, marca: 'Toyota', modelo: 'Corolla', Vin: '123456789ABCDEFG' },
    ];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup');
    component.confirmEliminarVehiculosItem();
    expect(abrirElimninarConfirmationopupSpy).toHaveBeenCalled();
  });

  it('should close the multiple selection popup', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.multipleSeleccionPopupCerrado = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
    expect(component.multipleSeleccionPopupCerrado).toBe(false);
  });

  it('should close the multiple selection popup', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.multipleSeleccionPopupCerrado = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
    expect(component.multipleSeleccionPopupCerrado).toBe(false);
  });

  it('should set esHabilitarElDialogo to false when cerrarModal is called', () => {
    component.esHabilitarElDialogo = true;
    component.cerrarModal();
    expect(component.esHabilitarElDialogo).toBe(false);
  });
});