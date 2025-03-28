import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite110221Query } from '../../../../estados/queries/Tramite110221.query';
import { Tramite110221Store } from '../../../../estados/tramites/Tramite110221.store';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    };

    tramiteStoreMock = {
      setNombre: jest.fn(),
      setApellidoPrimer: jest.fn(),
      setApellidoSegundo: jest.fn(),
      setNumeroFiscal: jest.fn(),
      setRazonSocial: jest.fn(),
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110221Store, useValue: tramiteStoreMock },
        { provide: Tramite110221Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registroForm).toBeDefined();
    expect(component.registroForm.get('validacionForm')).toBeDefined();
  });

  it('should call getPaisDestino and getTransporte on ngOnInit', () => {
    const getPaisDestinoSpy = jest.spyOn(component, 'getPaisDestino');
    const getTransporteSpy = jest.spyOn(component, 'getTransporte');

    component.ngOnInit();

    expect(getPaisDestinoSpy).toHaveBeenCalled();
    expect(getTransporteSpy).toHaveBeenCalled();
  });

  it('should mark all fields as touched if the form is invalid on validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        nombre: [''],
      }),
    });

    component.validarDestinatarioFormulario();

    expect(component.registroForm.get('validacionForm')?.get('nombre')?.touched).toBe(true);
  });

  it('should set isDisabled to true on onClick', () => {
    component.onClick();
    expect(component.isDisabled).toBe(true);
  });

  it('should call registroService.getPaisDestino and set options on getPaisDestino', () => {
    component.getPaisDestino();
    expect(registroServiceMock.getPaisDestino).toHaveBeenCalled();
    expect(component.options).toEqual([]);
  });

  it('should call registroService.getTransporte and set options on getTransporte', () => {
    component.getTransporte();
    expect(registroServiceMock.getTransporte).toHaveBeenCalled();
    expect(component.options).toEqual([]);
  });

  it('should call validacionesService.isValid on isValid', () => {
    const form = new FormBuilder().group({
      field: ['value'],
    });

    const result = component.isValid(form, 'field');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'field');
    expect(result).toBe(true);
  });

  it('should call store method on setValoresStore', () => {
    const form = new FormBuilder().group({
      campo: ['value'],
    });

    component.setValoresStore(form, 'campo', 'setNombre');
    expect(tramiteStoreMock.setNombre).toHaveBeenCalledWith('value');
  });

  it('should destroy notifier on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});