
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosNotificationRecipientsComponent } from './datos-notification-recipients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CancelacionesService } from '../../services/cancelaciones.service';
import { CancelacionesStore } from '../../estados/cancelaciones.store';
import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { DireccionDeNotificacionesComponent } from '../direccion-de-notificaciones/direccion-de-notificaciones.component';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

describe('DatosNotificationRecipientsComponent', () => {
  let component: DatosNotificationRecipientsComponent;
  let fixture: ComponentFixture<DatosNotificationRecipientsComponent>;
  let mockService: Partial<CancelacionesService>;
  let mockStore: Partial<CancelacionesStore>;
  let mockQuery: Partial<CancelacionesQuery>;
 const consultaioQueryMock = {
    selectConsultaioState$: of({ readonly: true }),
  };

  beforeEach(async () => {
    mockService = {
      getInfo: jest.fn().mockReturnValue(of({ apellidoMaterno: 'Rodríguez' }))
    };

    mockStore = {
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setCorreoElectronico: jest.fn()
    };

    mockQuery = {
      nombre$: of('Carlos' as any),
      apellidoPaterno$: of('Gómez' as any),
      correoElectronico$: of('carlos@example.com' as any)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosNotificationRecipientsComponent, TituloComponent, DireccionDeNotificacionesComponent],
      declarations: [],
      providers: [
        { provide: CancelacionesService, useValue: mockService },
        { provide: CancelacionesStore, useValue: mockStore },
        { provide: CancelacionesQuery, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosNotificationRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct controls', () => {
    expect(component.formularioDeNotificacionesForm.contains('nombre')).toBeTruthy();
    expect(component.formularioDeNotificacionesForm.contains('apellidoPaterno')).toBeTruthy();
    expect(component.formularioDeNotificacionesForm.contains('apellidoMaterno')).toBeTruthy();
    expect(component.formularioDeNotificacionesForm.contains('correoElectronico')).toBeTruthy();
  });

  it('should initialize form values from query observables', () => {
    expect(component.formularioDeNotificacionesForm.get('nombre')?.value).toBe('Carlos');
    expect(component.formularioDeNotificacionesForm.get('apellidoPaterno')?.value).toBe('Gómez');
    expect(component.formularioDeNotificacionesForm.get('correoElectronico')?.value).toBe('carlos@example.com');
  });

  it('should call infoDeCarga and update form values', () => {
    component.infoDeCarga();
    expect(mockService.getInfo).toHaveBeenCalled();
    expect(component.formularioDeNotificacionesForm.get('apellidoMaterno')?.value).toBe('Rodríguez');
  });

  it('should update store when updateNombre is called', () => {
    component.formularioDeNotificacionesForm.get('nombre')?.setValue('Carlos');
    component.updateNombre();
    expect(mockStore.setNombre).toHaveBeenCalledWith('Carlos');
  });

  it('should update store when updateApellidoPaterno is called', () => {
    component.formularioDeNotificacionesForm.get('apellidoPaterno')?.setValue('Gómez');
    component.updateApellidoPaterno();
    expect(mockStore.setApellidoPaterno).toHaveBeenCalledWith('Gómez');
  });

  it('should update store when updateCorreoElectronico is called', () => {
    component.formularioDeNotificacionesForm.get('correoElectronico')?.setValue('carlos@example.com');
    component.updateCorreoElectronico();
    expect(mockStore.setCorreoElectronico).toHaveBeenCalledWith('carlos@example.com');
  });

  it('should call updateState on ngOnInit', () => {
    const updateStateSpy = jest.spyOn(component, 'updateState');
    component.ngOnInit();
    expect(updateStateSpy).toHaveBeenCalled();
  });

  it('should call infoDeCarga on ngOnInit', () => {
    const infoDeCargaSpy = jest.spyOn(component, 'infoDeCarga');
    component.ngOnInit();
    expect(infoDeCargaSpy).toHaveBeenCalled();
  });

  it('should update form controls in updateState', () => {
    component.updateState();
    expect(component.formularioDeNotificacionesForm.get('nombre')?.value).toBe('Carlos');
    expect(component.formularioDeNotificacionesForm.get('apellidoPaterno')?.value).toBe('Gómez');
    expect(component.formularioDeNotificacionesForm.get('correoElectronico')?.value).toBe('carlos@example.com');
  });

  it('should unsubscribe from observables on destroy', () => {
    const spy = jest.spyOn(component['destroy$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should complete the destroy$ subject on destroy', () => {
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  
  it('should disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;

    const disableSpy = jest.spyOn(component.formularioDeNotificacionesForm, 'disable');
    const enableSpy = jest.spyOn(component.formularioDeNotificacionesForm, 'enable');

    component.guardarDatosFormulario();

    expect(component.updateState).toHaveBeenCalled();
    expect(disableSpy).toHaveBeenCalled();
    expect(enableSpy).not.toHaveBeenCalled();
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    const disableSpy = jest.spyOn(component.formularioDeNotificacionesForm, 'disable');
    const enableSpy = jest.spyOn(component.formularioDeNotificacionesForm, 'enable');

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