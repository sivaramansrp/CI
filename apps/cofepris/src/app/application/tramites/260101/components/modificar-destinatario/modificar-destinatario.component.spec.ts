import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ModificarDestinatarioComponent } from './modificar-destinatario.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';

describe('ModificarDestinatarioComponent', () => {
  let component: ModificarDestinatarioComponent;
  let fixture: ComponentFixture<ModificarDestinatarioComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;
  let solicitud260101Store: jest.Mocked<Solicitud260101Store>;
  let solicitud260101Query: jest.Mocked<Solicitud260101Query>;

  beforeEach(async () => {
    const solicitudDatosServiceMock = {
      obtenerDestinatarioCatalogos: jest.fn(),
      obtenerDestinatarioRadio: jest.fn(),
      obtenerDestinatarioImitar: jest.fn(),
    };

    const solicitud260101StoreMock = {
      setDomicilioPais: jest.fn(),
      setTipoPersona: jest.fn(),
      setModificarRFC: jest.fn(),
      setDenominacion: jest.fn(),
      setDomicilioEstado: jest.fn(),
      setDomicilioMunicipio: jest.fn(),
      setDomicilioLocalidad: jest.fn(),
      setDomicilioCodigo: jest.fn(),
      setDomicilioColonia: jest.fn(),
      setDomicilioCalle: jest.fn(),
      setDomicilioNumeroExterior: jest.fn(),
      setDomicilioNumeroInterior: jest.fn(),
      setDomicilioLada: jest.fn(),
      setDomicilioTelefono: jest.fn(),
      setDomicilioCorreoElectronico: jest.fn(),
      addDestinatarioDato: jest.fn(),
    };

    const solicitud260101QueryMock = {
      seleccionarSolicitud$: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [ModificarDestinatarioComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260101Store, useValue: solicitud260101StoreMock },
        { provide: Solicitud260101Query, useValue: solicitud260101QueryMock },
      ],
    }).compileComponents();

    solicitudDatosService = TestBed.inject(
      SolicitudDatosService
    ) as jest.Mocked<SolicitudDatosService>;
    solicitud260101Store = TestBed.inject(
      Solicitud260101Store
    ) as jest.Mocked<Solicitud260101Store>;
    solicitud260101Query = TestBed.inject(
      Solicitud260101Query
    ) as jest.Mocked<Solicitud260101Query>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modificarDestinatarioForm).toBeDefined();
  });

  it('should call obtenerDestinatarioCatalogos on init', () => {
    solicitudDatosService.obtenerDestinatarioCatalogos.mockReturnValue(
      of({
        paisCatalogo: {
          labelNombre: 'País',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 1,
              descripcion: 'Test 2',
            },
          ],
        },
        estadoCatalogo: {
          labelNombre: 'Estado/localidad',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 1,
              descripcion: 'Test 2',
            },
          ],
        },
        municipioCatalogo: {
          labelNombre: 'Municipio/alcaldía',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 1,
              descripcion: 'Test 2',
            },
          ],
        },
        localidadCatalogo: {
          labelNombre: 'Localidad',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 1,
              descripcion: 'Test 2',
            },
          ],
        },
        codigoCatalogo: {
          labelNombre: 'Código postal o equivalente',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 1,
              descripcion: 'Test 2',
            },
          ],
        },
        coloniaCatalogo: {
          labelNombre: 'Colonia',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: [
            {
              id: 1,
              descripcion: 'Test 1',
            },
            {
              id: 1,
              descripcion: 'Test 2',
            },
          ],
        },
      })
    );
    component.obtenerDestinatarioCatalogos();
    expect(
      solicitudDatosService.obtenerDestinatarioCatalogos
    ).toHaveBeenCalled();
  });

  it('should call obtenerDestinatarioRadio on init', () => {
    solicitudDatosService.obtenerDestinatarioRadio.mockReturnValue(of([]));
    component.obtenerDestinatarioRadio();
    expect(solicitudDatosService.obtenerDestinatarioRadio).toHaveBeenCalled();
  });

  it('should call obtenerDestinatarioImitar on init', () => {
    solicitudDatosService.obtenerDestinatarioImitar.mockReturnValue(
      of({
        tipoPersona: 'Física',
        modificarRFC: '',
        denominacion: 'John Doe Enterprises',
        domicilioPais: 1,
        domicilioEstado: 'Jalisco',
        domicilioMunicipio: 'Guadalajara',
        domicilioLocalidad: 'Zapopan',
        domicilioCodigo: '44100',
        domicilioColonia: 'Centro',
        domiciliCalle: 'Avenida Juárez',
        domiciliNumeroExterior: '123',
        domiciliNumeroInterior: '4B',
        domiciliLada: '+52',
        domiciliTelefono: '3312345678',
        domiciliCorreoElectronioco: 'johndoe@example.com',
      })
    );
    component.obtenerDestinatarioImitar();
    expect(solicitudDatosService.obtenerDestinatarioImitar).toHaveBeenCalled();
  });

  it('should update store on setTipoPersona', () => {
    component.setTipoPersona('fisica');
    expect(solicitud260101Store.setTipoPersona).toHaveBeenCalledWith('fisica');
  });

  it('should update store on setModificarRFC', () => {
    const evento = { target: { VALOR: 'RFC123456' } } as unknown as Event;
    component.setModificarRFC(evento);
    expect(solicitud260101Store.setModificarRFC).toHaveBeenCalledWith('RFC123456');
  });
  

  it('should update store on setDenominacion', () => {
    const evento = { target: { VALOR: 'Denominacion' } } as unknown as Event;
    component.setDenominacion(evento);
    expect(solicitud260101Store.setDenominacion).toHaveBeenCalledWith('Denominacion');
  });
  

  it('should reset form on limpiarDestinatario', () => {
    component.limpiarDestinatario();
    expect(component.modificarDestinatarioForm.pristine).toBe(true);
  });

  it('should not save if form is invalid', () => {
    component.modificarDestinatarioForm.setErrors({ invalid: true });
    component.guardarDestinatario();
    expect(solicitud260101Store.addDestinatarioDato).not.toHaveBeenCalled();
  });

  it('should save if form is valid', () => {
    component.modificarDestinatarioForm.setValue({
      tipoPersona: 'fisica',
      modificarRFC: 'RFC123456',
      denominacion: 'Denominacion',
      domicilioPais: 'MX',
      domicilioEstado: 'Estado',
      domicilioMunicipio: 'Municipio',
      domicilioLocalidad: 'Localidad',
      domicilioCodigo: '12345',
      domicilioColonia: 'Colonia',
      domiciliCalle: 'Calle',
      domiciliNumeroExterior: '123',
      domiciliNumeroInterior: '456',
      domiciliLada: '55',
      domiciliTelefono: '1234567890',
      domiciliCorreoElectronioco: 'test@example.com',
    });
    component.guardarDestinatario();
    expect(solicitud260101Store.addDestinatarioDato).toHaveBeenCalled();
  });

  it('should call obtenerDestinatarioRadio and update tipoPersonaRadioOptions', () => {
    const mockResponse = [
      { label: 'Persona Física', value: 'fisica' },
      { label: 'Persona Moral', value: 'moral' },
    ];
    solicitudDatosService.obtenerDestinatarioRadio.mockReturnValue(of(mockResponse));
    component.obtenerDestinatarioRadio();
    expect(solicitudDatosService.obtenerDestinatarioRadio).toHaveBeenCalled();
    expect(component.tipoPersonaRadioOptions).toEqual(mockResponse);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
