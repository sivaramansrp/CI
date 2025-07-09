import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFabricanteComponent } from './agregar-fabricante.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import {
  ConsultaioQuery,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';

const mockTramite260601Store = {
  setTipoProducto: jest.fn(),
  setTercerosNacionalidadFabricante: jest.fn(),
  setTipoPersonaFabricante: jest.fn(),
  setMostrarRfcFabricanteBuscarBoton: jest.fn(),
  setMostrarCurpFabricanteBuscarBoton: jest.fn(),
  setInhabilitarPaisFabricante: jest.fn(),
  setRfcFabricanteInhabilitar: jest.fn(),
  setCurpFabricanteInhabilitar: jest.fn(),
  setFabricanteNombre: jest.fn(),
  setFabricantePrimerApellido: jest.fn(),
  setFabricanteSegundoApellido: jest.fn(),
  setFabricanteRazonSocial: jest.fn(),
  setFabricanteNombreInhabilitar: jest.fn(),
  setFabricantePrimerApellidoInhabilitar: jest.fn(),
  setFabricanteSegundoApellidoInhabilitar: jest.fn(),
  setFabricanteRazonSocialInhabilitar: jest.fn(),
  setPaisFabricante: jest.fn(),
  setEstadoFabricante: jest.fn(),
  setAlcaldiaFabricante: jest.fn(),
  setLocalidadFabricante: jest.fn(),
  setCodigoPostalFabricante: jest.fn(),
  setColoniaFabricante: jest.fn(),
  setCalleFabricante: jest.fn(),
  setNumeroExteriorFabricante: jest.fn(),
  setNumeroInteriorFabricante: jest.fn(),
  setLadaFabricante: jest.fn(),
  setTelefonoFabricante: jest.fn(),
  setCorreoElectronicoFabricante: jest.fn(),
  setPaisFabricanteInhabilitar: jest.fn(),
  setEstadoFabricanteInhabilitar: jest.fn(),
  setAlcaldiaFabricanteInhabilitar: jest.fn(),
  setLocalidadFabricanteInhabilitar: jest.fn(),
  setCodigoPostalInhabilitar: jest.fn(),
  setColoniaFabricanteInhabilitar: jest.fn(),
  setCalleFabricanteInhabilitar: jest.fn(),
  setNumeroExteriorFabricanteInhabilitar: jest.fn(),
  setNumeroInteriorFabricanteInhabilitar: jest.fn(),
  setLadaFabricanteInhabilitar: jest.fn(),
  setTelefonoFabricanteInhabilitar: jest.fn(),
  setCorreoElectronicoFabricanteInhabilitar: jest.fn(),
};

const mockTramite260601Query = {
  selectSeccionState$: of({
    tercerosNacionalidadFabricante: 1,
    tipoPersonaFabricante: 2,
    rfcFabricante: 'RFC123',
    rfcFabricanteInhabilitar: false,
    curpFabricante: 'CURP123',
    curpFabricanteInhabilitar: false,
    fabricanteNombre: 'Nombre',
    fabricanteNombreInhabilitar: false,
    fabricantePrimerApellido: 'Apellido1',
    fabricantePrimerApellidoInhabilitar: false,
    fabricanteSegundoApellido: 'Apellido2',
    fabricanteSegundoApellidoInhabilitar: false,
    fabricanteRazonSocial: 'Razon',
    fabricanteRazonSocialInhabilitar: false,
    cvePaisFabricante: 'MEX',
    cvePaisFabricanteInhabilitar: false,
    estadoFabricante: 'CDMX',
    estadoFabricanteInhabilitar: false,
    alcaldiaFabricante: 'Alcaldia',
    alcaldiaFabricanteInhabilitar: false,
    localidadFabricante: 'Localidad',
    localidadFabricanteInhabilitar: false,
    codigoPostalFabricante: '12345',
    codigoPostalFabricanteInhabilitar: false,
    coloniaFabricante: 'Colonia',
    coloniaFabricanteInhabilitar: false,
    calleFabricante: 'Calle',
    calleFabricanteInhabilitar: false,
    numeroExteriorFabricante: '10',
    numeroExteriorFabricanteInhabilitar: false,
    numeroInteriorFabricante: '20',
    numeroInteriorFabricanteInhabilitar: false,
    ladaFabricante: '55',
    ladaFabricanteInhabilitar: false,
    telefonoFabricante: '12345678',
    telefonoFabricanteInhabilitar: false,
    correoElectronicoFabricante: 'test@mail.com',
    correoElectronicoFabricanteInhabilitar: false,
  }),
};

const mockAvisoSanitarioService = {
  getProductoClasificacion: jest
    .fn()
    .mockReturnValue(of({ data: [{ id: 'MEX', nombre: 'México' }] })),
};

const consultaioStateSubject = new Subject<any>();
const mockConsultaioQuery = {
  selectConsultaioState$: consultaioStateSubject.asObservable(),
};

describe('AgregarFabricanteComponent', () => {
  let component: AgregarFabricanteComponent;
  let fixture: ComponentFixture<AgregarFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TituloComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        AgregarFabricanteComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: 'Tramite260601Store', useValue: mockTramite260601Store },
        { provide: 'Tramite260601Query', useValue: mockTramite260601Query },
        {
          provide: 'AvisoSanitarioService',
          useValue: mockAvisoSanitarioService,
        },
        { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },

        { provide: Tramite260601Store, useValue: mockTramite260601Store },
        { provide: Tramite260601Query, useValue: mockTramite260601Query },
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarFabricanteComponent);
    component = fixture.componentInstance;

    consultaioStateSubject.next({ readonly: false });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from store', () => {
    component.inicializarFormulario();
    expect(component.agregarFabricanteForm).toBeDefined();
    expect(component.datosGeneralesForm.get('rfcFabricante')?.value).toBe(
      'RFC123'
    );
    expect(component.datosPersonalesForm.get('fabricanteNombre')?.value).toBe(
      'Nombre'
    );
    expect(component.domicilioForm.get('cvePaisFabricante')?.value).toBe('MEX');
  });

  it('should call setTipoProducto on paisSeleccion', () => {
    component.inicializarFormulario();
    component.paisSeleccion();
    expect(mockTramite260601Store.setTipoProducto).toHaveBeenCalledWith('MEX');
  });

  it('should reset and update store on onNacionalidadCambio', () => {
    component.inicializarFormulario();
    component.onNacionalidadCambio(2);
    expect(
      mockTramite260601Store.setTercerosNacionalidadFabricante
    ).toHaveBeenCalledWith(2);
  });

  it('should restore tipoPersonaOpciones on onNacionalidadCambio with NACIONAL', () => {
    component.inicializarFormulario();
    component.onNacionalidadCambio(1);
    expect(component.tipoPersonaOpciones.length).toBe(
      component.inicialTipoPersonaOpciones.length
    );
  });

  it('should enable/disable fields on onTipoPersonaCambio for NACIONAL/FISICA', () => {
    component.inicializarFormulario();
    component.avisoSanitarioState.tercerosNacionalidadFabricante = 1;
    component.avisoSanitarioState.tipoPersonaFabricante = 1;
    const enableSpy = jest.spyOn(
      component.datosGeneralesForm.get('rfcFabricante')!,
      'enable'
    );
    component.onTipoPersonaCambio(1);
    expect(enableSpy).toHaveBeenCalled();
    expect(
      mockTramite260601Store.setRfcFabricanteInhabilitar
    ).toHaveBeenCalledWith(false);
    expect(
      mockTramite260601Store.setMostrarRfcFabricanteBuscarBoton
    ).toHaveBeenCalledWith(true);
  });

  it('should enable/disable fields on onTipoPersonaCambio for NACIONAL/NO_CONTRIBUYENTE', () => {
    component.inicializarFormulario();
    component.avisoSanitarioState.tercerosNacionalidadFabricante = 1;
    component.avisoSanitarioState.tipoPersonaFabricante = 3;
    const enableSpy = jest.spyOn(
      component.datosGeneralesForm.get('curpFabricante')!,
      'enable'
    );
    component.onTipoPersonaCambio(3);
    expect(enableSpy).toHaveBeenCalled();
    expect(
      mockTramite260601Store.setCurpFabricanteInhabilitar
    ).toHaveBeenCalledWith(false);
    expect(
      mockTramite260601Store.setMostrarCurpFabricanteBuscarBoton
    ).toHaveBeenCalledWith(true);
  });
  it('should call guardarDatosFormulario if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const guardarDatosFormularioSpy = jest.spyOn(
      component,
      'guardarDatosFormulario' as any
    );
    component.inicializarEstadoFormulario();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const inicializarFormularioSpy = jest.spyOn(
      component,
      'inicializarFormulario'
    );
    component.inicializarEstadoFormulario();
    expect(inicializarFormularioSpy).toHaveBeenCalled();
  });
  it('should enable datosPersonalesForm and domicilioForm for EXTRANJERO/FISICA', () => {
    component.inicializarFormulario();
    component.avisoSanitarioState.tercerosNacionalidadFabricante = 2;
    component.avisoSanitarioState.tipoPersonaFabricante = 1;
    const enableDatosPersonalesSpy = jest.spyOn(
      component.datosPersonalesForm,
      'enable'
    );
    const enableDomicilioSpy = jest.spyOn(component.domicilioForm, 'enable');
    component.onTipoPersonaCambio(1);
    expect(enableDatosPersonalesSpy).toHaveBeenCalled();
    expect(enableDomicilioSpy).toHaveBeenCalled();
    expect(
      mockTramite260601Store.setInhabilitarPaisFabricante
    ).toHaveBeenCalledWith(false);
  });

  it('should reset datosPersonalesForm and call store methods', () => {
    component.inicializarFormulario();
    const disableRfcSpy = jest.spyOn(
      component.datosGeneralesForm.get('rfcFabricante')!,
      'disable'
    );
    const disableCurpSpy = jest.spyOn(
      component.datosGeneralesForm.get('curpFabricante')!,
      'disable'
    );
    const resetSpy = jest.spyOn(component.datosPersonalesForm, 'reset');
    component.resetDatosPersonalesForm();
    expect(disableRfcSpy).toHaveBeenCalled();
    expect(disableCurpSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
    expect(
      mockTramite260601Store.setRfcFabricanteInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setCurpFabricanteInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setFabricanteNombreInhabilitar
    ).toHaveBeenCalledWith(true);
  });

  it('should reset domicilioForm and call store methods', () => {
    component.inicializarFormulario();
    const resetSpy = jest.spyOn(component.domicilioForm, 'reset');
    component.resetDomicilioForm();
    expect(resetSpy).toHaveBeenCalled();
    expect(
      mockTramite260601Store.setPaisFabricanteInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setEstadoFabricanteInhabilitar
    ).toHaveBeenCalledWith(true);
  });

  it('should call setValoresStore with correct value', () => {
    component.inicializarFormulario();
    const form = component.datosGeneralesForm;
    form.get('rfcFabricante')?.setValue('RFC999');
    component.setValoresStore(
      form,
      'rfcFabricante',
      'setRfcFabricanteInhabilitar'
    );
    expect(
      mockTramite260601Store.setRfcFabricanteInhabilitar
    ).toHaveBeenCalledWith('RFC999');
  });

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(
      component['destruirNotificador$'],
      'complete'
    );
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
