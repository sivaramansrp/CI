import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RegistroAgentesComponent } from './registro-agentes.component';
import { createInitialState, Tramite30401Store } from '../../estados/tramites30401.store';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { RegistroEmpresasTransporteService } from '../../services/registro-empresas-transporte.service';
import { of } from 'rxjs';
import { Modal } from 'bootstrap';

describe('RegistroAgentesComponent', () => {
  let fixture: ComponentFixture<RegistroAgentesComponent>;
  let component: RegistroAgentesComponent;
  let tramite30401StoreMock: Partial<Tramite30401Store>;
  let tramite30401QueryMock: Partial<Tramite30401Query>;
  let servicioMock: Partial<RegistroEmpresasTransporteService>;

  beforeEach(() => {
    tramite30401StoreMock = {
      setAgentesTablaDatos: jest.fn(),
    };

    tramite30401QueryMock = {
      selectTramite30401$: of({
        ...createInitialState(),
      }),
    };

    servicioMock = {
      getEntidadesFederativas: jest.fn().mockReturnValue(of([])),
      getMunicipiosAlcaldias: jest.fn().mockReturnValue(of([])),
      getColonias: jest.fn().mockReturnValue(of([])),
      getAduanas: jest.fn().mockReturnValue(of([])),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegistroAgentesComponent],
      providers: [
        FormBuilder,
        { provide: Tramite30401Store, useValue: tramite30401StoreMock },
        { provide: Tramite30401Query, useValue: tramite30401QueryMock },
        { provide: RegistroEmpresasTransporteService, useValue: servicioMock },
      ],
    });

    fixture = TestBed.createComponent(RegistroAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on creation', () => {
    expect(component.formularioAgentesAduanales).toBeDefined();
    expect(component.formularioAgentesAduanales.valid).toBeFalsy();
  });

  it('should reset the form when limpiarFormulario is called', () => {
    component.formularioAgentesAduanales.patchValue({
      primerApellido: 'Test',
    });
    component.limpiarFormulario();
    expect(component.formularioAgentesAduanales.value.primerApellido).toBeNull();
  });

  it('should add a new agent to the list when agentesInfoDatos is called', () => {
    component.formularioAgentesAduanales.patchValue({
      nombreAgente: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      patente: '12345',
    });
    component.agentesInfoDatos();
    expect(component.agentesInfoList.length).toBe(1);
    expect(tramite30401StoreMock.setAgentesTablaDatos).toHaveBeenCalled();
  });

  it('should update an existing agent when agentesInfoDatos is called with a selected row', () => {
    component.filaSeleccionadaAgentes = { id: 1 } as any;
    component.agentesInfoList = [{ id: 1, primerApellido: 'Old' } as any];
    component.formularioAgentesAduanales.patchValue({
      primerApellido: 'Updated',
    });
    component.agentesInfoDatos();
    expect(component.agentesInfoList[0].primerApellido).toBe('Updated');
  });

  it('should open the modal when agregarDialogoDatos is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.registroDeAgentesElemento = {
      nativeElement: document.createElement('div'),
    };
    component.agregarDialogoDatos();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should close the modal when cambiarEstadoModal is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'hide').mockImplementation(() => {});
    component.registroDeAgentesElemento = {
      nativeElement: document.createElement('div'),
    };
    jest.spyOn(Modal, 'getInstance').mockReturnValue({
      hide: modalSpy,
    } as any);
    component.cambiarEstadoModal();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should mark all form controls as touched when enviarDialogData is called with invalid form', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.formularioAgentesAduanales, 'markAllAsTouched');
    component.enviarDialogData();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should add a new agent and reset the form when enviarDialogData is called with valid form', () => {
    component.formularioAgentesAduanales.patchValue({
      nombreAgente: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      patente: '12345',
    });
    component.enviarDialogData();
    expect(component.agentesInfoList.length).toBe(1);
    expect(component.agentesInfoList[0].primerApellido).toBe('Doe');
  });

  it('should delete selected agents when eliminarAgentesItem is called', () => {
    component.agentesInfoList = [
      { id: 1 } as any,
      { id: 2 } as any,
    ];
    component.listaFilaSeleccionadaAgentes = [{ id: 1 } as any];
    component.eliminarAgentesItem();
    expect(component.agentesInfoList.length).toBe(1);
    expect(component.agentesInfoList[0].id).toBe(2);
  });

  it('should patch form data when patchModifyiedData is called', () => {
    component.filaSeleccionadaAgentes = {
      nombreAgente: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      patente: '12345',
    } as any;
    component.patchModifyiedData();
    expect(component.formularioAgentesAduanales.value.primerApellido).toBe('Doe');
  });

  it('should handle invalid form controls with esInvalido', () => {
    const controlName = 'primerApellido';
    component.formularioAgentesAduanales.get(controlName)?.setErrors({ required: true });
    component.formularioAgentesAduanales.get(controlName)?.markAsTouched();
    expect(component.esInvalido(controlName)).toBe(true);
  });

  it('should call abrirMultipleSeleccionPopup when listaFilaSeleccionadaAgentes is empty or has more than one item', () => {
    component.listaFilaSeleccionadaAgentes = [];
    const abrirMultipleSeleccionPopupSpy = jest.spyOn(component, 'abrirMultipleSeleccionPopup').mockImplementation(() => {});
    component.modificarItemAgentes();
    expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalled();

    component.listaFilaSeleccionadaAgentes = [{ id: 1 } as any, { id: 2 } as any];
    component.modificarItemAgentes();
    expect(abrirMultipleSeleccionPopupSpy).toHaveBeenCalledTimes(2);
  });

  it('should return early and not call abrirElimninarConfirmationopup when listaFilaSeleccionadaAgentes is empty', () => {
    component.listaFilaSeleccionadaAgentes = [];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup').mockImplementation(() => {});
    component.confirmEliminarAgentesItem();
    expect(abrirElimninarConfirmationopupSpy).not.toHaveBeenCalled();
  });

  it('should call abrirElimninarConfirmationopup when listaFilaSeleccionadaAgentes has items', () => {
    component.listaFilaSeleccionadaAgentes = [{ id: 1 } as any];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup').mockImplementation(() => {});
    component.confirmEliminarAgentesItem();
    expect(abrirElimninarConfirmationopupSpy).toHaveBeenCalled();
  });

  it('should set multipleSeleccionPopupAbierto and multipleSeleccionPopupCerrado to false when cerrarMultipleSeleccionPopup is called', () => {
    component.multipleSeleccionPopupAbierto = true;
    component.multipleSeleccionPopupCerrado = true;
    component.cerrarMultipleSeleccionPopup();
    expect(component.multipleSeleccionPopupAbierto).toBe(false);
    expect(component.multipleSeleccionPopupCerrado).toBe(false);
  });

  it('should disable buttons and return early when fila is empty', () => {
    component.manejarFilaSeleccionada([]);
    expect(component.enableModficarBoton).toBe(false);
    expect(component.enableEliminarBoton).toBe(false);
    expect(component.listaFilaSeleccionadaAgentes).toStrictEqual([]);
    expect(component.filaSeleccionadaAgentes).toBeUndefined();
  });

  it('should update listaFilaSeleccionadaAgentes, filaSeleccionadaAgentes, and enable buttons when fila has items', () => {
    const mockFila = [
      { id: 1, nombreAgente: 'John', primerApellido: 'Doe' } as any,
      { id: 2, nombreAgente: 'Jane', primerApellido: 'Smith' } as any,
    ];
    component.manejarFilaSeleccionada(mockFila);
    expect(component.listaFilaSeleccionadaAgentes).toEqual(mockFila);
    expect(component.filaSeleccionadaAgentes).toEqual(mockFila[mockFila.length - 1]);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
  });
});