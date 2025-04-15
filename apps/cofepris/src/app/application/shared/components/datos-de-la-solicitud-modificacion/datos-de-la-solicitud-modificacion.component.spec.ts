import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudModificacionComponent } from './datos-de-la-solicitud-modificacion.component';
import { FormBuilder } from '@angular/forms';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { DatosSolicitudStore } from '../../estados/stores/datos-de-la-solicitud-modificacion.store';
import { DatosSolicitudQuery } from '../../estados/queries/datos-de-la-solicitud-modificacion.query';
import { of, Subject } from 'rxjs';

describe('DatosDeLaSolicitudModificacionComponent', () => {
  let component: DatosDeLaSolicitudModificacionComponent;
  let formBuilder: FormBuilder;
  let establecimientoService: jest.Mocked<EstablecimientoService>;
  let datosSolicitudStore: jest.Mocked<DatosSolicitudStore>;
  let datosSolicitudQuery: jest.Mocked<DatosSolicitudQuery>;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    establecimientoService = {
      getJustificationData: jest.fn(),
      getInformacionConfidencialRadioOptions: jest.fn(),
      getEstadodata: jest.fn(),
      getSciandata: jest.fn(),
    } as unknown as jest.Mocked<EstablecimientoService>;

    datosSolicitudStore = {
      setGenericos: jest.fn(),
      setObservaciones: jest.fn(),
      setEstablecimientoRazonSocial: jest.fn(),
      setEstablecimientoCorreoElectronico: jest.fn(),
      setEstablecimientoDomicilioCodigoPostal: jest.fn(),
      setEstablecimientoEstados: jest.fn(),
      destroy: jest.fn(),
    } as unknown as jest.Mocked<DatosSolicitudStore>;
    datosSolicitudQuery = {
      selectSolicitud$: of({}),
    } as unknown as jest.Mocked<DatosSolicitudQuery>;

    component = new DatosDeLaSolicitudModificacionComponent(
      formBuilder,
      establecimientoService,
      datosSolicitudStore,
      datosSolicitudQuery
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    jest.spyOn(component, 'configurarGrupoForm');
    component.ngOnInit();
    expect(component.configurarGrupoForm).toHaveBeenCalled();
  });

  it('should call cargarEstado on ngOnInit', () => {
    jest.spyOn(component, 'cargarEstado');
    component.ngOnInit();
    expect(component.cargarEstado).toHaveBeenCalled();
  });

  it('should call cargarScian on ngOnInit', () => {
    jest.spyOn(component, 'cargarScian');
    component.ngOnInit();
    expect(component.cargarScian).toHaveBeenCalled();
  });

  it('should call establecerOpcionesGenericas on ngOnInit', () => {
    jest.spyOn(component, 'establecerOpcionesGenericas');
    component.ngOnInit();
    expect(component.establecerOpcionesGenericas).toHaveBeenCalled();
  });

  it('should call manejarConfidencial on ngOnInit', () => {
    jest.spyOn(component, 'manejarConfidencial');
    component.ngOnInit();
    expect(component.manejarConfidencial).toHaveBeenCalled();
  });

  it('should destroy observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should update store values when actualizarValoresStore is called', () => {
    const mockForm = formBuilder.group({
      testField: ['testValue'],
    });
    const mockMethodName = 'setGenericos' as keyof DatosSolicitudStore;

    component.actualizarValoresStore(mockForm, 'testField', mockMethodName);
    expect(datosSolicitudStore[mockMethodName]).toHaveBeenCalledWith('testValue');
  });

  it('should reset scianForm when limpiarScianForm is called', () => {
    component.scianForm = formBuilder.group({
      scian: ['testValue'],
    });
    component.limpiarScianForm();
    expect(component.scianForm.value).toEqual({ scian: null });
  });

  it('should add a new SCIAN data and reset form when guardarScian is called', () => {
    component.scianForm = formBuilder.group({
      scian: ['testScian'],
      descripcionScian: ['testDescription'],
    });
    component.personaparas = [];
    component.guardarScian();
    expect(component.personaparas).toEqual([
      { claveScian: 'testScian', descripcionScian: 'testDescription' },
    ]);
    expect(component.scianForm.value).toEqual({
      scian: null,
      descripcionScian: null,
    });
  });

  it('should remove a pedimento when eliminarPedimento is called', () => {
    component.pedimentos = [{ id: 1 }, { id: 2 }] as any;
    component.elementoParaEliminar = 0;
    component.eliminarPedimento(true);
    expect(component.pedimentos).toEqual([{ id: 2 }]);
  });

  it('should not remove a pedimento when eliminarPedimento is called with false', () => {
    component.pedimentos = [{ id: 1 }, { id: 2 }] as any;
    component.elementoParaEliminar = 0;
    component.eliminarPedimento(false);
    expect(component.pedimentos).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should call mostrarModeloClave and show the modal', () => {
    component.modalInstance = { show: jest.fn() } as any;
    component.mostrarModeloClave();
    expect(component.modalInstance.show).toHaveBeenCalled();
  });

  it('should close the modal when cerrarModalScian is called', () => {
    component.modalInstance = { hide: jest.fn() } as any;
    component.cerrarModalScian();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });
});
