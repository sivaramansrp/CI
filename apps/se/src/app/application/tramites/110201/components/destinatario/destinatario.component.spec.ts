import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService, Catalogo, CatalogoSelectComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'México' }] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Aéreo' }] })),
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn(),
    };
    tramiteStoreMock = {};
    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CatalogoSelectComponent, DestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110201Store, useValue: tramiteStoreMock },
        { provide: Tramite110201Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPaisDestino and set options', () => {
    component.getPaisDestino();
    expect(registroServiceMock.getPaisDestino).toHaveBeenCalled();
    expect(component.options).toBeDefined();
  });

  it('should call getTransporte and set option', () => {
    component.getTransporte();
    expect(registroServiceMock.getTransporte).toHaveBeenCalled();
    expect(component.option).toBeDefined();
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        nombre: ['']
      })
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should set isDisabled to true on onClick', () => {
    component.isDisabled = false;
    component.onClick();
    expect(component.isDisabled).toBe(true);
  });

  it('should call guardarDatosFormulario if soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = true;
    jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call donanteDomicilio if not soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = false;
    jest.spyOn(component, 'donanteDomicilio');
    component.inicializarEstadoFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

//  it('should call donanteDomicilio and enable/disable form in guardarDatosFormulario', () => {
//   component.soloLectura = true;

//   component.guardarDatosFormulario();

//   const disableSpy = jest.spyOn(component.registroForm, 'disable');
//   const enableSpy = jest.spyOn(component.registroForm, 'enable');

//   component.guardarDatosFormulario();

//   expect(disableSpy).toHaveBeenCalled();
//   expect(enableSpy).not.toHaveBeenCalled();

//   component.soloLectura = false;
//   component.guardarDatosFormulario();
//   expect(enableSpy).toHaveBeenCalled();
// });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });


  it('should return validacionForm', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeTruthy();
  });

  it('should set up forms in donanteDomicilio', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    expect(component.registroForm).toBeTruthy();
  });

  it('should complete destroyNotifier$ and destroyed$ on ngOnDestroy', () => {
    const destroyNotifierNext = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierComplete = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierNext).toHaveBeenCalled();
    expect(destroyNotifierComplete).toHaveBeenCalled();
  });

  it('should call actualizarEstadoFormulario and donanteDomicilio on ngOnInit', () => {
    jest.spyOn(component.registroService, 'actualizarEstadoFormulario');
    jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(component.registroService.actualizarEstadoFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should not throw on onSubmit if form is valid', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.registroForm.setErrors(null);
    expect(() => component.onSubmit()).not.toThrow();
  });
});