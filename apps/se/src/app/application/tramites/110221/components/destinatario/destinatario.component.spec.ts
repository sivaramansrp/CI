import { TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { Tramite110221Store } from '../../state/Tramite110221.store';
import { Tramite110221Query } from '../../state/Tramite110221.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let registroServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;

  beforeEach(() => {
    registroServiceMock = {
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    };

    storeMock = {
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

    queryMock = {
      selectSolicitud$: of({
        nacion: 'MX',
        transporte: 'Aéreo',
        nombre: 'John',
        apellidoPrimer: 'Doe',
        apellidoSegundo: 'Smith',
        numeroFiscal: '123456',
        razonSocial: 'Empresa SA',
        ciudad: 'Ciudad de México',
        calle: 'Calle 1',
        numeroLetra: '123A',
        lada: '55',
        telefono: '1234567890',
        fax: '123456789',
        correoElectronico: 'test@example.com',
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110221Store, useValue: storeMock },
        { provide: Tramite110221Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    jest.spyOn(component, 'getPaisDestino');
    jest.spyOn(component, 'getTransporte');
    jest.spyOn(component, 'donanteDomicilio');

    component.ngOnInit();

    expect(component.getPaisDestino).toHaveBeenCalled();
    expect(component.getTransporte).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should call getPaisDestino and populate options', () => {
    component.getPaisDestino();
    expect(registroServiceMock.getPaisDestino).toHaveBeenCalled();
    expect(component.options).toEqual([]);
  });

  it('should call getTransporte and populate options', () => {
    component.getTransporte();
    expect(registroServiceMock.getTransporte).toHaveBeenCalled();
    expect(component.options).toEqual([]);
  });

  it('should validate the form on validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        nombre: [''],
      }),
    });

    jest.spyOn(component.registroForm, 'markAllAsTouched');

    component.validarDestinatarioFormulario();

    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should disable the form on onClick', () => {
    component.onClick();
    expect(component.isDisabled).toBe(true);
  });

  it('should call setValoresStore and update the store', () => {
    const form = new FormBuilder().group({
      nombre: ['John'],
    });

    component.setValoresStore(form, 'nombre', 'setNombre');
    expect(storeMock.setNombre).toHaveBeenCalledWith('John');
  });

  it('should check if a form field is valid using isValid', () => {
    const form = new FormBuilder().group({
      nombre: ['John'],
    });

    const result = component.isValid(form, 'nombre');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'nombre');
    expect(result).toBe(true);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    jest.spyOn(component.destroyNotifier$, 'next');
    jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should initialize the form with donanteDomicilio', () => {
    component.solicitudState = {
      nacion: 'MX',
      transporte: 'Aéreo',
      nombre: 'John',
      apellidoPrimer: 'Doe',
      apellidoSegundo: 'Smith',
      numeroFiscal: '123456',
      razonSocial: 'Empresa SA',
      ciudad: 'Ciudad de México',
      calle: 'Calle 1',
      numeroLetra: '123A',
      lada: '55',
      telefono: '1234567890',
      fax: '123456789',
      correoElectronico: 'test@example.com',
    };

    component.donanteDomicilio();

    expect(component.registroForm.value.validacionForm.nombre).toBe('John');
    expect(component.registroForm.value.validacionForm.apellidoPrimer).toBe('Doe');
  });
});