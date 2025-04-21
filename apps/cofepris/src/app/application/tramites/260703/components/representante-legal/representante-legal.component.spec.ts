import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { of, Subject } from 'rxjs';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;

  beforeEach(async () => {

    tramite260703StoreMock = {
      actualizarEstadoFormularioRepresentanteLegal: jest.fn(),
    };

    tramite260703QueryMock = {
      selectSolicitudPermiso$: of({
        representanteLegalFormState: {
          rfc: 'RFC123456',
          nombreOrazonsocial: 'John Doe',
          apellidoPaterno: 'Doe',
          apellidoMaterno: 'Smith',
        },
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [RepresentanteLegalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: tramite260703StoreMock },
        { provide: Tramite260703Query, useValue: tramite260703QueryMock },
        { provide: SolicitudPermisoService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudPermisoState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudPermisoState).toEqual({
      representanteLegalFormState: {
        rfc: 'RFC123456',
        nombreOrazonsocial: 'John Doe',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
      },
    });
  });

  it('should create the representanteLegalForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.representanteLegalForm).toBeDefined();
    expect(component.representanteLegalForm.get('rfc')?.value).toBe('RFC123456');
    expect(component.representanteLegalForm.get('nombreOrazonsocial')?.value).toBe('John Doe');
    expect(component.representanteLegalForm.get('apellidoPaterno')?.value).toBe('Doe');
    expect(component.representanteLegalForm.get('apellidoMaterno')?.value).toBe('Smith');
  });

  it('should call actualizarEstadoFormularioRepresentanteLegal when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore('rfc');
    expect(tramite260703StoreMock.actualizarEstadoFormularioRepresentanteLegal).toHaveBeenCalledWith({
      rfc: 'RFC123456',
    });
  });

  it('should update the form value and call setValoresStore', () => {
    component.ngOnInit();
    const spy = jest.spyOn(component, 'setValoresStore');
    component.representanteLegalForm.get('rfc')?.setValue('NEW_RFC');
    component.setValoresStore('rfc');
    expect(spy).toHaveBeenCalledWith('rfc');
    expect(tramite260703StoreMock.actualizarEstadoFormularioRepresentanteLegal).toHaveBeenCalledWith({
      rfc: 'NEW_RFC',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});