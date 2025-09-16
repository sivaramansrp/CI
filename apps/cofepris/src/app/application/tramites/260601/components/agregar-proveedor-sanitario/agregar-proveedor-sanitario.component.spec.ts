import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProveedorSanitarioComponent } from './agregar-proveedor-sanitario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { CATALOGOS_ID, DATOS_CATEGORIAS_TERCEROS } from '../../constantes/aviso-enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarProveedorSanitarioComponent', () => {
  let component: AgregarProveedorSanitarioComponent;
  let fixture: ComponentFixture<AgregarProveedorSanitarioComponent>;

  let mockTramite260601Store: Partial<Tramite260601Store>;
  let mockTramite260601Query: Partial<Tramite260601Query>;
  let mockAvisoSanitarioService: Partial<AvisoSanitarioService>;
  let mockConsultaioQuery: Partial<ConsultaioQuery>;

  const destroy$ = new Subject<void>();

  beforeEach(async () => {
    mockTramite260601Store = {
      setTipoProducto: jest.fn(),
      setTercerosNacionalidad: jest.fn(),
      setTipoPersona: jest.fn(),
      setMostrarRfcBuscarBoton: jest.fn(),
      setMostrarCurpBuscarBoton: jest.fn(),
      setInhabilitarPais: jest.fn(),
      setRfcProveedorInhabilitar: jest.fn(),
      setCurpInhabilitar: jest.fn(),
      setProveedorNombreInhabilitar: jest.fn(),
      setProveedorPrimerApellidoInhabilitar: jest.fn(),
      setProveedorSegundoApellidoInhabilitar: jest.fn(),
      setProveedorRazonSocialInhabilitar: jest.fn(),
      setPais: jest.fn(),
      setDomicilioEstado: jest.fn(),
      setAlcaldia: jest.fn(),
      setLocalidad: jest.fn(),
      setDomicilioCodigoPostal: jest.fn(),
      setColonia: jest.fn(),
      setDomicilioCalle: jest.fn(),
      setNumeroExterior: jest.fn(),
      setNumeroInterior: jest.fn(),
      setDomicilioLada: jest.fn(),
      setDomicilioTelefono: jest.fn(),
      setDomicilioCorreoElectronico: jest.fn(),
      setPaisInhabilitar: jest.fn(),
      setDomicilioEstadoInhabilitar: jest.fn(),
      setAlcaldiaInhabilitar: jest.fn(),
      setLocalidadInhabilitar: jest.fn(),
      setDomicilioCodigoPostalInhabilitar: jest.fn(),
      setColoniaInhabilitar: jest.fn(),
      setDomicilioCalleInhabilitar: jest.fn(),
      setNumeroExteriorInhabilitar: jest.fn(),
      setNumeroInteriorInhabilitar: jest.fn(),
      setDomicilioLadaInhabilitar: jest.fn(),
      setDomicilioTelefonoInhabilitar: jest.fn(),
      setDomicilioCorreoElectronicoInhabilitar: jest.fn(),
      setProveedorNombre: jest.fn(),
      setProveedorPrimerApellido: jest.fn(),
      setProveedorSegundoApellido: jest.fn(),
      setProveedorRazonSocial: jest.fn(),
    };

    mockTramite260601Query = {
      selectSeccionState$: of({
        RFCResponsableSanitario: '',
        razonSocial: '',
        correoElectronico: '',
        codigoPostal: '',
      } as any),
    };

    mockAvisoSanitarioService = {
      getProductoClasificacion: jest.fn(() =>
        of({
          code: 200,
          message: 'OK',
          data: [{ id: 1, descripcion: 'México' }]
        })
      ),
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        readonly: false,
        usuario: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoDeTramite: '',
        estadoDeTramite: '',
        create: false,
        update: false,
        consultaioSolicitante: null,
        action_id: '',
        current_user: '',
        id_solicitud: '',
        nombre_pagina: '',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AgregarProveedorSanitarioComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: Tramite260601Store, useValue: mockTramite260601Store },
        { provide: Tramite260601Query, useValue: mockTramite260601Query },
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorSanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct structure', () => {
    component.inicializarFormulario();
    expect(component.agregarProveedorForm.contains('datosGeneralesForm')).toBeTruthy();
    expect(component.agregarProveedorForm.contains('datosPersonalesForm')).toBeTruthy();
    expect(component.agregarProveedorForm.contains('domicilioForm')).toBeTruthy();
  });

  it('should disable fields if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.agregarProveedorForm.disabled).toBe(true);
    expect(component.datosGeneralesForm.disabled).toBe(true);
    expect(component.datosPersonalesForm.disabled).toBe(true);
  });

  it('should reset forms on nacionalidad change', () => {
    const resetDatosPersonalesSpy = jest.spyOn(component, 'resetDatosPersonalesForm');
    const resetDomicilioSpy = jest.spyOn(component, 'resetDomicilioForm');
    component.onNacionalidadCambio(DATOS_CATEGORIAS_TERCEROS.NACIONAL);
    expect(resetDatosPersonalesSpy).toHaveBeenCalled();
    expect(resetDomicilioSpy).toHaveBeenCalled();
    expect(mockTramite260601Store.setTercerosNacionalidad).toHaveBeenCalled();
  });

  it('should update tipoPersonaOpciones on nacionalidad extranjero', () => {
    component.onNacionalidadCambio(DATOS_CATEGORIAS_TERCEROS.EXTRANJERO);
    const noContribuyenteOption = component.tipoPersonaOpciones.find(
      (op) => op.value === DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE
    );
    expect(noContribuyenteOption).toBeUndefined();
  });

  it('should call store methods on tipo persona cambio for FISICA', () => {
    component.avisoSanitarioState = {
      tercerosNacionalidad: DATOS_CATEGORIAS_TERCEROS.NACIONAL,
      tipoPersona: DATOS_CATEGORIAS_TERCEROS.FISICA,
    } as any;
    component.crearFormulario();
    component.onTipoPersonaCambio(DATOS_CATEGORIAS_TERCEROS.FISICA);
    expect(mockTramite260601Store.setRfcProveedorInhabilitar).toHaveBeenCalledWith(false);
    expect(mockTramite260601Store.setMostrarRfcBuscarBoton).toHaveBeenCalledWith(true);
  });

  it('should set value in store using setValoresStore()', () => {
    component.crearFormulario();
    const form = component.datosGeneralesForm;
    form.get('rfcProveedor')?.setValue('ABC123');
    component.setValoresStore(form, 'rfcProveedor', 'setRfcProveedorInhabilitar');
    expect(mockTramite260601Store.setRfcProveedorInhabilitar).toHaveBeenCalledWith('ABC123');
  });

  it('should load catalogos on init', () => {
    component.inicializaCatalogos();
    expect(mockAvisoSanitarioService.getProductoClasificacion).toHaveBeenCalledWith(CATALOGOS_ID.CAT_PAIS);
  });

  it('should emit destroy signal on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
