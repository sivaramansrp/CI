import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { CancelacionesService } from '../../services/cancelaciones.service';
import { CancelacionesStore } from '../../estados/cancelaciones.store';
import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DireccionDeNotificacionesComponent } from './direccion-de-notificaciones.component';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

describe('DireccionDeNotificacionesComponent', () => {
  let component: DireccionDeNotificacionesComponent;
  let fixture: ComponentFixture<DireccionDeNotificacionesComponent>;
  let mockService: Partial<CancelacionesService>;
  let mockStore: Partial<CancelacionesStore>;
  let mockQuery: Partial<CancelacionesQuery>;
 const consultaioQueryMock = {
    selectConsultaioState$: of({ readonly: true }),
  };

  beforeEach(async () => {
    mockService = {
      getEntidades: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Entidad 1' }] as Catalogo[])),
      getColonia: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Colonia 1' }] as Catalogo[])),
      getmunicipio: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Municipio 1' }] as Catalogo[])),
      getLocalidad: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Localidad 1' }] as Catalogo[])),
      getInfo: jest.fn().mockReturnValue(of({
        calle: 'Avenida Reforma',
        numeroExterior: '123',
        numeroInterior: '',
        colonia: 'Centro',
        municipio: 'CDMX',
        estado: 'Ciudad de México',
        codigoPostal: '01000',
        telefono: '1234567890'
      }))
    };

    mockStore = {
      setEntidadFed: jest.fn(),
      setMunicipiosAlcaldia: jest.fn(),
      setColonia: jest.fn(),
      setLocalidad: jest.fn(),
      setPaisInput: jest.fn(),
      setNumeroInterior: jest.fn(),
      setCodigoPostal: jest.fn(),
      setTelefono: jest.fn()
    };

    mockQuery = {
      entidadFederativa$: of({ id: 1, descripcion: 'Entidad 1' } as Catalogo),
      colonia$: of({ id: 1, descripcion: 'Colonia 1' } as Catalogo),
      localidad$: of({ id: 1, descripcion: 'Localidad 1' } as Catalogo),
      municipio$: of({ id: 1, descripcion: 'Municipio 1' } as Catalogo),
      paisInput$: of('México' as any),
      numeroInterior$: of('101' as any),
      codigoPostal$: of('01000' as any),
      telefono$: of('1234567890' as any)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, DireccionDeNotificacionesComponent, TituloComponent, CatalogoSelectComponent],
      declarations: [],
      providers: [
        { provide: CancelacionesService, useValue: mockService },
        { provide: CancelacionesStore, useValue: mockStore },
        { provide: CancelacionesQuery, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionDeNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.direccionNotificacionesForm.contains('entidadFederativa')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('domicilio')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('calle')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('numeroExterior')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('numeroInterior')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('codigoPostal')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('pais')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('municipioAlcaldia')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('colonia')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('telefono')).toBeTruthy();
    expect(component.direccionNotificacionesForm.contains('localidad')).toBeTruthy();
  });

  it('should initialize form values from query observables', () => {
    expect(component.direccionNotificacionesForm.get('entidadFederativa')?.value).toEqual({ id: 1, descripcion: 'Entidad 1' });
    expect(component.direccionNotificacionesForm.get('colonia')?.value).toEqual({ id: 1, descripcion: 'Colonia 1' });
    expect(component.direccionNotificacionesForm.get('localidad')?.value).toEqual({ id: 1, descripcion: 'Localidad 1' });
    expect(component.direccionNotificacionesForm.get('municipioAlcaldia')?.value).toEqual({ id: 1, descripcion: 'Municipio 1' });
    expect(component.direccionNotificacionesForm.get('pais')?.value).toBe('México');
    expect(component.direccionNotificacionesForm.get('numeroInterior')?.value).toBe('101');
    expect(component.direccionNotificacionesForm.get('codigoPostal')?.value).toBe('01000');
    expect(component.direccionNotificacionesForm.get('telefono')?.value).toBe('1234567890');
  });

  it('should call loadInfo and update form values', () => {
    component.loadInfo();
    expect(mockService.getInfo).toHaveBeenCalled();
    expect(component.direccionNotificacionesForm.get('calle')?.value).toBe('Avenida Reforma');
    expect(component.direccionNotificacionesForm.get('numeroExterior')?.value).toBe('123');
  });

  it('should update store when getEntidad is called', () => {
    component.direccionNotificacionesForm.get('entidadFederativa')?.setValue({ id: 1, descripcion: 'Entidad 1' });
    component.getEntidad();
    expect(mockStore.setEntidadFed).toHaveBeenCalledWith({ id: 1, descripcion: 'Entidad 1' });
  });

  it('should update store when getMunicipiosOalcaldia is called', () => {
    component.direccionNotificacionesForm.get('municipioAlcaldia')?.setValue({ id: 1, descripcion: 'Municipio 1' });
    component.getMunicipiosOalcaldia();
    expect(mockStore.setMunicipiosAlcaldia).toHaveBeenCalledWith({ id: 1, descripcion: 'Municipio 1' });
  });

  it('should update store when getColonia is called', () => {
    component.direccionNotificacionesForm.get('colonia')?.setValue({ id: 1, descripcion: 'Colonia 1' });
    component.getColonia();
    expect(mockStore.setColonia).toHaveBeenCalledWith({ id: 1, descripcion: 'Colonia 1' });
  });

  it('should update store when getLocalidad is called', () => {
    component.direccionNotificacionesForm.get('localidad')?.setValue({ id: 1, descripcion: 'Localidad 1' });
    component.getLocalidad();
    expect(mockStore.setLocalidad).toHaveBeenCalledWith({ id: 1, descripcion: 'Localidad 1' });
  });

  it('should update store when updatePais is called', () => {
    component.direccionNotificacionesForm.get('pais')?.setValue('México');
    component.updatePais();
    expect(mockStore.setPaisInput).toHaveBeenCalledWith('México');
  });

  it('should update store when updateNumeroInterior is called', () => {
    component.direccionNotificacionesForm.get('numeroInterior')?.setValue('101');
    component.updateNumeroInterior();
    expect(mockStore.setNumeroInterior).toHaveBeenCalledWith('101');
  });

  it('should update store when updateCodigoPostal is called', () => {
    component.direccionNotificacionesForm.get('codigoPostal')?.setValue('01000');
    component.updateCodigoPostal();
    expect(mockStore.setCodigoPostal).toHaveBeenCalledWith('01000');
  });

  it('should update store when updateTelefono is called', () => {
    component.direccionNotificacionesForm.get('telefono')?.setValue('1234567890');
    component.updateTelefono();
    expect(mockStore.setTelefono).toHaveBeenCalledWith('1234567890');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

    it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;

    const disableSpy = jest.spyOn(component.direccionNotificacionesForm, 'disable');
    const enableSpy = jest.spyOn(component.direccionNotificacionesForm, 'enable');

    component.guardarDatosFormulario();

    expect(component.updateState).toHaveBeenCalled();
    expect(disableSpy).toHaveBeenCalled();
    expect(enableSpy).not.toHaveBeenCalled();
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    const disableSpy = jest.spyOn(component.direccionNotificacionesForm, 'disable');
    const enableSpy = jest.spyOn(component.direccionNotificacionesForm, 'enable');

    component.guardarDatosFormulario();

    expect(component.updateState).toHaveBeenCalled();
    expect(enableSpy).toHaveBeenCalled();
    expect(disableSpy).not.toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario when readonly is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const updateSpy = jest.spyOn(component, 'updateState');

    component.inicializarEstadoFormulario();

    expect(guardarSpy).toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalledTimes(2); 
  });

  it('should only call updateState when readonly is false in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    const updateSpy = jest.spyOn(component, 'updateState');

    component.inicializarEstadoFormulario();

    expect(updateSpy).toHaveBeenCalled();
    expect(guardarSpy).not.toHaveBeenCalled();
  });

});