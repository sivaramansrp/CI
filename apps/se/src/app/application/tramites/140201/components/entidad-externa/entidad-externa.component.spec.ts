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
    // Crear Mock para CancelacionesStore
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

    // Crear Mock para CancelacionesQuery
    cancelacionesQuery = new CancelacionesQuery(cancelacionesStore) as jest.Mocked<CancelacionesQuery>;
    cancelacionesQuery.entidadExterna$ = of('Entidad Externa');
    cancelacionesQuery.nombreSolicitanteIPC$ = of('Nombre Solicitante');
    cancelacionesQuery.cargoSolicitanteIPC$ = of('Cargo Solicitante');
    cancelacionesQuery.folioOficioSolicitudIPC$ = of('Folio Oficio');
    cancelacionesQuery.correoSolicitanteIPC$ = of('correo@ejemplo.com');

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EntidadExternaComponent],
      providers: [
        { provide: CancelacionesStore, useValue: cancelacionesStore },
        { provide: CancelacionesQuery, useValue: cancelacionesQuery },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntidadExternaComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario en ngOnInit', () => {
    component.ngOnInit();
    expect(component.entidadForm).toBeDefined();
    expect(component.entidadForm.get('entidadExterna')).toBeDefined();
    expect(component.entidadForm.get('nombreSolicitanteIPC')).toBeDefined();
    expect(component.entidadForm.get('cargoSolicitanteIPC')).toBeDefined();
    expect(component.entidadForm.get('folioOficioSolicitudIPC')).toBeDefined();
    expect(component.entidadForm.get('correoSolicitanteIPC')).toBeDefined();
  });

  it('debe actualizar el estado del formulario con los valores de los observables', () => {
    component.ngOnInit();
    component.estadoActualizacion();
    expect(component.entidadForm.get('entidadExterna')?.value).toBe('Entidad Externa');
    expect(component.entidadForm.get('nombreSolicitanteIPC')?.value).toBe('Nombre Solicitante');
    expect(component.entidadForm.get('cargoSolicitanteIPC')?.value).toBe('Cargo Solicitante');
    expect(component.entidadForm.get('folioOficioSolicitudIPC')?.value).toBe('Folio Oficio');
    expect(component.entidadForm.get('correoSolicitanteIPC')?.value).toBe('correo@ejemplo.com');
  });

  it('debe llamar setEntidadExterna en updateEntidadExterna', () => {
    component.ngOnInit();
    component.entidadForm.get('entidadExterna')?.setValue('Entidad Externa');
    component.updateEntidadExterna();
    expect(cancelacionesStore.setEntidadExterna).toHaveBeenCalledWith('Entidad Externa');
  });

  it('debe llamar setNombreSolicitanteIPC en updateNombreSolicitanteIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('nombreSolicitanteIPC')?.setValue('Nombre Solicitante');
    component.updateNombreSolicitanteIPC();
    expect(cancelacionesStore.setNombreSolicitanteIPC).toHaveBeenCalledWith('Nombre Solicitante');
  });

  it('debe llamar setCargoSolicitanteIPC en updateCargoSolicitanteIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('cargoSolicitanteIPC')?.setValue('Cargo Solicitante');
    component.updateCargoSolicitanteIPC();
    expect(cancelacionesStore.setCargoSolicitanteIPC).toHaveBeenCalledWith('Cargo Solicitante');
  });

  it('debe llamar setFolioOficioSolicitudIPC en updateFolioOficioSolicitudIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('folioOficioSolicitudIPC')?.setValue('Folio Oficio');
    component.updateFolioOficioSolicitudIPC();
    expect(cancelacionesStore.setFolioOficioSolicitudIPC).toHaveBeenCalledWith('Folio Oficio');
  });

  it('debe llamar setCorreoSolicitanteIPC en updateCorreoSolicitanteIPC', () => {
    component.ngOnInit();
    component.entidadForm.get('correoSolicitanteIPC')?.setValue('correo@ejemplo.com');
    component.updateCorreoSolicitanteIPC();
    expect(cancelacionesStore.setCorreoSolicitanteIPC).toHaveBeenCalledWith('correo@ejemplo.com');
  });

  it('debe llamar guardarDatosFormulario cuando readonly es true en inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const updateSpy = jest.spyOn(component, 'estadoActualizacion');

    component.inicializarEstadoFormulario();

    expect(guardarSpy).toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalledTimes(2);
  });

  it('debe llamar solo estadoActualizacion cuando readonly es false en inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const updateSpy = jest.spyOn(component, 'estadoActualizacion');

    component.inicializarEstadoFormulario();

    expect(updateSpy).toHaveBeenCalled();
    expect(guardarSpy).not.toHaveBeenCalled();
  });
});
