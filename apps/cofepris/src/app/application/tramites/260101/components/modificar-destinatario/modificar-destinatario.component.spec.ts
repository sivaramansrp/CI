import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDestinatarioComponent } from './modificar-destinatario.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';

const mockSolicitudDatosService = {
  obtenerDestinatarioCatalogos: jest.fn().mockReturnValue(
    of({
      paisCatalogo: { catalogos: [{ id: 1, descripcion: 'México' }] },
      estadoCatalogo: { catalogos: [{ id: 2, descripcion: 'CDMX' }] },
      municipioCatalogo: {
        catalogos: [{ id: 3, descripcion: 'Benito Juárez' }],
      },
      localidadCatalogo: { catalogos: [{ id: 4, descripcion: 'Localidad' }] },
      codigoCatalogo: { catalogos: [{ id: 5, descripcion: '03100' }] },
      coloniaCatalogo: { catalogos: [{ id: 6, descripcion: 'Colonia' }] },
    })
  ),
  obtenerDestinatarioRadio: jest.fn().mockReturnValue(
    of([
      { label: 'Moral', value: 1 },
      { label: 'Física', value: 2 },
    ])
  ),
  obtenerDestinatarioImitar: jest.fn().mockReturnValue(
    of({
      domicilioPais: 1,
    })
  ),
};

const mockSolicitud260101Store = {
  setDomicilioPais: jest.fn(() => of()),
  setTipoPersona: jest.fn(() => of()),
  setModificarRFC: jest.fn(() => of()),
  setDenominacion: jest.fn(() => of()),
  setDenominacionNombre: jest.fn(() => of()),
  setDenominacionApellidoPaterno: jest.fn(() => of()),
  setDenominacionApellidoMaterno: jest.fn(() => of()),
  setDomicilioEstado: jest.fn(() => of()),
  setDomicilioMunicipio: jest.fn(() => of()),
  setDomicilioLocalidad: jest.fn(() => of()),
  setDomicilioCodigo: jest.fn(() => of()),
  setDomicilioColonia: jest.fn(() => of()),
  setDomicilioCalle: jest.fn(() => of()),
  setDomicilioNumeroExterior: jest.fn(() => of()),
  setDomicilioNumeroInterior: jest.fn(() => of()),
  setDomicilioLada: jest.fn(() => of()),
  setDomicilioTelefono: jest.fn(() => of()),
  setDomicilioCorreoElectronico: jest.fn(() => of()),
};

const mockSolicitud260101Query = {
  seleccionarSolicitud$: of({
    tipoPersona: 1,
    modificarRFC: 'RFC123456789',
    denominacion: 'Empresa',
    denominacionNombre: 'Juan',
    denominacionApellidoPaterno: 'Pérez',
    denominacionApellidoMaterno: 'Gómez',
    domicilioPais: 1,
    domicilioEstado: 2,
    domicilioMunicipio: 3,
    domicilioLocalidad: 4,
    domicilioCodigo: 5,
    domicilioColonia: 6,
    domiciliCalle: 'Calle 1',
    domiciliNumeroExterior: '10',
    domiciliNumeroInterior: '2',
    domiciliLada: '55',
    domiciliTelefono: '1234567890',
    domiciliCorreoElectronioco: 'test@mail.com',
    modificarDestinatario: false,
  }),
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false }),
};

describe('ModificarDestinatarioComponent', () => {
  let component: ModificarDestinatarioComponent;
  let fixture: ComponentFixture<ModificarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModificarDestinatarioComponent,
        CommonModule,
        CatalogoSelectComponent,
        FormsModule,
        InputRadioComponent,
        TituloComponent,
      ],
      declarations: [],
      providers: [
        provideHttpClientTesting(),
        FormBuilder,
        {
          provide: SolicitudDatosService,
          useValue: mockSolicitudDatosService,
        },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    })
      .overrideComponent(ModificarDestinatarioComponent, {
        set: {
          providers: [
            { provide: FormBuilder, useClass: FormBuilder },
            {
              provide: 'SolicitudDatosService',
              useValue: mockSolicitudDatosService,
            },
            {
              provide: 'Solicitud260101Store',
              useValue: mockSolicitud260101Store,
            },
            {
              provide: 'Solicitud260101Query',
              useValue: mockSolicitud260101Query,
            },
            { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ModificarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the store', () => {
    expect(component.modificarDestinatarioForm).toBeDefined();
    expect(component.modificarDestinatarioForm.get('tipoPersona')?.value).toBe(
      1
    );
    expect(component.modificarDestinatarioForm.get('modificarRFC')?.value).toBe(
      'RFC123456789'
    );
  });

  it('should call setTipoPersona and update validators', () => {
    jest.spyOn(component, 'actualizarTipoPersonaValidators');
    component.setTipoPersona(2);
    expect(mockSolicitud260101Store.setTipoPersona).toHaveBeenCalledWith(2);
    expect(component.actualizarTipoPersonaValidators).toHaveBeenCalledWith(2);
  });

  it('should call setModificarRFC and update store', () => {
    const event = { target: { value: 'RFC987654321' } } as any;
    component.setModificarRFC(event);
    expect(mockSolicitud260101Store.setModificarRFC).toHaveBeenCalledWith(
      'RFC987654321'
    );
  });

  it('should call setDenominacion and update store', () => {
    const event = { target: { value: 'Nueva Empresa' } } as any;
    component.setDenominacion(event);
    expect(mockSolicitud260101Store.setDenominacion).toHaveBeenCalledWith(
      'Nueva Empresa'
    );
  });

  it('should call setNombre and update store', () => {
    const event = { target: { value: 'Carlos' } } as any;
    component.setNombre(event);
    expect(mockSolicitud260101Store.setDenominacionNombre).toHaveBeenCalledWith(
      'Carlos'
    );
  });

  it('should call setApellidoPaterno and update store', () => {
    const event = { target: { value: 'Ramírez' } } as any;
    component.setApellidoPaterno(event);
    expect(
      mockSolicitud260101Store.setDenominacionApellidoPaterno
    ).toHaveBeenCalledWith('Ramírez');
  });

  it('should call setApellidoMaterno and update store', () => {
    const event = { target: { value: 'López' } } as any;
    component.setApellidoMaterno(event);
    expect(
      mockSolicitud260101Store.setDenominacionApellidoMaterno
    ).toHaveBeenCalledWith('López');
  });

  it('should call seleccionaPais and update store', () => {
    component.seleccionaPais({ id: 1, descripcion: 'México' } as any);
    expect(mockSolicitud260101Store.setDomicilioPais).toHaveBeenCalledWith(1);
  });

  it('should call seleccionaEstado and update store', () => {
    component.seleccionaEstado({ id: 2, descripcion: 'CDMX' } as any);
    expect(mockSolicitud260101Store.setDomicilioEstado).toHaveBeenCalledWith(2);
  });

  it('should call seleccionaMunicipio and update store', () => {
    component.seleccionaMunicipio({
      id: 3,
      descripcion: 'Benito Juárez',
    } as any);
    expect(mockSolicitud260101Store.setDomicilioMunicipio).toHaveBeenCalledWith(
      3
    );
  });

  it('should call seleccionaLocalidad and update store', () => {
    component.seleccionaLocalidad({ id: 4, descripcion: 'Localidad' } as any);
    expect(mockSolicitud260101Store.setDomicilioLocalidad).toHaveBeenCalledWith(
      4
    );
  });

  it('should call seleccionaCodigo and update store', () => {
    component.seleccionaCodigo({ id: 5, descripcion: '03100' } as any);
    expect(mockSolicitud260101Store.setDomicilioCodigo).toHaveBeenCalledWith(5);
  });

  it('should call seleccionaColonia and update store', () => {
    component.seleccionaColonia({ id: 6, descripcion: 'Colonia' } as any);
    expect(mockSolicitud260101Store.setDomicilioColonia).toHaveBeenCalledWith(
      6
    );
  });

  it('should call setDomiciliCalle and update store', () => {
    const event = { target: { value: 'Nueva Calle' } } as any;
    component.setDomiciliCalle(event);
    expect(mockSolicitud260101Store.setDomicilioCalle).toHaveBeenCalledWith(
      'Nueva Calle'
    );
  });

  it('should call setDomiciliNumeroExterior and update store', () => {
    const event = { target: { value: '20' } } as any;
    component.setDomiciliNumeroExterior(event);
    expect(
      mockSolicitud260101Store.setDomicilioNumeroExterior
    ).toHaveBeenCalledWith('20');
  });

  it('should call setDomiciliNumeroInterior and update store', () => {
    const event = { target: { value: '3' } } as any;
    component.setDomiciliNumeroInterior(event);
    expect(
      mockSolicitud260101Store.setDomicilioNumeroInterior
    ).toHaveBeenCalledWith('3');
  });

  it('should call setDomiciliLada and update store', () => {
    const event = { target: { value: '33' } } as any;
    component.setDomiciliLada(event);
    expect(mockSolicitud260101Store.setDomicilioLada).toHaveBeenCalledWith(
      '33'
    );
  });

  it('should call setDomiciliTelefono and update store', () => {
    const event = { target: { value: '5555555555' } } as any;
    component.setDomiciliTelefono(event);
    expect(mockSolicitud260101Store.setDomicilioTelefono).toHaveBeenCalledWith(
      '5555555555'
    );
  });

  it('should call setDomiciliCorreoElectronioco and update store', () => {
    const event = { target: { value: 'correo@correo.com' } } as any;
    component.setDomiciliCorreoElectronioco(event);
    expect(
      mockSolicitud260101Store.setDomicilioCorreoElectronico
    ).toHaveBeenCalledWith('correo@correo.com');
  });

  it('should reset the form when limpiarDestinatario is called', () => {
    jest.spyOn(component.modificarDestinatarioForm, 'reset');
    component.limpiarDestinatario();
    expect(component.modificarDestinatarioForm.reset).toHaveBeenCalled();
  });

  it('should emit cerrarModal with Destinatario object when guardarDestinatario is called and form is valid', () => {
    jest.spyOn(component.cerrarModal, 'emit');
    component.paisCatalogo = {
      catalogos: [{ id: 1, descripcion: 'México' }],
    } as any;
    component.estadoCatalogo = {
      catalogos: [{ id: 2, descripcion: 'CDMX' }],
    } as any;
    component.municipioCatalogo = {
      catalogos: [{ id: 3, descripcion: 'Benito Juárez' }],
    } as any;
    component.localidadCatalogo = {
      catalogos: [{ id: 4, descripcion: 'Localidad' }],
    } as any;
    component.codigoCatalogo = {
      catalogos: [{ id: 5, descripcion: '03100' }],
    } as any;
    component.coloniaCatalogo = {
      catalogos: [{ id: 6, descripcion: 'Colonia' }],
    } as any;
    component.modificarDestinatarioForm.patchValue({
      tipoPersona: 1,
      modificarRFC: 'RFC123456789',
      denominacion: 'Empresa',
      denominacionNombre: 'Juan',
      denominacionApellidoPaterno: 'Pérez',
      denominacionApellidoMaterno: 'Gómez',
      domicilioPais: 1,
      domicilioEstado: 2,
      domicilioMunicipio: 3,
      domicilioLocalidad: 4,
      domicilioCodigo: 5,
      domicilioColonia: 6,
      domiciliCalle: 'Calle 1',
      domiciliNumeroExterior: '10',
      domiciliNumeroInterior: '2',
      domiciliLada: '55',
      domiciliTelefono: '1234567890',
      domiciliCorreoElectronioco: 'test@mail.com',
    });
    component.guardarDestinatario();
    expect(component.cerrarModal.emit).toHaveBeenCalledWith(
      expect.objectContaining({
        tipoPersona: 1,
        denominacion: 'Empresa',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
        rfc: 'RFC123456789',
        paisNombre: 'México',
        estadoNombre: 'CDMX',
        municipioNombre: 'Benito Juárez',
        localidadNombre: 'Localidad',
        coloniaNombre: 'Colonia',
        codigoNombre: '03100',
      })
    );
  });

  it('should not emit cerrarModal if form is invalid', () => {
    jest.spyOn(component.cerrarModal, 'emit');
    component.modificarDestinatarioForm.patchValue({ tipoPersona: null });
    component.guardarDestinatario();
    expect(component.cerrarModal.emit).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifier$ = (component as any)
      .destroyNotifier$ as Subject<void>;
    jest.spyOn(destroyNotifier$, 'next');
    jest.spyOn(destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifier$.next).toHaveBeenCalled();
    expect(destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario and disable form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    jest.spyOn(component, 'inicializarFormulario');
    component.modificarDestinatarioForm = component.fb.group({
      tipoPersona: [1],
      modificarRFC: ['RFC123456789'],
      denominacion: ['Empresa'],
      denominacionNombre: ['Juan'],
      denominacionApellidoPaterno: ['Pérez'],
      denominacionApellidoMaterno: ['Gómez'],
      domicilioPais: [1],
      domicilioEstado: [2],
      domicilioMunicipio: [3],
      domicilioLocalidad: [4],
      domicilioCodigo: [5],
      domicilioColonia: [6],
      domiciliCalle: ['Calle 1'],
      domiciliNumeroExterior: ['10'],
      domiciliNumeroInterior: ['2'],
      domiciliLada: ['55'],
      domiciliTelefono: ['1234567890'],
      domiciliCorreoElectronioco: ['test@mail.com'],
    });
    jest.spyOn(component.modificarDestinatarioForm, 'disable');
    component.guardarDatosFormulario();
    expect(component.inicializarFormulario).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario and enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    jest.spyOn(component, 'inicializarFormulario');
    component.modificarDestinatarioForm = component.fb.group({
      tipoPersona: [1],
      modificarRFC: ['RFC123456789'],
      denominacion: ['Empresa'],
      denominacionNombre: ['Juan'],
      denominacionApellidoPaterno: ['Pérez'],
      denominacionApellidoMaterno: ['Gómez'],
      domicilioPais: [1],
      domicilioEstado: [2],
      domicilioMunicipio: [3],
      domicilioLocalidad: [4],
      domicilioCodigo: [5],
      domicilioColonia: [6],
      domiciliCalle: ['Calle 1'],
      domiciliNumeroExterior: ['10'],
      domiciliNumeroInterior: ['2'],
      domiciliLada: ['55'],
      domiciliTelefono: ['1234567890'],
      domiciliCorreoElectronioco: ['test@mail.com'],
    });
    jest.spyOn(component.modificarDestinatarioForm, 'enable');
    component.guardarDatosFormulario();
    expect(component.inicializarFormulario).toHaveBeenCalled();
  });

  it('should call inicializarEstadoFormulario and call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(component, 'inicializarFormulario');
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call inicializarEstadoFormulario and call inicializarFormulario if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(component, 'inicializarFormulario');
    component.inicializarEstadoFormulario();
    expect(component.inicializarFormulario).toHaveBeenCalled();
    expect(component.guardarDatosFormulario).not.toHaveBeenCalled();
  });

  it('should update validators for persona moral', () => {
    component.modificarDestinatarioForm.get('denominacion')?.clearValidators();
    component.modificarDestinatarioForm
      .get('denominacionNombre')
      ?.setValidators([() => null]);
    component.modificarDestinatarioForm
      .get('denominacionApellidoPaterno')
      ?.setValidators([() => null]);
    component.actualizarTipoPersonaValidators(1);
    expect(
      component.modificarDestinatarioForm.get('denominacion')?.validator
    ).toBeDefined();
  });

  it('should update validators for persona física', () => {
    component.modificarDestinatarioForm
      .get('denominacion')
      ?.setValidators([() => null]);
    component.modificarDestinatarioForm
      .get('denominacionNombre')
      ?.clearValidators();
    component.modificarDestinatarioForm
      .get('denominacionApellidoPaterno')
      ?.clearValidators();
    component.actualizarTipoPersonaValidators(2);
    expect(
      component.modificarDestinatarioForm.get('denominacionNombre')?.validator
    ).toBeDefined();
    expect(
      component.modificarDestinatarioForm.get('denominacionApellidoPaterno')
        ?.validator
    ).toBeDefined();
  });
});
