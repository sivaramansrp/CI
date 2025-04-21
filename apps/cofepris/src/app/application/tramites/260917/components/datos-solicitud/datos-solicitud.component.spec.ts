// datos-solicitud.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { Tramite260917Query } from '../../estados/queries/tramite260917.query';
import { Tramite260917Store } from '../../estados/tramites/tramite260917.store';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;

  const mockSolicitudState = {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosSolicitudComponent],
      providers: [
        {
          provide: Tramite260917Query,
          useValue: {
            selectSolicitud$: of(mockSolicitudState),
          },
        },
        {
          provide: Tramite260917Store,
          useValue: {
            setTipoOperacion: jest.fn(),
            setJustificacion: jest.fn(),
            // Add other mocked methods if needed
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // handles custom elements in the template
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize domicilio form with state values', () => {
    const form = component.domicilio;
    expect(form.get('tipoOperacion')?.value).toBe(mockSolicitudState.tipoOperacion);
    expect(form.get('justificacion')?.value).toBe(mockSolicitudState.justificacion);
    expect(form.get('rfcResponsableSanitario')?.value).toBe(mockSolicitudState.rfcResponsableSanitario);
    expect(form.get('estado')?.value).toBe(mockSolicitudState.estado);
  });

  it('should initialize formAgente form with state values', () => {
    const form = component.formAgente;
    expect(form.get('claveScianModal')?.value).toBe(mockSolicitudState.claveScianModal);
    expect(form.get('claveDescripcionModal')?.value).toBe(mockSolicitudState.claveDescripcionModal);
  });

  it('should initialize formMercancias form with state values', () => {
    const form = component.formMercancias;
    expect(form.get('clasificacion')?.value).toBe(mockSolicitudState.clasificacion);
    expect(form.get('cantidadUMT')?.value).toBe(mockSolicitudState.cantidadUMT);
    expect(form.get('presentacion')?.value).toBe(mockSolicitudState.presentacion);
  });

  it('should initialize formularioManifiestos form with state values', () => {
    const form = component.formularioManifiestos;
    expect(form.get('aceptaManifiestos')?.value).toBe(mockSolicitudState.aceptaManifiestos);
    expect(form.get('rfcRepresentante')?.value).toBe(mockSolicitudState.rfcRepresentante);
    expect(form.get('razonSocialRepresentante')?.value).toBe(mockSolicitudState.razonSocialRepresentante);
  });
});
