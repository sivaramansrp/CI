import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { Tramite260917Query } from '../../estados/queries/tramite260917.query';
import { Tramite260917Store } from '../../estados/tramites/tramite260917.store';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosSolicitudComponent', () => {
  let componente: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;

  const ESTADO_SOLICITUD_MOCK: Record<string, string> = {
    tipoOperacion: 'importación',
    justificacion: 'Razón válida',
    rfcResponsableSanitario: 'RFC123456ABC',
    razonSocial: 'Empresa S.A. de C.V.',
    correoElectronico: 'correo@ejemplo.com',
    codigoPostal: '12345',
    estado: 'CDMX',
    muncipio: 'Benito Juárez',
    localidad: 'Del Valle',
    colonia: 'Colonia A',
    calle: 'Calle Falsa 123',
    lada: '55',
    telefono: '12345678',
    avisoCheckbox: 'true',
    licenciaSanitaria: 'LS123',
    marcarEnCasoDeQueSea: 'Sí',
    regimen: 'General',
    aduanasEntradas: 'Aduana 1',
    numeroPermiso: 'NP123',
    claveScianModal: 'SC123',
    claveDescripcionModal: 'Descripción SC',
    clasificacion: 'tipoA',
    especificarClasificacionProducto: 'ProductoX',
    denominacionEspecifica: 'EspX',
    denominacionDistintiva: 'DistX',
    denominacionComun: 'ComX',
    tipoDeProducto: 'Químico',
    estadoFisico: 'Líquido',
    fraccionArancelaria: '12345678',
    descripcionFraccion: 'Fracción X',
    cantidadUMT: '100',
    UMT: 'kg',
    cantidadUMC: '200',
    UMC: 'litros',
    presentacion: 'Botella',
    numeroRegistro: 'REG123',
    fechaCaducidad: '2025-12-31',
    claveDeLosLotes: 'LOTE123',
    aceptaManifiestos: 'Sí',
    aceptaPublicacion: 'Sí',
    rfcRepresentante: 'RFCREP123',
    razonSocialRepresentante: 'Representante S.A.',
    apellidoPaternoRepresentante: 'Pérez',
    apellidoMaternoRepresentante: 'Gómez',
  };

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosSolicitudComponent],
      providers: [
        {
          provide: Tramite260917Query,
          useValue: {
            selectSolicitud$: of(ESTADO_SOLICITUD_MOCK),
          },
        },
        {
          provide: Tramite260917Store,
          useValue: {
            setTipoOperacion: jest.fn(),
            setJustificacion: jest.fn(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', (): void => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario "domicilio" con valores del estado', (): void => {
    const formulario = componente.domicilio;
    expect(formulario.get('tipoOperacion')?.value).toBe(ESTADO_SOLICITUD_MOCK['tipoOperacion']);
    expect(formulario.get('justificacion')?.value).toBe(ESTADO_SOLICITUD_MOCK['justificacion']);
    expect(formulario.get('rfcResponsableSanitario')?.value).toBe(ESTADO_SOLICITUD_MOCK['rfcResponsableSanitario']);
    expect(formulario.get('estado')?.value).toBe(ESTADO_SOLICITUD_MOCK['estado']);
  });

  it('debería inicializar el formulario "formAgente" con valores del estado', (): void => {
    const formulario = componente.formAgente;
    expect(formulario.get('claveScianModal')?.value).toBe(ESTADO_SOLICITUD_MOCK['claveScianModal']);
    expect(formulario.get('claveDescripcionModal')?.value).toBe(ESTADO_SOLICITUD_MOCK['claveDescripcionModal']);
  });

  it('debería inicializar el formulario "formMercancias" con valores del estado', (): void => {
    const formulario = componente.formMercancias;
    expect(formulario.get('clasificacion')?.value).toBe(ESTADO_SOLICITUD_MOCK['clasificacion']);
    expect(formulario.get('cantidadUMT')?.value).toBe(ESTADO_SOLICITUD_MOCK['cantidadUMT']);
    expect(formulario.get('presentacion')?.value).toBe(ESTADO_SOLICITUD_MOCK['presentacion']);
  });

  it('debería inicializar el formulario "formularioManifiestos" con valores del estado', (): void => {
    const formulario = componente.formularioManifiestos;
    expect(formulario.get('aceptaManifiestos')?.value).toBe(ESTADO_SOLICITUD_MOCK['aceptaManifiestos']);
    expect(formulario.get('rfcRepresentante')?.value).toBe(ESTADO_SOLICITUD_MOCK['rfcRepresentante']);
    expect(formulario.get('razonSocialRepresentante')?.value).toBe(ESTADO_SOLICITUD_MOCK['razonSocialRepresentante']);
  });
});
