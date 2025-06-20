import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { EntidadExternaComponent } from './entidad-externa.component';
import { CancelacionesStore } from '../../estados/cancelaciones.store';
import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

jest.mock('../../estados/cancelaciones.store');
jest.mock('../../estados/cancelaciones.query');

describe('EntidadExternaComponent', () => {
  let component: EntidadExternaComponent;
  let fixture: ComponentFixture<EntidadExternaComponent>;
  let cancelacionesStore: jest.Mocked<CancelacionesStore>;
  let cancelacionesQuery: jest.Mocked<CancelacionesQuery>;
  const consultaioQueryMock = {
    selectConsultaioState$: of({ readonly: true }),
  };
  beforeEach(async () => {
    // Create Mock for CancelacionesStore
    cancelacionesStore = new CancelacionesStore() as jest.Mocked<CancelacionesStore>;
    cancelacionesStore.setEntidadExterna = jest.fn();
    cancelacionesStore.setNombreSolicitanteIPC = jest.fn();
    cancelacionesStore.setCargoSolicitanteIPC = jest.fn();
    cancelacionesStore.setFolioOficioSolicitudIPC = jest.fn();
    cancelacionesStore.setCorreoSolicitanteIPC = jest.fn();
    cancelacionesStore.setEntidadFed = jest.fn();
    cancelacionesStore.setColonia = jest.fn();
    cancelacionesStore.setLocalidad = jest.fn();
    cancelacionesStore.setMunicipiosAlcaldia = jest.fn();
    cancelacionesStore.setPaisInput = jest.fn();
    cancelacionesStore.setNumeroInterior = jest.fn();
    cancelacionesStore.setCodigoPostal = jest.fn();
    cancelacionesStore.setTelefono = jest.fn();
    cancelacionesStore.destroy = jest.fn();

    // Create Mock for CancelacionesQuery
    cancelacionesQuery = new CancelacionesQuery(cancelacionesStore) as jest.Mocked<CancelacionesQuery>;
    cancelacionesQuery.entidadExterna$ = of('Entidad Externa');
    cancelacionesQuery.nombreSolicitanteIPC$ = of('Nombre Solicitante');
    cancelacionesQuery.cargoSolicitanteIPC$ = of('Cargo Solicitante');
    cancelacionesQuery.folioOficioSolicitudIPC$ = of('Folio Oficio');
    cancelacionesQuery.correoSolicitanteIPC$ = of('correo@ejemplo.com');

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,EntidadExternaComponent],
      providers: [
        { provide: CancelacionesStore, useValue: cancelacionesStore },
        { provide: CancelacionesQuery, useValue: cancelacionesQuery },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadExternaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.entidadForm).toBeDefined();
    expect(component.entidadForm.get('entidadExterna')).toBeDefined();
    expect(component.entidadForm.get('nombreSolicitanteIPC')).toBeDefined();
    expect(component.entidadForm.get('cargoSolicitanteIPC')).toBeDefined();
    expect(component.entidadForm.get('folioOficioSolicitudIPC')).toBeDefined();
    expect(component.entidadForm.get('correoSolicitanteIPC')).toBeDefined();
  });

  it('should update the form state with observable values', () => {
    component.ngOnInit();
    component.estadoActualizacion();
    expect(component.entidadForm.get('entidadExterna')?.value).toBe('Entidad Externa');
    expect(component.entidadForm.get('nombreSolicitanteIPC')?.value).toBe('Nombre Solicitante');
    expect(component.entidadForm.get('cargoSolicitanteIPC')?.value).toBe('Cargo Solicitante');
    expect(component.entidadForm.get('folioOficioSolicitudIPC')?.value).toBe('Folio Oficio');
    expect(component.entidadForm.get('correoSolicitanteIPC')?.value).toBe('correo@ejemplo.com');
  });

  it('should call setEntidadExterna on updateEntidadExterna', () => {
    component.ngOnInit();
    component.entidadForm.get('entidadExterna')?.setValue('Entidad Externa');
    component.updateEntidadExterna();
    expect(cancelacionesStore.setEntidadExterna).toHaveBeenCalledWith('Entidad Externa');
  });

  it('should call setNombreSolicitanteIPC on updateNombreSolicitanteIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('nombreSolicitanteIPC')?.setValue('Nombre Solicitante');
    component.updateNombreSolicitanteIPC();
    expect(cancelacionesStore.setNombreSolicitanteIPC).toHaveBeenCalledWith('Nombre Solicitante');
  });

  it('should call setCargoSolicitanteIPC on updateCargoSolicitanteIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('cargoSolicitanteIPC')?.setValue('Cargo Solicitante');
    component.updateCargoSolicitanteIPC();
    expect(cancelacionesStore.setCargoSolicitanteIPC).toHaveBeenCalledWith('Cargo Solicitante');
  });

  it('should call setFolioOficioSolicitudIPC on updateFolioOficioSolicitudIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('folioOficioSolicitudIPC')?.setValue('Folio Oficio');
    component.updateFolioOficioSolicitudIPC();
    expect(cancelacionesStore.setFolioOficioSolicitudIPC).toHaveBeenCalledWith('Folio Oficio');
  });

  it('should call setCorreoSolicitanteIPC on updateCorreoSolicitanteIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('correoSolicitanteIPC')?.setValue('correo@ejemplo.com');
    component.updateCorreoSolicitanteIPC();
    expect(cancelacionesStore.setCorreoSolicitanteIPC).toHaveBeenCalledWith('correo@ejemplo.com');
  });

  it('should call guardarDatosFormulario when readonly is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const updateSpy = jest.spyOn(component, 'estadoActualizacion');

    component.inicializarEstadoFormulario();

    expect(guardarSpy).toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalledTimes(2); 
  });

  it('should only call estadoActualizacion when readonly is false in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const updateSpy = jest.spyOn(component, 'estadoActualizacion');

    component.inicializarEstadoFormulario();

    expect(updateSpy).toHaveBeenCalled();
    expect(guardarSpy).not.toHaveBeenCalled();
  });
});
