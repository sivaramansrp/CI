import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Modal } from 'bootstrap';
import { RegistroVehiculosComponent } from './registro-vehiculos.component';
import { createInitialState, Tramite30401Store } from '../../estados/tramites30401.store';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { RegistroEmpresasTransporteService } from '../../services/registro-empresas-transporte.service';

describe('RegistroVehiculosComponent', () => {
  let component: RegistroVehiculosComponent;
  let fixture: any;
  let tramite30401StoreMock: Partial<Tramite30401Store>;
  let tramite30401QueryMock: Partial<Tramite30401Query>;
  let servicioMock: Partial<RegistroEmpresasTransporteService>;

  beforeEach(() => {
    tramite30401StoreMock = {
      setRegistroVehiculosDatos: jest.fn(),
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
      imports: [ReactiveFormsModule,RegistroVehiculosComponent],
      providers: [
        FormBuilder,
        { provide: Tramite30401Store, useValue: tramite30401StoreMock },
        { provide: Tramite30401Query, useValue: tramite30401QueryMock },
        { provide: RegistroEmpresasTransporteService, useValue: servicioMock },
      ],
    });

    fixture = TestBed.createComponent(RegistroVehiculosComponent);
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
    expect(component.registroVehiculosForm).toBeDefined();
    expect(component.registroVehiculosForm.valid).toBeFalsy();
  });

  it('should call obtenerDatosCatalogo on initialization', () => {
    const spy = jest.spyOn(component, 'obtenerDatosCatalogo');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should populate catalog data from the service', () => {
    component.obtenerDatosCatalogo();
    expect(servicioMock.getEntidadesFederativas).toHaveBeenCalled();
    expect(servicioMock.getMunicipiosAlcaldias).toHaveBeenCalled();
    expect(servicioMock.getColonias).toHaveBeenCalled();
    expect(servicioMock.getAduanas).toHaveBeenCalled();
  });

  it('should reset the form when limpiarFormulario is called', () => {
    component.registroVehiculosForm.patchValue({
      solicitud: { marca: 'Test' },
    });
    component.limpiarFormulario();
    expect(component.registroVehiculosForm.value.solicitud.marca).toBeNull();
  });

  it('should add a new vehicle to the list when vehiculosInfoDatos is called', () => {
    component.registroVehiculosForm.patchValue({
      solicitud: { marca: 'Test', modelo: 'Model', idVehiculoSerie: '123', caja: 'Box' },
      direccionVehiculo: { calleVehiculo: 'Street', comboEntidadVehiculo: 1 },
      persona: { nombre: 'John', apellidoPaterno: 'Doe', correoElectronico: 'test@test.com' },
    });
    component.vehiculosInfoDatos();
    expect(component.registroVehiculosInfoList.length).toBe(1);
    expect(tramite30401StoreMock.setRegistroVehiculosDatos).toHaveBeenCalled();
  });

  it('should update an existing vehicle when vehiculosInfoDatos is called with a selected row', () => {
    component.filaSeleccionadaVehiculos = { id: 1 } as any;
    component.registroVehiculosInfoList = [{ id: 1, solicitud: {} } as any];
    component.registroVehiculosForm.patchValue({
      solicitud: { marca: 'Updated' },
    });
    component.vehiculosInfoDatos();
    expect(component.registroVehiculosInfoList[0].solicitud.marca).toBe('Updated');
  });

  it('should open the modal when agregarDialogoDatos is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'show').mockImplementation(() => {});
    component.registroDeVehiculosElemento = {
      nativeElement: document.createElement('div'),
    };
    component.agregarDialogoDatos();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should close the modal when cambiarEstadoModal is called', () => {
    const modalSpy = jest.spyOn(Modal.prototype, 'hide').mockImplementation(() => {});    
    component.registroDeVehiculosElemento = {
      nativeElement: document.createElement('div'),
    };
    jest.spyOn(Modal, 'getInstance').mockReturnValue({
      hide: modalSpy,
    } as any);
  
    component.cambiarEstadoModal();
    expect(modalSpy).toHaveBeenCalled();
  });

  

  it('should mark all form controls as touched when enviarDialogData is called with invalid form', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.registroVehiculosForm, 'markAllAsTouched');
    component.enviarDialogData();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should add a new vehicle and reset the form when enviarDialogData is called with valid form', () => {
    component.registroVehiculosForm.patchValue({
      id: 1,
      solicitud: {
        marca: "Toyota",
        modelo: "Corolla",
        idVehiculoSerie: "ABC123XYZ",
        caja: "Automática"
      },
      direccionVehiculo: {
        calleVehiculo: "Av. Principal",
        numExteriorVehiculo: "123",
        numInteriorVehiculo: "A",
        comboEntidadVehiculo: '1', 
        comboDelegacionVehiculo: '2',
        comboColoniaVehiculo: '3',
        localidadVehiculo: "Ciudad Demo",
        codigoPostalVehiculo: "110001",
        comboAduanaVehiculo: '4'
      },
      persona: {
        nombre: "Juan",
        apellidoPaterno: "Pérez",
        apellidoMaterno: "Gómez",
        correoElectronico: "juan.perez@example.com",
        telefonoContacto: "+91 9876543210"
      }
    });
  
    component.enviarDialogData();
  
    expect(component.registroVehiculosInfoList.length).toBe(1);
    expect(component.registroVehiculosInfoList[0].solicitud.marca).toBe('Toyota');
  });

  it('should delete selected vehicles when eliminarVehiculosItem is called', () => {
    component.registroVehiculosInfoList = [
      { id: 1 } as any,
      { id: 2 } as any,
    ];
    component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any];
    component.eliminarVehiculosItem();
    expect(component.registroVehiculosInfoList.length).toBe(1);
    expect(component.registroVehiculosInfoList[0].id).toBe(2);
  });

  it('should patch form data when patchModifyiedData is called', () => {
    component.filaSeleccionadaVehiculos = {
      solicitud: { marca: 'Test' },
      direccionVehiculo: { comboEntidadVehiculo: 'Entity' },
      persona: { nombre: 'John' },
    } as any;
    component.patchModifyiedData();
    expect(component.registroVehiculosForm.value.solicitud.marca).toBe('Test');
  });

  it('should handle invalid form controls with esInvalido', () => {
    const controlName = 'solicitud.marca';
    component.registroVehiculosForm.get('solicitud.marca')?.setErrors({ required: true });
    component.registroVehiculosForm.get('solicitud.marca')?.markAsTouched();
    expect(component.esInvalido(controlName)).toBe(true);
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

  it('should return early and not call abrirElimninarConfirmationopup when listaFilaSeleccionadaVehiculos is empty', () => {
    component.listaFilaSeleccionadaVehiculos = [];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup').mockImplementation(() => {});
    component.confirmEliminarVehiculosItem();
    expect(abrirElimninarConfirmationopupSpy).not.toHaveBeenCalled();
  });
  
  it('should call abrirElimninarConfirmationopup when listaFilaSeleccionadaVehiculos has items', () => {
    component.listaFilaSeleccionadaVehiculos = [{ id: 1 } as any];
    const abrirElimninarConfirmationopupSpy = jest.spyOn(component, 'abrirElimninarConfirmationopup').mockImplementation(() => {});
    component.confirmEliminarVehiculosItem();
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
    expect(component.listaFilaSeleccionadaVehiculos).toStrictEqual([]); 
    expect(component.filaSeleccionadaVehiculos).toBeUndefined();
  });
  
  it('should update listaFilaSeleccionadaVehiculos, filaSeleccionadaVehiculos, and enable buttons when fila has items', () => {
    const mockFila = [
      { id: 1, solicitud: { marca: 'Toyota' } } as any,
      { id: 2, solicitud: { marca: 'Honda' } } as any,
    ];
  
    component.manejarFilaSeleccionada(mockFila);
  
    expect(component.listaFilaSeleccionadaVehiculos).toEqual(mockFila);
    expect(component.filaSeleccionadaVehiculos).toEqual(mockFila[mockFila.length - 1]);
    expect(component.enableModficarBoton).toBe(true);
    expect(component.enableEliminarBoton).toBe(true);
  });

});