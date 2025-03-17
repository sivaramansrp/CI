import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { EntidadExterna140201Component } from './entidad-externa-140201.component';
import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';
import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';

jest.mock('../../estados/cancelaciones.store');
jest.mock('../../estados/cancelaciones.query');

describe('EntidadExterna140201Component', () => {
  let component: EntidadExterna140201Component;
  let fixture: ComponentFixture<EntidadExterna140201Component>;
  let cancelacionesStore: jest.Mocked<Cancelaciones140201Store>;
  let cancelacionesQuery: jest.Mocked<Cancelaciones140201Query>;

  beforeEach(async () => {
    // Create Mock for Cancelaciones140201Store
    cancelacionesStore = new Cancelaciones140201Store() as jest.Mocked<Cancelaciones140201Store>;
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
    cancelacionesStore.setTelefona = jest.fn();
    cancelacionesStore.destroy = jest.fn();

    // Create Mock for Cancelaciones140201Query
    cancelacionesQuery = new Cancelaciones140201Query(cancelacionesStore) as jest.Mocked<Cancelaciones140201Query>;
    cancelacionesQuery.entidadExterna$ = of('Entidad Externa');
    cancelacionesQuery.nombreSolicitanteIPC$ = of('Nombre Solicitante');
    cancelacionesQuery.cargoSolicitanteIPC$ = of('Cargo Solicitante');
    cancelacionesQuery.folioOficioSolicitudIPC$ = of('Folio Oficio');
    cancelacionesQuery.correoSolicitanteIPC$ = of('correo@ejemplo.com');

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,EntidadExterna140201Component],
      providers: [
        { provide: Cancelaciones140201Store, useValue: cancelacionesStore },
        { provide: Cancelaciones140201Query, useValue: cancelacionesQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadExterna140201Component);
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
    component.updateState();
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
});
